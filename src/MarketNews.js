import React, { useEffect, useState } from "react";

function MarketNews() {
  const [news, setNews] = useState([]);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || "No response";
      setNews((prev) => [reply, ...prev]);
      setLastFetched(new Date().toLocaleString());
    } catch (err) {
      console.error("Error fetching news:", err.message);
      setNews((prev) => ["Error fetching news."]);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: "2rem" }}>
      <h2>📰 Market News (Last 24 Hours)</h2>
      <p><strong>Last updated:</strong> {lastFetched}</p>
      <ul>
        {news.map((item, index) => (
          <li key={index} style={{ marginBottom: "1rem", background: "#f1f1f1", padding: "1rem", borderRadius: "8px" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MarketNews;
