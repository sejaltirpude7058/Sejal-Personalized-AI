import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log("API Key:", apiKey);


if (!apiKey) {
  throw new Error(
    "API key is missing. Please set REACT_APP_GEMINI_API_KEY in your .env file."
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    console.log("API Response:", result); // Debugging the response structure

    // Extracting the text response
    let responseText = "No valid response received"; // Default fallback

    // Check if result.response.text exists and is a function
    if (result?.response?.text && typeof result.response.text === "function") {
      responseText = await result.response.text(); // Call the text function to get the response
    } else if (result?.text) {
      responseText = result.text; // Fallback if text is directly available
    }

    return responseText;
  } catch (error) {
    console.error("Error in run function:", error);
    return "An error occurred while processing your request.";
  }
}

export default run;


