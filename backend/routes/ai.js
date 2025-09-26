const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/prompt", async (req, res) => {
  try {
    const { value } = req.body;

    const response = await axios.post(
      "https://core-api.pickaxe.co/pickaxe/sse",
      {
        formId: "W1LT4EX7FF",
        responseId: "PT25Y1HAVVDAHX5",
        studioUserId: "USER02O8TXLA40BIB0O",
        value,
      },
      {
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
          Origin: "https://studio.pickaxe.co",
          Referer: "https://studio.pickaxe.co/",
        },
        responseType: "stream", // <--- streaming mode
      }
    );

    let fullText = "";

    response.data.on("data", (chunk) => {
      const lines = chunk.toString().split("\n");

      for (const line of lines) {
        if (line.startsWith("data:")) {
          try {
            const json = JSON.parse(line.replace(/^data:\s*/, ""));
            if (json.token) {
              fullText += json.token;
            }
          } catch (err) {
            // ignore parse errors on non-JSON lines
          }
        }
      }
    });

    response.data.on("end", () => {
      res.send(fullText);
    });

  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to fetch AI response" });
    }
  }
});

module.exports = router;
