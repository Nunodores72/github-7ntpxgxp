import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/lib/api-client';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  birthDate: z.string(),
  zodiacSign: z.string(),
});

export function RegisterForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      setIsLoading(true);
      const response = await registerUser(data);
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Registration successful! Please login.',
        });
        window.location.href = '/login';
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Name"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register('password')}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <div>
        <Input
          type="date"
          {...register('birthDate')}
          className={errors.birthDate ? 'border-red-500' : ''}
        />
        {errors.birthDate && (
          <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>
        )}
      </div>
      <div>
        <Select {...register('zodiacSign')}>
          <option value="">Select your zodiac sign</option>
          {zodiacSigns.map((sign) => (
            <option key={sign} value={sign}>{sign}</option>
          ))}
        </Select>
        {errors.zodiacSign && (
          <p className="text-red-500 text-sm mt-1">{errors.zodiacSign.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Register'}
      </Button>
    </form>
  );
}