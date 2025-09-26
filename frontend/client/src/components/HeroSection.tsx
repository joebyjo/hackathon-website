import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Brain, BookOpen, Search, MessageCircle } from "lucide-react";
import { Link } from "wouter";

interface HeroSectionProps {
  onExploreClick?: () => void;
  onAiAdvisorClick?: () => void;
}

export default function HeroSection({ onExploreClick, onAiAdvisorClick }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-br from-primary to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="text-hero-headline">
            Smarter Course Choices.
            <br />
            <span className="text-blue-100">Powered by Students + AI.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto" data-testid="text-hero-subheading">
            Rate your past courses, explore peer reviews, and let our AI bot guide your next step — including credit transfers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/courses">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 hover-elevate"
                onClick={onExploreClick}
                data-testid="button-explore-courses"
              >
                <Search className="w-5 h-5 mr-2" />
                Explore Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/ai-advisor">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-white/10 border-white/20 hover:bg-white/20 text-white hover-elevate"
                onClick={onAiAdvisorClick}
                data-testid="button-chat-ai-advisor"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat with AI Advisor
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white/10 rounded-lg mx-auto flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-100" />
              </div>
              <h3 className="text-lg font-semibold">Student Reviews</h3>
              <p className="text-blue-100 text-sm">Real feedback from peers who've taken the courses</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white/10 rounded-lg mx-auto flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-100" />
              </div>
              <h3 className="text-lg font-semibold">AI Recommendations</h3>
              <p className="text-blue-100 text-sm">Personalized course suggestions based on your goals</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white/10 rounded-lg mx-auto flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-100" />
              </div>
              <h3 className="text-lg font-semibold">Credit Transfer</h3>
              <p className="text-blue-100 text-sm">Smart guidance on transferring credits between institutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}