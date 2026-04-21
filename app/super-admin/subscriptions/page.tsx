'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const subscriptions = [
  {
    id: 1,
    company: 'TechCorp Inc.',
    plan: 'Enterprise',
    status: 'Active',
    startDate: '2023-06-15',
    renewalDate: '2024-06-15',
    monthlyFee: '$5,000',
  },
  {
    id: 2,
    company: 'FinanceFlow Ltd.',
    plan: 'Professional',
    status: 'Active',
    startDate: '2023-08-20',
    renewalDate: '2024-08-20',
    monthlyFee: '$2,500',
  },
  {
    id: 3,
    company: 'HealthPlus Co.',
    plan: 'Enterprise',
    status: 'Active',
    startDate: '2023-09-10',
    renewalDate: '2024-09-10',
    monthlyFee: '$6,000',
  },
];

export default function SubscriptionsPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'super-admin') {
      router.push(`/${user.role}`);
    }
  }, [user, router]);

  if (!user || user.role !== 'super-admin') {
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
              <h1 className="text-3xl font-bold text-foreground">Subscriptions</h1>
              <p className="mt-2 text-gray-600">Manage company subscriptions and billing</p>
            </div>
            <Button variant="primary">New Subscription</Button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600">Active Subscriptions</p>
                <p className="mt-2 text-3xl font-bold text-green-600">38</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600">Monthly Recurring Revenue</p>
                <p className="mt-2 text-3xl font-bold text-blue-600">$125K</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600">Renewals This Month</p>
                <p className="mt-2 text-3xl font-bold text-orange-600">5</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>All Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Company
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Plan
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Monthly Fee
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Renewal Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="border-b border-border hover:bg-muted">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {sub.company}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            {sub.plan}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-green-600">
                          {sub.monthlyFee}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{sub.renewalDate}</td>
                        <td className="px-4 py-3 text-sm">
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
