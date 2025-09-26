import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles } from "lucide-react";

export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  courses?: RecommendedCourse[];
}

export interface RecommendedCourse {
  id: string;
  code: string;
  name: string;
  rating: number;
  reason: string;
}

interface AIChatbotProps {
  onSendMessage?: (message: string) => Promise<ChatMessage>;
  className?: string;
  initialMessage?: string;
}

export default function AIChatbot({ onSendMessage, className, initialMessage }: AIChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: initialMessage || "Hi! I'm your AI Course Advisor. I can help you find the perfect courses based on your interests, check prerequisites, and provide guidance on credit transfers. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      if (onSendMessage) {
        const botResponse = await onSendMessage(inputMessage);
        setMessages(prev => [...prev, botResponse]);
      } else {
        // Mock response for demo
        setTimeout(() => {
          const mockResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: generateMockResponse(inputMessage),
            isBot: true,
            timestamp: new Date(),
            courses: inputMessage.toLowerCase().includes('data science') ? [
              {
                id: '1',
                code: 'CS 180',
                name: 'Introduction to Data Science',
                rating: 4.3,
                reason: 'Perfect foundation for data science with Python programming'
              },
              {
                id: '2', 
                code: 'STAT 200',
                name: 'Statistical Methods',
                rating: 4.1,
                reason: 'Essential statistics background for data analysis'
              }
            ] : undefined
          };
          setMessages(prev => [...prev, mockResponse]);
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const generateMockResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('data science')) {
      return "Great choice! Data Science is a rapidly growing field. Based on your interest, I'd recommend starting with the courses below. They'll give you a solid foundation in programming and statistics, which are essential for data science.";
    } else if (lowerInput.includes('transfer')) {
      return "I can help you with credit transfers! To provide the best guidance, I'll need to know: 1) What courses have you completed? 2) Which institution are you transferring to? 3) What's your target program? This information will help me check equivalencies and requirements.";
    } else if (lowerInput.includes('prerequisite')) {
      return "I'd be happy to help you check prerequisites! Which course are you interested in taking? I can review the requirements and suggest any preparatory courses you might need.";
    } else {
      return "That's an interesting question! I'm here to help with course recommendations, prerequisites, credit transfers, and academic planning. Could you tell me more about what you're looking to study or any specific academic goals you have?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={`flex flex-col h-96 ${className}`} data-testid="chat-container">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Course Advisor</h3>
            <p className="text-xs text-muted-foreground">Online • Ready to help</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-4" ref={scrollAreaRef}>
          <div className="py-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}>
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className={message.isBot ? 'bg-primary text-primary-foreground' : 'bg-secondary'}>
                    {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`flex-1 space-y-2 ${message.isBot ? '' : 'flex flex-col items-end'}`}>
                  <div className={`p-3 rounded-lg max-w-xs ${
                    message.isBot 
                      ? 'bg-muted text-muted-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`} data-testid={`message-${message.id}`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {/* Course recommendations */}
                  {message.courses && (
                    <div className="space-y-2 max-w-xs">
                      {message.courses.map((course) => (
                        <div key={course.id} className="bg-card border border-card-border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm">{course.code}</h4>
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <span>★ {course.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{course.name}</p>
                          <p className="text-xs text-muted-foreground">{course.reason}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t border-border p-4">
        <div className="flex w-full gap-2">
          <Input
            ref={inputRef}
            placeholder="Ask about courses, prerequisites, or credit transfers..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
            data-testid="input-chat-message"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            size="icon"
            data-testid="button-send-message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}