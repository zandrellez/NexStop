// src/components/InputForm.jsx
import { useEffect, useState } from "react";

export default function InputForm({ result, status, onChange }) {
  const [traffic, setTraffic] = useState("");
  const [wait, setWait] = useState("");

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
            onChange?.({ traffic: e.target.value, wait });
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
            onChange?.({ traffic, wait: e.target.value });
          }}
          style={styles.input}
        />

        <p style={styles.hint}>
          You can manually override values here.
        </p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "16px",
    padding: "2rem",
    width: "90%",
    maxWidth: "420px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
  },
  title: {
    marginBottom: "1.5rem",
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
    marginBottom: "1.2rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  hint: {
    fontSize: "0.85rem",
    color: "#555",
    textAlign: "center",
  },
};
