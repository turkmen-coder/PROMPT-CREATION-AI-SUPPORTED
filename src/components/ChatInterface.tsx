import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  Copy, 
  RefreshCw, 
  Paperclip, 
  Mic, 
  Image,
  MoreVertical,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Settings
} from 'lucide-react';
import { callAI, getAPISettings } from '../lib/apiService';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'error';
  content: string;
  timestamp: Date;
  reaction?: 'like' | 'dislike';
  error?: boolean;
}

const quickSuggestions = [
  'Write Python function',
  'Analyze data', 
  'Create marketing plan',
  'Code optimization'
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const settings = getAPISettings();
    const hasAnyApiKey = settings.openaiApiKey || settings.geminiApiKey || settings.claudeApiKey;
    
    if (!hasAnyApiKey) {
      return [{
        id: '1',
        type: 'error',
        content: '⚠️ API Key required! To use NEXUS AI, please enter at least one API key (OpenAI, Gemini or Claude) from the Settings section.',
        timestamp: new Date(),
        error: true
      }];
    }
    
    return [{
      id: '1',
      type: 'ai',
      content: 'Hello! I am your NEXUS AI assistant. How can I help you? 🚀',
      timestamp: new Date(),
    }];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentProvider, setCurrentProvider] = useState('auto');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    const messageContent = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Real API call
      const response = await callAI(messageContent);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: response.error ? 'error' : 'ai',
        content: response.error || response.message,
        timestamp: new Date(),
        error: !!response.error
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Update current provider info
      if (!response.error) {
        const settings = getAPISettings();
        if (settings.openaiApiKey) setCurrentProvider('OpenAI GPT-4');
        else if (settings.geminiApiKey) setCurrentProvider('Google Gemini');
        else if (settings.claudeApiKey) setCurrentProvider('Claude Sonnet');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: `❌ An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReaction = (messageId: string, reaction: 'like' | 'dislike') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, reaction } : msg
      )
    );
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Chat Header */}
      <Card className="nexus-neon-card rounded-none border-b border-purple-400/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center nexus-floating">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">NEXUS AI Assistant</CardTitle>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${
                    getAPISettings().openaiApiKey || getAPISettings().geminiApiKey || getAPISettings().claudeApiKey 
                      ? 'bg-green-400' : 'bg-red-400'
                  }`}></span>
                  {currentProvider !== 'auto' ? currentProvider : 
                    getAPISettings().openaiApiKey || getAPISettings().geminiApiKey || getAPISettings().claudeApiKey 
                      ? 'AI Ready' : 'API Key Required'
                  }
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white"
              onClick={() => {
                // Navigate to settings tab
                const event = new CustomEvent('navigate-to-settings');
                window.dispatchEvent(event);
              }}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-purple-500/5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} chat-message`}
          >
            <div className={`flex max-w-[80%] gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600' 
                  : message.type === 'error'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600'
              } nexus-hover-glow`}>
                {message.type === 'user' ? 
                  <User className="w-4 h-4 text-white" /> : 
                  message.type === 'error' ?
                  <AlertCircle className="w-4 h-4 text-white" /> :
                  <Bot className="w-4 h-4 text-white" />
                }
              </div>
              <div>
                <Card className={`${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-400/50' 
                    : message.type === 'error'
                    ? 'bg-gradient-to-r from-red-600/20 to-orange-600/20 border-red-400/50'
                    : 'nexus-neon-card'
                } ${message.type === 'user' ? 'rounded-2xl rounded-br-sm' : 'rounded-2xl rounded-bl-sm'}`}>
                  <CardContent className="p-3">
                    <p className={`text-sm leading-relaxed ${message.type === 'ai' ? 'text-gray-200' : 'text-white'}`}>
                      {message.content}
                    </p>
                  </CardContent>
                </Card>
                <div className={`flex items-center gap-2 mt-1 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.type === 'ai' && (
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0 hover:bg-green-500/20"
                        onClick={() => handleReaction(message.id, 'like')}
                      >
                        <ThumbsUp className={`w-3 h-3 ${message.reaction === 'like' ? 'text-green-400' : 'text-gray-500'}`} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0 hover:bg-red-500/20"
                        onClick={() => handleReaction(message.id, 'dislike')}
                      >
                        <ThumbsDown className={`w-3 h-3 ${message.reaction === 'dislike' ? 'text-red-400' : 'text-gray-500'}`} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0 hover:bg-purple-500/20"
                        onClick={() => copyMessage(message.content)}
                      >
                        <Copy className="w-3 h-3 text-gray-500" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start chat-message">
            <div className="flex max-w-[80%] gap-2 items-end">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <Card className="nexus-neon-card rounded-2xl rounded-bl-sm">
                <CardContent className="p-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickSuggestions.map((suggestion) => (
            <Badge
              key={suggestion}
              variant="outline"
              className="cursor-pointer whitespace-nowrap border-purple-400/30 text-gray-300 hover:bg-purple-500/20 hover:text-white nexus-hover-glow"
              onClick={() => setInput(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <Card className="nexus-neon-card rounded-none border-t border-purple-400/30">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-9 w-9 p-0">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-9 w-9 p-0">
                <Image className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-9 w-9 p-0">
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <Textarea
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 min-h-[40px] max-h-32 resize-none nexus-neon-card border-purple-400/30 text-white placeholder:text-gray-400"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white nexus-hover-glow h-9 w-9 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <Button
        size="sm"
        className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg nexus-hover-glow nexus-floating"
      >
        <Sparkles className="w-5 h-5" />
      </Button>
    </div>
  );
}