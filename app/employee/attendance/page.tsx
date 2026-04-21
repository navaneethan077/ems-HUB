'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AttendancePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

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
    const now = new Date();
    setCheckOutTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    setCheckedIn(false);
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
            <h1 className="text-3xl font-bold text-foreground">Attendance & Time Tracking</h1>
            <p className="mt-2 text-gray-600">Check in/out and track your working hours</p>
          </div>

          {/* Check In/Out */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Today&apos;s Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Status</p>
                  <p className="text-5xl font-bold mb-4">
                    <span className={checkedIn ? 'text-green-600' : 'text-gray-400'}>
                      {checkedIn ? '✓' : '○'}
                    </span>
                  </p>
                  <p className={`text-xl font-semibold ${checkedIn ? 'text-green-600' : 'text-gray-600'}`}>
                    {checkedIn ? 'Checked In' : 'Not Checked In'}
                  </p>
                </div>

                {checkInTime && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Check-In Time</p>
                    <p className="text-3xl font-bold text-blue-600">{checkInTime}</p>
                  </div>
                )}

                {checkOutTime && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Check-Out Time</p>
                    <p className="text-3xl font-bold text-red-600">{checkOutTime}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-4 justify-center">
                {!checkedIn ? (
                  <Button onClick={handleCheckIn} variant="primary" size="lg">
                    Check In
                  </Button>
                ) : (
                  <Button onClick={handleCheckOut} variant="destructive" size="lg">
                    Check Out
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Attendance History */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Check In
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Check Out
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Hours Worked
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: '2024-04-25', checkIn: '09:02', checkOut: '18:05', hours: '8h 53m', status: 'On Time' },
                      { date: '2024-04-24', checkIn: '09:00', checkOut: '18:00', hours: '9h 00m', status: 'On Time' },
                      { date: '2024-04-23', checkIn: '09:15', checkOut: '18:30', hours: '8h 45m', status: 'Late' },
                      { date: '2024-04-22', checkIn: '09:05', checkOut: '17:55', hours: '8h 50m', status: 'On Time' },
                      { date: '2024-04-21', checkIn: '09:00', checkOut: '18:00', hours: '9h 00m', status: 'On Time' },
                    ].map((record) => (
                      <tr key={record.date} className="border-b border-border hover:bg-muted">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {record.date}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{record.checkIn}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{record.checkOut}</td>
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {record.hours}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              record.status === 'On Time'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'This Week', value: '38h 30m', target: '40h' },
              { label: 'This Month', value: '154h 20m', target: '160h' },
              { label: 'Average/Day', value: '8h 45m', target: '8h 30m' },
              { label: 'Late Arrivals', value: '2', target: '0' },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="mt-1 text-xs text-gray-500">Target: {item.target}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
