import React, { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, Trash2 } from "lucide-react";
import "./ChatView.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatMessage {
  id: string;
  type: "user" | "ai" | "system";
  content: string;
  timestamp: Date;
}

const ChatView: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [customInstructions, setCustomInstructions] = useState(
    "You are WesGuardAI, a helpful assistant integrated into the WesGuard PC optimization tool. Help users with their daily tasks, answer questions, and provide assistance with productivity and system optimization."
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<"" | "connected" | "error">("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const genAI = useRef<GoogleGenerativeAI | null>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("wesguard-gemini-api-key");
    const savedInstructions = localStorage.getItem("wesguard-custom-instructions");
    const savedMessages = localStorage.getItem("wesguard-chat-messages");

    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsApiKeySet(true);
      setApiKeyStatus("connected");
      genAI.current = new GoogleGenerativeAI(savedApiKey);
    }

    if (savedInstructions) {
      setCustomInstructions(savedInstructions);
    }

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Error parsing saved messages:", error);
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("wesguard-chat-messages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleApiKeySubmit = async () => {
    if (!apiKey.trim()) {
      setApiKeyStatus("error");
      return;
    }

    try {
      // Test the API key by making a simple request
      const testAI = new GoogleGenerativeAI(apiKey.trim());
      const model = testAI.getGenerativeModel({ model: "gemini-pro" });
      
      // Make a test request
      await model.generateContent("Hello");
      
      // If successful, save the API key
      genAI.current = testAI;
      setIsApiKeySet(true);
      setApiKeyStatus("connected");
      localStorage.setItem("wesguard-gemini-api-key", apiKey.trim());
      
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "system",
        content: "WesGuardAI is now connected and ready to help!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, welcomeMessage]);
      
    } catch (error) {
      console.error("API key validation failed:", error);
      setApiKeyStatus("error");
      setIsApiKeySet(false);
    }
  };

  const handleCustomInstructionsChange = (value: string) => {
    setCustomInstructions(value);
    localStorage.setItem("wesguard-custom-instructions", value);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !genAI.current || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const model = genAI.current.getGenerativeModel({ model: "gemini-pro" });
      
      // Prepare the prompt with custom instructions and context
      const prompt = `${customInstructions}

User message: ${userMessage.content}

Please provide a helpful response.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponseText = response.text();

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "system",
        content: "Sorry, I encountered an error while processing your message. Please check your API key and try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("wesguard-chat-messages");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-view">
      <h2>WesGuardAI Chat</h2>
      
      <div className="chat-container">
        {/* API Key Setup Section */}
        <div className="api-setup-section">
          <h3>Gemini API Configuration</h3>
          
          <div className="api-key-input-group">
            <input
              type="password"
              className="api-key-input"
              placeholder="Enter your Gemini API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isApiKeySet}
            />
            <button
              className="api-key-button"
              onClick={handleApiKeySubmit}
              disabled={isApiKeySet}
            >
              {isApiKeySet ? "Connected" : "Connect"}
            </button>
          </div>
          
          {apiKeyStatus && (
            <div className={`api-key-status ${apiKeyStatus}`}>
              {apiKeyStatus === "connected" && "✓ API Key connected successfully"}
              {apiKeyStatus === "error" && "✗ Invalid API Key or connection failed"}
            </div>
          )}

          {/* Custom Instructions Section */}
          <div className="custom-instructions-section">
            <h4>Custom Instructions</h4>
            <textarea
              className="custom-instructions-textarea"
              placeholder="Customize how WesGuardAI should behave and respond..."
              value={customInstructions}
              onChange={(e) => handleCustomInstructionsChange(e.target.value)}
            />
          </div>
        </div>

        {/* Chat Messages Container */}
        <div className="chat-messages-container">
          <div className="chat-header">
            <h3>Chat</h3>
            {messages.length > 0 && (
              <button className="clear-chat-button" onClick={clearChat}>
                <Trash2 size={16} />
                Clear Chat
              </button>
            )}
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-empty-state">
                <MessageSquare size={48} />
                <h3>Welcome to WesGuardAI</h3>
                <p>
                  Start a conversation with your AI assistant. I can help you with daily tasks,
                  answer questions, and provide assistance with productivity and system optimization.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`chat-message ${message.type}`}>
                  <div>{message.content}</div>
                  <div className="message-timestamp">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="typing-indicator">
                <span>WesGuardAI is typing</span>
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="chat-input-container">
          <textarea
            className="chat-input"
            placeholder={
              isApiKeySet 
                ? "Type your message here... (Press Enter to send, Shift+Enter for new line)"
                : "Please connect your Gemini API key first"
            }
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isApiKeySet || isLoading}
            rows={1}
          />
          <button
            className="send-button"
            onClick={sendMessage}
            disabled={!isApiKeySet || !inputMessage.trim() || isLoading}
          >
            <Send size={18} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;