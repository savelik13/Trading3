// This is the backend API route that calls OpenAI securely

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const apiKey = 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;//process.env.OPENAI_API_KEY;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "What were the most important news (Stock market related) that happened in the last 24 hours?",
          },
        ],
        temperature: 0.7,
      }),
    });

    if (openaiRes.status === 429) {
      return res.status(429).json({ error: "Rate limited. Try again later." });
    }

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || "No response";
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
}
