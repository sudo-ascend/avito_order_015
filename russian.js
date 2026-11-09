const RUSSIAN_PRICING = {
  "ЕГЭ": {
    title: "Стоимость подготовки к ЕГЭ",
    lessons: [
      "2 урока по 1,5 часа в неделю",
      "Домашние задания с проверкой и разбором ошибок",
      "Авторские конспекты",
      "Пробник каждый месяц",
      "Учебный чат с оперативными ответами на вопросы",
      "Личный учебный чат с Викторией",
      "Чаты с мотивацией и поддержкой",
    ],
    averagePrice: "590 ₽",
    plans: [
      { price: "20 000 ₽", lessons: "24 урока" },
      { price: "6 900 ₽", lessons: "8 уроков" },
      { price: "3 450 ₽", lessons: "4 урока" },
    ],
    buttonLabels: ["Оплатить 24 урока →", "Оплатить 8 уроков →", "Оплатить 4 урока →"],
  },
  "ОГЭ": {
    title: "Стоимость подготовки к ОГЭ",
    lessons: [
      "Уроки онлайн с Алисой Дмитриевной",
      "Домашние задания с проверкой",
      "Авторские материалы и конспекты",
      "Личный чат и поддержка между уроками",
      "Средняя оценка учеников на ОГЭ — 4,82",
    ],
    averagePrice: "590 ₽",
    plans: [
      { price: "17 000 ₽", lessons: "24 урока" },
      { price: "5 900 ₽", lessons: "8 уроков" },
      { price: "2 950 ₽", lessons: "4 урока" },
    ],
    buttonLabels: ["Записаться на 24 урока →", "Записаться на 8 уроков →", "Записаться на 4 урока →"],
  },
};

const RUSSIAN_PROFILES = {
  "ЕГЭ": {
    name: "ВИКТОРИЯ ИГОРЕВНА",
    displayName: "Виктория Игоревна",
    title: "Кто такая<br>Виктория Игоревна",
    heroPhoto: "assets/russian-teacher-victoria-hero.png",
    aboutPhoto: "assets/russian-teacher-victoria-about.webp",
    consultationPhoto: "assets/russian-teacher-victoria-about.webp",
    heroAlt: "Виктория Игоревна, преподаватель русского языка",
    aboutAlt: "Виктория Игоревна",
    facts: [
      "Сдала ЕГЭ по русскому языку на 100 баллов",
      "Окончила МГУ им. Ломоносова",
      "Более 500 учеников",
    ],
    aboutFacts: [
      "Окончила МГУ им. Ломоносова по профилю «Журналистика»",
      "Сдала ЕГЭ по русскому языку на 100 баллов",
      "Преподавательский стаж более 12 лет",
      "Более 500 учеников уже прошли подготовку со мной",
      "Средний балл ЕГЭ — 80,4",
    ],
  },
  "ОГЭ": {
    name: "АЛИСА ДМИТРИЕВНА",
    displayName: "Алиса Дмитриевна",
    title: "Кто такая<br>Алиса Дмитриевна",
    heroPhoto: "assets/russian-teacher-alice-hero.webp",
    aboutPhoto: "assets/russian-teacher-alice-about.webp",
    consultationPhoto: "assets/russian-teacher-alice-hero.webp",
    heroAlt: "Алиса Дмитриевна, преподаватель русского языка",
    aboutAlt: "Алиса Дмитриевна",
    facts: [
      "Сдала ЕГЭ по русскому языку на 100 баллов",
      "Окончила РАНХиГС при Президенте РФ по профилю «Журналистика»",
      "Более 600 учеников прошли подготовку со мной",
    ],
    aboutFacts: [
      "Окончила РАНХиГС при Президенте РФ по профилю «Журналистика»",
      "Сдала ЕГЭ по русскому языку на 100 баллов",
      "Преподавательский стаж более 8 лет",
      "Более 600 учеников прошли подготовку со мной",
      "Средняя оценка ОГЭ — 4,82",
    ],
  },
};

const dialog = document.querySelector("dialog");
const trigger = document.querySelector(".consultation-trigger");
const close = document.querySelector(".dialog-close");
const form = dialog?.querySelector("form");
trigger?.addEventListener("click", () => dialog.showModal());
close?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
form?.addEventListener("submit", (event) => { event.preventDefault(); form.innerHTML = "<strong>Спасибо! Заявка отправлена.</strong>"; });

const menuButton = document.querySelector(".hamburger");
const mobileMenu = document.querySelector("#mobile-menu");
const menuBackdrop = document.querySelector(".mobile-menu-backdrop");
let menuHideTimer;

function setRussianMenuOpen(open) {
  menuButton?.setAttribute("aria-expanded", String(open));
  menuButton?.classList.toggle("is-active", open);
  document.body.classList.toggle("menu-open", open);
}

function closeRussianMenu() {
  if (!mobileMenu || !menuBackdrop) return;
  mobileMenu.classList.remove("is-open");
  menuBackdrop.classList.remove("is-open");
  setRussianMenuOpen(false);
  window.clearTimeout(menuHideTimer);
  menuHideTimer = window.setTimeout(() => {
    mobileMenu.hidden = true;
    menuBackdrop.hidden = true;
  }, 240);
}

function openRussianMenu() {
  if (!mobileMenu || !menuBackdrop) return;
  window.clearTimeout(menuHideTimer);
  mobileMenu.hidden = false;
  menuBackdrop.hidden = false;
  requestAnimationFrame(() => {
    mobileMenu.classList.add("is-open");
    menuBackdrop.classList.add("is-open");
    setRussianMenuOpen(true);
  });
}

menuButton?.addEventListener("click", () => {
  if (menuButton.getAttribute("aria-expanded") === "true") closeRussianMenu();
  else openRussianMenu();
});
menuBackdrop?.addEventListener("click", closeRussianMenu);
mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeRussianMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") closeRussianMenu();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 800 && menuButton?.getAttribute("aria-expanded") === "true") closeRussianMenu();
});

function renderRussianPricing(exam) {
  const pricing = document.querySelector("#exams");
  const content = RUSSIAN_PRICING[exam];
  if (!pricing || !content) return;
  const plans = content.plans
    .map((plan) => `<p><strong>${plan.price}</strong> / ${plan.lessons}</p>`)
    .join("");
  const actions = content.buttonLabels
    .map(
      (label, index) =>
        `<a class="pink-btn${index ? " outline-pay" : ""}" href="#contact">${label}</a>`
    )
    .join("");

  pricing.innerHTML = `<h2>${content.title}</h2><article class="pricing-card"><ul>${content.lessons.map((lesson) => `<li>${lesson}</li>`).join("")}</ul><span class="price-bubble">Средняя цена<br>занятия<br><b>${content.averagePrice}</b></span><div class="prices">${plans}</div><div class="pricing-actions">${actions}</div></article>`;
}

let russianTickerExam = "ЕГЭ";

function renderRussianTicker(ticker, text, label) {
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

function renderRussianTickers(exam) {
  russianTickerExam = exam;
  const profile = RUSSIAN_PROFILES[exam];
  const text = `${exam} ПО РУССКОМУ 2027 ◦ ${profile.name}`;

  document.querySelectorAll(".ticker").forEach((ticker) => {
    renderRussianTicker(ticker, text, `Подготовка к ${exam} по русскому языку`);
  });
}

let russianTickerResizeFrame;
window.addEventListener("resize", () => {
  window.cancelAnimationFrame(russianTickerResizeFrame);
  russianTickerResizeFrame = window.requestAnimationFrame(() => renderRussianTickers(russianTickerExam));
});

document.fonts?.ready.then(() => renderRussianTickers(russianTickerExam));

function setRussianExam(exam) {
  document.documentElement.dataset.russianExam = exam === "ОГЭ" ? "oge" : "ege";
  const profile = RUSSIAN_PROFILES[exam];
  document.querySelectorAll("[data-russian-exam]").forEach((element) => { element.hidden = element.dataset.russianExam !== exam; });
  document.querySelectorAll("[data-russian-review-title], [data-russian-review-grid]").forEach((element) => {
    const value = element.dataset.russianReviewTitle || element.dataset.russianReviewGrid;
    element.hidden = value !== exam;
  });
  document.querySelectorAll("[data-russian-header-exam]").forEach((element) => { element.textContent = exam; });
  const heroDescription = document.querySelector("[data-russian-hero-description]");
  if (heroDescription) heroDescription.innerHTML = exam === "ЕГЭ" ? "С нуля выстроим сильную<br>базу по русскому языку" : "С нуля выстроим уверенную<br>базу для ОГЭ по русскому";
  const teacherName = document.querySelector("[data-russian-teacher-name]");
  if (teacherName) teacherName.textContent = profile.name;
  const heroFacts = document.querySelector("[data-russian-hero-facts]");
  if (heroFacts) heroFacts.innerHTML = profile.facts.map((fact) => `<li>${fact}</li>`).join("");
  const aboutTitle = document.querySelector("[data-russian-about-title]");
  if (aboutTitle) aboutTitle.innerHTML = profile.title;
  const aboutFacts = document.querySelector("[data-russian-about-facts]");
  if (aboutFacts) aboutFacts.innerHTML = profile.aboutFacts.map((fact) => `<li>${fact}</li>`).join("");
  const heroPhoto = document.querySelector("[data-russian-hero-photo]");
  if (heroPhoto) {
    heroPhoto.src = profile.heroPhoto;
    heroPhoto.alt = profile.heroAlt;
  }
  const aboutPhoto = document.querySelector("[data-russian-about-photo]");
  if (aboutPhoto) {
    aboutPhoto.src = profile.aboutPhoto;
    aboutPhoto.alt = profile.aboutAlt;
  }
  const consultationPhoto = document.querySelector("[data-russian-consultation-photo]");
  if (consultationPhoto) {
    consultationPhoto.src = profile.consultationPhoto;
    consultationPhoto.alt = profile.aboutAlt;
  }
  const processCaption = document.querySelector("[data-russian-process-caption]");
  if (processCaption) processCaption.textContent = "Наш процесс обучения русскому языку прост, прозрачен и эффективен";
  renderRussianFaq(profile.displayName);
  renderRussianTickers(exam);
  renderRussianPricing(exam);
}

function renderRussianFaq(teacherName) {
  const faqGrid = document.querySelector(".faq-grid");
  if (!faqGrid) return;

  faqGrid.innerHTML = `
    <details><summary>Я ничего не знаю по русскому языку, подойдёт ли курс для занятий с 0?</summary><p>Да, курс начинается с базы и подойдёт для подготовки с нуля.</p></details>
    <details><summary>Не знаю, смогу ли присутствовать на всех занятиях онлайн. Что делать?</summary><p>Все занятия сохраняются в записи.</p></details>
    <details><summary>Обязательно ли делать домашние задания?</summary><p>Да, домашние задания помогают закреплять материал.</p></details>
    <details><summary>Где проходит курс?</summary><p>Курс проходит в онлайн-формате.</p></details>
    <details><summary>Оплатил курс и не могу зайти. Как быть?</summary><p>Напишите в поддержку - мы поможем войти в личный кабинет.</p></details>
    <details><summary>${teacherName} самый крутой препод в мире?</summary><p>Ученики говорят, что да :)</p></details>
  `;
}

function setupRussianModeSelect() {
  const modeControl = document.querySelector("[data-mode-control]");
  const modeTrigger = modeControl?.querySelector(".exam-mode-trigger");
  const modeMenu = modeControl?.querySelector(".exam-mode-menu");
  const modeExam = modeControl?.querySelector("[data-mode-exam]");
  const modeSubject = modeControl?.querySelector("[data-mode-subject]");
  let activeExam = new URLSearchParams(window.location.search).get("exam") === "oge" ? "ОГЭ" : "ЕГЭ";
  if (!modeControl) {
    setRussianExam(activeExam);
    return;
  }

  const applyRussianMode = (exam) => {
    const examKey = exam === "ОГЭ" ? "oge" : "ege";
    if (modeExam) modeExam.textContent = exam;
    if (modeSubject) modeSubject.textContent = "Русский";
    modeMenu?.querySelectorAll("[data-mode]").forEach((option) => {
      option.setAttribute("aria-selected", String(option.dataset.mode === `${examKey}-russian`));
    });
    document.querySelectorAll('.hero-select[data-select="exam"] [data-choice]').forEach((choice) => {
      choice.textContent = exam;
    });
    document.querySelectorAll("[data-hero-exam]").forEach((heading) => { heading.textContent = exam; });
    setRussianExam(exam);
    const url = new URL(window.location.href);
    url.search = `?subject=russian&exam=${examKey}`;
    window.history.replaceState(null, "", url);
  };

  const updateRussianMode = (exam, { animate = false } = {}) => {
    if (exam === activeExam && !animate) {
      applyRussianMode(exam);
      return;
    }

    if (!animate || exam === activeExam) {
      activeExam = exam;
      applyRussianMode(exam);
      return;
    }

    activeExam = exam;
    if (window.runModeTransition) window.runModeTransition(() => applyRussianMode(exam));
    else applyRussianMode(exam);
  };

  const closeHeaderMode = () => {
    modeControl.classList.remove("is-open");
    modeTrigger?.setAttribute("aria-expanded", "false");
    if (modeMenu) modeMenu.hidden = true;
  };

  const selectHeaderMode = (value) => {
    const [examKey, subject] = value.split("-");
    const exam = examKey === "oge" ? "ОГЭ" : "ЕГЭ";
    if (subject === "russian") {
      updateRussianMode(exam, { animate: true });
      closeHeaderMode();
      return;
    }

    const url = `index.html?subject=chemistry&exam=${examKey}`;
    if (window.navigateWithTransition) window.navigateWithTransition(url);
    else window.location.href = url;
  };

  modeTrigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    const opens = !modeControl.classList.contains("is-open");
    closeSelects();
    closeHeaderMode();
    modeControl.classList.toggle("is-open", opens);
    modeTrigger.setAttribute("aria-expanded", String(opens));
    if (modeMenu) modeMenu.hidden = !opens;
  });

  modeMenu?.querySelectorAll("[data-mode]").forEach((option) => {
    option.addEventListener("click", () => selectHeaderMode(option.dataset.mode));
  });

  document.addEventListener("click", closeHeaderMode);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeHeaderMode();
  });

  return { getActiveExam: () => activeExam, updateRussianMode, closeHeaderMode };
}

const selectors = [...document.querySelectorAll(".hero-select")];
const initialRussianExam = new URLSearchParams(window.location.search).get("exam") === "oge" ? "ОГЭ" : "ЕГЭ";
const closeSelects = () => selectors.forEach((selector) => {
  selector.classList.remove("is-open");
  selector.querySelector(".hero-select__trigger")?.setAttribute("aria-expanded", "false");
});
let subjectNavigationTimer = 0;
const navigateToSubject = (url) => {
  window.clearTimeout(subjectNavigationTimer);
  subjectNavigationTimer = window.setTimeout(() => {
    if (window.navigateWithTransition) window.navigateWithTransition(url);
    else window.location.href = url;
  }, 140);
};
selectors.forEach((selector) => {
  const trigger = selector.querySelector(".hero-select__trigger");
  const options = [...selector.querySelectorAll("[data-value]")];
  const type = selector.dataset.select;
  if (type === "exam") selector.dataset.active = initialRussianExam;
  let switchTimer = 0;
  const applyChoice = (value, { animate = false } = {}) => {
    const changed = selector.dataset.active !== value;
    if (animate && changed) {
      window.clearTimeout(switchTimer);
      selector.classList.add("is-switching");
      switchTimer = window.setTimeout(() => selector.classList.remove("is-switching"), 260);
    }
    selector.dataset.active = value;
    options.forEach((option) => option.setAttribute("aria-pressed", String(option.dataset.value === value)));
    selector.classList.toggle("is-right", value === (type === "exam" ? "ЕГЭ" : "РУССКИЙ"));
    document.querySelectorAll("[data-hero-exam]").forEach((heading) => { heading.textContent = value === "ЕГЭ" || value === "ОГЭ" ? value : "ЕГЭ"; });
  };
  trigger?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const next = type === "exam" ? (selector.dataset.active === "ЕГЭ" ? "ОГЭ" : "ЕГЭ") : (selector.dataset.active === "РУССКИЙ" ? "ХИМИЯ" : "РУССКИЙ");
    options.find((option) => option.dataset.value === next)?.click();
  });
  options.forEach((option) => option.addEventListener("click", () => {
    const value = option.dataset.value;
    if (type === "subject") window.clearTimeout(subjectNavigationTimer);
    applyChoice(value, { animate: true });
    if (selector.dataset.select === "subject" && value === "ХИМИЯ") {
      const exam = russianMode.getActiveExam() === "ОГЭ" ? "oge" : "ege";
      navigateToSubject(`index.html?subject=chemistry&exam=${exam}`);
      closeSelects();
      return;
    }
    if (selector.dataset.select === "exam") russianMode.updateRussianMode(value, { animate: true });
    closeSelects();
  }));
  applyChoice(selector.dataset.active);
});
function setupRussianSiteLoader() {
  if (window.__appRouterLoading) return;
  const loader = document.querySelector(".site-loader");
  if (!loader) return;

  if (document.documentElement.classList.contains("page-transition-incoming")) {
    loader.remove();
    document.body.classList.add("site-ready");
    window.dispatchEvent(new Event("site-ready"));
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveal = () => {
    window.setTimeout(() => {
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
    }, reduceMotion ? 0 : 750);
  };

  if (document.readyState === "complete") reveal();
  else window.addEventListener("load", reveal, { once: true });
}

function setupRussianWelcomeHint() {
  const overlay = document.querySelector(".exam-guide-overlay");
  const hint = document.querySelector(".exam-guide-tooltip");
  if (!overlay || !hint) return;

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
    if (hasShown) return;
    hasShown = true;
    document.body.classList.remove("exam-guide-closing");
    overlay.hidden = false;
    hint.hidden = false;

    requestAnimationFrame(() => document.body.classList.add("exam-guide-active"));

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
  if (document.body.classList.contains("site-ready")) showHint();
}

function setupRussianSideNav() {
  const navLinks = [...document.querySelectorAll(".side-nav a")];
  if (!navLinks.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

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

  document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}

setupRussianSiteLoader();
setupRussianWelcomeHint();

document.addEventListener("click", closeSelects);
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeSelects(); });
const russianMode = setupRussianModeSelect();
if (russianMode) russianMode.updateRussianMode(russianMode.getActiveExam());
setupRussianSideNav();
