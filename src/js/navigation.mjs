function subMenuHandler(ev) {
  
  if (window.innerWidth >= 768) return;

  const parentLi = ev.currentTarget.closest("li");
  const submenu = parentLi.querySelector(".global-nav__submenu");
  const icon = ev.currentTarget.querySelector(".icon");

  if (submenu) {
    submenu.classList.toggle("show");
  }
  
  if (icon) {
    icon.classList.toggle("rotate");
  }
}

function mainMenuHandler(ev) {
  const globalNav = document.querySelector(".global-nav");
  let button = ev.target;
  
  if (!globalNav) return;

  globalNav.classList.toggle("show");


  if (button.tagName !== "BUTTON") {
    button = button.closest("button");
  }

  if (button) {
    const isOpen = globalNav.classList.contains("show");
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }
}

export default function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const subMenuToggles = document.querySelectorAll(".global-nav__split-button__toggle");

  if (menuButton) {
    menuButton.removeEventListener("click", mainMenuHandler);
    menuButton.addEventListener("click", mainMenuHandler);
  }

  subMenuToggles.forEach((toggle) => {
    toggle.removeEventListener("click", subMenuHandler);
    toggle.addEventListener("click", subMenuHandler);
  });
}