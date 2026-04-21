'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const employees = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'Active',
    joinDate: '2022-03-15',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@company.com',
    department: 'Sales',
    position: 'Account Executive',
    status: 'Active',
    joinDate: '2023-06-20',
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol@company.com',
    department: 'HR',
    position: 'HR Manager',
    status: 'Active',
    joinDate: '2021-09-10',
  },
  {
    id: 4,
    name: 'David Lee',
    email: 'david@company.com',
    department: 'Engineering',
    position: 'Frontend Developer',
    status: 'Active',
    joinDate: '2023-11-01',
  },
];

export default function EmployeesPage() {
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Employees</h1>
              <p className="mt-2 text-gray-600">Manage all employees in your company</p>
            </div>
            <Button variant="primary">Add Employee</Button>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Employee Directory</CardTitle>
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
                        Department
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Position
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Joined
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr
                        key={emp.id}
                        className="border-b border-border hover:bg-muted transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-foreground font-medium">
                          {emp.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{emp.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{emp.department}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{emp.position}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{emp.joinDate}</td>
                        <td className="px-4 py-3 text-sm space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
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
