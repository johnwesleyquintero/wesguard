import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface UseApiKeyResult {
  apiKey: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  isApiKeySet: boolean;
  apiKeyStatus: "" | "connected" | "error";
  apiKeyError: string | null;
  handleApiKeySubmit: () => Promise<void>;
  genAI: React.MutableRefObject<GoogleGenerativeAI | null>;
}

const useApiKey = (): UseApiKeyResult => {
  const [apiKey, setApiKey] = useState("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<"" | "connected" | "error">(
    "",
  );
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  const genAI = useRef<GoogleGenerativeAI | null>(null);

  const handleApiKeySubmit = async () => {
    if (!apiKey.trim()) {
      setApiKeyStatus("error");
      setApiKeyError("API Key cannot be empty.");
      return;
    }
    setApiKeyError(null); // Clear previous error

    try {
      // Test the API key by making a simple request
      const testAI = new GoogleGenerativeAI(apiKey.trim());
      const model = testAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Make a test request
      await model.generateContent("Hello");

      // If successful, set the API key (in-memory only)
      genAI.current = testAI;
      setIsApiKeySet(true);
      setApiKeyStatus("connected");
    } catch (error) {
      console.error("API key validation failed:", error);
      setApiKeyError((error as Error).message);
      setApiKeyStatus("error");
      setIsApiKeySet(false);
    }
  };

  return {
    apiKey,
    setApiKey,
    isApiKeySet,
    apiKeyStatus,
    apiKeyError,
    handleApiKeySubmit,
    genAI,
  };
};

export default useApiKey;
