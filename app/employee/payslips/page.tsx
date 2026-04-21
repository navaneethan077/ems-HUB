'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const payslips = [
  {
    id: 1,
    month: 'April 2024',
    salary: '$3,500',
    bonus: '$200',
    deductions: '$450',
    net: '$3,250',
    date: '2024-04-30',
  },
  {
    id: 2,
    month: 'March 2024',
    salary: '$3,500',
    bonus: '$0',
    deductions: '$450',
    net: '$3,050',
    date: '2024-03-31',
  },
  {
    id: 3,
    month: 'February 2024',
    salary: '$3,500',
    bonus: '$300',
    deductions: '$450',
    net: '$3,350',
    date: '2024-02-29',
  },
  {
    id: 4,
    month: 'January 2024',
    salary: '$3,500',
    bonus: '$150',
    deductions: '$450',
    net: '$3,200',
    date: '2024-01-31',
  },
];

export default function PayslipsPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'employee') {
      router.push(`/${user.role}`);
    }
  }, [user, router]);

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
            <h1 className="text-3xl font-bold text-foreground">Payslips</h1>
            <p className="mt-2 text-gray-600">View and download your salary statements</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Annual Salary', value: '$42,000', change: 'Base pay' },
              { label: 'YTD Earnings', value: '$14,000', change: '4 months' },
              { label: 'YTD Deductions', value: '$1,800', change: 'Taxes & benefits' },
              { label: 'YTD Net', value: '$12,200', change: 'After deductions' },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Payslips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Month
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Salary
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Bonus
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Deductions
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Net Pay
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payslips.map((slip) => (
                      <tr key={slip.id} className="border-b border-border hover:bg-muted">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {slip.month}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{slip.salary}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{slip.bonus}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{slip.deductions}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-green-600">
                          {slip.net}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{slip.date}</td>
                        <td className="px-4 py-3 text-sm">
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Income Breakdown (This Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { item: 'Base Salary', amount: '$3,500', percentage: 95 },
                    { item: 'Bonus', amount: '$200', percentage: 5 },
                  ].map((row) => (
                    <div key={row.item}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground font-medium">{row.item}</span>
                        <span className="text-gray-600">{row.amount}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deductions Breakdown (This Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { item: 'Income Tax', amount: '$280', percentage: 62 },
                    { item: 'Social Security', amount: '$120', percentage: 27 },
                    { item: 'Health Insurance', amount: '$50', percentage: 11 },
                  ].map((row) => (
                    <div key={row.item}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground font-medium">{row.item}</span>
                        <span className="text-gray-600">{row.amount}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500"
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>
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
