// src/schemas/neo.ts
export const NeoObjectSchema = {
  $id: 'NeoObject',
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
export const NeosRouteSchema = {
  querystring: {
    type: 'object',
    properties: {
      start_date: { type: 'string', format: 'date' },
      end_date: { type: 'string', format: 'date' },
    },
    required: [],
  },
  response: {
    200: {
      type: 'array',
      items: { $ref: 'NeoObject#' },
    },
    502: {
      type: 'object',
      properties: { error: { type: 'string' } },
      required: ['error'],
    },
  },
};
//# sourceMappingURL=neo.js.map
