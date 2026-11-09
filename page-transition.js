(function () {
  const TRANSITION_DURATION = 420;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const appPath = window.location.pathname;
  const documentCache = new Map();
  let modeTransitionRunning = false;
  let queuedModeUpdate = null;
  let navigationRunning = false;
  let queuedNavigationUrl = null;

  function getMode(url = new URL(window.location.href)) {
    const params = url.searchParams;
    return {
      subject: params.get("subject") === "chemistry" ? "chemistry" : "russian",
      exam: params.get("exam") === "oge" ? "oge" : "ege",
    };
  }

  function canonicalUrl(mode) {
    const url = new URL(appPath, window.location.origin);
    url.search = `?subject=${mode.subject}&exam=${mode.exam}`;
    return url.href;
  }

  function targetDocument(mode) {
    return `${mode.subject === "chemistry" ? "index.html" : "russian.html"}?exam=${mode.exam}`;
  }

  async function getDocument(url) {
    if (!documentCache.has(url)) {
      documentCache.set(url, fetch(url, { credentials: "same-origin" }).then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${url}`);
        return response.text();
      }).then((html) => new DOMParser().parseFromString(html, "text/html")));
    }
    return documentCache.get(url);
  }

  function preloadImages(doc) {
    return Promise.all([...doc.images].map((image) => new Promise((resolve) => {
      const source = image.getAttribute("src");
      if (!source) return resolve();
      const preload = new Image();
      preload.onload = preload.onerror = resolve;
      preload.src = new URL(source, window.location.href).href;
    })));
  }

  function preloadStaticResources(doc) {
    const urls = [
      ...[...doc.querySelectorAll('link[rel="stylesheet"]')].map((link) => link.getAttribute("href")),
      ...[...doc.body.querySelectorAll("script[src]")].map((script) => script.getAttribute("src")),
    ].filter(Boolean);
    return Promise.all(urls.map((url) => fetch(new URL(url, window.location.href), { credentials: "same-origin" }).catch(() => undefined)));
  }

  function updateStyles(doc) {
    document.querySelectorAll("link[data-router-style]").forEach((link) => link.remove());
    const existing = new Set([...document.querySelectorAll('link[rel="stylesheet"]')].map((link) => link.href));
    const pending = [];
    doc.head.querySelectorAll('link[rel="stylesheet"]').forEach((source) => {
      const href = new URL(source.getAttribute("href"), window.location.href).href;
      if (existing.has(href) || /styles\.css(?:\?|$)/.test(href)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.routerStyle = "true";
      pending.push(new Promise((resolve) => {
        link.onload = link.onerror = resolve;
      }));
      document.head.append(link);
    });
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      if (/russian(?:-overrides)?\.css(?:\?|$)/.test(link.href) && !doc.querySelector(`link[href*="${link.href.split("/").pop().split("?")[0]}"]`)) link.remove();
    });
    return Promise.all(pending);
  }

  async function runPageScripts(doc) {
    const scripts = [...doc.body.querySelectorAll("script[src]")]
      .map((script) => new URL(script.getAttribute("src"), window.location.href).href)
      .filter((src) => !src.includes("page-transition.js"));
    await Promise.all(scripts.map(async (src) => {
      const response = await fetch(src, { credentials: "same-origin" });
      if (!response.ok) throw new Error(`Unable to load ${src}`);
      new Function(await response.text())();
    }));
  }

  function revealLoader() {
    const loader = document.querySelector(".site-loader");
    if (!loader) return;
    let isRevealed = false;
    const finishReveal = () => {
      if (isRevealed) return;
      isRevealed = true;
      loader.remove();
      window.dispatchEvent(new Event("site-ready"));
    };

    document.body.classList.add("site-ready");
    loader.addEventListener("transitionend", finishReveal, { once: true });
    window.setTimeout(finishReveal, 700);
  }

  async function mount(mode, { initial = false, doc = null } = {}) {
    doc = doc || await getDocument(targetDocument(mode));
    await updateStyles(doc);
    const body = doc.body.cloneNode(true);
    body.querySelectorAll("script").forEach((script) => script.remove());
    if (!initial) body.querySelector(".site-loader")?.remove();
    const transitionClasses = [...document.body.classList]
      .filter((className) => className === "mode-transition-out" || className === "mode-transition-in" || className.startsWith("subject-transition"));
    document.body.className = [...body.classList, ...transitionClasses].join(" ");
    document.body.innerHTML = body.innerHTML;
    document.title = doc.title;
    document.documentElement.dataset.russianExam = mode.exam;
    window.__appRouterLoading = initial;
    await runPageScripts(doc);
    await preloadImages(doc);
    window.__appRouterLoading = false;
    if (initial) revealLoader();
  }

  async function navigate(url) {
    if (!url) return;
    if (navigationRunning) {
      queuedNavigationUrl = url;
      return;
    }
    const mode = getMode(new URL(url, window.location.href));
    const current = getMode();
    if (mode.subject === current.subject) {
      window.history.replaceState(null, "", canonicalUrl(mode));
      return;
    }
    navigationRunning = true;
    try {
      const doc = await getDocument(targetDocument(mode));
      await Promise.all([preloadImages(doc), preloadStaticResources(doc)]);
      document.body.classList.add("subject-transition-active", `subject-to-${mode.subject}`);
      await runAsyncModeTransition(() => mount(mode, { doc }));
      window.history.replaceState(null, "", canonicalUrl(mode));
    } catch (error) {
      console.error(error);
      window.location.assign(url);
    } finally {
      document.body.classList.remove("subject-transition-active", "subject-to-chemistry", "subject-to-russian");
      navigationRunning = false;
      const nextUrl = queuedNavigationUrl;
      queuedNavigationUrl = null;
      if (nextUrl) navigate(nextUrl);
    }
  }

  window.navigateWithTransition = navigate;
  function startModeTransition(update) {
    modeTransitionRunning = true;
    document.body.classList.add("mode-transition-out");
    window.setTimeout(() => {
      update();
      document.body.classList.remove("mode-transition-out");
      document.body.classList.add("mode-transition-in");
      window.setTimeout(() => {
        document.body.classList.remove("mode-transition-in");
        modeTransitionRunning = false;
        const nextUpdate = queuedModeUpdate;
        queuedModeUpdate = null;
        if (nextUpdate) window.runModeTransition(nextUpdate);
      }, 720);
    }, TRANSITION_DURATION);
  }

  window.runModeTransition = (update) => {
    if (typeof update !== "function") return;
    if (reduceMotion) {
      update();
      return;
    }
    if (modeTransitionRunning) {
      queuedModeUpdate = update;
      return;
    }
    startModeTransition(update);
  };

  async function runAsyncModeTransition(update) {
    if (reduceMotion) {
      await update();
      return;
    }
    document.body.classList.add("mode-transition-out");
    await new Promise((resolve) => window.setTimeout(resolve, TRANSITION_DURATION));
    await update();
    document.body.classList.remove("mode-transition-out");
    document.body.classList.add("mode-transition-in");
    await new Promise((resolve) => window.setTimeout(() => {
      document.body.classList.remove("mode-transition-in");
      resolve();
    }, 720));
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
    const url = new URL(link.href, window.location.href);
    if (!/(index|russian)\.html$/.test(url.pathname) || url.origin !== window.location.origin) return;
    event.preventDefault();
    navigate(url.href);
  });

  window.addEventListener("load", async () => {
    const mode = window.__initialMode || getMode();
    const pageIsRussian = document.body.classList.contains("russian-page");
    const modeIsRussian = mode.subject === "russian";
    if (pageIsRussian !== modeIsRussian) {
      try {
        await mount(mode, { initial: true });
        window.history.replaceState(null, "", canonicalUrl(mode));
      } catch (error) {
        console.error(error);
      }
    }
    [
      { subject: "chemistry", exam: "ege" },
      { subject: "chemistry", exam: "oge" },
      { subject: "russian", exam: "oge" },
    ]
      .filter((target) => target.subject !== mode.subject || target.exam !== mode.exam)
      .forEach((target) => getDocument(targetDocument(target)).then((doc) => Promise.all([
        preloadImages(doc),
        preloadStaticResources(doc),
      ])).catch(() => undefined));
  }, { once: true });
})();
