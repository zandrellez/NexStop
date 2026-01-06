import { useEffect, useState } from "react";
import corridors from "../data/corridors";
import { findNearestCorridor } from "../utils/geo";
import { getTrafficScore, adjustWaitTime } from "../utils/traffic";
import MapView from "./MapView";
import InputForm from "./InputForm";

export default function LocationPicker() {
  const DEFAULT_CENTER = { lat: 14.5995, lng: 120.9842 }; // Manila

  const [permission, setPermission] = useState("pending"); 
  const [status, setStatus] = useState("loading"); 
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [userLocation, setUserLocation] = useState(null);
  const [result, setResult] = useState(null);
const [showOverlay, setShowOverlay] = useState(false);

  const handleResultChange = ({ traffic, wait }) => {
  setResult((prev) => ({
    ...prev,
    traffic,
    wait,
  }));
};


  // Ask for location on load
  useEffect(() => {
    if (!navigator.geolocation) {
      setPermission("denied");
      setStatus("manual");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setPermission("granted");

        const userLoc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(userLoc);

        const corridor = findNearestCorridor(userLoc.lat, userLoc.lng);
        if (corridor) {
          await processCorridor(corridor); 
          setCenter(corridor.center);      
        } else {
          console.log("No corridor found near user");
          setCenter(userLoc);              
        }
      },
      () => {
        setPermission("denied");
        setStatus("manual");
      }
    );
  }, []);

  const processCorridor = async (corridor, userLoc = userLocation) => {
    setStatus("checking-traffic");
    try {
      let traffic, wait;

      if (userLoc) {
        traffic = await getTrafficScore(corridor.center.lat, corridor.center.lng);
        wait = adjustWaitTime(corridor.baseWait, traffic);
      } else if (corridor?.points?.length) {
        const trafficValues = await Promise.all(
          corridor.points.map(async (p) => {
            try {
              return await getTrafficScore(p.lat, p.lng);
            } catch {
              return "UNKNOWN";
            }
          })
        );

        const trafficMap = { LOW: 1, MEDIUM: 2, HIGH: 3, UNKNOWN: 0 };
        const sum = trafficValues.reduce(
          (acc, t) => acc + (trafficMap[t] || 0),
          0
        );
        const avg = sum / trafficValues.length;

        if (avg <= 1.5) traffic = "LOW";
        else if (avg <= 2.5) traffic = "MEDIUM";
        else traffic = "HIGH";

        wait = adjustWaitTime(corridor.baseWait, traffic);
      } else {
        traffic = "UNKNOWN";
        wait = corridor.baseWait;
      }

      setResult({ corridor, traffic, wait });
      setCenter(userLoc || corridor.points[0]);
      setStatus("done");
      setShowOverlay(true);
    } catch (err) {
      console.error("Traffic fetch failed", err);
      setResult({ corridor, traffic: "UNKNOWN", wait: corridor.baseWait });
      setCenter(userLoc || corridor.points[0]);
      setStatus("done");
    }
  };

  return (
    <div className="app-container">
      {/* Map */}
      <MapView
        center={center}
        userLocation={userLocation}
        corridor={result?.corridor}
        traffic={result?.traffic}
      />

      <InputForm
  result={result}
  status={status}
  onChange={handleResultChange}
/>



      {/* Manual corridor dropdown overlay */}
      {status === "manual" && permission === "denied" && (
        <div className="overlay-dropdown">
          <select
            onChange={async (e) => {
              const selectedId = parseInt(e.target.value);
              const selectedCorridor = corridors.find((c) => c.id === selectedId);
              if (selectedCorridor) await processCorridor(selectedCorridor);
            }}
          >
            <option value="">Select a corridor</option>
            {corridors.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Status messages 
      {status === "loading" && (
        <div className="overlay-dropdown">
          Requesting location access…
        </div>
      )}
      {status === "checking-traffic" && (
        <div className="overlay-dropdown">
          Checking traffic…
        </div>
      )}*/}

      {/* Result panel at bottom 
      {result && status === "done" && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.9)",
            padding: "1rem 1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            zIndex: 999,
          }}
        >
          <h3>{result.corridor.name}</h3>
          <p>Traffic: {result.traffic}</p>
          <p>Estimated wait: {result.wait} minutes</p>
        </div>
      )}*/}
    </div>
  );
}
