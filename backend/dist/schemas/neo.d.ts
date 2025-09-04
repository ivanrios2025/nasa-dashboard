/**
 * Single NEO object schema
 */
export declare const NeoSchema: {
  $id: string;
  type: string;
  properties: {
    name: {
      type: string;
    };
    sizeMeters: {
      type: string;
      properties: {
        min: {
          type: string;
        };
        max: {
          type: string;
        };
      };
      required: string[];
    };
    closestKm: {
      type: string;
    };
    velocityKph: {
      type: string;
    };
  };
  required: string[];
};
/**
 * Array of NEO objects
 */
export declare const NeoArraySchema: {
  $id: string;
  type: string;
  items: {
    $ref: string;
  };
};
/**
 * Route schema for GET /
 */
export declare const NeosRouteSchema: {
  querystring: {
    type: string;
    properties: {
      start_date: {
        type: string;
        format: string;
      };
      end_date: {
        type: string;
        format: string;
      };
    };
  };
  response: {
    200: {
      $ref: string;
    };
    500: {
      type: string;
      properties: {
        error: {
          type: string;
        };
      };
      required: string[];
    };
    502: {
      type: string;
      properties: {
        error: {
          type: string;
        };
      };
      required: string[];
    };
  };
};
//# sourceMappingURL=neo.d.ts.map
