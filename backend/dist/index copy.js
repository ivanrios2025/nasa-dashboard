import fastify from 'fastify';
import fetch from 'node-fetch';
import 'dotenv/config'; // load .env into process.env
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
class SimpleCache {
    cache = new Map();
    set(key, data, ttlSeconds = 300) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl: ttlSeconds * 1000,
        });
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return null;
        // Check if expired
        if (Date.now() - entry.timestamp > entry.ttl) {
            this.cache.delete(key);
            return null;
        }
        return entry.data;
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    getStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys()),
        };
    }
}
// Create cache instance
const neoCache = new SimpleCache();
const app = fastify();
app.register(cors, {
    origin: 'http://localhost:5173',
});
app.register(swagger, {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'NASA Near Earth Objects API',
            description: 'API for fetching NASA Near Earth Objects data',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
});
app.register(swaggerUI, {
    routePrefix: '/docs',
});
const NASA_API_KEY = 'L2Z8aY3m1RSdcd6iM7HpySAXIOTich2kNN1dctlj';
app.get('/', {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                start_date: {
                    type: 'string',
                    format: 'date',
                    description: 'Start date for NEO data (YYYY-MM-DD format)',
                },
                end_date: {
                    type: 'string',
                    format: 'date',
                    description: 'End date for NEO data (YYYY-MM-DD format)',
                },
            },
        },
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        sizeMeters: {
                            type: 'object',
                            properties: {
                                min: { type: 'number' },
                                max: { type: 'number' },
                            },
                        },
                        closestKm: { type: 'number' },
                        velocityKph: { type: 'number' },
                    },
                },
            },
        },
    },
}, async (request, reply) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const { start_date: rawStart, end_date: rawEnd } = request.query;
        // These fallbacks always produce a string
        const start_date = rawStart ?? process.env.START_DATE ?? today;
        const end_date = rawEnd ?? process.env.END_DATE ?? today;
        // Create cache key based on date range
        const cacheKey = `neo-${start_date}-${end_date}`;
        // Check cache first
        const cachedData = neoCache.get(cacheKey);
        if (cachedData) {
            request.log.info(`Cache HIT for ${cacheKey}`);
            reply.header('X-Cache', 'HIT');
            return reply.send(cachedData);
        }
        request.log.info(`Cache MISS for ${cacheKey} - fetching from NASA API`);
        const api_key = process.env.NASA_API_KEY;
        if (!api_key) {
            return reply.status(500).send({ error: 'NASA_API_KEY missing' });
        }
        // Manually set each key/value as strings
        const params = new URLSearchParams();
        params.set('start_date', start_date);
        params.set('end_date', end_date);
        params.set('api_key', api_key);
        const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?${params}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`NASA API ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        // 1. Flatten all objects across every date
        const allNeos = Object.values(data.near_earth_objects).flat();
        // 2. Map to your pared-down shape
        const transformed = allNeos.map((neo) => {
            const approach = neo.close_approach_data[0];
            return {
                name: neo.name,
                sizeMeters: {
                    min: neo.estimated_diameter.meters.estimated_diameter_min,
                    max: neo.estimated_diameter.meters.estimated_diameter_max,
                },
                closestKm: parseFloat(approach.miss_distance.kilometers),
                velocityKph: parseFloat(approach.relative_velocity.kilometers_per_hour),
            };
        });
        // Cache the transformed data (5 minutes TTL for historical data, 1 minute for today)
        const isToday = start_date === today || end_date === today;
        const ttlSeconds = isToday ? 60 : 300; // 1 min for today, 5 min for historical
        neoCache.set(cacheKey, transformed, ttlSeconds);
        request.log.info(`Cached data for ${cacheKey} with TTL ${ttlSeconds}s`);
        reply.header('X-Cache', 'MISS');
        return reply.send(transformed);
    }
    catch (error) {
        request.log.error(error);
        return reply.status(502).send({ error: 'Failed to fetch data' });
    }
});
// Cache management endpoints for debugging/monitoring
app.get('/cache/stats', {
    schema: {
        description: 'Get cache statistics',
        response: {
            200: {
                type: 'object',
                properties: {
                    size: { type: 'number', description: 'Number of cached entries' },
                    keys: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'List of cache keys',
                    },
                },
            },
        },
    },
}, async (request, reply) => {
    return reply.send(neoCache.getStats());
});
app.delete('/cache/clear', {
    schema: {
        description: 'Clear all cache entries',
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
}, async (request, reply) => {
    neoCache.clear();
    return reply.send({ message: 'Cache cleared successfully' });
});
const start = async () => {
    try {
        await app.listen({ port: 3000 });
        app.log.info(`Server listening on http://localhost:3000`);
        app.log.info(`Cache stats available at http://localhost:3000/cache/stats`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index%20copy.js.map