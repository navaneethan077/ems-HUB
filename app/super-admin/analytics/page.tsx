'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AnalyticsPage() {
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
          <div>
            <h1 className="text-3xl font-bold text-foreground">Platform Analytics</h1>
            <p className="mt-2 text-gray-600">Track platform performance and user metrics</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Active Users', value: '8,234', change: '+342 this week' },
              { label: 'API Calls/Day', value: '2.4M', change: '+12% vs last week' },
              { label: 'Avg Response Time', value: '145ms', change: '-23ms improvement' },
              { label: 'System Uptime', value: '99.98%', change: 'No incidents' },
            ].map((metric) => (
              <Card key={metric.label}>
                <CardContent>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="mt-2 text-2xl font-bold text-primary">{metric.value}</p>
                  <p className="mt-1 text-xs text-green-600">{metric.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: 'January', users: 1200, growth: '+5%' },
                    { month: 'February', users: 1450, growth: '+20%' },
                    { month: 'March', users: 2100, growth: '+45%' },
                    { month: 'April', users: 3200, growth: '+52%' },
                    { month: 'May', users: 5500, growth: '+72%' },
                  ].map((data) => (
                    <div key={data.month}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground">{data.month}</span>
                        <span className="text-green-600 font-medium">{data.growth}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${(data.users / 5500) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{data.users} users</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: 'January', revenue: '$2,400', mrr: '+$800' },
                    { month: 'February', revenue: '$4,200', mrr: '+$1,800' },
                    { month: 'March', revenue: '$8,500', mrr: '+$4,300' },
                    { month: 'April', revenue: '$15,200', mrr: '+$6,700' },
                    { month: 'May', revenue: '$28,500', mrr: '+$13,300' },
                  ].map((data) => (
                    <div
                      key={data.month}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{data.month}</p>
                        <p className="text-xs text-gray-600">{data.revenue}</p>
                      </div>
                      <span className="text-xs font-semibold text-green-600">{data.mrr}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Feature Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    { feature: 'Attendance Tracking', usage: '94%' },
                    { feature: 'Payroll Processing', usage: '87%' },
                    { feature: 'Leave Management', usage: '92%' },
                    { feature: 'Analytics Reports', usage: '76%' },
                    { feature: 'Team Management', usage: '88%' },
                    { feature: 'Document Storage', usage: '81%' },
                  ].map((item) => (
                    <div key={item.feature}>
                      <p className="text-sm text-foreground font-medium mb-2">{item.feature}</p>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: item.usage }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.usage} adoption</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
