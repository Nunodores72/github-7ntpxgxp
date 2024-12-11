import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: number;
  features: string[];
  onSubscribe: () => void;
  isLoading?: boolean;
}

export function PricingCard({
  name,
  price,
  features,
  onSubscribe,
  isLoading,
}: PricingCardProps) {
  return (
    <Card className="w-[300px] transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground">/month</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={onSubscribe}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Subscribe Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}