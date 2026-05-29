import { getParkData, getInfoLinks } from "./parkService.mjs";

// Template for park header block
function parkInfoTemplate(info) {
  return `<a href="${info.url}" class="hero-banner__title">${info.fullName}</a>
  <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <span>${info.states}</span>
  </p>`;
}


function setHeaderFooter(data) {
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;

  document.querySelector("head > title").textContent = data.fullName;

  const heroImg = document.querySelector(".hero-banner img");
  heroImg.src = data.images[0].url;
  heroImg.alt = data.images[0].altText;

  document.querySelector(".hero-banner__content").innerHTML =
    parkInfoTemplate(data);

  const footerEl = document.querySelector("#park-footer");
  footerEl.innerHTML = footerTemplate(data);
}

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
  `;
}

function mediaCardTemplate(info) {
  return `<div class="media-card">
    <a href="${info.link}">
      <img src="${info.image}" alt="${info.name}" class="media-card__img">
      <h3 class="media-card__title">${info.name}</h3>
    </a>
    <p>${info.description}</p>
  </div>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate);
  infoEl.innerHTML = html.join("");
}

function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing");
}

function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice");
  return voice ? voice.phoneNumber : "";
}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `<section class="contact">
    <h3>Contact Info</h3>

    <h4>Mailing Address:</h4>
    <div>
      <p>${mailing.line1}</p>
      <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
    </div>

    <h4>Phone:</h4>
    <p>${voice}</p>
  </section>`;
}


async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData.images);

  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links);
}

init();