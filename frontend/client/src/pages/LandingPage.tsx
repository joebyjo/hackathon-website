import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, BookOpen, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">25,000+</div>
              <p className="text-muted-foreground">Course Reviews</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">15,200+</div>
              <p className="text-muted-foreground">Active Students</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">3,500+</div>
              <p className="text-muted-foreground">Courses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose SmartCourse Advisor?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Make informed decisions about your academic journey with real student insights and AI-powered recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Authentic Reviews</h3>
                <p className="text-muted-foreground text-sm">
                  Read honest reviews from students who've actually taken the courses. Get insights on workload, teaching quality, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
                <p className="text-muted-foreground text-sm">
                  Our AI analyzes your academic history and goals to suggest the perfect courses for your journey.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Credit Transfer Help</h3>
                <p className="text-muted-foreground text-sm">
                  Get guidance on transferring credits between institutions and planning your academic pathway.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground text-sm">
                  Keep track of completed courses and plan your future semesters with our intuitive course planner.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
                <p className="text-muted-foreground text-sm">
                  Join a community of students helping each other make better academic choices through shared experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Always Updated</h3>
                <p className="text-muted-foreground text-sm">
                  Our database is constantly updated with the latest course information and student feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "SmartCourse Advisor helped me plan my entire Computer Science degree. The AI recommendations were spot-on!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                    A
                  </div>
                  <div>
                    <p className="font-medium text-sm">Alex Chen</p>
                    <p className="text-xs text-muted-foreground">CS Major, 3rd Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The credit transfer guidance saved me a whole semester. Couldn't have done it without this platform."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                    S
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sarah Martinez</p>
                    <p className="text-xs text-muted-foreground">Business Major, 1st Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Reading real student reviews made all the difference in choosing the right courses for my interests."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                    M
                  </div>
                  <div>
                    <p className="font-medium text-sm">Mike Thompson</p>
                    <p className="text-xs text-muted-foreground">Engineering Major, 3rd Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">SmartCourse</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 SmartCourse Advisor. Empowering students to make smarter course choices.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}