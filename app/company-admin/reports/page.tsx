'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
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
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="mt-2 text-gray-600">Generate and view company reports</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Attendance Report', description: 'Track attendance patterns' },
              { name: 'Payroll Report', description: 'Salary and deduction details' },
              { name: 'Leave Analysis', description: 'Leave usage and balance' },
              { name: 'Performance Report', description: 'Employee performance metrics' },
              { name: 'Department Report', description: 'Department-wise analysis' },
              { name: 'Cost Analysis', description: 'Expense and budget tracking' },
            ].map((report) => (
              <Card key={report.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">{report.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Generate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'April Attendance Summary', date: '2024-05-01', type: 'PDF' },
                  { name: 'March Payroll Report', date: '2024-04-01', type: 'PDF' },
                  { name: 'Q1 Performance Analysis', date: '2024-04-15', type: 'Excel' },
                ].map((report, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-xs text-gray-600">Generated: {report.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        {report.type}
                      </span>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
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
