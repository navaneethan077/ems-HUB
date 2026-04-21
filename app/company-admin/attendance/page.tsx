'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AttendancePage() {
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
            <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
            <p className="mt-2 text-gray-600">Monitor and manage employee attendance</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              { label: 'Present Today', value: '198', color: 'text-green-600' },
              { label: 'Absent', value: '28', color: 'text-red-600' },
              { label: 'On Leave', value: '8', color: 'text-blue-600' },
              { label: 'Late', value: '12', color: 'text-orange-600' },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className={`mt-2 text-3xl font-bold ${item.color}`}>{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Attendance This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { day: 'Monday', present: 220, absent: 14, onTime: 215 },
                  { day: 'Tuesday', present: 225, absent: 9, onTime: 220 },
                  { day: 'Wednesday', present: 228, absent: 6, onTime: 224 },
                  { day: 'Thursday', present: 215, absent: 19, onTime: 208 },
                  { day: 'Friday', present: 198, absent: 36, onTime: 190 },
                ].map((day) => (
                  <div key={day.day}>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span>{day.day}</span>
                      <span className="text-gray-600">
                        {day.present} present • {day.absent} absent • {day.onTime} on time
                      </span>
                    </div>
                    <div className="flex h-3 rounded-full overflow-hidden bg-gray-200">
                      <div
                        className="bg-green-500"
                        style={{ width: `${(day.present / 234) * 100}%` }}
                      />
                      <div
                        className="bg-red-500"
                        style={{ width: `${(day.absent / 234) * 100}%` }}
                      />
                    </div>
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
