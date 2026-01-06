import { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { getDistanceKm } from "../utils/geo";

const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_API_KEY;

export default function MapView({ center, userLocation, corridor, traffic }) {
  const mapRef = useRef(null);
  const map = useRef(null);
  const userMarker = useRef(null);
  const corridorMarker = useRef(null);
  const [distanceKm, setDistanceKm] = useState(null);

  useEffect(() => {
    if (!center || !TOMTOM_KEY) return;

    // Initialize map
    if (!map.current) {
      map.current = tt.map({
        key: TOMTOM_KEY,
        container: mapRef.current,
        center: [center.lng, center.lat],
        zoom: 14,
      });

      // Add traffic layer
      map.current.on("load", () => {
        if (tt.services && tt.services.trafficFlowTileJson) {
          tt.services
            .trafficFlowTileJson({ key: TOMTOM_KEY, style: "relative" })
            .then((tileJson) => {
              map.current.addSource("traffic-flow", {
                type: "raster",
                tiles: tileJson.tiles,
                tileSize: 256,
              });
              map.current.addLayer({
                id: "traffic-flow-layer",
                type: "raster",
                source: "traffic-flow",
                paint: { "raster-opacity": 0.8 },
              });
            })
            .catch((err) => console.warn("Traffic service failed", err));
        }
      });

      // Handle window resize to resize the map
      const handleResize = () => {
        if (map.current) {
          map.current.resize();
        }
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    // --- USER MARKER ---
    if (userLocation) {
      if (userMarker.current) userMarker.current.remove();
      userMarker.current = new tt.Marker({ color: "#3498db" })
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new tt.Popup().setText("You are here"))
        .addTo(map.current);
    }

    // --- CORRIDOR MARKER ---
    if (corridor) {
      if (corridorMarker.current) corridorMarker.current.remove();

      const color =
        traffic === "LOW"
          ? "#2ecc71"
          : traffic === "MEDIUM"
          ? "#f1c40f"
          : "#e74c3c";

      // If user exists, show nearest corridor marker
      const markerPosition = userLocation
        ? [corridor.center.lng, corridor.center.lat]
        : [corridor.points[0].lng, corridor.points[0].lat]; // fallback

      corridorMarker.current = new tt.Marker({ color })
        .setLngLat(markerPosition)
        .setPopup(
          new tt.Popup().setText(
            `${corridor.name}${
              userLocation
                ? `\nDistance: ${getDistanceKm(
                    userLocation.lat,
                    userLocation.lng,
                    corridor.center.lat,
                    corridor.center.lng
                  ).toFixed(2)} km`
                : ""
            }`
          )
        )
        .addTo(map.current);

      // --- LINE FROM USER TO CORRIDOR ---
      const lineLayerId = "user-corridor-line";
      if (userLocation) {
        if (map.current.getLayer(lineLayerId)) {
          map.current.removeLayer(lineLayerId);
          map.current.removeSource(lineLayerId);
        }

        map.current.addSource(lineLayerId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [userLocation.lng, userLocation.lat],
                [corridor.center.lng, corridor.center.lat],
              ],
            },
          },
        });

        map.current.addLayer({
          id: lineLayerId,
          type: "line",
          source: lineLayerId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3498db",
            "line-width": 3,
            "line-dasharray": [2, 4],
          },
        });

        // Distance
        const distance = getDistanceKm(
          userLocation.lat,
          userLocation.lng,
          corridor.center.lat,
          corridor.center.lng
        ).toFixed(2);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDistanceKm(distance);
      }

      // --- DRAW FULL CORRIDOR ROUTE IF NO USER LOCATION ---
      if (!userLocation && corridor.points?.length) {
        const corridorLineId = "corridor-line";

        if (map.current.getLayer(corridorLineId)) {
          map.current.removeLayer(corridorLineId);
          map.current.removeSource(corridorLineId);
        }

        map.current.addSource(corridorLineId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: corridor.points.map((p) => [p.lng, p.lat]),
            },
          },
        });

        map.current.addLayer({
          id: corridorLineId,
          type: "line",
          source: corridorLineId,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#e67e22", "line-width": 3, "line-dasharray": [2, 4] },
        });

        // Optional: add small markers for all points
        corridor.points.forEach((p) => {
          new tt.Marker({ color: "#e67e22", scale: 0.7 })
            .setLngLat([p.lng, p.lat])
            .addTo(map.current);
        });
      }
    }

    // Fly to map center
    map.current.flyTo({
      center: [center.lng, center.lat],
      zoom: 14,
    });
  }, [center, userLocation, corridor, traffic]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
  ref={mapRef}
  className="map-container"
  style={{
    height: "50vh", // adjust as needed; 50-60% of screen height
    width: "100%",
    borderRadius: "8px",
  }}
/>

      {distanceKm && (
        <p style={{ marginTop: "0.5rem" }}>
          Distance to corridor: {distanceKm} km
        </p>
      )}
    </div>
  );
}
