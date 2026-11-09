const PRICING_TITLES = {
  "ОГЭ": "Цена занятий по программе ОГЭ (8-9 класс)",
  "ЕГЭ": "Цена занятий по программе ЕГЭ (10-11 класс)",
};

const PRICING_PAYMENT_LINKS = {
  "ОГЭ": {
    // Public checkout URL used by the supplied widget script (id=1632454).
    lessons24: "https://cationschool.online/pl/lite/widget/widget?id=1632454",
    // The supplied embed code for this widget points to payment widget 1632451.
    lessons8: "https://cationschool.online/pl/lite/widget/widget?id=1632451",
    // Until a dedicated checkout widget is supplied, route the 4-lesson request to contacts.
    lessons4: "#contact",
  },
  "ЕГЭ": {
    lessons24: "https://cationschool.online/pl/lite/widget/widget?id=1632450",
    lessons8: "https://cationschool.online/pl/lite/widget/widget?id=1632447",
    lessons4: "#contact",
  },
};

const PRICING_CARD_TEMPLATES = {
  "ОГЭ": `
  <article class="pricing-card">
    <ul>
      <li>Уроки 2 раза в неделю по 1,5 часа</li>
      <li>Домашние задания с проверкой и разбором ошибок</li>
      <li>Авторские рабочие тетради</li>
      <li>Средняя цена занятия 490 ₽</li>
      <li>Пробник каждый месяц</li>
      <li>Учебный чат с оперативными ответами на вопросы</li>
      <li>Личный учебный чат с Алексом</li>
      <li>Чаты с мотивацией и поддержкой</li>
    </ul>
    <span class="price-bubble">Средняя цена<br>занятия<br>490 ₽</span>
    <div class="prices">
      <p><strong>17 000₽</strong> / 24 урока</p>
      <p><strong>5 900₽</strong> / 8 уроков</p>
      <p><strong>2 950₽</strong> / 4 урока</p>
    </div>
    <div class="pricing-actions">
      <a class="pink-btn pricing-pay-link" data-payment-plan="lessons24" rel="noopener noreferrer">Оплатить 24 урока →</a>
      <a class="pink-btn outline-pay pricing-pay-link" data-payment-plan="lessons8" rel="noopener noreferrer">Оплатить 8 уроков →</a>
      <a class="pink-btn outline-pay pricing-pay-link" data-payment-plan="lessons4" rel="noopener noreferrer">Оплатить 4 урока →</a>
    </div>
  </article>
`,
  "ЕГЭ": `
  <article class="pricing-card">
    <ul>
      <li>2 урока по 2 часа в неделю</li>
      <li>Домашние задания с проверкой и разбором ошибок</li>
      <li>Авторские рабочие тетради</li>
      <li>Пробник каждый месяц</li>
      <li>Учебный чат с оперативными ответами на вопросы</li>
      <li>Личный учебный чат с Алексом</li>
      <li>Чаты с мотивацией и поддержкой</li>
    </ul>
    <span class="price-bubble">Средняя цена<br>занятия<br>400 ₽</span>
    <div class="prices">
      <p><strong>22 900₽</strong> / 24 урока</p>
      <p><strong>7 900₽</strong> / 8 уроков</p>
      <p><strong>3 950₽</strong> / 4 урока</p>
    </div>
    <div class="pricing-actions">
      <a class="pink-btn pricing-pay-link" data-payment-plan="lessons24" rel="noopener noreferrer">Оплатить 24 урока →</a>
      <a class="pink-btn outline-pay pricing-pay-link" data-payment-plan="lessons8" rel="noopener noreferrer">Оплатить 8 уроков →</a>
      <a class="pink-btn outline-pay pricing-pay-link" data-payment-plan="lessons4" rel="noopener noreferrer">Оплатить 4 урока →</a>
    </div>
  </article>
`,
};

let chemistryTickerExam = "ЕГЭ";

function renderTicker(ticker, text, label) {
  const itemText = `◦ ${text}`;
  const measure = document.createElement("span");
  measure.className = "ticker-item";
  measure.textContent = itemText;
  measure.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap";
  ticker.append(measure);
  const itemWidth = measure.getBoundingClientRect().width;
  measure.remove();

  // One group is always wider than the viewport, so its duplicate meets it without a gap.
  const repetitions = Math.max(2, Math.ceil((ticker.clientWidth + itemWidth) / itemWidth));
  if (ticker.dataset.tickerText === text && Number(ticker.dataset.tickerRepetitions) >= repetitions) return;

  const items = `<span class="ticker-item">${itemText}</span>`.repeat(repetitions);
  const group = `<div class="ticker-group" aria-hidden="true">${items}</div>`;
  ticker.innerHTML = `<div class="ticker-track" aria-label="${label}">${group}${group}</div>`;
  ticker.dataset.tickerText = text;
  ticker.dataset.tickerRepetitions = String(repetitions);
}

function normalizeTickers(selectedExam = "ЕГЭ") {
  chemistryTickerExam = selectedExam;
  const examText = selectedExam === "ОГЭ" ? "ОГЭ ПО ХИМИИ 2027" : "ЕГЭ ПО ХИМИИ 2027";
  const text = `${examText} ◦ АЛЕКС МЕНДЕЛЕЕВ`;

  document.querySelectorAll(".ticker").forEach((ticker) => {
    renderTicker(ticker, text, `Подготовка к ${selectedExam} по химии`);
  });
}

let chemistryTickerResizeFrame;
window.addEventListener("resize", () => {
  window.cancelAnimationFrame(chemistryTickerResizeFrame);
  chemistryTickerResizeFrame = window.requestAnimationFrame(() => normalizeTickers(chemistryTickerExam));
});

document.fonts?.ready.then(() => normalizeTickers(chemistryTickerExam));

function restoreFaqItems() {
  const faqGrid = document.querySelector(".faq-grid");
  if (!faqGrid) {
    return;
  }

  faqGrid.innerHTML = `
    <details><summary>Я ничего не знаю по химии, подойдёт ли курс для занятий с 0?</summary><p>Да, курс начинается с базы и подойдёт для подготовки с нуля.</p></details>
    <details><summary>Не знаю, смогу ли присутствовать на всех занятиях онлайн. Что делать?</summary><p>Все занятия сохраняются в записи.</p></details>
    <details><summary>Обязательно ли делать домашние задания?</summary><p>Да, домашние задания помогают закреплять материал.</p></details>
    <details><summary>Где проходит курс?</summary><p>Курс проходит в онлайн-формате.</p></details>
    <details><summary>Оплатил курс и не могу зайти. Как быть?</summary><p>Напишите в поддержку - мы поможем войти в личный кабинет.</p></details>
    <details><summary>Александр Менделеев самый крутой препод в мире?</summary><p>Ученики говорят, что да :)</p></details>
  `;
}

function setupSideNav() {
  const navLinks = [...document.querySelectorAll(".side-nav a")];
  if (!navLinks.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-40% 0px -52% 0px" }
  );

  document
    .querySelectorAll("main section[id]")
    .forEach((section) => observer.observe(section));
}

function setupDialog() {
  const dialog = document.querySelector("dialog");
  const trigger = document.querySelector(".consultation-trigger");
  const closeButton = document.querySelector(".dialog-close");
  const form = dialog?.querySelector("form");

  if (!dialog || !closeButton || !form) {
    return null;
  }

  const openDialog = () => dialog.showModal();

  if (trigger) {
    trigger.addEventListener("click", openDialog);
  }

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const insideDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!insideDialog) {
      dialog.close();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.innerHTML = "<strong>Спасибо! Заявка отправлена.</strong>";
  });

  return openDialog;
}

function setupMobileMenu() {
  const burger = document.querySelector(".hamburger");
  const menu = document.querySelector("#mobile-menu");
  const backdrop = document.querySelector(".mobile-menu-backdrop");

  if (!burger || !menu || !backdrop) {
    return;
  }

  let hideTimer = null;

  const setExpanded = (expanded) => {
    burger.setAttribute("aria-expanded", String(expanded));
    burger.classList.toggle("is-active", expanded);
    document.body.classList.toggle("menu-open", expanded);
  };

  const openMenu = () => {
    clearTimeout(hideTimer);
    backdrop.hidden = false;
    menu.hidden = false;

    requestAnimationFrame(() => {
      backdrop.classList.add("is-open");
      menu.classList.add("is-open");
      setExpanded(true);
    });
  };

  const closeMenu = () => {
    backdrop.classList.remove("is-open");
    menu.classList.remove("is-open");
    setExpanded(false);

    hideTimer = window.setTimeout(() => {
      backdrop.hidden = true;
      menu.hidden = true;
    }, 240);
  };

  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener("click", closeMenu);

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800 && burger.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });
}

function renderPricing(selectedExam) {
  const pricing = document.querySelector("#exams");
  if (!pricing) {
    return;
  }

  const title = PRICING_TITLES[selectedExam] || PRICING_TITLES["ЕГЭ"];
  const paymentLinks =
    PRICING_PAYMENT_LINKS[selectedExam] || PRICING_PAYMENT_LINKS["ЕГЭ"];

  const cardTemplate =
    PRICING_CARD_TEMPLATES[selectedExam] || PRICING_CARD_TEMPLATES["ЕГЭ"];

  pricing.innerHTML = `<h2>${title}</h2>${cardTemplate}`;
  pricing.hidden = false;
  pricing.setAttribute("aria-hidden", "false");

  pricing.querySelectorAll("[data-payment-plan]").forEach((link) => {
    const plan = link.dataset.paymentPlan;
    const paymentLink = paymentLinks[plan];

    if (paymentLink) {
      link.hidden = false;
      link.href = paymentLink;
      if (paymentLink.startsWith("#")) {
        link.removeAttribute("target");
      } else {
        link.target = "_blank";
      }
      link.removeAttribute("aria-disabled");
    } else {
      link.hidden = true;
      link.removeAttribute("href");
      link.removeAttribute("target");
      link.setAttribute("aria-disabled", "true");
    }

    // A missing payment URL must never fall back to a `#` navigation.
    link.addEventListener("click", (event) => {
      if (!paymentLink) {
        event.preventDefault();
      }
    });
  });
}

function setupPricing() {
  const pricing = document.querySelector("#exams");

  if (!pricing) {
    return;
  }

  renderPricing("ЕГЭ");
}

function setExamContent(selectedExam) {
  document.querySelectorAll("[data-exam-content]").forEach((element) => {
    element.hidden = element.dataset.examContent !== selectedExam;
  });

  normalizeTickers(selectedExam);
}

function setupModeSelectors() {
  const selectors = [...document.querySelectorAll(".hero-select")];
  const modeControl = document.querySelector("[data-mode-control]");
  const modeTrigger = modeControl?.querySelector(".exam-mode-trigger");
  const modeMenu = modeControl?.querySelector(".exam-mode-menu");
  const modeExam = modeControl?.querySelector("[data-mode-exam]");
  const modeSubject = modeControl?.querySelector("[data-mode-subject]");
  let activeExam = new URLSearchParams(window.location.search).get("exam") === "oge" ? "ОГЭ" : "ЕГЭ";
  let subjectNavigationTimer = 0;

  if (!selectors.length) {
    return;
  }

  const updateChemistryMode = (exam, { animate = false } = {}) => {
    const apply = () => {
      activeExam = exam;
      const examKey = exam === "ОГЭ" ? "oge" : "ege";
      document.querySelectorAll('.hero-select[data-select="exam"] [data-choice]').forEach((choice) => {
        choice.textContent = exam;
      });
      document.querySelectorAll("[data-hero-exam]").forEach((heading) => { heading.textContent = exam; });
      if (modeExam) modeExam.textContent = exam;
      if (modeSubject) modeSubject.textContent = "Химия";
      modeMenu?.querySelectorAll("[data-mode]").forEach((option) => {
        option.setAttribute("aria-selected", String(option.dataset.mode === `${examKey}-chemistry`));
      });
      setExamContent(exam);
      renderPricing(exam);
      const url = new URL(window.location.href);
      url.search = `?subject=chemistry&exam=${examKey}`;
      window.history.replaceState(null, "", url);
    };

    if (animate && window.runModeTransition) window.runModeTransition(apply);
    else apply();
  };

  updateChemistryMode(activeExam);

  const closeHeaderMode = () => {
    modeControl?.classList.remove("is-open");
    modeTrigger?.setAttribute("aria-expanded", "false");
    if (modeMenu) modeMenu.hidden = true;
  };

  const closeAll = () => {
    closeHeaderMode();
    selectors.forEach((selector) => {
      selector.classList.remove("is-open");
      selector.querySelector(".hero-select__trigger")?.setAttribute("aria-expanded", "false");
    });
  };

  const navigateToSubject = (url) => {
    window.clearTimeout(subjectNavigationTimer);
    subjectNavigationTimer = window.setTimeout(() => {
      if (window.navigateWithTransition) window.navigateWithTransition(url);
      else window.location.href = url;
    }, 140);
  };

  selectors.forEach((selector) => {
    const type = selector.dataset.select;
    if (type === "exam") selector.dataset.active = activeExam;
    const trigger = selector.querySelector(".hero-select__trigger");
    const options = [...selector.querySelectorAll("[data-value]")];
    let switchTimer = 0;
    const applyChoice = (selected, { animate = false } = {}) => {
      const changed = selector.dataset.active !== selected;
      if (animate && changed) {
        window.clearTimeout(switchTimer);
        selector.classList.add("is-switching");
        switchTimer = window.setTimeout(() => selector.classList.remove("is-switching"), 260);
      }
      selector.dataset.active = selected;
      options.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.value === selected)));
      selector.classList.toggle("is-right", selected === (type === "exam" ? "ЕГЭ" : "РУССКИЙ"));
      document.querySelectorAll("[data-hero-exam]").forEach((heading) => {
        heading.textContent = activeExam;
      });
    };

    trigger?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const selected = selector.dataset.active;
      const next = type === "exam" ? (selected === "ЕГЭ" ? "ОГЭ" : "ЕГЭ") : (selected === "ХИМИЯ" ? "РУССКИЙ" : "ХИМИЯ");
      const option = options.find((button) => button.dataset.value === next);
      option?.click();
    });

    options.forEach((button) => {
      button.addEventListener("click", () => {
        const selected = button.dataset.value;
        if (type === "subject") window.clearTimeout(subjectNavigationTimer);
        applyChoice(selected, { animate: true });

        if (type === "exam") {
          updateChemistryMode(selected, { animate: true });
        } else {
          if (selected === "РУССКИЙ") {
            const examKey = activeExam === "ОГЭ" ? "oge" : "ege";
            navigateToSubject(`russian.html?exam=${examKey}`);
            closeAll();
            return;
          }
        }

        closeAll();
      });
    });
    applyChoice(selector.dataset.active);
  });

  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAll();
    }
  });

  const selectHeaderMode = (value) => {
    const [examKey, subject] = value.split("-");
    const exam = examKey === "oge" ? "ОГЭ" : "ЕГЭ";
    if (subject === "chemistry") {
      updateChemistryMode(exam, { animate: true });
      closeHeaderMode();
      return;
    }

    const url = `russian.html?exam=${examKey}`;
    if (window.navigateWithTransition) window.navigateWithTransition(url);
    else window.location.href = url;
  };

  modeTrigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    const opens = !modeControl.classList.contains("is-open");
    closeAll();
    modeControl.classList.toggle("is-open", opens);
    modeTrigger.setAttribute("aria-expanded", String(opens));
    if (modeMenu) modeMenu.hidden = !opens;
  });

  modeMenu?.querySelectorAll("[data-mode]").forEach((option) => {
    option.addEventListener("click", () => selectHeaderMode(option.dataset.mode));
  });
}

function setupSiteLoader() {
  if (window.__appRouterLoading) return;
  const loader = document.querySelector(".site-loader");
  if (!loader) {
    return;
  }

  if (document.documentElement.classList.contains("page-transition-incoming")) {
    loader.remove();
    document.body.classList.add("site-ready");
    window.dispatchEvent(new Event("site-ready"));
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealSite = () => {
    const revealDelay = document.documentElement.classList.contains("page-transition-incoming")
      ? 0
      : reduceMotion
        ? 0
        : 750;
    window.setTimeout(() => {
      let isRevealed = false;
      const finishReveal = () => {
        if (isRevealed) {
          return;
        }

        isRevealed = true;
        loader.remove();
        window.dispatchEvent(new Event("site-ready"));
      };

      document.body.classList.add("site-ready");
      loader.addEventListener("transitionend", finishReveal, { once: true });
      window.setTimeout(finishReveal, 700);
    }, revealDelay);
  };

  if (document.readyState === "complete") {
    revealSite();
  } else {
    window.addEventListener("load", revealSite, { once: true });
  }
}

function setupWelcomeHint() {
  const overlay = document.querySelector(".exam-guide-overlay");
  const hint = document.querySelector(".exam-guide-tooltip");

  if (!overlay || !hint) {
    return;
  }

  let hasShown = false;
  let hideTimer = 0;
  let cleanupTimer = 0;
  const hideHint = () => {
    window.clearTimeout(hideTimer);
    window.clearTimeout(cleanupTimer);
    document.body.classList.remove("exam-guide-active");
    document.body.classList.add("exam-guide-closing");
    cleanupTimer = window.setTimeout(() => {
      overlay.hidden = true;
      hint.hidden = true;
      document.body.classList.remove("exam-guide-closing");
    }, 1000);
  };

  const showHint = () => {
    if (hasShown) {
      return;
    }

    hasShown = true;
    document.body.classList.remove("exam-guide-closing");
    overlay.hidden = false;
    hint.hidden = false;

    requestAnimationFrame(() => {
      document.body.classList.add("exam-guide-active");
    });

    hideTimer = window.setTimeout(hideHint, 2000);
  };

  document.addEventListener("click", (event) => {
    if (
      document.body.classList.contains("exam-guide-active") &&
      !event.target.closest(".hero-heading-guide")
    ) {
      hideHint();
    }
  }, true);
  window.addEventListener("site-ready", showHint, { once: true });
  if (document.body.classList.contains("site-ready")) {
    showHint();
  }
}

normalizeTickers();
restoreFaqItems();
setupSideNav();
setupDialog();
setupMobileMenu();
setupPricing();
setupModeSelectors();
setupWelcomeHint();
setupSiteLoader();
