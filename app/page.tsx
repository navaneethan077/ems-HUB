'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user) {
      router.push(`/${user.role}`);
    }
  }, [user, loading, router]);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">EMS Hub</h1>
          <p className="mt-2 text-gray-600">Employee Management System</p>
          <div className="mt-8">
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : (
              <Button onClick={() => router.push('/login')} size="lg">
                Go to Login
              </Button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
