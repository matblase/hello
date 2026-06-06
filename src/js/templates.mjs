import spritePath from "../images/sprite.symbol.svg";

export function alertTemplate(alert) {
  let alertType = "";
  // Normalize the category text to match our SVG symbol IDs
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }

  return `
    <li class="alert">
      <svg class="icon" focusable="false" aria-hidden="true">
        <use xlink:href="${spritePath}#alert-${alertType}"></use>
      </svg>
      <div>
        <h3 class="alert-${alertType}">${alert.title}</h3>
        <p>${alert.description}</p>
      </div>
    </li>
  `;
}

export function visitorCenterTemplate(center) {
  return `
    <div class="visitor-center-card">
      <h3>${center.name}</h3>
      <p class="visitor-desc">${center.description}</p>
      ${center.directionsInfo ? `<p class="visitor-directions"><strong>Directions:</strong> ${center.directionsInfo}</p>` : ""}
    </div>
  `;
}

// THIS WAS MISSING: This parses the activity array items cleanly
export function activityTemplate(activity) {
  return `<li>${activity.name}</li>`;
}