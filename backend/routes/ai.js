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
        responseId: "1NH2VC3A3EGUQYS",
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
      res.send(removeCharacter(fullText.slice(0, -6), "*"));
    });

  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to fetch AI response" });
    }
  }
});

function removeCharacter(str, charToRemove) {
  // Escape special regex characters so the RegExp doesn't break
  const escapedChar = charToRemove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return str.replace(new RegExp(escapedChar, 'g'), '');
}



module.exports = router;
