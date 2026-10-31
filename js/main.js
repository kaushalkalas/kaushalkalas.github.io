/* ============================================================
   Kaushal Kalas — portfolio main
   Data-driven rendering + navigation + GSAP motion
   ============================================================ */

(function () {
  "use strict";

  const DATA_URL = "./js/data/portfolio.json";
  const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let data = null;

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------------- data load ---------------- */

  function loadData() {
    const controller = new AbortController();
    const timeout = setTimeout(function () {
      controller.abort();
    }, 5000);

    return fetch(DATA_URL, { signal: controller.signal })
      .then(function (res) {
        clearTimeout(timeout);
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .catch(function (err) {
        clearTimeout(timeout);
        console.error("Failed to load portfolio data:", err);
        throw err;
      });
  }

  /* ---------------- render helpers ---------------- */

  function tags(items) {
    return items.map(function (t) {
      return '<span class="tag">' + t + "</span>";
    }).join("");
  }

  function renderHero() {
    $("#hero-role").textContent = data.profile.title;
    $("#hero-tagline").textContent = data.profile.tagline;
    $("#hero-avatar").src = data.profile.avatar;
    $("#hero-avatar").alt = "Stylized monogram avatar of " + data.profile.name;
    $("#hero-resume").setAttribute("href", data.profile.resume.file);
    $("#hero-resume").setAttribute("download", data.profile.resume.label);
  }

  function renderAbout() {
    const body = $("#about-body");
    body.innerHTML = data.profile.about.map(function (p) {
      return "<p>" + p + "</p>";
    }).join("");
    $("#about-learning").textContent = data.profile.learning;
    $("#about-interests").innerHTML = tags(data.profile.interests);
  }

  function renderSkills() {
    const list = $("#skills-list");
    list.innerHTML = Object.keys(data.skills).map(function (cat) {
      return (
        '<div class="skill-cat">' +
        '<h3 class="skill-cat__name">' + cat + "</h3>" +
        '<div class="tags">' + tags(data.skills[cat]) + "</div>" +
        "</div>"
      );
    }).join("");
  }

  function projectCard(project, featured) {
    const meta = project.stack.slice(0, 3).join(" · ") + (project.year ? " · " + project.year : "");
    const links =
      '<a class="card__link" href="' + project.github + '" target="_blank" rel="noopener">GitHub →</a>' +
      (project.live ? '<a class="card__link" href="' + project.live + '" target="_blank" rel="noopener">Live demo →</a>' : "");
    return (
      '<article class="project-card' + (featured ? " project-card--featured" : "") + '">' +
      '<div class="card__meta">' +
      (featured ? '<span class="card__featured-tag">featured</span>' : "") +
      meta +
      "</div>" +
      '<h3 class="card__title">' + project.name + "</h3>" +
      '<p class="card__desc">' + project.description + "</p>" +
      '<div class="tags">' + tags(project.stack) + "</div>" +
      '<div class="card__links">' + links + "</div>" +
      "</article>"
    );
  }

  function renderProjects() {
    const featured = data.projects.filter(function (p) {
      return p.featured;
    });
    const rest = data.projects.filter(function (p) {
      return !p.featured;
    });
    $("#featured-projects").innerHTML = featured.map(function (p) {
      return '<div class="featured">' + projectCard(p, true) + "</div>";
    }).join("");
    $("#projects-grid").innerHTML = rest.map(function (p) {
      return projectCard(p, false);
    }).join("");
  }

  function renderEducation() {
    $("#education-list").innerHTML = data.education.map(function (e) {
      return (
        '<div class="entry">' +
        '<p class="entry__title">' + e.degree + "</p>" +
        '<p class="entry__org">' + e.institution + " · " + e.location + "</p>" +
        '<p class="entry__meta">' + e.timeline + "</p>" +
        '<p class="entry__desc">' + e.specialization + "</p>" +
        '<ul class="entry__list">' + e.highlights.map(function (h) {
          return "<li>" + h + "</li>";
        }).join("") + "</ul>" +
        "</div>"
      );
    }).join("");
  }

  function renderTraining() {
    $("#training-list").innerHTML = data.training.map(function (t) {
      return (
        '<div class="entry">' +
        '<p class="entry__title">' + t.title + "</p>" +
        '<p class="entry__org">' + t.organization + " · " + t.location + "</p>" +
        '<p class="entry__meta">' + t.timeline + "</p>" +
        '<ul class="entry__list">' + t.highlights.map(function (h) {
          return "<li>" + h + "</li>";
        }).join("") + "</ul>" +
        "</div>"
      );
    }).join("");
  }

  function renderExtracurricular() {
    $("#extracurricular-list").innerHTML = data.extracurricular.map(function (a) {
      const link = a.link
        ? '<div class="card__links"><a class="card__link" href="' + a.link + '" target="_blank" rel="noopener">Credential →</a></div>'
        : "";
      return (
        '<div class="entry">' +
        '<p class="entry__title">' + a.title + "</p>" +
        '<p class="entry__meta">' + a.issuer + " · " + a.date + "</p>" +
        '<p class="entry__desc">' + a.context + "</p>" +
        link +
        "</div>"
      );
    }).join("");
  }

  function renderGallery() {
    $("#gallery-grid").innerHTML = data.gallery.map(function (g, i) {
      const w = g.width || 640;
      const h = g.height || 480;
      return (
        '<figure class="gallery-item">' +
        '<button class="gallery-item__open" type="button" data-index="' + i + '" aria-label="Open image: ' + g.title + '">' +
        '<img src="' + g.image + '" alt="' + g.title + " — " + g.caption + '" loading="lazy" width="' + w + '" height="' + h + '" />' +
        "</button>" +
        '<figcaption class="gallery-item__caption">' +
        '<p class="gallery-item__title">' + g.title + "</p>" +
        '<p class="gallery-item__text">' + g.caption + "</p>" +
        "</figcaption>" +
        "</figure>"
      );
    }).join("");
  }

  /* ---------------- gallery lightbox ---------------- */

  function initLightbox() {
    const lightbox = $("#lightbox");
    const img = $("#lightbox-img");
    const caption = $("#lightbox-caption");
    if (!lightbox || !img || !caption || !data) return;

    const prevBtn = $("#lightbox-prev");
    const nextBtn = $("#lightbox-next");
    const closeBtn = $("#lightbox-close");
    let current = 0;
    let lastFocused = null;

    function show(index) {
      const items = data.gallery;
      current = (index + items.length) % items.length;
      const g = items[current];
      img.src = g.image;
      img.alt = g.title + " — " + g.caption;
      caption.textContent = g.title + " — " + g.caption;
    }

    function open(index, trigger) {
      lastFocused = trigger || document.activeElement;
      show(index);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }

    // Terminal `gallery <n>` ANSI art opens the lightbox through this hook.
    window.__GALLERY_API__ = { open: open };

    function close() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
      img.removeAttribute("src");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    document.addEventListener("click", function (e) {
      const opener = e.target.closest(".gallery-item__open");
      if (opener) {
        open(parseInt(opener.getAttribute("data-index"), 10) || 0, opener);
        return;
      }
      if (e.target.closest("[data-lightbox-close]")) close();
    });

    if (prevBtn) prevBtn.addEventListener("click", function () { show(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(current + 1); });
    if (closeBtn) closeBtn.addEventListener("click", close);

    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
    });
  }

  function renderContact() {
    const order = ["email", "github", "linkedin", "x"];
    $("#contact-list").innerHTML = order.map(function (key) {
      const c = data.contact[key];
      return (
        '<a class="contact-row" href="' + c.href + '"' + (key === "email" ? "" : ' target="_blank" rel="noopener"') + ">" +
        '<span class="contact-row__label">' + c.label + "</span>" +
        '<span class="contact-row__suffix">' + key + "</span>" +
        "</a>"
      );
    }).join("");

    $("#footer-links").innerHTML = ["github", "linkedin", "x", "email"].map(function (key) {
      const c = data.contact[key];
      return '<a href="' + c.href + '"' + (key === "email" ? "" : ' target="_blank" rel="noopener"') + ">" + key + "</a>";
    }).join("");
  }

  /* ---------------- eyebrow -> terminal command links ---------------- */

  function initEyebrowCommands() {
    const api = window.__TERMINAL_API__;
    let lastCmd = "";
    let lastTime = 0;

    $$("button.eyebrow[data-cmd]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const cmd = btn.getAttribute("data-cmd");
        if (!api) {
          const t = document.getElementById("terminal");
          if (t) t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
          return;
        }
        api.focusTerminal();
        const now = Date.now();
        if (cmd !== lastCmd || now - lastTime > 600) {
          lastCmd = cmd;
          lastTime = now;
          window.setTimeout(function () {
            api.run(cmd);
          }, reduceMotion ? 60 : 380);
        }
      });
    });
  }

  /* ---------------- resume availability ---------------- */

  function checkResume() {
    const btn = $("#hero-resume");
    fetch(data.profile.resume.file, { method: "HEAD" })
      .then(function (res) {
        if (!res.ok) throw new Error("unavailable");
        btn.classList.remove("is-disabled");
      })
      .catch(function () {
        btn.classList.add("is-disabled");
        btn.setAttribute("title", "Resume not available yet");
      });
  }

  /* ---------------- nav ---------------- */

  function initNav() {
    const sections = ["about", "skills", "projects", "education", "extracurricular", "gallery", "contact"];
    const links = $$(".nav__link");
    let ticking = false;

    function updateActive() {
      ticking = false;
      const probe = window.innerHeight * 0.35;
      let current = null;
      sections.forEach(function (id) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      });
      links.forEach(function (link) {
        const active = link.getAttribute("href") === "#" + current;
        link.classList.toggle("is-active", active);
      });
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateActive);
        }
      },
      { passive: true }
    );
    updateActive();

    const menuBtn = $("#menu-btn");
    const overlay = $("#menu-overlay");

    function closeMenu() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (!reduceMotion) {
        gsap.to(overlay, { opacity: 0, duration: 0.4, ease: EASE, onComplete: function () {} });
        gsap.to(".menu-overlay__link", { y: 12, opacity: 0, duration: 0.3, stagger: 0.03, ease: EASE });
      }
    }

    function openMenu() {
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      if (!reduceMotion) {
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: EASE });
        gsap.fromTo(
          ".menu-overlay__link",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: EASE, delay: 0.15 }
        );
      }
    }

    menuBtn.addEventListener("click", function () {
      overlay.classList.contains("is-open") ? closeMenu() : openMenu();
    });
    $$(".menu-overlay__link").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) closeMenu();
    });
  }

  /* ---------------- theme toggle ---------------- */

  function initTheme() {
    const btn = $("#theme-toggle");
    if (!btn) return;

    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    let stored = null;
    try {
      stored = localStorage.getItem("theme");
    } catch (e) {
      stored = null;
    }

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      const isLight = theme === "light";
      btn.setAttribute("aria-pressed", String(isLight));
      btn.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    }

    function current() {
      const t = root.getAttribute("data-theme");
      return t === "light" ? "light" : "dark";
    }

    apply(current());

    btn.addEventListener("click", function () {
      const next = current() === "light" ? "dark" : "light";
      apply(next);
      try {
        localStorage.setItem("theme", next);
        stored = next;
      } catch (e) {}
    });

    if (!stored) {
      try {
        mq.addEventListener("change", function (e) {
          apply(e.matches ? "light" : "dark");
        });
      } catch (e) {}
    }
  }

  /* ---------------- GSAP motion ---------------- */

  function getRevealTargets(section) {
    return gsap.utils
      .toArray(
        ".eyebrow, .section__title, .section__lede, .featured, .project-card, .skill-cat, .entry, .gallery-item, .contact-row, .about__body > p, .about__side > *",
        section
      )
      .filter(Boolean);
  }

  function initSectionReveals() {
    if (reduceMotion) return;
    if (typeof gsap === "undefined" || !gsap.ScrollTrigger) return;

    const revealDefaults = { y: 24, opacity: 0, duration: 0.4, ease: EASE };

    $$(".section").forEach(function (section) {
      const targets = getRevealTargets(section);
      if (!targets.length) return;
      gsap.from(targets, {
        ...revealDefaults,
        stagger: 0.04,
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          once: true
        }
      });
    });
  }

  function initMotion() {
    if (typeof gsap === "undefined") return;
    if (reduceMotion) return;

    initSectionReveals();
  }

  /* ---------------- boot ---------------- */

  document.addEventListener("DOMContentLoaded", function () {
    loadData()
      .then(function (json) {
        data = json;
        window.__PORTFOLIO_DATA__ = json;
        renderHero();
        renderAbout();
        renderSkills();
        renderProjects();
        renderEducation();
        renderTraining();
        renderExtracurricular();
        renderGallery();
        renderContact();
        initLightbox();
        checkResume();
        window.dispatchEvent(new CustomEvent("portfolio:data"));
        initMotion();
      })
      .catch(function () {
        /* data unavailable: page stays readable via static structure */
      });
    initNav();
    initTheme();
    initEyebrowCommands();
  });
})();