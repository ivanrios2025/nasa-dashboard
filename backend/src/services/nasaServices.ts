import fetch from 'node-fetch';

export interface NeoData {
  name: string;
  sizeMeters: {
    min: number;
    max: number;
  };
  closestKm: number;
  velocityKph: number;
}

export async function fetchNeoData(
  startDate: string,
  endDate: string,
  apiKey: string,
): Promise<NeoData[]> {
  const params = new URLSearchParams();
  params.set('start_date', startDate);
  params.set('end_date', endDate);
  params.set('api_key', apiKey);

  const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?${params}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`NASA API ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  // 1. Flatten all objects across every date
  const allNeos = Object.values(data.near_earth_objects).flat();

  // 2. Map to your pared-down shape
  const transformed = (allNeos as any[]).map((neo: any) => {
    const approach = neo.close_approach_data[0];
    return {
      name: neo.name,
      sizeMeters: {
        min: neo.estimated_diameter.meters.estimated_diameter_min,
        max: neo.estimated_diameter.meters.estimated_diameter_max,
      },
      closestKm: parseFloat(approach.miss_distance.kilometers),
      velocityKph: parseFloat(approach.relative_velocity.kilometers_per_hour),
    };
  });

  return transformed;
}
