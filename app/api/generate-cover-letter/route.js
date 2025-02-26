import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const body = await req.json();
    const { jobTitle, experience, skills } = body;

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "API key is missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a professional cover letter for a ${jobTitle} role. The candidate has ${experience} years of experience and skills in ${skills}. Make it concise and impactful.`;

    const result = await model.generateContent([prompt]);
    const response = result.response;

    // Extract text properly
    const coverLetter = response.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate cover letter.";

    return new Response(JSON.stringify({ coverLetter }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return new Response(JSON.stringify({ error: "Failed to generate cover letter.", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
