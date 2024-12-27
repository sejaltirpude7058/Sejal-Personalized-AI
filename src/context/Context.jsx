// ContextProvider.js
import { createContext, useState } from "react";
import run from "../config/myAI";

export const Context = createContext(null);

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [selectedCardPrompt, setSelectedCardPrompt] = useState("");

  // Helper function to delay rendering paragraphs
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  // Reset chat state
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput("");
    setResultData("");
    setSelectedCardPrompt("");
  };

  // Handle prompt submission and API call
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    const finalPrompt = prompt || selectedCardPrompt || input;
    setRecentPrompt(finalPrompt);

    try {
      let response = await run(finalPrompt);

      // Update previous prompts
      setPrevPrompts((prev) =>
        prev.includes(finalPrompt) ? prev : [...prev, finalPrompt]
      );

      // Handle response format
      if (response && typeof response === "object") {
        response = response.text || ""; // Adjust based on API response
      }
      if (typeof response !== "string") {
        response = JSON.stringify(response);
      }

      // Parse and format response
      const responseArray = response.split("**");
      let formattedResponse = "";
      responseArray.forEach((chunk, i) => {
        formattedResponse += i % 2 === 1 ? `<b>${chunk}</b>` : chunk;
      });

      const responseWithBreaks = formattedResponse.split("*").join("<br>");
      const responseWords = responseWithBreaks.split(" ");
      responseWords.forEach((word, i) => delayPara(i, `${word} `));
    } catch (error) {
      console.error("Error in onSent:", error);
    } finally {
      setLoading(false);
      setInput("");
      setSelectedCardPrompt("");
    }
  };

  // Context value
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    input,
    setInput,
    newChat,
    setSelectedCardPrompt,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
