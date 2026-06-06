function parkInfoTemplate(info) {
  return `<a href="conditions.html" class="hero-banner__title">${info.fullName}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}

function getMailingAddress(addresses) {
  if (!addresses || !Array.isArray(addresses)) return {};
  return addresses.find((address) => address.type === "Mailing") || addresses[0] || {};
}

function getVoicePhone(contacts) {
  if (!contacts || !contacts.phoneNumbers || !Array.isArray(contacts.phoneNumbers)) return "";
  const voice = contacts.phoneNumbers.find((number) => number.type === "Voice");
  return voice ? voice.phoneNumber : contacts.phoneNumbers[0]?.phoneNumber || "";
}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts);

  return `<section class="contact">
    <h3>Contact Info</h3>

    <h4>Mailing Address:</h4>
    <div>
      <p>${mailing.line1 || ""}</p>
      <p>${mailing.city || ""}${mailing.stateCode ? `, ${mailing.stateCode}` : ""} ${mailing.postalCode || ""}</p>
    </div>

    <h4>Phone:</h4>
    <p>${voice || "No phone listed"}</p>
  </section>`;
}

function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const globalNav = document.querySelector(".global-nav");

  if (!menuButton || !globalNav) return;

  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;
    
    // Toggle the menu visible state
    globalNav.classList.toggle("show");

    // Account for clicks that landed on nested text or icons inside button
    if (target.tagName !== "BUTTON") {
      target = target.closest("button");
    }

    if (target) {
      const isOpen = globalNav.classList.contains("show");
      target.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  });
}

export default function setHeaderFooter(data) {
  if (!data) return;

  const disclaimer = document.querySelector(".disclaimer > a");
  if (disclaimer) {
    disclaimer.href = data.url || "#";
    disclaimer.innerHTML = data.fullName || "National Park";
  }

  const titleEl = document.querySelector("head > title");
  if (titleEl) titleEl.textContent = data.fullName || "National Park";

  const heroImg = document.querySelector(".hero-banner img");
  if (heroImg && data.images && data.images[0]) {
    heroImg.src = data.images[0].url;
    heroImg.alt = data.images[0].altText || data.fullName;
  }

  const bannerContent = document.querySelector(".hero-banner__content");
  if (bannerContent) bannerContent.innerHTML = parkInfoTemplate(data);

  const footerEl = document.querySelector("#park-footer");
  if (footerEl) footerEl.innerHTML = footerTemplate(data);

  // Initialize navigation listeners dynamically on page finish
  enableNavigation();
}