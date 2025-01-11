export default function getCityAndRegion(location) {
  if (location && location.trim()) {
    // Split the location by the first comma
    const parts = location.split(",");

    // Get city (first part before the comma)
    const city = parts[0].trim();

    // Get region (second part after the comma, if it exists)
    const region = parts[1] ? parts[1].trim() : null;

    return { city, region };
  } else {
    return { city: null, region: null }; // Return null if location is blank or undefined
  }
}
