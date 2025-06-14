import React, { useState } from "react";

const CRITERIA = [
  { label: "SPY current position", key: "spy", weight: 0.1 },
  { label: "QQQ current position", key: "qqq", weight: 0.1 },
  { label: "IWM current position", key: "iwm", weight: 0.1 },
  { label: "High-Quality Setups", key: "highQuality", weight: 0.15 },
  { label: "Low-Quality Setups", key: "lowQuality", weight: 0.05 },
  { label: "Distance from Moving Averages", key: "maDistance", weight: 0.1 },
  { label: "Breakouts Follow-Through (Last 5 Days)", key: "breakouts", weight: 0.15 },
  { label: "Setup Visibility (Are they screaming?)", key: "screaming", weight: 0.15 },
];

function MarketGrader() {
  const [inputs, setInputs] = useState({});
  const [score, setScore] = useState(null);

  const handleChange = (key, value) => {
    setInputs({ ...inputs, [key]: Number(value) });
  };

  const calculateScore = () => {
    let total = 0;
    CRITERIA.forEach((item) => {
      const value = inputs[item.key] || 0;
      total += value * item.weight * 10;
    });
    setScore(Math.round(total));
  };

  const label =
    score >= 80
      ? "🌟 Excellent Swing Trading Conditions"
      : score >= 60
      ? "⚠️ Mixed or Cautious Environment"
      : "🚫 Poor Conditions – Be Careful";

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
      <h1>📈 Swing Trading Market Grader</h1>
      {CRITERIA.map((item) => (
        <div key={item.key} style={{ marginBottom: "1rem" }}>
          <label>{item.label}</label>
          <input
            type="number"
            min="1"
            max="10"
            value={inputs[item.key] || ""}
            onChange={(e) => handleChange(item.key, e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
      ))}
      <button onClick={calculateScore} style={{ padding: "1rem", fontWeight: "bold", marginTop: "1rem" }}>
        Calculate Score
      </button>
      {score !== null && (
        <div style={{ marginTop: "2rem", padding: "1rem", background: "#f0f0f0", borderRadius: "10px" }}>
          <h2>Total Score: {score} / 100</h2>
          <p>{label}</p>
        </div>
      )}
    </div>
  );
}

export default MarketGrader;
