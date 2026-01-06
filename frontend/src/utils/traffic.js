const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_API_KEY;

/**
 * Fetch traffic score for a single point
 * Returns "LOW", "MEDIUM", "HIGH"
 */
export const getTrafficScore = async (lat, lng) => {
  const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=${TOMTOM_KEY}&point=${lat},${lng}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Traffic API request failed");

  const data = await res.json();

  if (!data.flowSegmentData) throw new Error("No traffic data");

  const { currentSpeed, freeFlowSpeed } = data.flowSegmentData;
  const ratio = currentSpeed / freeFlowSpeed;

  if (ratio > 0.8) return "LOW";
  if (ratio > 0.5) return "MEDIUM";
  return "HIGH";
};

/**
 * Adjust wait time based on traffic
 */
export const adjustWaitTime = (base, traffic) => {
  if (traffic === "LOW") return base;
  if (traffic === "MEDIUM") return Math.round(base * 1.2);
  return Math.round(base * 1.5);
};
