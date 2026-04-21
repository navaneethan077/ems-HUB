'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const users = [
  {
    id: 1,
    name: 'John Admin',
    email: 'john@techcorp.com',
    role: 'Company Admin',
    company: 'TechCorp Inc.',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Alice Manager',
    email: 'alice@financeflow.com',
    role: 'Company Admin',
    company: 'FinanceFlow Ltd.',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Bob User',
    email: 'bob@healthplus.com',
    role: 'Employee',
    company: 'HealthPlus Co.',
    status: 'Active',
  },
];

export default function UsersPage() {
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Users</h1>
              <p className="mt-2 text-gray-600">Manage platform users and access</p>
            </div>
            <Button variant="primary">Add User</Button>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Company
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-border hover:bg-muted">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {u.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{u.role}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{u.company}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {u.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </td>
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
