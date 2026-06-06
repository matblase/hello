import "../css/style.css";
import "../css/conditions.css";

import { getParkData, getParkAlerts, getVisitorCenterData } from "./parkService.mjs";
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

function setAlerts(alerts) {
  const alertsContainer = document.querySelector(".alerts > ul");
  if (!alertsContainer) return;
  alertsContainer.innerHTML = "";
  if (alerts && alerts.length > 0) {
    const html = alerts.map(alertTemplate);
    alertsContainer.insertAdjacentHTML("beforeend", html.join(""));
  } else {
    alertsContainer.innerHTML = "<li>No current alerts.</li>";
  }
}

function setVisitorCenters(centers) {
  const visitorContainer = document.querySelector(".visitor .visitor-list");
  if (!visitorContainer) return;
  visitorContainer.innerHTML = "";
  if (centers && centers.length > 0) {
    const html = centers.map(visitorCenterTemplate);
    visitorContainer.insertAdjacentHTML("beforeend", html.join(""));
  } else {
    visitorContainer.innerHTML = "<p>No visitor center details available.</p>";
  }
}

function setActivities(activities) {
  const activitiesContainer = document.querySelector(".activities ul");
  if (!activitiesContainer) return;
  activitiesContainer.innerHTML = "";
  if (activities && activities.length > 0) {
    const html = activities.map(activityTemplate);
    activitiesContainer.insertAdjacentHTML("beforeend", html.join(""));
  } else {
    activitiesContainer.innerHTML = "<li>No activities listed.</li>";
  }
}

async function init() {
  try {
    console.log("Fetching park data...");
    const parkData = await getParkData();
    console.log("Park data fetched successfully:", parkData);

    setHeaderFooter(parkData);

    const [alerts, visitorCenters] = await Promise.all([
      getParkAlerts(parkData.parkCode),
      getVisitorCenterData(parkData.parkCode)
    ]);

    console.log("Alerts and Visitor Centers data received.");
    setAlerts(alerts);
    setVisitorCenters(visitorCenters);
    setActivities(parkData.activities || []);
  } catch (error) {
    console.error("Initialization on conditions page failed:", error);
  }
}

init();