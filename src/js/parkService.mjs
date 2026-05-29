// Base configuration for the National Park Service API
const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

const parkInfoLinks = [
  {
    name: "Current Conditions ›",
    link: "conditions.html",
    image: "",
    description:
      "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes ›",
    link: "fees.html",
    image: "",
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers ›",
    link: "visitor_centers.html",
    image: "",
    description: "Learn about the visitor centers in the park."
  }
];

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };

  const response = await fetch(baseUrl + url, options);
  
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("response not ok");
  }
}

export async function getParkData() {
  const parkData = await getJson("parks?parkCode=yell");
  return parkData.data[0];
}

export function getInfoLinks(imagesData) {
  const withUpdatedImages = parkInfoLinks.map((item, index) => {
    item.image = imagesData[index + 2].url;
    return item;
  });
  return withUpdatedImages;
}