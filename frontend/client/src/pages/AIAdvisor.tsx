import Navigation from "@/components/Navigation";
import AIChatbot from "@/components/AIChatbot";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Brain, MessageCircle, Sparkles, Users } from "lucide-react";

export default function AIAdvisor() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-4 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-primary" />
                AI Course Advisor
              </h1>
              <p className="text-muted-foreground">
                Get personalized course recommendations, check prerequisites, and receive guidance on your academic journey.
              </p>
            </div>
            
            <AIChatbot 
              className="h-[600px]"
              initialMessage="Hello! I'm your AI Course Advisor. I can help you with course recommendations, prerequisites, credit transfers, and academic planning. What would you like to explore today?"
            />
          </div>

          {/* Sidebar with Tips */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-semibold flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2 text-primary" />
                  How to Get Started
                </h3>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div>
                  <h4 className="font-medium mb-1">Ask About Interests</h4>
                  <p className="text-muted-foreground">
                    "What courses would be good for someone interested in data science?"
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Check Prerequisites</h4>
                  <p className="text-muted-foreground">
                    "What do I need to take before CS 250?"
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Credit Transfer</h4>
                  <p className="text-muted-foreground">
                    "Can I transfer my calculus credits from community college?"
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-semibold flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  What I Can Help With
                </h3>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Course recommendations based on your interests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Prerequisite and co-requisite checking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Credit transfer guidance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Academic pathway planning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Course difficulty and workload insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Major requirements and electives</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-semibold flex items-center">
                  <Users className="w-4 h-4 mr-2 text-primary" />
                  Popular Questions
                </h3>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="p-3 bg-muted rounded-md">
                  <p className="font-medium mb-1">"Best programming courses for beginners?"</p>
                  <p className="text-muted-foreground text-xs">Asked 247 times this week</p>
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <p className="font-medium mb-1">"Math requirements for engineering major?"</p>
                  <p className="text-muted-foreground text-xs">Asked 198 times this week</p>
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <p className="font-medium mb-1">"Transfer credits from AP classes?"</p>
                  <p className="text-muted-foreground text-xs">Asked 156 times this week</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">98%</div>
                  <p className="text-xs text-muted-foreground">Student satisfaction with AI recommendations</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}