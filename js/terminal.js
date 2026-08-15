/* ============================================================
   Kaushal Kalas — simulated Debian terminal
   PRD §18–§22 · DESIGN.md "Terminal (signature component)"
   ============================================================ */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     BOTPRESS INTEGRATION POINT
     The AI assistant lives inside the terminal (PRD §22).
     To enable `ask` and `ai`:
       1. Create a bot at https://studio.botpress.cloud
       2. Copy the "Webchat" embed config from your bot's "Webchat"
          settings (clientId comes from the embed snippet).
       3. Paste clientId below. Nothing else needs to change.
     When unconfigured, `ask`/`ai` print a graceful message and the
     rest of the terminal works normally.
     ------------------------------------------------------------------ */
  const BOTPRESS_CONFIG = {
    clientId: "", // e.g. "c0ffee-..."; leave "" until you have a bot
    hostUrl: "https://cdn.botpress.cloud",
    botName: "Kaushal AI",
    // Optional webchat overrides (v2.4 webchat options):
    // stylesheet: "https://webchat-styler-css.botpress.app/prod/code.css",
    // language: "en"
  };

  const PROMPT = "kaushal@debian:~$";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const terminal = document.getElementById("terminal");
  const output = document.getElementById("terminal-output");
  const input = document.getElementById("terminal-input");
  const mirrorText = document.getElementById("terminal-mirror-text");
  const copyBtn = document.getElementById("terminal-copy");
  const chatPanel = document.getElementById("terminal-chat");
  const chatClose = document.querySelector(".terminal__chat-close");

  const history = [];
  let historyIndex = 0;
  let booting = true;
  let bootQueue = [];

  const aiConfigured = Boolean(BOTPRESS_CONFIG.clientId);

  function getData() {
    return window.__PORTFOLIO_DATA__ || null;
  }

  function esc(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ---------------- output ---------------- */

  function addLine(html, dim) {
    const line = document.createElement("div");
    line.className = "terminal__line" + (dim ? " terminal__line--dim" : "");
    line.innerHTML = html;
    output.appendChild(line);
    scrollToBottom();
    return line;
  }

  function printLines(lines) {
    lines.forEach(function (text) {
      addLine(esc(text));
    });
  }

  function printEcho(cmd) {
    addLine('<span class="t-prefix">' + esc(PROMPT) + "</span> <span class=\"t-cmd\">" + esc(cmd) + "</span>");
  }

  function printError(cmd) {
    addLine("bash: " + esc(cmd) + ": command not found");
    addLine("Type 'help' to see available commands.", true);
  }

  function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
  }

  function sectionRule(title) {
    return [title, "────────────────────────────"];
  }

  function getDataOrWarn() {
    const d = getData();
    if (!d) {
      printLines(["Portfolio data is not available right now. Try again in a moment."]);
      return null;
    }
    return d;
  }

  /* ---------------- commands ---------------- */

  const COMMANDS = {
    help: function () {
      const rows = [
        ["about", "show profile summary"],
        ["skills", "show technology stack"],
        ["projects", "list projects"],
        ["experience", "show experience"],
        ["education", "show education"],
        ["achievements", "show achievements & certifications"],
        ["gallery", "list personal gallery"],
        ["gallery <n>", "view gallery item <n>"],
        ["resume", "open/download resume"],
        ["contact", "show contact links"],
        ["github", "open GitHub profile"],
        ["whoami", "who is behind this terminal"],
        ["ls", "show portfolio resources"],
        ["history", "show command history"],
        ["ask <question>", "ask the AI assistant"],
        ["ai", "enter AI chat mode"],
        ["clear", "clear the terminal"]
      ];
      const lines = ["Available commands:", ""];
      rows.forEach(function (r) {
        lines.push("  " + r[0].padEnd(18, " ") + r[1]);
      });
      lines.push("", "Run 'ask <question>' to talk to the portfolio AI.");
      printLines(lines);
    },

    whoami: function () {
      const d = getDataOrWarn();
      if (!d) return;
      const p = d.profile;
      printLines([
        p.name + " — " + p.title,
        p.tagline,
        "",
        "Location: " + p.location,
        "Currently learning: " + p.learning
      ]);
    },

    about: function () {
      const d = getDataOrWarn();
      if (!d) return;
      printLines(d.profile.about.concat(["", "Interests: " + d.profile.interests.join(", ")]));
    },

    skills: function () {
      const d = getDataOrWarn();
      if (!d) return;
      const lines = sectionRule("Skills");
      Object.keys(d.skills).forEach(function (cat) {
        lines.push(cat + ": " + d.skills[cat].join(", "));
      });
      printLines(lines);
    },

    projects: function () {
      const d = getDataOrWarn();
      if (!d) return;
      const lines = sectionRule("Projects");
      d.projects.forEach(function (p, i) {
        lines.push("[" + (i + 1) + "] " + p.name + " (" + p.year + ")");
        lines.push("    " + p.description);
        lines.push("    " + p.stack.slice(0, 3).join(", ") + " · " + p.github);
        lines.push("");
      });
      printLines(lines);
    },

    experience: function () {
      const d = getDataOrWarn();
      if (!d) return;
      const lines = sectionRule("Experience");
      d.experience.forEach(function (e) {
        lines.push(e.role + " — " + e.organization + " (" + e.timeline + ")");
        e.responsibilities.forEach(function (r) {
          lines.push("  - " + r);
        });
        lines.push("  Outcome: " + e.outcomes);
        lines.push("");
      });
      printLines(lines);
    },

    education: function () {
      const d = getDataOrWarn();
      if (!d) return;
      const lines = sectionRule("Education");
      d.education.forEach(function (e) {
        lines.push(e.degree + " — " + e.institution + ", " + e.location);
        lines.push("  " + e.timeline + " · " + e.specialization);
        e.highlights.forEach(function (h) {
          lines.push("  - " + h);
        });
      });
      printLines(lines);
    },

    achievements: function () {
      const d = getDataOrWarn();
      if (!d) return;
      const lines = sectionRule("Achievements & Certifications");
      d.achievements.forEach(function (a) {
        lines.push(a.title + " — " + a.issuer + " (" + a.date + ")");
        lines.push("  " + a.context);
      });
      printLines(lines);
    },

    gallery: function (arg) {
      const d = getDataOrWarn();
      if (!d) return;
      const items = d.gallery;

      if (!arg) {
        const lines = sectionRule("Personal Gallery");
        items.forEach(function (g) {
          lines.push("[" + g.id + "] " + g.title);
          lines.push("    " + g.caption);
          lines.push("");
        });
        lines.push("Type 'gallery <number>' to view an image.");
        printLines(lines);
        return;
      }

      const n = parseInt(arg, 10);
      const item = items.find(function (g) {
        return g.id === n;
      });
      if (!item) {
        printLines(["gallery: no item #" + esc(arg) + " — try `gallery` to list items."]);
        return;
      }

      addLine(item.title);
      const img = document.createElement("img");
      img.className = "terminal__img";
      img.src = item.image;
      img.alt = item.title + " — " + item.caption;
      img.width = 640;
      img.height = 480;
      output.appendChild(img);
      addLine("");
      addLine(item.caption, true);
      scrollToBottom();
    },

    resume: function () {
      const d = getDataOrWarn();
      if (!d) return;
      const file = d.profile.resume.file;
      printLines(["Opening " + d.profile.resume.label + "...", "✓ Resume opened successfully."]);
      fetch(file, { method: "HEAD" })
        .then(function (res) {
          if (!res.ok) throw new Error("unavailable");
          window.open(file, "_blank", "noopener");
        })
        .catch(function () {
          printLines(["resume: file not found yet — check back soon.", "Hint: drop the PDF at assets/resume/Kaushal_Kalas_Resume.pdf"]);
        });
    },

    contact: function () {
      const d = getDataOrWarn();
      if (!d) return;
      const c = d.contact;
      printLines([
        "email    " + c.email.label,
        "github   " + c.github.label,
        "linkedin " + c.linkedin.label,
        "x        " + c.x.label
      ]);
    },

    github: function () {
      const d = getDataOrWarn();
      if (!d) return;
      printLines(["Opening GitHub profile...", "✓ Opened github.com/kaushalkalas."]);
      window.open(d.contact.github.href, "_blank", "noopener");
    },

    ls: function () {
      printLines([
        "Kaushal's portfolio resources:",
        "  about/        profile summary",
        "  skills/       technology stack",
        "  projects/     featured + other projects",
        "  experience/   internships & contributions",
        "  education/    degree & coursework",
        "  achievements/ awards & certifications",
        "  gallery/      personal photos",
        "  resume.pdf    " + (getData() ? getData().profile.resume.label : "resume file"),
        "  ai/           portfolio assistant (ask <question>)"
      ]);
    },

    history: function () {
      if (!history.length) {
        printLines(["history: no commands yet."]);
        return;
      }
      printLines(history.map(function (h, i) {
        return String(i + 1).padStart(2, " ") + "  " + h;
      }));
    },

    clear: function () {
      output.innerHTML = "";
    },

    ask: function (arg) {
      if (!arg) {
        printLines(["ask: usage — ask <question>", "Example: ask What projects has Kaushal built?"]);
        return;
      }
      if (!aiConfigured) {
        printLines([
          "AI assistant is not configured yet.",
          "Add your Botpress webchat config to BOTPRESS_CONFIG in js/terminal.js to enable 'ask' and 'ai'."
        ]);
        return;
      }
      askAI(arg);
    },

    ai: function () {
      if (!aiConfigured) {
        printLines([
          "AI assistant is not configured yet.",
          "Add your Botpress webchat config to BOTPRESS_CONFIG in js/terminal.js to enable 'ask' and 'ai'."
        ]);
        return;
      }
      openChat();
    }
  };

  function dispatch(cmdLine) {
    const trimmed = cmdLine.trim();
    const parts = trimmed.split(/\s+/);
    const name = parts[0];
    const arg = parts.slice(1).join(" ");

    printEcho(trimmed);

    if (trimmed === "") return;
    if (trimmed === "clear") {
      history.push(trimmed);
      COMMANDS.clear();
      return;
    }

    if (COMMANDS[name]) {
      COMMANDS[name](arg);
    } else {
      printError(name);
    }

    history.push(trimmed);
    historyIndex = history.length;
  }

  /* ---------------- command history (↑/↓) ---------------- */

  function setInput(value) {
    input.value = value;
    syncMirror();
    input.setSelectionRange(value.length, value.length);
  }

  function syncMirror() {
    mirrorText.textContent = input.value;
  }

  input.addEventListener("input", syncMirror);
  input.addEventListener("scroll", function () {
    const mirror = input.previousElementSibling;
    if (mirror) mirror.scrollLeft = input.scrollLeft;
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const value = input.value;
      input.value = "";
      syncMirror();
      if (booting) {
        bootQueue.push(value);
      } else {
        dispatch(value);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      historyIndex = Math.max(0, historyIndex - 1);
      setInput(history[historyIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!history.length) return;
      historyIndex = Math.min(history.length, historyIndex + 1);
      setInput(historyIndex < history.length ? history[historyIndex] : "");
    }
  });

  /* ---------------- copy ---------------- */

  copyBtn.addEventListener("click", function () {
    const text = output.innerText;
    if (!text) return;
    navigator.clipboard
      .writeText(text)
      .then(function () {
        copyBtn.textContent = "copied ✓";
        setTimeout(function () {
          copyBtn.textContent = "copy";
        }, 1600);
      })
      .catch(function () {});
  });

  /* ---------------- focus handling ---------------- */

  terminal.addEventListener("click", function (e) {
    if (e.target.closest("a") || e.target.closest("button")) return;
    input.focus();
  });

  /* ---------------- boot sequence ---------------- */

  const WELCOME =
    "Welcome to Kaushal's portfolio. " +
    "This is a simulated Debian terminal — type 'help' to see what I can show you.";

  function runBoot() {
    if (booting === false) return;
    booting = false;

    if (reduceMotion) {
      addLine(WELCOME, true);
    } else {
      const line = addLine("", true);
      let i = 0;
      const step = Math.max(8, Math.floor(WELCOME.length / 60));
      const timer = setInterval(function () {
        i = Math.min(WELCOME.length, i + step);
        line.textContent = WELCOME.slice(0, i);
        scrollToBottom();
        if (i >= WELCOME.length) clearInterval(timer);
      }, 24);
    }

    bootQueue.forEach(function (cmd) {
      dispatch(cmd);
    });
    bootQueue = [];
    input.focus();
  }

  /* ---------------- Botpress integration ---------------- */

  function loadBotpress() {
    return new Promise(function (resolve) {
      if (window.botpressWebChat) return resolve();
      const s = document.createElement("script");
      s.src = "https://cdn.botpress.cloud/webchat/v2.4/inject.js";
      s.async = true;
      s.onload = function () {
        resolve();
      };
      s.onerror = function () {
        resolve();
      };
      document.body.appendChild(s);
    });
  }

  function initBotpress() {
    if (!aiConfigured || !window.botpressWebChat) return;
    const options = {
      clientId: BOTPRESS_CONFIG.clientId,
      hostUrl: BOTPRESS_CONFIG.hostUrl,
      botName: BOTPRESS_CONFIG.botName,
      containerSelector: "#terminal-chat",
      hideWidget: true,
      disableAnimations: reduceMotion
    };
    if (BOTPRESS_CONFIG.stylesheet) options.stylesheet = BOTPRESS_CONFIG.stylesheet;
    if (BOTPRESS_CONFIG.language) options.language = BOTPRESS_CONFIG.language;

    window.botpressWebChat.init(options);

    /* echo bot replies into the terminal output */
    window.botpressWebChat.onEvent(function (event) {
      if (event.type !== "MESSAGE") return;
      const from = event.payload.from;
      const text = event.payload.text;
      if (!text) return;
      if (from === "bot") {
        addLine(text.split("\n").join("<br/>"));
      }
    });
  }

  function askAI(question) {
    if (!window.botpressWebChat) {
      printLines(["ask: the AI chat failed to load. Try again in a moment."]);
      return;
    }
    addLine('<span class="t-prefix">' + esc(PROMPT) + "</span> <span class=\"t-cmd\">ask " + esc(question) + "</span>");
    addLine("> " + esc(question), true);
    window.botpressWebChat.sendEvent({ type: "message", payload: { text: question } });
  }

  function openChat() {
    chatPanel.classList.add("is-open");
    chatPanel.setAttribute("aria-hidden", "false");
    terminal.classList.add("is-chat");
    loadBotpress().then(initBotpress);
  }

  function closeChat() {
    chatPanel.classList.remove("is-open");
    chatPanel.setAttribute("aria-hidden", "true");
    terminal.classList.remove("is-chat");
    input.focus();
  }

  chatClose.addEventListener("click", closeChat);

  /* ---------------- boot wiring ---------------- */

  document.addEventListener("DOMContentLoaded", function () {
    if (window.__PORTFOLIO_DATA__) {
      runBoot();
      return;
    }
    window.addEventListener("portfolio:data", runBoot, { once: true });
    setTimeout(function () {
      if (booting) runBoot();
    }, 5000);
  });
})();