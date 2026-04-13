const generateSummary = async (req, res) => {
  try {
    const { review } = req.body;

    if (!review) {
      return res.status(400).json({
        success: false,
        message: "Review is required",
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                text: `Convert the following student review into exactly 3 short actionable bullet points.

                Rules:
                - Use bullet points (•)
                - Keep each point short
                - Be specific and actionable

                Review:
                ${review}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    let summary = "Could not generate summary";

    try {
    if (data?.candidates?.length > 0) {
        const candidate = data.candidates[0];

        // Case 1: Normal structure
        if (candidate.content?.parts) {
        summary = candidate.content.parts
            .map((p) => p.text)
            .join("\n");
        }

        // Case 2: Direct text fallback
        else if (candidate.output) {
        summary = candidate.output;
        }
    }
    } catch (err) {
    console.error("Parsing error:", err);
    }

    res.json({
      success: true,
      summary,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI summary failed (Gemini)",
    });
  }
};

module.exports = { generateSummary };