# Earthquake Monitoring System

A Node.js application that monitors and reports earthquake data from USGS (United States Geological Survey) in real-time.

## Features

- Fetches earthquake data from USGS GeoJSON feed
- Filters earthquakes based on magnitude
- Stores earthquake data locally to track new events
- Sends notifications via webhook
- Converts UTC timestamps to local time
- Formats data into readable messages

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
node server.js
```

### Running Tests

Test the webhook integration:

```bash
node test.js
```

## Configuration

The application monitors:

- Earthquakes with magnitude 2.5+ in the past day (`server.js`)
- Earthquakes with magnitude 4.5+ in the past day (`test.js`)

## Data Storage

Earthquake data is stored in `data.json` to track new events and prevent duplicates. The stored data includes:

- Location
- Magnitude
- Timestamp
- Coordinates (latitude, longitude, depth)

## Webhook Integration

The application sends formatted earthquake data to a webhook endpoint. The webhook message includes:

- Magnitude
- Location
- Timestamp
- Coordinates

## Project Structure

- `server.js` - Main application server
- `test.js` - Webhook testing script
- `data.json` - Local storage for earthquake data
- `package.json` - Project dependencies and metadata

## License

ISC
