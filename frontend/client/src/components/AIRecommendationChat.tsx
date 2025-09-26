import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { useState } from "react";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIRecommendationChatProps {
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}

export default function AIRecommendationChat({ onSendMessage, isLoading = false }: AIRecommendationChatProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: 'ai',
      content: "Hi! I'm your AI course advisor. I can help you find courses based on your interests, academic goals, or specific requirements. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Recommend easy courses to boost GPA",
        "Find programming courses for beginners", 
        "Show me courses with high ratings",
        "What courses help with problem-solving skills?"
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    onSendMessage?.(message);
    setMessage("");

    // TODO: remove mock functionality - simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Based on your query "${message}", I found several courses that might interest you. Here are my top recommendations:

**COMP SCI 1015 - Introduction to Programming** (4.3⭐)
- Perfect for learning problem-solving fundamentals
- Python-based, beginner-friendly
- High student satisfaction

**MATHS 1012 - Mathematical Foundations** (4.1⭐)
- Develops analytical thinking
- Moderate difficulty level
- Essential for many technical majors

Would you like more details about any of these courses?`,
        timestamp: new Date(),
        suggestions: [
          "Tell me more about COMP SCI 1015",
          "What are the easiest courses in semester 2?",
          "Show courses with no prerequisites"
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <Card className="h-full flex flex-col" data-testid="ai-chat-container">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          AI Course Advisor
          <Sparkles className="h-4 w-4 text-chart-3 ml-auto" />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4 min-h-0">
        <div className="flex-1 overflow-y-auto space-y-4" data-testid="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
              {msg.type === 'ai' && (
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <div className={`max-w-[85%] ${msg.type === 'user' ? 'order-2' : ''}`}>
                <div className={`p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : 'bg-muted'
                }`}>
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                </div>
                
                {msg.suggestions && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {msg.suggestions.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleSuggestionClick(suggestion)}
                        data-testid={`suggestion-${idx}`}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              
              {msg.type === 'user' && (
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about courses, requirements, or get recommendations..."
            disabled={isLoading}
            data-testid="input-chat-message"
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!message.trim() || isLoading}
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}