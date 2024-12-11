import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = 'your_stripe_public_key';
export const stripe = loadStripe(STRIPE_PUBLIC_KEY);

export const SUBSCRIPTION_PLANS = {
  BASIC: {
    id: 'price_basic',
    name: 'Basic',
    price: 9.99,
    features: [
      'Daily Horoscope',
      'Basic Chat Access',
      'PDF Downloads',
    ],
  },
  PRO: {
    id: 'price_pro',
    name: 'Pro',
    price: 19.99,
    features: [
      'Everything in Basic',
      'Unlimited Chat',
      'Priority Support',
      'Chinese Zodiac Readings',
    ],
  },
} as const;