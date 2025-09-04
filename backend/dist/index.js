import fastify from 'fastify';
import 'dotenv/config'; // load .env into process.env
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
// Import modules
import { SimpleCache } from './cache/SimpleCache.js';
import { swaggerOptions } from './schemas/openApiSchemas.js';
import { registerNasaRoutes } from './routes/nasaRoutes.js';
import { registerCacheRoutes } from './routes/cacheRoutes.js';
// Create cache instance at module level
var neoCache = new SimpleCache();
// Fastify app setup
const app = fastify();
app.register(cors, {
    origin: 'http://localhost:5173',
});
app.register(swagger, swaggerOptions);
app.register(swaggerUI, {
    routePrefix: '/docs',
});
// Register route modules
app.register(async (fastify) => {
    await registerNasaRoutes(fastify, neoCache);
});
app.register(async (fastify) => {
    await registerCacheRoutes(fastify, neoCache);
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
//# sourceMappingURL=index.js.map