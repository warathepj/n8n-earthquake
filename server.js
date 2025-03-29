// USGS GeoJSON feed URL for earthquakes in the past hour with magnitude 2.5+
const usgsUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';
const fs = require('fs');

// Function to fetch and display earthquake data
async function fetchEarthquakeData() {
  try {
    // Read existing data
    let existingData = [];
    if (fs.existsSync('data.json')) {
      existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    }

    const response = await fetch(usgsUrl);
    if (!response.ok) {
      throw new Error(`USGS API responded with status: ${response.status}`);
    }
    const data = await response.json();
    const earthquakes = data.features.filter(quake => quake.properties.mag >= 2.5);

    if (earthquakes.length === 0) {
      console.log('No earthquakes recorded with magnitude 5 or higher.');
      return;
    }

    // Transform earthquakes data for better readability
    const formattedEarthquakes = earthquakes.map(quake => ({
      location: quake.properties.place,
      magnitude: quake.properties.mag,
      time: new Date(quake.properties.time).toLocaleString(),
      coordinates: quake.geometry.coordinates
    }));

    // Filter out only new earthquakes
    const newEarthquakes = formattedEarthquakes.filter(newQuake => 
      !existingData.some(existingQuake => 
        existingQuake.location === newQuake.location &&
        existingQuake.time === newQuake.time &&
        existingQuake.magnitude === newQuake.magnitude
      )
    );

    if (newEarthquakes.length === 0) {
      console.log('No new earthquakes to add.');
      return;
    }

    // Combine existing and new data
    const updatedData = [...existingData, ...newEarthquakes];

    // Save updated data to data.json
    fs.writeFileSync('data.json', JSON.stringify(updatedData, null, 2));
    console.log(`${newEarthquakes.length} new earthquake(s) saved to data.json`);

    // Display only new earthquakes in console
    console.log('\nNew Earthquakes:');
    newEarthquakes.forEach((quake) => {
      console.log(`Location: ${quake.location}, Magnitude: ${quake.magnitude}, Time: ${quake.time}, Coordinates: [${quake.coordinates}]`);
    });
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
  }
}

// Call the function to fetch and display data
fetchEarthquakeData();
