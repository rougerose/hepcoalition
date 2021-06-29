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
const evaluerNombreSlides = () => {
  let Slides = document.querySelectorAll(
    ".slider_container.swiper-container .swiper-slide"
  );
  return Slides.length > 1 ? true : false;
};

const sliderRubrique = new Swiper(
  "slider-rubrique_container.swiper-container",
  {
    slidesPerView: "auto",
    loop: evaluerNombreSlides(),
    breakpoints: {
      568: {
        centeredSlides: true,
      },
    },
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

const sliderAgenda = new Swiper(".slider-agenda_container.swiper-container", {
  slidesPerView: "auto",
  grabCursor: true,
  resistanceRatio: 0.4,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
