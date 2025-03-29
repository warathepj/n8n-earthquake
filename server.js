// USGS GeoJSON feed URL for earthquakes in the past hour with magnitude 2.5+
const usgsUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson';

// Function to fetch and display earthquake data
async function fetchEarthquakeData() {
  try {
    const response = await fetch(usgsUrl);
    if (!response.ok) {
      throw new Error(`USGS API responded with status: ${response.status}`);
    }
    const data = await response.json();
    const earthquakes = data.features.filter(quake => quake.properties.mag >= 5);

    if (earthquakes.length === 0) {
      console.log('No earthquakes recorded with magnitude 5 or higher.');
      return;
    }

    earthquakes.forEach((quake) => {
      const { place, mag, time } = quake.properties;
      const coordinates = quake.geometry.coordinates;
      console.log(`Location: ${place}, Magnitude: ${mag}, Time: ${new Date(time).toLocaleString()}, Coordinates: [${coordinates}]`);
    });
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
  }
}

// Call the function to fetch and display data
fetchEarthquakeData();
