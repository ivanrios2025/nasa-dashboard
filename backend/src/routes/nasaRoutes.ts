import type { FastifyInstance } from 'fastify';
import { SimpleCache } from '../cache/SimpleCache.js';
import { fetchNeoData } from '../services/nasaServices.js';
import { nasaRouteSchema } from '../schemas/openApiSchemas.js';

interface NeoQuery {
  start_date?: string;
  end_date?: string;
}

export async function registerNasaRoutes(fastify: FastifyInstance, neoCache: SimpleCache) {
  fastify.get<{ Querystring: NeoQuery }>(
    '/',
    { schema: nasaRouteSchema },
    async (request, reply) => {
      const today = new Date().toISOString().split('T')[0];
      const { start_date, end_date } = {
        start_date: request.query.start_date ?? process.env.START_DATE ?? today,
        end_date: request.query.end_date ?? process.env.END_DATE ?? today,
      };

      const cacheKey = `neo-${start_date}-${end_date}`;
      const cached = neoCache.get(cacheKey);

      if (cached) {
        request.log.info(`Cache HIT for ${cacheKey}`);
        return reply.header('X-Cache', 'HIT').send(cached);
      }

      request.log.info(`Cache MISS for ${cacheKey}`);
      const api_key = process.env.DEMO_KEY;
      if (!api_key) {
        return reply.status(500).send({ error: 'NASA_API_KEY missing' });
      }

      try {
        const data = await fetchNeoData(start_date!, end_date!, api_key);
        const ttl = [start_date, end_date].includes(today) ? 60 : 300;
        neoCache.set(cacheKey, data, ttl);
        request.log.info(`Cached ${cacheKey} for ${ttl}s`);
        return reply.header('X-Cache', 'MISS').send(data);
      } catch (err) {
        request.log.error(err);
        return reply.status(502).send({ error: 'Failed to fetch data' });
      }
    }
  );
}
