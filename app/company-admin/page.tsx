'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const kpiData = [
  { label: 'Total Employees', value: '234', change: '+8 this month', color: 'text-blue-600' },
  { label: 'Present Today', value: '198', change: '84.6%', color: 'text-green-600' },
  { label: 'Pending Approvals', value: '12', change: '5 leave requests', color: 'text-orange-600' },
  { label: 'Payroll Due', value: '5 days', change: 'Next: May 1st', color: 'text-purple-600' },
];

export default function CompanyAdminDashboard() {
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
          <div>
            <h1 className="text-3xl font-bold text-foreground">Company Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage employees, attendance, and operations</p>
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

          {/* Main Content Grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Attendance This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { day: 'Monday', present: 220, absent: 14 },
                      { day: 'Tuesday', present: 225, absent: 9 },
                      { day: 'Wednesday', present: 228, absent: 6 },
                      { day: 'Thursday', present: 215, absent: 19 },
                      { day: 'Friday', present: 198, absent: 36 },
                    ].map((day) => (
                      <div key={day.day}>
                        <div className="flex justify-between text-sm font-medium mb-2">
                          <span>{day.day}</span>
                          <span className="text-gray-600">
                            {day.present} present • {day.absent} absent
                          </span>
                        </div>
                        <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
                          <div
                            className="bg-green-500"
                            style={{ width: `${(day.present / 234) * 100}%` }}
                          />
                          <div className="bg-red-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="primary" size="md" className="w-full">
                    Approve Leaves (12)
                  </Button>
                  <Button variant="secondary" size="md" className="w-full">
                    Process Payroll
                  </Button>
                  <Button variant="outline" size="md" className="w-full">
                    Generate Report
                  </Button>
                  <Button variant="outline" size="md" className="w-full">
                    Send Announcement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leave & Project Management */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Leave Requests This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Alice Johnson', type: 'Vacation', days: 5, status: 'Pending' },
                    { name: 'Bob Smith', type: 'Sick Leave', days: 2, status: 'Approved' },
                    { name: 'Carol Davis', type: 'Personal', days: 3, status: 'Pending' },
                  ].map((request) => (
                    <div
                      key={request.name}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">{request.name}</p>
                        <p className="text-xs text-gray-600">
                          {request.type} • {request.days} days
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          request.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { dept: 'Engineering', productivity: 92 },
                    { dept: 'Sales', productivity: 88 },
                    { dept: 'HR', productivity: 85 },
                    { dept: 'Marketing', productivity: 90 },
                  ].map((dept) => (
                    <div key={dept.dept}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground">{dept.dept}</span>
                        <span className="text-gray-600">{dept.productivity}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${dept.productivity}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payroll Overview */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-gray-600">Total Monthly Payroll</p>
                    <p className="mt-2 text-2xl font-bold text-foreground">$145,000</p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-gray-600">Processed This Month</p>
                    <p className="mt-2 text-2xl font-bold text-green-600">$87,500</p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-gray-600">Next Payroll Date</p>
                    <p className="mt-2 text-2xl font-bold text-blue-600">May 1st</p>
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
