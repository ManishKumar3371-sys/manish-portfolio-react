
import dotenv from "dotenv";

dotenv.config();

async function testGeminiREST() {
  try {
    console.log("Testing Gemini REST API...");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/interactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          model: "gemini-3.8-flash",
          input: "Reply with exactly: GEMINI_OK",
        }),
      }
    );

    const data = await response.json();

    console.log("HTTP Status:", response.status);

    if (response.ok) {
      const output = data.steps?.find(
        (step) => step.type === "model_output"
      );

      console.log("Gemini Reply:", output?.content);
    } else {
      console.log("API Error:", data);
    }
  } catch (error) {
    console.log("Connection Error:", error.message);
  }
}

testGeminiREST();
