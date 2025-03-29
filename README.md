# Earthquake Monitoring System

A Node.js application that monitors and reports earthquake data from USGS (United States Geological Survey) in real-time.

## Features

- Fetches earthquake data from USGS GeoJSON feed (2.5+ magnitude earthquakes)
- Filters and tracks new earthquake events
- Stores earthquake data locally in JSON format
- Sends notifications via webhook for new events only
- Converts UTC timestamps to local time
- Formats data into readable messages
- Auto-updates every 25 seconds (can be changed in server.js)
- Prevents duplicate entries through intelligent comparison
- Integration with n8n for data processing
- Automated Telegram notifications through n8n workflow

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Usage

### Running the Server

Start the main server that continuously monitors earthquakes:

```bash
npm start
```

### Running Tests

Test the webhook integration:

```bash
node test.js
```

## Configuration

The application monitors:

- Main server (`server.js`): Earthquakes with magnitude 2.5+ in the past day
- Test server (`test.js`): Earthquakes with magnitude 4.5+ in the past day

## Data Storage

Earthquake data is stored in `data.json` to track new events and prevent duplicates. The stored data includes:

- Location
- Magnitude
- Timestamp (in local time)
- Coordinates (latitude, longitude, depth)

## Webhook Integration

The application sends formatted earthquake data to an n8n webhook endpoint for new events only. The data flow is:

1. Server detects new earthquake events
2. Data is sent to n8n webhook
3. n8n processes and formats the data
4. Formatted messages are sent to Telegram

Each webhook message includes:

- Magnitude
- Location
- Timestamp
- Coordinates

## Real-time Updates

- Automatic polling every 25 seconds (can be changed in server.js)
- Intelligent filtering to report only new earthquakes
- Console logging of new earthquake details
- Webhook notifications for new events only
- Instant Telegram notifications via n8n

## Project Structure

- `server.js` - Main application server with continuous monitoring
- `test.js` - Webhook testing script
- `data.json` - Local storage for earthquake data
- `package.json` - Project dependencies and metadata

## License

MIT
