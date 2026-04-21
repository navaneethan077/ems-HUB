'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PayrollPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'company-admin') {
      router.push(`/${user.role}`);
    }
  }, [user, router]);

  if (!user || user.role !== 'company-admin') {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={user.role} />
      <div className="flex-1">
        <Navbar />
        <main className="p-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
              <p className="mt-2 text-gray-600">Process and manage employee salaries</p>
            </div>
            <Button variant="primary">Process Payroll</Button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600">Total Monthly Payroll</p>
                <p className="mt-2 text-3xl font-bold text-foreground">$145,000</p>
                <p className="mt-1 text-xs text-gray-500">234 employees</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600">Processed This Month</p>
                <p className="mt-2 text-3xl font-bold text-green-600">$87,500</p>
                <p className="mt-1 text-xs text-gray-500">60% complete</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600">Next Payroll Date</p>
                <p className="mt-2 text-3xl font-bold text-blue-600">May 1st</p>
                <p className="mt-1 text-xs text-gray-500">10 days remaining</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Payroll Processing Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: 'May 2024', status: 'Scheduled', date: '2024-05-01' },
                  { month: 'April 2024', status: 'Completed', date: '2024-04-30' },
                  { month: 'March 2024', status: 'Completed', date: '2024-03-31' },
                ].map((entry) => (
                  <div
                    key={entry.month}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{entry.month}</p>
                      <p className="text-xs text-gray-600">Due: {entry.date}</p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        entry.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {entry.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
