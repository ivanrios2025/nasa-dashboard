export declare const swaggerOptions: {
    openapi: {
        openapi: string;
        info: {
            title: string;
            description: string;
            version: string;
        };
        servers: {
            url: string;
            description: string;
        }[];
    };
};
export declare const nasaRouteSchema: {
    querystring: {
        type: string;
        properties: {
            start_date: {
                type: string;
                format: string;
                description: string;
            };
            end_date: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    response: {
        200: {
            type: string;
            items: {
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
                    };
                    closestKm: {
                        type: string;
                    };
                    velocityKph: {
                        type: string;
                    };
                };
            };
        };
    };
};
export declare const cacheStatsSchema: {
    description: string;
    response: {
        200: {
            type: string;
            properties: {
                size: {
                    type: string;
                    description: string;
                };
                keys: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
            };
        };
    };
};
export declare const cacheClearSchema: {
    description: string;
    response: {
        200: {
            type: string;
            properties: {
                message: {
                    type: string;
                };
            };
        };
    };
};
//# sourceMappingURL=openApiSchemas.d.ts.map