const inputData = $input.first().json;
// Directly access the earthquake data in the "body" property.
const webhookData = inputData.body;

// Transform the earthquake data
const earthquakeData = webhookData.map(quake => ({
    magnitude: quake.magnitude,
    location: quake.location,
    timestamp: quake.time
}));

// Compose the message
let formattedMessage = `🌍 **Earthquakes Report** 🌍\n\n`;
earthquakeData.forEach((quake) => {
    formattedMessage += `**Magnitude:** ${quake.magnitude}\n`;
    formattedMessage += `**Location:** ${quake.location}\n`;
    formattedMessage += `**Time:** ${quake.timestamp}\n\n`;
});

// Return the formatted message as output
return {
    json: {
        formattedMessage: formattedMessage
    }
};
