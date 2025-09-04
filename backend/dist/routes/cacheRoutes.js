import { SimpleCache } from '../cache/SimpleCache.js';
import { cacheStatsSchema, cacheClearSchema } from '../schemas/openApiSchemas.js';
export async function registerCacheRoutes(fastify, neoCache) {
    // Cache management endpoints for debugging/monitoring
    fastify.get('/cache/stats', {
        schema: cacheStatsSchema,
    }, async (request, reply) => {
        return reply.send(neoCache.getStats());
    });
    fastify.delete('/cache/clear', {
        schema: cacheClearSchema,
    }, async (request, reply) => {
        neoCache.clear();
        return reply.send({ message: 'Cache cleared successfully' });
    });
}
//# sourceMappingURL=cacheRoutes.js.map