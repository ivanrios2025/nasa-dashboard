export interface NeoData {
    name: string;
    sizeMeters: {
        min: number;
        max: number;
    };
    closestKm: number;
    velocityKph: number;
}
export declare function fetchNeoData(startDate: string, endDate: string, apiKey: string): Promise<NeoData[]>;
//# sourceMappingURL=nasaServices.d.ts.map