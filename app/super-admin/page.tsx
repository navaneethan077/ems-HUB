'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const kpiData = [
  { label: 'Total Companies', value: '42', change: '+2 this month', color: 'text-blue-600' },
  { label: 'Active Subscriptions', value: '38', change: '+1', color: 'text-green-600' },
  { label: 'Total Users', value: '1,248', change: '+54', color: 'text-purple-600' },
  { label: 'Monthly Revenue', value: '$45.2K', change: '+12%', color: 'text-orange-600' },
];

export default function SuperAdminDashboard() {
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
            <h1 className="text-3xl font-bold text-foreground">Super Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage platform, companies, and subscriptions</p>
          </div>

          {/* KPI Cards */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi) => (
              <Card key={kpi.label}>
                <CardContent>
                  <p className="text-sm text-gray-600">{kpi.label}</p>
                  <p className={`mt-2 text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{kpi.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity & Charts Section */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['TechCorp Inc.', 'FinanceFlow Ltd.', 'HealthPlus Co.'].map((company) => (
                    <div
                      key={company}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                    >
                      <span className="text-foreground">{company}</span>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { plan: 'Starter', count: 15, percentage: 39 },
                    { plan: 'Professional', count: 16, percentage: 42 },
                    { plan: 'Enterprise', count: 11, percentage: 29 },
                  ].map((item) => (
                    <div key={item.plan}>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">{item.plan}</span>
                        <span className="text-gray-600">{item.count}</span>
                      </div>
                      <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Health & Analytics */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Server Status</span>
                      <span className="text-green-600">Healthy</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>API Uptime</span>
                      <span className="text-green-600">99.9%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Database</span>
                      <span className="text-green-600">Optimal</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Active Users</span>
                    <span className="font-semibold">342</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Session Time</span>
                    <span className="font-semibold">24 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Calls Today</span>
                    <span className="font-semibold">12.5K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Open</span>
                    <span className="font-semibold text-orange-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-semibold text-blue-600">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resolved Today</span>
                    <span className="font-semibold text-green-600">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
