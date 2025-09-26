import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <h2 className="text-xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            The course you're looking for seems to have been dropped from the catalog.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full" data-testid="button-home">
              Back to Home
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="outline" className="w-full" data-testid="button-explore">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}