import Navigation from '../Navigation';
<<<<<<< HEAD
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

export default function NavigationExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Navigation 
          onSearchClick={() => console.log('Search clicked')}
          onAIClick={() => console.log('AI Assistant clicked')}
          onProfileClick={() => console.log('Profile clicked')}
          onLogout={() => console.log('Logout clicked')}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>Navigation component with University of Adelaide branding</p>
            <p className="text-sm">Try clicking the navigation items and user menu</p>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
=======

export default function NavigationExample() {
  return <Navigation />;
>>>>>>> refs/remotes/origin/main
}