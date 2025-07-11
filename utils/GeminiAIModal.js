import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing Gemini API Key. Set NEXT_PUBLIC_GEMINI_API_KEY in your .env file.");
}

// Initialize the AI model
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Start a chat session (async function)

export  const chatSession = model.startChat({
  generationConfig,
 
// safetySettings: Adjust safety settings
// See https://ai.google.dev/gemini-api/docs/safety-settings
 
});
