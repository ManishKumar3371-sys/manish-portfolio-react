
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    timeout: 30000,
  },
});

async function testGemini() {
  try {
    console.log("Testing Gemini API...");

    const result = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: "Reply with exactly: GEMINI_OK",
      generation_config: {
        thinking_level: "low",
      },
    });

    console.log("Gemini Reply:", result.output_text);
  } catch (error) {
    console.log("Error Status:", error.status);
    console.log("Error Message:", error.message);
  }
}

testGemini();
