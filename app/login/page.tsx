'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, type UserRole } from '@/lib/auth-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const roles: { role: UserRole; title: string; description: string }[] = [
  {
    role: 'super-admin',
    title: 'Super Admin',
    description: 'Platform Owner - Manage all companies and subscriptions',
  },
  {
    role: 'company-admin',
    title: 'Company Admin',
    description: 'Company Owner - Manage employees and operations',
  },
  {
    role: 'employee',
    title: 'Employee',
    description: 'End User - Access personal records and requests',
  },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [name, setName] = useState('');
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (!selectedRole || !name.trim()) {
      alert('Please select a role and enter your name');
      return;
    }

    const mockUser = {
      id: `user-${Date.now()}`,
      name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@demo.com`,
      role: selectedRole,
      company: selectedRole !== 'super-admin' ? 'Demo Company' : undefined,
      department: selectedRole === 'employee' ? 'Engineering' : undefined,
    };

    setUser(mockUser);
    router.push(`/${selectedRole}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl">EMS Hub Login</CardTitle>
          <p className="mt-2 text-center text-gray-600">
            Select your role to access the dashboard
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Select Role
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-1 md:grid-cols-3">
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => setSelectedRole(r.role)}
                    className={`rounded-lg border-2 p-4 text-left transition-colors ${
                      selectedRole === r.role
                        ? 'border-primary bg-blue-50'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <h3 className="font-semibold text-foreground">{r.title}</h3>
                    <p className="mt-1 text-xs text-gray-600">{r.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleLogin}
              size="lg"
              className="w-full"
              disabled={!selectedRole || !name.trim()}
            >
              Login to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
