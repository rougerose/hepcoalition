import Overlay from "@accede-web/overlay";

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

    if (selector === "modalMenu") {
      className = "overlay overlay--full is-closed";
      closeSelector = ".sitenav_closeMenu";
      closeBtn = modal.querySelector("button");
      sitenav = modal.querySelector(".sitenavOverlay");
    }

    let overlay = new Overlay({
      content: modal,
      opener: btn,
      className: className,
      role: "dialog",
      closeSelector: closeSelector,
      modal: true,
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
      sitenav.classList.remove("is-visible");
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
    if (event.target.classList[0] === "modal" && event.propertyName !== "opacity") {
      overlay.removeEventListener("transitionend", handleModalTransition);
      overlay.removeAttribute("style");
    }
  }
}

/**
 * Animation du menu principal (version smartphone)
 *
 * code à supprimer
 *
 */
// const modalMenu = document.getElementById("modalMenu");

// if (modalMenu) {
//   Array.prototype.forEach.call(
//     modalMenu.querySelectorAll(
//       ".sitenavOverlay_list > li.sitenavOverlay_item--section"
//     ), function (item, index) {
//       console.log(item, index);
//       item.style.transitionDelay = (index + 2) / 10 + "s";
//     }
//   );
// }
