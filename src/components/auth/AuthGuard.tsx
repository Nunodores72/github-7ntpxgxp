import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const checkSubscription = async () => {
      try {
        const response = await fetch('/api/check-subscription', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        
        if (!data.hasActiveSubscription) {
          toast({
            title: 'Subscription Required',
            description: 'Please subscribe to access the chat',
          });
          window.location.href = '/pricing';
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to verify subscription',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}