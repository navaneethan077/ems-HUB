'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.role !== 'employee') {
      router.push(`/${user.role}`);
    }
  }, [user, router]);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    setCheckedIn(true);
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    setCheckInTime(null);
  };

  if (!user || user.role !== 'employee') {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={user.role} />
      <div className="flex-1">
        <Navbar />
        <main className="p-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome, {user.name}</h1>
            <p className="mt-2 text-gray-600">{user.company} • {user.department}</p>
          </div>

          {/* Attendance Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="rounded-lg bg-muted p-8 text-center">
                      <p className="text-sm text-gray-600 mb-4">Current Status</p>
                      <p className="text-4xl font-bold mb-4">
                        <span className={checkedIn ? 'text-green-600' : 'text-gray-600'}>
                          {checkedIn ? '✓ Checked In' : 'Not Checked In'}
                        </span>
                      </p>
                      {checkInTime && (
                        <p className="text-sm text-gray-600 mb-6">Check-in time: {checkInTime}</p>
                      )}
                      <div className="flex gap-2 justify-center">
                        {!checkedIn ? (
                          <Button
                            onClick={handleCheckIn}
                            variant="primary"
                            size="md"
                            className="w-full"
                          >
                            Check In
                          </Button>
                        ) : (
                          <Button
                            onClick={handleCheckOut}
                            variant="destructive"
                            size="md"
                            className="w-full"
                          >
                            Check Out
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="space-y-4">
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm text-gray-600">Hours This Week</p>
                        <p className="mt-2 text-2xl font-bold text-foreground">38.5 hrs</p>
                        <p className="mt-1 text-xs text-gray-500">On track for full-time</p>
                      </div>
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-sm text-gray-600">Leaves Balance</p>
                        <p className="mt-2 text-2xl font-bold text-blue-600">12 days</p>
                        <p className="mt-1 text-xs text-gray-500">Out of 20 annual</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Attendance History */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="primary" size="md" className="w-full">
                    Request Leave
                  </Button>
                  <Button variant="secondary" size="md" className="w-full">
                    Download Payslip
                  </Button>
                  <Button variant="outline" size="md" className="w-full">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Attendance This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { day: 'Monday', status: 'Present', time: '09:00 AM - 06:00 PM' },
                    { day: 'Tuesday', status: 'Present', time: '09:00 AM - 06:00 PM' },
                    { day: 'Wednesday', status: 'Present', time: '09:00 AM - 06:00 PM' },
                    { day: 'Thursday', status: 'Present', time: '09:00 AM - 06:00 PM' },
                    { day: 'Friday', status: 'Present', time: '09:00 AM - 05:00 PM' },
                  ].map((record) => (
                    <div
                      key={record.day}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">{record.day}</p>
                        <p className="text-xs text-gray-600">{record.time}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {record.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payslip and Documents */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payslips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: 'April 2024', amount: '$3,500', status: 'Paid' },
                    { month: 'March 2024', amount: '$3,500', status: 'Paid' },
                    { month: 'February 2024', amount: '$3,500', status: 'Paid' },
                  ].map((payslip) => (
                    <div
                      key={payslip.month}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">{payslip.month}</p>
                        <p className="text-sm text-gray-600">{payslip.amount}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {payslip.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leave Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'Vacation', days: 5, status: 'Approved', date: 'May 1-5' },
                    { type: 'Sick Leave', days: 2, status: 'Pending', date: 'May 15-16' },
                  ].map((request, idx) => (
                    <div key={idx} className="border-b border-border pb-3 last:border-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">{request.type}</p>
                          <p className="text-xs text-gray-600">
                            {request.days} days • {request.date}
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance & Skills */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    { metric: 'Attendance Rate', value: '98.5%', trend: '↑ +2%' },
                    { metric: 'On-Time Completion', value: '96%', trend: '↑ +5%' },
                    { metric: 'Quality Score', value: '9.2/10', trend: '↑ +0.5' },
                  ].map((item) => (
                    <div key={item.metric} className="rounded-lg bg-muted p-4">
                      <p className="text-sm text-gray-600">{item.metric}</p>
                      <p className="mt-2 text-2xl font-bold text-foreground">{item.value}</p>
                      <p className="mt-1 text-xs text-green-600">{item.trend}</p>
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
