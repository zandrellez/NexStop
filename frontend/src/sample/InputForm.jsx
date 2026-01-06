// src/components/InputForm.jsx
import { useEffect, useState } from "react";

export default function InputForm({ result, status, onChange, onSubmit }) {
  const [traffic, setTraffic] = useState("");
  const [wait, setWait] = useState("");
  const [urgency, setUrgency] = useState("");
  const [weather, setWeather] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (result) {
      setTraffic(result.traffic || "");
      setWait(result.wait || "");
    }
  }, [result]);

  if (!result || status !== "done") return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>{result.corridor.name}</h2>

        {/* Traffic Input */}
        <label style={styles.label}>Traffic Level</label>
        <select
          value={traffic}
          onChange={(e) => {
            setTraffic(e.target.value);
            onChange?.({ traffic: e.target.value, wait, urgency, weather, budget });
          }}
          style={styles.input}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="UNKNOWN">UNKNOWN</option>
        </select>

        {/* Wait Time Input */}
        <label style={styles.label}>Estimated Wait (minutes)</label>
        <input
          type="number"
          value={wait}
          onChange={(e) => {
            setWait(e.target.value);
            onChange?.({ traffic, wait: e.target.value, urgency, weather, budget });
          }}
          style={styles.input}
        />

        {/* Urgency */}
        <label style={styles.label}>How urgent is your trip?</label>
        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="not_urgent">Not urgent</option>
          <option value="somehow_urgent">Somehow urgent</option>
          <option value="urgent">Urgent</option>
        </select>

        {/* Weather */}
        <label style={styles.label}>Current Weather</label>
        <select
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="clear">Clear</option>
          <option value="gloomy">Gloomy</option>
          <option value="rainy">Rainy</option>
        </select>

        {/* Budget */}
        <label style={styles.label}>Budget Preference</label>
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="low-cost">Low-cost</option>
          <option value="balanced">Balanced</option>
          <option value="comfort">Comfort</option>
        </select>


        {/* Submit Button */}
        <button
          style={styles.button}
          onClick={() =>
            onSubmit?.({ traffic, wait, urgency, weather, budget, corridor: result.corridor })
          }
        >
          Wait
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2000,
    display: "flex",
    justifyContent: "center",
    paddingBottom: "10px", // Space from bottom
    pointerEvents: "none", // allows map interaction outside card
  },
  card: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "16px",
    padding: "1.5rem",
    width: "95%",
    maxWidth: "420px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    pointerEvents: "all", // allow clicks inside the card
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center",
  },
  label: {
    display: "block",
    marginBottom: "0.4rem",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  hint: {
    fontSize: "0.85rem",
    color: "#555",
    textAlign: "center",
    marginBottom: "1rem",
  },
  button: {
    padding: "12px",
    backgroundColor: "#26C1E0",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
  },
};
