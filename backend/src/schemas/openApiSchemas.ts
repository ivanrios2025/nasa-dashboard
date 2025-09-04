export const swaggerOptions = {
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
};

export const nasaRouteSchema = {
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
};

export const cacheStatsSchema = {
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
};

export const cacheClearSchema = {
  description: 'Clear all cache entries',
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
