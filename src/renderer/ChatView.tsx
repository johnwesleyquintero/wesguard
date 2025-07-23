import React, { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, Trash2, KeyRound } from "lucide-react";

import { Button } from "./components/Button";
import { Card } from "./components/Card";
import PageHeader from "./components/PageHeader";
import ValidatedInput from "./components/ValidatedInput";
import LoadingIndicator from "./components/LoadingIndicator";
import EmptyState from "./components/EmptyState";
import useApiKey from "./hooks/useApiKey";

interface ChatMessage {
  id: string;
  type: "user" | "ai" | "system";
  content: string;
  timestamp: Date;
}

const ChatView: React.FC = () => {
  const {
    apiKey,
    setApiKey,
    isApiKeySet,
    apiKeyStatus,
    apiKeyError,
    handleApiKeySubmit,
    genAI,
  } = useApiKey();
  const [customInstructions, setCustomInstructions] = useState(
    "You are WesGuardAI, a helpful assistant integrated into the WesGuard PC optimization tool. Help users with their daily tasks, answer questions, and provide assistance with productivity and system optimization.",
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customInstructionsError, setCustomInstructionsError] = useState<
    string | null
  >(null);
  const [isApiConfigCollapsed, setIsApiConfigCollapsed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedInstructions = localStorage.getItem(
      "wesguard-custom-instructions",
    );
    const savedMessages = localStorage.getItem("wesguard-chat-messages");

    if (savedInstructions) {
      setCustomInstructions(savedInstructions);
    }

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map(
          (msg: {
            id: string;
            type: "user" | "ai" | "system";
            content: string;
            timestamp: string;
          }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }),
        );
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

  // Add welcome message when API key is set
  useEffect(() => {
    if (isApiKeySet && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "system",
        content: "WesGuardAI is now connected and ready to help!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, welcomeMessage]);
    }
  }, [isApiKeySet, messages.length]);

  const handleCustomInstructionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    const value = e.target.value;
    setCustomInstructions(value);
    localStorage.setItem("wesguard-custom-instructions", value);
    if (value.trim().length < 10) {
      setCustomInstructionsError(
        "Custom instructions should be at least 10 characters long.",
      );
    } else {
      setCustomInstructionsError(null);
    }
  };

  const sendMessage = async (): Promise<void> => {
    if (!inputMessage.trim() || !genAI.current || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const model = genAI.current.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

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
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "system",
        content:
          "Sorry, I encountered an error while processing your message. Please check your API key and try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const clearChat = (): void => {
    setMessages([]);
    localStorage.removeItem("wesguard-chat-messages");
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chat-view">
      <PageHeader title="WesGuardAI Chat" />

      <div className="chat-container">
        {/* API Key Setup Section */}
        <Card className="api-setup-section">
          <div className="api-setup-header">
            <h3>Gemini API Configuration</h3>
            <Button
              variant="ghost"
              onClick={() => setIsApiConfigCollapsed(!isApiConfigCollapsed)}
            >
              {isApiConfigCollapsed ? "Show" : "Hide"}
            </Button>
          </div>
          {!isApiConfigCollapsed && (
            <>
              <ValidatedInput
                id="api-key"
                label="Gemini API Key:"
                type="password"
                placeholder="Enter your Gemini API Key"
                value={apiKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setApiKey(e.target.value)
                }
                disabled={isApiKeySet}
                error={apiKeyError}
              />
              <Button
                onClick={handleApiKeySubmit}
                disabled={isApiKeySet}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isApiKeySet ? "Connected" : "Connect"}
              </Button>

              {apiKeyStatus === "connected" && (
                <div className="mt-2 text-sm text-green-600 flex items-center">
                  <KeyRound size={16} className="mr-1" /> API Key connected
                  successfully!
                </div>
              )}
              {apiKeyStatus === "error" && (
                <div className="mt-2 text-sm text-red-600">
                  <EmptyState
                    icon={<KeyRound size={48} />}
                    message={
                      apiKeyError ||
                      "Invalid API Key or connection failed. Please check your key and try again."
                    }
                    callToAction={
                      <Button onClick={() => setIsApiConfigCollapsed(false)}>
                        Configure API Key
                      </Button>
                    }
                  />
                </div>
              )}

              {/* Custom Instructions Section */}
              <h4 className="text-lg font-semibold mb-2">
                Custom Instructions
              </h4>
              <ValidatedInput
                id="custom-instructions"
                isTextArea
                placeholder="Customize how WesGuardAI should behave and respond..."
                value={customInstructions}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleCustomInstructionsChange(e)
                }
                rows={5}
                error={customInstructionsError}
              />
            </>
          )}
        </Card>

        {/* Chat Messages Container */}
        <Card className="chat-messages-container p-4">
          <div className="chat-header flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Chat</h3>
            {messages.length > 0 && (
              <Button
                variant="destructive"
                onClick={clearChat}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              >
                <Trash2 size={16} className="mr-2" />
                Clear Chat
              </Button>
            )}
          </div>

          <div className="chat-messages space-y-4">
            {!isApiKeySet && apiKeyStatus !== "error" ? (
              <EmptyState
                icon={<KeyRound size={48} />}
                message="Please connect your Gemini API key to start chatting with WesGuardAI."
                callToAction={
                  <Button onClick={() => setIsApiConfigCollapsed(false)}>
                    Configure API Key
                  </Button>
                }
              />
            ) : messages.length === 0 && isApiKeySet ? (
              <EmptyState
                icon={<MessageSquare size={48} />}
                message="Welcome to WesGuardAI! Start a conversation with your AI assistant."
                callToAction={null}
              />
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${
                    message.type === "user"
                      ? "user-message"
                      : message.type === "ai"
                        ? "ai-message"
                        : "system-message"
                  }`}
                >
                  <div className="message-content">{message.content}</div>
                  <div className="message-timestamp">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <LoadingIndicator message="WesGuardAI is typing..." />
            )}

            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Chat Input */}
        <div className="chat-input-container flex items-center p-4 border-t border-gray-200 bg-white">
          <textarea
            className="form-input flex-grow mr-4 resize-none"
            placeholder={
              isApiKeySet
                ? "Type your message here... (Press Enter to send, Shift+Enter for new line)"
                : "Please connect your Gemini API key first"
            }
            value={inputMessage}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputMessage(e.target.value)
            }
            onKeyPress={handleKeyPress}
            disabled={!isApiKeySet || isLoading}
            rows={1}
          />
          <Button
            onClick={sendMessage}
            disabled={!isApiKeySet || !inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <Send size={18} className="mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
