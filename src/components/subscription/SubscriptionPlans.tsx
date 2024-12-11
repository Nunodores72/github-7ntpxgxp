import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PricingCard } from './PricingCard';
import { SUBSCRIPTION_PLANS, stripe } from '@/lib/stripe';

export function SubscriptionPlans() {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoading(priceId);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/chat`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const { sessionId } = await response.json();
      const stripeInstance = await stripe;
      
      if (stripeInstance) {
        const { error } = await stripeInstance.redirectToCheckout({ sessionId });
        if (error) {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process subscription',
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-8">
      <PricingCard
        name={SUBSCRIPTION_PLANS.BASIC.name}
        price={SUBSCRIPTION_PLANS.BASIC.price}
        features={SUBSCRIPTION_PLANS.BASIC.features}
        onSubscribe={() => handleSubscribe(SUBSCRIPTION_PLANS.BASIC.id)}
        isLoading={loading === SUBSCRIPTION_PLANS.BASIC.id}
      />
      <PricingCard
        name={SUBSCRIPTION_PLANS.PRO.name}
        price={SUBSCRIPTION_PLANS.PRO.price}
        features={SUBSCRIPTION_PLANS.PRO.features}
        onSubscribe={() => handleSubscribe(SUBSCRIPTION_PLANS.PRO.id)}
        isLoading={loading === SUBSCRIPTION_PLANS.PRO.id}
      />
    </div>
  );
}