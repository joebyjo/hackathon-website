import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import AIRecommendationChat from "@/components/AIRecommendationChat";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Discussions from "@/pages/Discussions";
import NotFound from "@/pages/not-found";

function Router({ onAIClick }: { onAIClick: () => void }) {
  return (
    <Switch>
      <Route path="/" component={() => <Home onAIClick={onAIClick} />} />
      <Route path="/my-courses" component={Profile} />
      <Route path="/profile" component={Profile} />
      <Route path="/discussions" component={Discussions} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [, setLocation] = useLocation();
  const [showAIChat, setShowAIChat] = useState(false);

  const handleSearchClick = () => {
    console.log("Search triggered");
    // TODO: Implement search functionality
  };

  const handleAIClick = () => {
    setShowAIChat(true);
  };

  const handleAISendMessage = (message: string) => {
    console.log("AI message sent:", message);
    // TODO: Implement actual AI message handling
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    setLocation("/profile");
  };

  const handleLogout = () => {
    console.log("User logged out");
    // TODO: Implement actual logout logic
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navigation 
            onSearchClick={handleSearchClick}
            onAIClick={handleAIClick}
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
          />
          
          {/* AI Chat Modal */}
          <Dialog open={showAIChat} onOpenChange={setShowAIChat}>
            <DialogContent className="max-w-2xl w-full max-h-[85vh] h-[75vh] p-0 sm:max-w-lg md:max-w-2xl overflow-auto">
              <DialogHeader className="p-4 sm:p-6 pb-0">
                <DialogTitle>AI Course Assistant</DialogTitle>
              </DialogHeader>
              <div className="flex-1 min-h-0 p-4 sm:p-6 pt-0">
                <AIRecommendationChat onSendMessage={handleAISendMessage} />
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Theme Toggle - Fixed Position */}
          <div className="fixed bottom-4 right-4 z-50">
            <ThemeToggle />
          </div>
          
          <main>
            <Router onAIClick={handleAIClick} />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
