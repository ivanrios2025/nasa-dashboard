export declare const NeoObjectSchema: {
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
    required: never[];
  };
  response: {
    200: {
      type: string;
      items: {
        $ref: string;
      };
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
