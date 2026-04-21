'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LeaveRequestPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [leaveType, setLeaveType] = useState('vacation');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user && user.role !== 'employee') {
      router.push(`/${user.role}`);
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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
            <h1 className="text-3xl font-bold text-foreground">Request Leave</h1>
            <p className="mt-2 text-gray-600">Submit a leave request to your manager</p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>New Leave Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Leave Type
                      </label>
                      <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="vacation">Vacation</option>
                        <option value="sick">Sick Leave</option>
                        <option value="personal">Personal Leave</option>
                        <option value="maternity">Maternity/Paternity</option>
                        <option value="unpaid">Unpaid Leave</option>
                      </select>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          From Date
                        </label>
                        <input
                          type="date"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          To Date
                        </label>
                        <input
                          type="date"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Reason for Leave
                      </label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Provide a detailed reason for your leave request"
                        rows={5}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    {submitted && (
                      <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                        <p className="text-sm font-medium text-green-800">
                          Leave request submitted successfully! Your manager will review it soon.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button variant="primary" size="md" disabled={submitted}>
                        {submitted ? 'Request Submitted' : 'Submit Request'}
                      </Button>
                      <Button variant="outline" size="md">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Leave Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'Vacation', total: 20, used: 8, available: 12 },
                      { type: 'Sick Leave', total: 10, used: 2, available: 8 },
                      { type: 'Personal', total: 5, used: 1, available: 4 },
                    ].map((leave) => (
                      <div key={leave.type}>
                        <p className="text-sm font-medium text-foreground mb-1">{leave.type}</p>
                        <div className="flex justify-between text-xs text-gray-600 mb-2">
                          <span>Available: {leave.available}/{leave.total}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${((leave.total - leave.available) / leave.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Important Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Requests must be submitted at least 5 days in advance</li>
                    <li>• Approval depends on team availability</li>
                    <li>• Check your balance before requesting</li>
                    <li>• Emergency leave requires manager approval</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pending Requests */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Period
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Days
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Requested
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: 'Vacation', from: '2024-05-01', to: '2024-05-05', days: 5, status: 'Pending', date: '2024-04-15' },
                      { type: 'Sick Leave', from: '2024-04-22', to: '2024-04-23', days: 2, status: 'Approved', date: '2024-04-20' },
                    ].map((request, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {request.type}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {request.from} to {request.to}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{request.days}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              request.status === 'Approved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{request.date}</td>
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
