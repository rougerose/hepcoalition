// référence : https://github.com/mrwweb/clicky-menus
// et avec quelques adaptations dans le contexte du site.

export const ClickyMenu = function (menu) {
  let container = menu.parentElement,
    currentMenuItem;

  this.init = function () {
    menuSetUp();
    document.addEventListener("click", closeOpenMenu);
  };

  function menuSetUp() {
    menu.querySelectorAll("ul").forEach((submenu) => {
      const menuItem = submenu.parentElement;

      if ("undefined" !== typeof submenu) {
        let button = convertLinkToButton(menuItem);
        setUpAria(submenu, button);
        button.addEventListener("click", toggleOnMenuClick);
        menu.addEventListener("keyup", closeOnEscKey);
      }
    });
  }

  function convertLinkToButton(menuItem) {
    const link = menuItem.querySelector("a"),
      linkHTML = link.innerHTML,
      linkAtts = link.attributes,
      button = document.createElement("button");

    if (null !== link) {
      let i, len;
      button.innerHTML = linkHTML.trim();
      for (i = 0, len = linkAtts.length; i < len; i++) {
        let attr = linkAtts[i];
        if ("href" !== attr.name) {
          button.setAttribute(attr.name, attr.value);
        }
      }
      menuItem.replaceChild(button, link);
    }
    return button;
  }

  function setUpAria(submenu, button) {
    let id;
    const submenuId = submenu.getAttribute("id");

    if (null === submenuId) {
      id =
        button.textContent.trim().replace(/\s+/g, "-").toLowerCase() +
        "-submenu";
    } else {
      id = submenuId;
    }

    // button ARIA
    button.setAttribute("aria-controls", id);
    button.setAttribute("aria-expanded", false);
    // set submenu ARIA
    submenu.setAttribute("id", id);
    submenu.setAttribute("aria-hidden", true);
  }

  function closeOpenMenu(event) {
    if (currentMenuItem && !event.target.closest("#" + container.id)) {
      toggleSubmenu(currentMenuItem);
    }
  }

  function toggleOnMenuClick(event) {
    const button = event.currentTarget;
    if (currentMenuItem && button !== currentMenuItem) {
      toggleSubmenu(currentMenuItem);
    }
    toggleSubmenu(button);
  }

  function closeOnEscKey(event) {
    if (27 === event.keyCode) {
      // we're in a submenu item
      if (null !== event.target.closest('ul[aria-hidden="false"]')) {
        currentMenuItem.focus();
        toggleSubmenu(currentMenuItem);

        // we're on a parent item
      } else if ("true" === event.target.getAttribute("aria-expanded")) {
        toggleSubmenu(currentMenuItem);
      }
    }
  }

  function toggleSubmenu(button) {
    const submenu = document.getElementById(
      button.getAttribute("aria-controls")
    );

    if ("true" === button.getAttribute("aria-expanded")) {
      button.setAttribute("aria-expanded", false);
      submenu.setAttribute("aria-hidden", true);
      currentMenuItem = false;
    } else {
      button.setAttribute("aria-expanded", true);
      submenu.setAttribute("aria-hidden", false);
      preventOffScreenSubmenu(submenu);
      currentMenuItem = button;
    }
  }

  function preventOffScreenSubmenu(submenu) {
    const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      parent = submenu.offsetParent,
      menuLeftEdge = parent.getBoundingClientRect().left,
      menuRightEdge = menuLeftEdge + submenu.offsetWidth;

    if (menuRightEdge + 32 > screenWidth) {
      // adding 32 so it's not too close
      submenu.classList.add("sub-menu--right");
    }
  }
};
