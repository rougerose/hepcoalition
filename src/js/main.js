import Overlay from "@accede-web/overlay";

const overlays = document.querySelectorAll("[data-open-modal-id]");

if (overlays.length >= 1) {
  const body = document.body;

  Array.prototype.forEach.call(overlays, (el) => {
    let btn = el;
    let selector = btn.getAttribute("data-open-modal-id");
    let modal = document.getElementById(selector);
    let overlay = new Overlay({
      content: modal,
      opener: btn,
      className: "overlay is-closed",
      role: "dialog",
      titleSelector: ".modal_title",
      closeSelector: ".modal_btnClose",
      modal: true,
    });

    btn.addEventListener("click", (event) => {
      btn.classList.add("is-active");
      body.classList.add("has-overlay");
      overlay.show();
      window.requestAnimationFrame(() => {
        overlay.el.classList.remove("is-closed");
      });
    });

    overlay.addEventListener("close", () => {
      overlay.el.style.display = "flex";
      overlay.el.addEventListener("transitionend", handleModalTransition);
      overlay.el.classList.add("is-closed");
      body.classList.remove("has-overlay");
      btn.classList.remove("is-active");
    });
  });

  function handleModalTransition(event) {
    let overlay = event.target.closest("[aria-hidden]");
    if (event.propertyName === "transform") {
      overlay.removeEventListener("transitionend", handleModalTransition);
      overlay.removeAttribute("style");
    }
  }
}
