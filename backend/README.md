# NASA NEO Feed API

A Fastify + TypeScript service that fetches near-Earth objects (NEOs) from NASA’s API, transforms the data, caches responses, and exposes both JSON endpoints and live Swagger documentation.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Architecture & File Structure](#architecture--file-structure)
4. [Installation & Running](#installation--running)
5. [Configuration](#configuration)
6. [API Endpoints](#api-endpoints)
7. [Caching](#caching)
8. [OpenAPI Documentation](#openapi-documentation)
9. [Testing](#testing)
10. [Trade-Offs & Decisions](#trade-offs--decisions)
11. [Future Improvements](#future-improvements)

---

## Overview

This service exposes a single GET `/` endpoint that:

- Accepts optional `start_date` and `end_date` query params
- Fetches the NEO feed from NASA
- Transforms and returns an array of `{ name, sizeMeters, closestKm, velocityKph }`
- Caches results to improve performance
- Serves live Swagger docs at `/docs`

---

## Features

- Fastify HTTP server with TypeScript
- JSON-Schema validation & OpenAPI 3.0 spec
- Interactive Swagger UI
- In-memory + optional Redis caching
- CORS configured for your frontend
- Modular, well-tested code

---

## Architecture & File Structure

backend/
src/
inde.js
schemas/
openApiSchemas.ts
services/
nasaServices.ts
cache/
SimpleCache.ts
routes/
cacheRoutes.ts
nasaRautes.ts
.env
package-lock.json
package.json
README.md
tsconfig.json

## Installation & Running

1. Clone & install:

   ```bash
   git clone <repo-url>
   cd backend
   npm install

   npm run dev
   ```

# → http://localhost:3000, Swagger UI at /docs

npm run build
npm start
