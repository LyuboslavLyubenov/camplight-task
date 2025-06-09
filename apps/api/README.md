# API Documentation

## Overview
Fastify-based API serving country data.

## Endpoints

### GET /countries
Returns all available countries.

Example response:
```json
[
  {
    "cca3": "USA",
    "name": {
      "common": "United States",
      "official": "United States of America"
    },
    "flags": {
      "png": "https://flagcdn.com/w320/us.png",
      "svg": "https://flagcdn.com/us.svg",
      "alt": "Flag of United States"
    },
    "region": "Americas",
    "capital": ["Washington, D.C."],
    "population": 331002651,
    "languages": { "eng": "English" },
    "currencies": { "USD": { "name": "United States dollar", "symbol": "$" } }
  }
]
```

### GET /countries/:code
Returns details for a specific country by its 3-letter code (cca3).

Example response for `/countries/USA`:
```json
{
  "cca3": "USA",
  "name": {
    "common": "United States",
    "official": "United States of America"
  },
  "flags": {
    "png": "https://flagcdn.com/w320/us.png",
    "svg": "https://flagcdn.com/us.svg",
    "alt": "Flag of United States"
  },
  "region": "Americas",
  "capital": ["Washington, D.C."],
  "population": 331002651,
  "languages": { "eng": "English" },
  "currencies": { "USD": { "name": "United States dollar", "symbol": "$" } }
}
```

## Running the API
1. Install dependencies:
```bash
pnpm install
```

2. Start the server:
```bash
pnpm dev
```

Server runs on http://localhost:3001
