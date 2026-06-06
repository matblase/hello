import "../css/style.css"; 

import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs"; 

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  if (introEl) {
    introEl.innerHTML = `
      <h1>${data.fullName}</h1>
      <p>${data.description}</p>
    `;
  }
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
  if (infoEl) {
    const html = data.map(mediaCardTemplate);
    infoEl.innerHTML = html.join("");
  }
}

async function init() {
  try {
    const parkData = await getParkData();
    const links = getInfoLinks(parkData.images);

    setHeaderFooter(parkData);
    setParkIntro(parkData);
    setParkInfoLinks(links);
  } catch (error) {
    console.error("Initialization failed:", error);
  }
}

init();