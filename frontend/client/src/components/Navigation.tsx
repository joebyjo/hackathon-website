<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Bot, User, Settings, LogOut, Bell, BookOpen, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";

interface NavigationProps {
  onSearchClick?: () => void;
  onAIClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

export default function Navigation({ 
  onSearchClick, 
  onAIClick, 
  onProfileClick, 
  onLogout 
}: NavigationProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // TODO: remove mock functionality - get actual user data
  const currentUser = {
    name: "John Doe",
    email: "john.doe@student.adelaide.edu.au",
    initials: "JD"
  };

  const navItems = [
    { path: "/", label: "Browse Courses", icon: BookOpen },
    { path: "/my-courses", label: "My Courses", icon: User },
    { path: "/discussions", label: "Discussions", icon: Bot },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 hover-elevate p-2 rounded-md" data-testid="link-home">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold">CourseLink</div>
                <div className="text-xs text-muted-foreground -mt-1">University of Adelaide</div>
              </div>
            </Link>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="flex items-center gap-2"
                      data-testid={`nav-${item.path.slice(1) || 'home'}`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop Search and Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search */}
            <div className="hidden lg:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Quick search..."
                className="pl-10 w-64"
                onClick={onSearchClick}
                data-testid="input-quick-search"
              />
            </div>

            {/* Tablet Search */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onSearchClick}
              data-testid="button-tablet-search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* AI Assistant */}
            <Button
              variant="outline"
              size="sm"
              onClick={onAIClick}
              className="flex items-center gap-2 min-w-0"
              data-testid="button-ai-assistant"
            >
              <Bot className="h-4 w-4 text-primary" />
              <span className="hidden lg:inline">AI Assistant</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" data-testid="button-notifications">
              <div className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-destructive">
                  3
                </Badge>
              </div>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2 px-2"
                  data-testid="button-user-menu"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-sm">
                      {currentUser.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:inline text-sm font-medium">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="text-sm">{currentUser.name}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onProfileClick} data-testid="menu-profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} data-testid="menu-logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearchClick}
              data-testid="button-mobile-search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile AI Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={onAIClick}
              data-testid="button-mobile-ai"
            >
              <Bot className="h-4 w-4 text-primary" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center gap-2 p-2 border-b mb-6">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">CourseLink</div>
                      <div className="text-xs text-muted-foreground -mt-1">University of Adelaide</div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location === item.path;
                      return (
                        <Link key={item.path} href={item.path}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className="w-full justify-start gap-3 h-12 text-base"
                            onClick={closeMobileMenu}
                            data-testid={`mobile-nav-${item.path.slice(1) || 'home'}`}
                          >
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </Button>
                        </Link>
                      );
                    })}

                    {/* Mobile Actions Section */}
                    <div className="pt-6 border-t space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3 h-12 text-base"
                        onClick={() => {
                          onAIClick();
                          closeMobileMenu();
                        }}
                        data-testid="mobile-ai-assistant"
                      >
                        <Bot className="h-5 w-5 text-primary" />
                        AI Assistant
                      </Button>
                      
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 h-12 text-base"
                        onClick={() => {
                          console.log("Mobile notifications");
                          closeMobileMenu();
                        }}
                        data-testid="mobile-notifications"
                      >
                        <Bell className="h-5 w-5" />
                        Notifications
                        <Badge className="ml-auto h-5 w-5 flex items-center justify-center text-xs bg-destructive">
                          3
                        </Badge>
                      </Button>
                    </div>
                  </div>

                  {/* Mobile User Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt={currentUser.name} />
                        <AvatarFallback>{currentUser.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{currentUser.name}</div>
                        <div className="text-sm text-muted-foreground truncate">{currentUser.email}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 h-10"
                        onClick={() => {
                          onProfileClick?.();
                          closeMobileMenu();
                        }}
                        data-testid="mobile-profile"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 h-10"
                        onClick={() => {
                          console.log("Mobile settings");
                          closeMobileMenu();
                        }}
                        data-testid="mobile-settings"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 h-10 text-destructive hover:text-destructive"
                        onClick={() => {
                          onLogout?.();
                          closeMobileMenu();
                        }}
                        data-testid="mobile-logout"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

=======
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Search, 
  MessageCircle, 
  BookOpen, 
  Heart,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";
import { useState, useEffect } from "react";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Theme toggle functionality
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/courses", label: "Explore Courses", icon: Search },
    { path: "/ai-advisor", label: "AI Advisor", icon: MessageCircle },
    { path: "/my-courses", label: "My Courses", icon: BookOpen },
    { path: "/saved-plan", label: "Saved Plan", icon: Heart },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className={`bg-background border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="link-logo">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">SmartCourse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}>
                <Button
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-link-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <Button
                    variant={isActive(item.path) ? "secondary" : "ghost"}
                    className="w-full justify-start flex items-center space-x-3"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
>>>>>>> refs/remotes/origin/main
    </nav>
  );
}