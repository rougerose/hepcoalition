import Overlay from "@accede-web/overlay";
import { ClickyMenu } from "./modules/clicky-menus";
import { Swiper, Navigation, Pagination } from "swiper/swiper.esm.js";

/**
 * Gestion des fenetres modales (y compris menu principal, version smartphone)
 */
const overlays = document.querySelectorAll("[data-open-modal-id]");

if (overlays.length >= 1) {
  const body = document.body;

  Array.prototype.forEach.call(overlays, (el) => {
    let btn = el;
    let selector = btn.getAttribute("data-open-modal-id");
    let modal = document.getElementById(selector);
    let className = "overlay is-closed";
    let closeSelector = ".modal_btnClose";
    let closeBtn = "";
    let sitenav = "";
    let label = "";

    if (selector === "modalMenu") {
      className = "overlay overlay--full is-closed";
      closeSelector = ".sitenav_closeMenu";
      closeBtn = modal.querySelector("button");
      sitenav = modal.querySelector(".sitenavOverlay_menu");
      label = modal.dataset.title;
    }

    let overlay = new Overlay({
      content: modal,
      opener: btn,
      className: className,
      role: "dialog",
      closeSelector: closeSelector,
      modal: true,
      label: label,
    });

    btn.addEventListener("click", (event) => {
      btn.classList.add("is-active");
      body.classList.add("has-overlay");
      overlay.show();
      window.requestAnimationFrame(() => {
        overlay.el.classList.remove("is-closed");
        if (closeBtn) {
          closeBtn.classList.add("is-active");
        }
        if (sitenav) {
          sitenav.classList.add("is-visible");
        }
      });
    });

    overlay.addEventListener("close", () => {
      overlay.el.style.display = "flex";
      if (sitenav) {
        sitenav.classList.remove("is-visible");
      }
      overlay.el.addEventListener("transitionend", handleModalTransition);
      overlay.el.classList.add("is-closed");
      body.classList.remove("has-overlay");
      btn.classList.remove("is-active");

      if (closeBtn) {
        closeBtn.classList.remove("is-active");
      }
    });
  });

  function handleModalTransition(event) {
    let overlay = event.target.closest("[aria-hidden]");
    // test cible ".modal" et transition "transform" ou "max-height"
    if (
      event.target.classList[0] === "modal" &&
      event.propertyName !== "opacity"
    ) {
      overlay.removeEventListener("transitionend", handleModalTransition);
      overlay.removeAttribute("style");
    }
  }
}

/**
 * ClickyMenu
 *
 * Navigation principale, à partir de 800px
 *
 */
const menus = document.querySelectorAll(".clicky-menu");

menus.forEach((menu) => {
  let clickyMenu = new ClickyMenu(menu);
  clickyMenu.init();
});

/**
 * Sliders
 */
Swiper.use([Navigation, Pagination]);

/**
 * Déterminer le nombre de slides et si le parametre loop est nécessaire
 */
const evaluerNombreSlides = (wrapper) => {
  let slides = wrapper.querySelectorAll(".swiper-slide");
  return slides.length > 1 ? true : false;
};

/**
 * Définir le premier slide à afficher
 * (il possède la classe .is-coming)
 *
 */
const definirPremierSlide = (wrapper) => {
  let slides = wrapper.querySelectorAll(".swiper-slide");
  let slidesArray = Array.prototype.slice.call(slides),
    slideIndex = 0;

  for (let i = 0; i < slidesArray.length; i++) {
    if (slidesArray[i].classList.contains("is-coming")) {
      slideIndex = i;
      break;
    }
  }
  return slideIndex;
};

/**
 * Slider principal
 * Compositions rubrique, rubrique-homepage, rubrique-campaigns, rubrique-news
 */

const sliderRubrique = document.querySelector(".slider-rubrique");

if (sliderRubrique) {
  const sliderRubriqueWrapper =
    sliderRubrique.querySelector(".swiper-container");

  const swiperRubrique = new Swiper(sliderRubriqueWrapper, {
    slidesPerView: "auto",
    loop: evaluerNombreSlides(sliderRubriqueWrapper),
    breakpoints: {
      568: {
        centeredSlides: true,
      },
    },
    watchOverflow: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

/**
 * Slider Rubrique campagne Have a heart
 */
const sliderHaveAHeart = new Swiper(
  ".slider-portfolio--heartCampaign .swiper-container",
  {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    watchOverflow: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  }
);

/**
 * Slider Related Materials (squelette Article)
 */
const sliderRelatedMaterials = new Swiper(".slider-related .swiper-container", {
  slidesPerView: "auto",
  grabCursor: true,
  resistanceRatio: 0.4,
  watchOverflow: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/**
 * Slider Calendar
 * Composition rubirque-homepage, rubrique-news
 */
const sliderCalendar = new Swiper(
  ".slider-calendar-selection .swiper-container",
  {
    slidesPerView: "auto",
    grabCursor: true,
    resistanceRatio: 0.4,
    watchOverflow: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  }
);

/**
 * Sliders rubrique-calendar (version année par année)
 */
const calendars = document.querySelectorAll(
  ".rubrique-content--calendar .slider-calendar-annual"
);

if (calendars) {
  calendars.forEach((calendar) => {
    let calendarID = calendar.id,
      wrapper = calendar.children[0],
      index = definirPremierSlide(wrapper);

    const swiperCalendar = new Swiper(wrapper, {
      slidesPerView: "auto",
      initialSlide: definirPremierSlide(wrapper),
      grabCursor: true,
      resistanceRatio: 0.4,
      watchOverflow: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  });
}

/**
 * Panneau dépliant pour les traductions d'article
 *
 */
const articleTranslations = document.querySelector(".translations");

if (articleTranslations) {
  const heading = articleTranslations.querySelector("h2");
  const list = articleTranslations.querySelector(".translations_list");

  heading.classList.add("translations_heading--js");

  // Le panneau est d'emblée ouvert pour les fenêtres > à 768px.
  if (window.matchMedia("(min-width: 48em)").matches) {
    list.classList.add("is-opened");
  }

  // classe spécifique plutôt que la classe par défaut (js-expand)
  // qui provoque un déclenchement immédiat au chargement de la page.
  const toggleArticleTranslations = van11yAccessibleHideShowAria({
    HIDESHOW_EXPAND: "translations_heading",
    HIDESHOW_BUTTON_EXPAND_STYLE: "translations_btn",
  });
  toggleArticleTranslations.attach();
}
