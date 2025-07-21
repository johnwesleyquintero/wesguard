import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, Trash2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Button } from './components/Button';
import { Card } from './components/Card';
import PageHeader from './components/PageHeader';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
}

const ChatView: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [customInstructions, setCustomInstructions] = useState(
    'You are WesGuardAI, a helpful assistant integrated into the WesGuard PC optimization tool. Help users with their daily tasks, answer questions, and provide assistance with productivity and system optimization.'
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<'' | 'connected' | 'error'>(
    ''
  );
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const [isApiConfigCollapsed, setIsApiConfigCollapsed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const genAI = useRef<GoogleGenerativeAI | null>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedInstructions = localStorage.getItem(
      'wesguard-custom-instructions'
    );
    const savedMessages = localStorage.getItem('wesguard-chat-messages');

    if (savedInstructions) {
      setCustomInstructions(savedInstructions);
    }

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map(
          (msg: {
            id: string;
            type: 'user' | 'ai' | 'system';
            content: string;
            timestamp: string;
          }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })
        );
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('wesguard-chat-messages', JSON.stringify(messages));
    }
  }, [messages]);
  const handleApiKeySubmit = async () => {
    if (!apiKey.trim()) {
      setApiKeyStatus('error');
      return;
    }
    setApiKeyError(null);

    try {
      // Test the API key by making a simple request
      const testAI = new GoogleGenerativeAI(apiKey.trim());
      const model = testAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Make a test request
      await model.generateContent('Hello');

      // If successful, set the API key (in-memory only)
      genAI.current = testAI;
      setIsApiKeySet(true);
      setApiKeyStatus('connected');

      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'system',
        content: 'WesGuardAI is now connected and ready to help!',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, welcomeMessage]);
    } catch (error) {
      console.error('API key validation failed:', error);
      setApiKeyError((error as Error).message);
      setApiKeyStatus('error');
      setIsApiKeySet(false);
    }
  };

  const handleCustomInstructionsChange = (value: string) => {
    setCustomInstructions(value);
    localStorage.setItem('wesguard-custom-instructions', value);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !genAI.current || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const model = genAI.current.getGenerativeModel({
        model: 'gemini-1.5-flash',
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
        type: 'ai',
        content: aiResponseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content:
          'Sorry, I encountered an error while processing your message. Please check your API key and try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('wesguard-chat-messages');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
              {isApiConfigCollapsed ? 'Show' : 'Hide'}
            </Button>
          </div>
          {!isApiConfigCollapsed && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="api-key"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gemini API Key:
                </label>
                <input
                  id="api-key"
                  type="password"
                  className="form-input mt-1"
                  placeholder="Enter your Gemini API Key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  disabled={isApiKeySet}
                />
                {/* {apiKeyError && <p className="mt-2 text-sm text-red-600">{apiKeyError}</p>} */}
                <Button
                  onClick={handleApiKeySubmit}
                  disabled={isApiKeySet}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isApiKeySet ? 'Connected' : 'Connect'}
                </Button>
              </div>

              {apiKeyStatus && (
                <div
                  className={`mt-2 text-sm ${
                    apiKeyStatus === 'connected'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {apiKeyStatus === 'connected' &&
                    '✓ API Key connected successfully'}
                  {apiKeyStatus === 'error' &&
                    '✗ Invalid API Key or connection failed'}
                  {apiKeyError && (
                    <div className="text-red-500 text-xs mt-1">
                      {apiKeyError}
                    </div>
                  )}
                </div>
              )}

              {/* Custom Instructions Section */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">
                  Custom Instructions
                </h4>
                <textarea
                  className="form-input mt-1"
                  placeholder="Customize how WesGuardAI should behave and respond..."
                  value={customInstructions}
                  onChange={(e) =>
                    handleCustomInstructionsChange(e.target.value)
                  }
                  rows={5}
                ></textarea>
                {/* {customInstructionsError && <p className="mt-2 text-sm text-red-600">{customInstructionsError}</p>} */}
              </div>
            </>
          )}
        </Card>

        {/* Chat Messages Container */}
        <Card className="chat-messages-container p-4">
          <div className="chat-header flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Chat</h3>
            {messages.length > 0 && (
              <Button
                variant="danger"
                onClick={clearChat}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              >
                <Trash2 size={16} className="mr-2" />
                Clear Chat
              </Button>
            )}
          </div>

          <div className="chat-messages space-y-4">
            {messages.length === 0 ? (
              <div className="chat-empty-state text-center text-gray-500 py-10">
                <MessageSquare
                  size={48}
                  className="mx-auto mb-4 text-gray-400"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Welcome to WesGuardAI
                </h3>
                <p className="text-gray-600">
                  Start a conversation with your AI assistant. I can help you
                  with daily tasks, answer questions, and provide assistance
                  with productivity and system optimization.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-100 text-blue-800 ml-auto'
                      : message.type === 'ai'
                        ? 'bg-gray-100 text-gray-800 mr-auto'
                        : 'bg-yellow-100 text-yellow-800 text-center'
                  } max-w-3/4`}
                >
                  <div>{message.content}</div>
                  <div className="message-timestamp text-xs text-gray-500 mt-1 text-right">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="typing-indicator flex items-center text-gray-500">
                <span>WesGuardAI is typing</span>
                <div className="typing-dots ml-2 flex space-x-1">
                  <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
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
                ? 'Type your message here... (Press Enter to send, Shift+Enter for new line)'
                : 'Please connect your Gemini API key first'
            }
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
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
