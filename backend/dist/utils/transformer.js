export function transformNasaFeed(raw) {
  return Object.values(raw.near_earth_objects)
    .flat()
    .map(neo => {
      const approach = neo.close_approach_data[0];
      const d = neo.estimated_diameter.kilometers;
      // parse strings into numbers
      const minD = parseFloat(d.estimated_diameter_min);
      const maxD = parseFloat(d.estimated_diameter_max);
      const miss = parseFloat(approach.miss_distance.kilometers);
      const vel = parseFloat(approach.relative_velocity.kilometers_per_hour);
      return {
        name: neo.name,
        sizeKm: (minD + maxD) / 2,
        closenessKm: miss,
        velocityKmh: vel,
      };
    });
}
//# sourceMappingURL=transformer.js.map
