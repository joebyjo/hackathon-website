import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

// Import pages
import LandingPage from "@/pages/LandingPage";
import ExploreCourses from "@/pages/ExploreCourses";
import AIAdvisor from "@/pages/AIAdvisor";
import MyCourses from "@/pages/MyCourses";
import SavedPlan from "@/pages/SavedPlan";
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/courses" component={ExploreCourses} />
      <Route path="/ai-advisor" component={AIAdvisor} />
      <Route path="/my-courses" component={MyCourses} />
      <Route path="/saved-plan" component={SavedPlan} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
