import corridors from "../data/corridors";
const toRad = (v) => (v * Math.PI) / 180;

export const getDistanceKm = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Returns the **nearest corridor and the nearest point in it**
export const findNearestCorridor = (lat, lng) => {
  let nearestCorridor = null;
  let nearestPoint = null;
  let minDist = Infinity;

  corridors.forEach((c) => {
    c.points.forEach((p) => {
      const d = getDistanceKm(lat, lng, p.lat, p.lng);
      console.log(`Distance to ${c.name} point (${p.lat},${p.lng}): ${d.toFixed(3)} km`);
      if (d < minDist) {
        minDist = d;
        nearestCorridor = c;
        nearestPoint = p;
      }
    });
  });

  if (nearestCorridor && nearestPoint) {
    console.log(
      `Nearest corridor: ${nearestCorridor.name}, nearest point:`,
      nearestPoint,
      `distance: ${minDist.toFixed(3)} km`
    );

    // return corridor with the closest point as center
    return { ...nearestCorridor, center: nearestPoint };
  }

  return null;
};
