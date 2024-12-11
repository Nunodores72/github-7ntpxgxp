import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/lib/api-client';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      const response = await loginUser(data.email, data.password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        window.location.href = '/chat';
      } else {
        toast({
          title: 'Error',
          description: 'Invalid credentials',
          variant: 'destructive',
        });
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
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
}