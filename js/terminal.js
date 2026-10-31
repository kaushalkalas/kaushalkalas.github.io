/* ============================================================
   Kaushal Kalas — simulated Debian terminal
   PRD §18–§22 · DESIGN.md "Terminal (signature component)"
   ============================================================ */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     AI ASSISTANT (Groq via Cloudflare Worker proxy)
     The AI assistant answers directly in the terminal (PRD §22).
     `ask <question>` sends the question to the AI backend together
     with Kaushal's personal knowledge base (js/data/portfolio.json)
     and prints the reply as a normal terminal line — no chat UI.
     The Groq API key is kept OUT of the browser: it lives as a secret
     on a Cloudflare Worker (see /worker) and is injected server-side.
     To enable `ask`:
       1. Deploy /worker/_worker.js to Cloudflare Workers (free tier),
          set the `GROQ_API_KEY` secret and `ALLOWED_ORIGIN` variable.
       2. Set AI_CONFIG.proxyUrl below, or set `data-ai-proxy-url` on the
          terminal script tag, or define `window.AI_PROXY_URL` before loading.
     When unconfigured, `ask` prints a graceful message and the rest
     of the terminal works normally.
     ------------------------------------------------------------------ */
  const AI_CONFIG = {
    proxyUrl: (function () {
      // Priority: script tag data attribute > window global > default
      const script = document.currentScript;
      if (script && script.dataset.aiProxyUrl) return script.dataset.aiProxyUrl;
      if (typeof window.AI_PROXY_URL === "string" && window.AI_PROXY_URL) return window.AI_PROXY_URL;
      return "";
    })(),
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    model: "openai/gpt-oss-120b",
    apiKey: "",
    temperature: 0.3,
    timeoutMs: 30000
  };

  const PROMPT = "kaushal@debian:~$";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const AI_SYSTEM_PROMPT =
    "You are the AI assistant inside Kaushal Kalas's portfolio terminal. " +
    "You answer questions about Kaushal using ONLY the KNOWLEDGE BASE provided with this message. " +
    "Rules: Never invent projects, qualifications, or achievements that are not in the knowledge base. " +
    "Never reveal private information. If the answer is not in the knowledge base, reply exactly: " +
    "\"I don't have reliable information about that in Kaushal's portfolio.\" " +
    "Keep answers short and terminal-friendly: plain text, no markdown headings, " +
    "no emoji, at most 6 lines for anything but 'ask' summaries. " +
    "Write in a warm, precise, professional tone that matches Kaushal's portfolio.";

  const terminal = document.getElementById("terminal");
  const output = document.getElementById("terminal-output");
  const input = document.getElementById("terminal-input");
  const mirrorText = document.getElementById("terminal-mirror-text");
  const copyBtn = document.getElementById("terminal-copy");

  const history = [];
  let historyIndex = 0;
  let booting = true;
  let bootQueue = [];

  const aiConfigured = Boolean(AI_CONFIG.proxyUrl || AI_CONFIG.apiKey);

  let knowledgeBaseCache = null;
  let askInProgress = false;

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

  function printMultiline(text, dim) {
    String(text)
      .split(/\r?\n/)
      .forEach(function (line) {
        addLine(esc(line), dim);
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
        ["education", "show education & training"],
        ["extracurricular", "show extracurricular activities"],
        ["gallery", "list personal gallery"],
        ["gallery <n>", "render gallery item <n> as ANSI art"],
        ["resume", "open/download resume"],
        ["contact", "show contact links"],
        ["github", "open GitHub profile"],
        ["whoami", "who is behind this terminal"],
        ["ls", "show portfolio resources"],
        ["history", "show command history"],
        ["ask <question>", "ask the AI assistant"],
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

    education: function () {
      const d = getDataOrWarn();
      if (!d) return;
      const lines = sectionRule("Education & Professional Training");
      d.education.forEach(function (e) {
        lines.push(e.degree + " — " + e.institution + ", " + e.location);
        lines.push("  " + e.timeline + " · " + e.specialization);
        e.highlights.forEach(function (h) {
          lines.push("  - " + h);
        });
      });
      (d.training || []).forEach(function (t) {
        lines.push("");
        lines.push(t.title + " — " + t.organization + ", " + t.location);
        lines.push("  " + t.timeline);
        t.highlights.forEach(function (h) {
          lines.push("  - " + h);
        });
      });
      printLines(lines);
    },

    extracurricular: function () {
      const d = getDataOrWarn();
      if (!d) return;
      const lines = sectionRule("Extracurricular Activities");
      d.extracurricular.forEach(function (a) {
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
        lines.push("Type 'gallery <number>' to render it as ANSI art.");
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
      const statusLine = addLine(
        '<span class="terminal__line--dim">art: rendering ' + esc(item.image) + " …</span>"
      );
      const openLightbox = function () {
        const api = window.__GALLERY_API__;
        if (api && typeof api.open === "function") api.open(items.indexOf(item));
      };
      const showFallback = function () {
        const img = document.createElement("img");
        img.className = "terminal__img";
        img.src = item.image;
        img.alt = item.title + " — " + item.caption;
        img.width = item.width || 640;
        img.height = item.height || 480;
        img.title = "Click to enlarge";
        img.addEventListener("click", openLightbox);
        statusLine.replaceChildren(img);
        addLine("art: render failed — showing the photo instead (click to enlarge).", true);
        scrollToBottom();
      };
      renderArt(item, artColumns(item))
        .then(function (art) {
          art.tabIndex = 0;
          art.setAttribute("title", "Click to enlarge");
          art.addEventListener("click", openLightbox);
          art.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openLightbox();
            }
          });
          statusLine.replaceChildren(art);
          addLine("");
          addLine(esc(item.caption), true);
          scrollToBottom();
        })
        .catch(showFallback);
    },

    resume: function () {
      const d = getDataOrWarn();
      if (!d) return;
      const file = d.profile.resume.file;
      if (this._resumeOpening) return;
      this._resumeOpening = true;
      printLines(["Opening " + d.profile.resume.label + "..."]);
      window.open(file, "_blank", "noopener");
      setTimeout(function () {
        delete this._resumeOpening;
      }.bind(this), 1000);
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
        "  education/    degrees & training",
        "  extracurricular/  extracurricular activities",
        "  gallery/      personal photos",
        "  resume.pdf    " + (getData() ? getData().profile.resume.label : "resume file"),
        "  ask <question>  portfolio assistant (answers in-terminal)"
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
          "Set AI_CONFIG.proxyUrl in js/terminal.js to enable 'ask'."
        ]);
        return;
      }
      if (askInProgress) {
        printLines(["ask: request already in progress, please wait..."]);
        return;
      }
      askAI(arg);
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

  /* ---------------- programmatic access (section eyebrows, "/" key) ---------------- */

  function scrollToTerminal() {
    terminal.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center"
    });
  }

  window.__TERMINAL_API__ = {
    run: function (cmd) {
      const clean = String(cmd || "").trim();
      if (!clean) return;
      if (booting) {
        bootQueue.push(clean);
      } else {
        dispatch(clean);
      }
    },
    focusTerminal: function () {
      scrollToTerminal();
      input.focus({ preventScroll: true });
    }
  };

  document.addEventListener("keydown", function (e) {
    if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    e.preventDefault();
    scrollToTerminal();
    input.focus({ preventScroll: true });
  });

  /* ---------------- ANSI art renderer (letter ramp) ---------------- */

  let artMetricsCache = null;
  // Measure the real monospace cell size once (this drives glyph aspect).
  function artMetrics() {
    if (artMetricsCache) return artMetricsCache;
    const probe = document.createElement("span");
    probe.className = "terminal__art";
    probe.style.cssText += ";position:absolute;visibility:hidden;white-space:pre;";
    probe.textContent = "abcdefghijklmnopqrstuvwxyz0123456789";
    output.appendChild(probe); // inherit the terminal's exact font metrics
    const rect = probe.getBoundingClientRect();
    const charW = rect.width / 36 || 8;
    const lineH = parseFloat(window.getComputedStyle(probe).lineHeight) || charW * 2;
    probe.remove();
    artMetricsCache = { charW: charW, lineH: lineH, fontRatio: charW / lineH };
    return artMetricsCache;
  }

  function artColumns(item) {
    const m = artMetrics();
    const cs = window.getComputedStyle(output);
    const avail = output.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    // 72 is the validated width band (probe12: finer grids fragment into noise)
    let cols = Math.min(72, Math.max(28, Math.floor(avail / m.charW) - 2));
    const ratio = (item.height || 1) / (item.width || 1);
    // rows = cols * (h/w) * fontRatio (validated against probe output)
    const rows = Math.round(cols * ratio * m.fontRatio);
    if (rows > 42) cols = Math.max(28, Math.round(42 / (ratio * m.fontRatio)));
    return cols;
  }

  function buildArtElement(matrix, title, caption) {
    const art = document.createElement("span");
    art.className = "terminal__art";
    art.setAttribute("role", "img");
    art.setAttribute("aria-label", title + " — " + caption);
    matrix.forEach(function (line, i) {
      let runCls = null;
      let runText = "";
      let runDirty = false;
      const flushRun = function () {
        if (!runDirty) return;
        runDirty = false;
        if (runCls) {
          const s = document.createElement("span");
          s.className = runCls;
          s.textContent = runText;
          art.appendChild(s);
        } else {
          art.appendChild(document.createTextNode(runText));
        }
      };
      line.forEach(function (cell) {
        const t = cell || { cls: null, ch: " " };
        if (runDirty && t.cls === runCls) {
          runText += t.ch;
          return;
        }
        flushRun();
        runCls = t.cls;
        runText = t.ch;
        runDirty = true;
      });
      flushRun();
      if (i < matrix.length - 1) art.appendChild(document.createTextNode("\n"));
    });
    return art;
  }

  function decodeGalleryImage(item, cols) {
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.decoding = "async";
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function () {
        reject(new Error("art: image failed to load"));
      };
      img.src = item.image;
    }).then(function (img) {
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(2, cols * 8);
      canvas.height = Math.max(2, Math.round((canvas.width * (item.height || 1)) / (item.width || 1)));
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return ctx.getImageData(0, 0, canvas.width, canvas.height);
    });
  }

  const ART_LETTER_RAMP = [" ", ".", ":", "i", "c", "o", "d", "p", "e", "0", "8", "M", "B", "Q"];

  function renderArt(item, cols) {
    return decodeGalleryImage(item, cols).then(function (imageData) {
      const m = artMetrics();
      const ratio = (item.height || 1) / (item.width || 1);
      const rows = Math.round(cols * ratio * m.fontRatio);
      const cellW = imageData.width / cols;
      const cellH = imageData.height / rows;
      const grid = [];
      for (let r = 0; r < rows; r++) {
        const row = [];
        const y0 = Math.floor(r * cellH);
        const y1 = Math.max(y0 + 1, Math.floor((r + 1) * cellH));
        for (let c = 0; c < cols; c++) {
          const x0 = Math.floor(c * cellW);
          const x1 = Math.max(x0 + 1, Math.floor((c + 1) * cellW));
          let sum = 0;
          let n = 0;
          for (let y = y0; y < y1; y++) {
            for (let x = x0; x < x1; x++) {
              const i = (y * imageData.width + x) * 4;
              sum += 0.2126 * imageData.data[i] + 0.7152 * imageData.data[i + 1] + 0.0722 * imageData.data[i + 2];
              n++;
            }
          }
          row.push(sum / n / 255);
        }
        grid.push(row);
      }
      const flat = [];
      grid.forEach(function (row) {
        row.forEach(function (v) {
          flat.push(v);
        });
      });
      flat.sort(function (a, b) {
        return a - b;
      });
      const at = function (p) {
        return flat[Math.min(flat.length - 1, Math.floor(p * flat.length))];
      };
      const lo = at(0.05);
      const hi = Math.max(at(0.95), lo + 1e-6);
      const matrix = grid.map(function (row) {
        return row.map(function (v) {
          const t = (v - lo) / (hi - lo);
          const ink = 1 - t;
          const idx = Math.max(0, Math.min(ART_LETTER_RAMP.length - 1, Math.round(ink * (ART_LETTER_RAMP.length - 1))));
          const ch = ART_LETTER_RAMP[idx];
          let cls = null;
          if (ch === " ") {
            return { cls: null, ch: " " };
          }
          cls = ink >= 0.62 ? "t3" : ink >= 0.32 ? "t2" : "t1";
          return { cls: cls, ch: ch };
        });
      });
      return buildArtElement(matrix, item.title, item.caption);
    });
  }

  /* ---------------- boot sequence ---------------- */

  const WELCOME = "Welcome to Kaushal's portfolio.";

  function runBoot() {
    if (booting === false) return;
    booting = false;

    addLine(WELCOME, true);
    addLine("Type 'help' to see available commands.", true);

    bootQueue.forEach(function (cmd) {
      dispatch(cmd);
    });
    bootQueue = [];
    input.focus({ preventScroll: true });
  }

  /* ---------------- AI assistant (Groq) ---------------- */

  function buildKnowledgeBase() {
    if (knowledgeBaseCache) return knowledgeBaseCache;
    const d = getData();
    if (!d) return "";
    knowledgeBaseCache = JSON.stringify(d);
    return knowledgeBaseCache;
  }

  function buildMessages(question) {
    return [
      { role: "system", content: AI_SYSTEM_PROMPT + "\n\nKNOWLEDGE BASE:\n" + buildKnowledgeBase() },
      { role: "user", content: question }
    ];
  }

  function handleAIResponse(r) {
    if (!r.ok) {
      let hint = "the AI request failed (" + r.status + ").";
      if (r.status === 401) hint = "the API key was rejected (401). Check the worker secret.";
      else if (r.status === 403) hint = "access denied (403). Check the worker ALLOWED_ORIGIN variable.";
      else if (r.status === 429) hint = "rate limit reached (429). Try again in a moment.";
      printLines(["ask: " + hint]);
      return null;
    }
    const content =
      r.body && r.body.choices && r.body.choices[0] && r.body.choices[0].message && r.body.choices[0].message.content;
    if (!content) {
      printLines(["ask: the AI returned an empty response. Try again."]);
      return null;
    }
    return content;
  }

  function renderAIResponse(content) {
    const lines = String(content).split(/\r?\n/);
    const aiLine = document.createElement("div");
    aiLine.className = "terminal__line";
    const aiPrefix = document.createElement("span");
    aiPrefix.className = "t-ai";
    aiPrefix.textContent = "AI:";
    aiLine.appendChild(aiPrefix);
    aiLine.appendChild(document.createTextNode(" " + esc(lines[0])));
    output.appendChild(aiLine);
    scrollToBottom();
    if (lines.length > 1) printMultiline(lines.slice(1).join("\n"), true);
    addLine("", true);
  }

  function handleAIError(err) {
    if (err && err.name === "AbortError") {
      printLines(["ask: the AI took too long to respond. Try again in a moment."]);
    } else {
      printLines(["ask: could not reach the AI (" + (err && err.message ? err.message : "network error") + ")."]);
    }
  }

  function askAI(question) {
    addLine("> " + esc(question), true);
    if (!aiConfigured) {
      printLines([
        "ask: the AI assistant is not configured yet.",
        "Set AI_CONFIG.proxyUrl in js/terminal.js (see the comment above)."
      ]);
      return;
    }
    const d = getData();
    if (!d) {
      printLines(["ask: portfolio data is not available right now. Try again in a moment."]);
      return;
    }

    printLines(["ask: consulting the knowledge base…"]);

    const controller = new AbortController();
    const timer = setTimeout(function () {
      controller.abort();
    }, AI_CONFIG.timeoutMs);

    const url = AI_CONFIG.proxyUrl || AI_CONFIG.endpoint;
    const headers = { "Content-Type": "application/json" };
    if (!AI_CONFIG.proxyUrl) headers.Authorization = "Bearer " + AI_CONFIG.apiKey;

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        model: AI_CONFIG.model,
        temperature: AI_CONFIG.temperature,
        messages: buildMessages(question)
      }),
      signal: controller.signal
    })
      .then(function (res) {
        return res.json().then(function (body) {
          return { ok: res.ok, status: res.status, body: body };
        });
      })
      .then(function (r) {
        const content = handleAIResponse(r);
        if (content) renderAIResponse(content);
      })
      .catch(handleAIError)
      .finally(function () {
        clearTimeout(timer);
        askInProgress = false;
      });
  }

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