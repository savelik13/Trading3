import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MarketGrader from "./MarketGrader";
import MarketNews from "./MarketNews";

function App() {
  return (
    <Router>
      <div style={{ padding: "1rem", background: "#333", color: "#fff" }}>
        <Link to="/" style={{ marginRight: "1rem", color: "#fff" }}>📊 Grader</Link>
        <Link to="/news" style={{ color: "#fff" }}>📰 Market News</Link>
      </div>
      <Routes>
        <Route path="/" element={<MarketGrader />} />
        <Route path="/news" element={<MarketNews />} />        
      </Routes>
    </Router>
  );
}

export default App;
