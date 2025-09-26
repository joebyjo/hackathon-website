<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Home, Search } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="text-center p-8 space-y-6">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold" data-testid="error-title">
              Page Not Found
            </h1>
            <p className="text-muted-foreground" data-testid="error-description">
              Sorry, we couldn't find the course or page you're looking for.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full" data-testid="button-home">
                <Home className="h-4 w-4 mr-2" />
                Back to Course Catalog
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full" data-testid="button-search">
                <Search className="h-4 w-4 mr-2" />
                Search Courses
              </Button>
            </Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Need help finding a specific course?</p>
            <p>Try using our AI assistant for personalized recommendations.</p>
          </div>
=======
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
>>>>>>> refs/remotes/origin/main
        </CardContent>
      </Card>
    </div>
  );
}
