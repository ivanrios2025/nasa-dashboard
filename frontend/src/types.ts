export interface Neo {
  name: string;
  sizeMeters: {
    min: number;
    max: number;
  };
  closestKm: number;
  velocityKph: number;
}
