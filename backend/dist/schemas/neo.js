// src/schemas/neo.ts
/**
 * Single NEO object schema
 */
export const NeoSchema = {
  $id: 'Neo', // ← must match your $ref
  type: 'object',
  properties: {
    name: { type: 'string' },
    sizeMeters: {
      type: 'object',
      properties: {
        min: { type: 'number' },
        max: { type: 'number' },
      },
      required: ['min', 'max'],
    },
    closestKm: { type: 'number' },
    velocityKph: { type: 'number' },
  },
  required: ['name', 'sizeMeters', 'closestKm', 'velocityKph'],
};
/**
 * Array of NEO objects
 */
export const NeoArraySchema = {
  $id: 'NeoArray',
  type: 'array',
  items: { $ref: 'Neo#' }, // ← note the trailing `#`
};
/**
 * Route schema for GET /
 */
export const NeosRouteSchema = {
  querystring: {
    type: 'object',
    properties: {
      start_date: { type: 'string', format: 'date' },
      end_date: { type: 'string', format: 'date' },
    },
  },
  response: {
    200: { $ref: 'NeoArray#' }, // ← returns array of Neo
    500: {
      type: 'object',
      properties: { error: { type: 'string' } },
      required: ['error'],
    },
    502: {
      type: 'object',
      properties: { error: { type: 'string' } },
      required: ['error'],
    },
  },
};
//# sourceMappingURL=neo.js.map
