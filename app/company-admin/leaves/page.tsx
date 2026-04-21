'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const leaveRequests = [
  {
    id: 1,
    employee: 'Alice Johnson',
    type: 'Vacation',
    from: '2024-05-01',
    to: '2024-05-05',
    days: 5,
    reason: 'Summer vacation',
    status: 'Pending',
  },
  {
    id: 2,
    employee: 'Bob Smith',
    type: 'Sick Leave',
    from: '2024-04-25',
    to: '2024-04-26',
    days: 2,
    reason: 'Medical appointment',
    status: 'Pending',
  },
  {
    id: 3,
    employee: 'Carol Davis',
    type: 'Personal',
    from: '2024-05-10',
    to: '2024-05-12',
    days: 3,
    reason: 'Family matter',
    status: 'Approved',
  },
];

export default function LeavesPage() {
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
            <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
            <p className="mt-2 text-gray-600">Review and approve employee leave requests</p>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>All Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="grid gap-4 md:grid-cols-5">
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Employee</p>
                        <p className="mt-1 font-medium text-foreground">{request.employee}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Type</p>
                        <p className="mt-1 font-medium text-foreground">{request.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Period</p>
                        <p className="mt-1 font-medium text-foreground text-sm">
                          {request.from} to {request.to}
                        </p>
                        <p className="text-xs text-gray-600">({request.days} days)</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Reason</p>
                        <p className="mt-1 text-sm text-foreground">{request.reason}</p>
                      </div>
                      <div className="flex items-end gap-2">
                        {request.status === 'Pending' ? (
                          <>
                            <Button variant="primary" size="sm" className="flex-1">
                              Approve
                            </Button>
                            <Button variant="destructive" size="sm" className="flex-1">
                              Reject
                            </Button>
                          </>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                            {request.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Leave Balance by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'Vacation', total: 20, used: 8, available: 12 },
                    { type: 'Sick Leave', total: 10, used: 3, available: 7 },
                    { type: 'Personal', total: 5, used: 1, available: 4 },
                    { type: 'Maternity/Paternity', total: 90, used: 0, available: 90 },
                  ].map((leave) => (
                    <div key={leave.type}>
                      <p className="text-sm font-medium text-foreground mb-2">{leave.type}</p>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Used: {leave.used}/{leave.total}</span>
                        <span>Available: {leave.available}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(leave.used / leave.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leave Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: 'Total Pending Requests', value: '2', color: 'text-orange-600' },
                    { label: 'Total Approved This Month', value: '8', color: 'text-green-600' },
                    { label: 'Total Rejected This Month', value: '1', color: 'text-red-600' },
                    { label: 'Average Approval Time', value: '1.2 days', color: 'text-blue-600' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                    >
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className={`font-semibold ${stat.color}`}>{stat.value}</p>
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
