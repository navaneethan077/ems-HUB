'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const companies = [
  {
    id: 1,
    name: 'TechCorp Inc.',
    employees: 156,
    plan: 'Enterprise',
    status: 'Active',
    joinDate: '2023-06-15',
    revenue: '$12,500',
  },
  {
    id: 2,
    name: 'FinanceFlow Ltd.',
    employees: 89,
    plan: 'Professional',
    status: 'Active',
    joinDate: '2023-08-20',
    revenue: '$5,200',
  },
  {
    id: 3,
    name: 'HealthPlus Co.',
    employees: 234,
    plan: 'Enterprise',
    status: 'Active',
    joinDate: '2023-09-10',
    revenue: '$18,000',
  },
  {
    id: 4,
    name: 'RetailPro Solutions',
    employees: 45,
    plan: 'Starter',
    status: 'Active',
    joinDate: '2024-01-05',
    revenue: '$1,800',
  },
];

export default function CompaniesPage() {
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
              <h1 className="text-3xl font-bold text-foreground">Companies</h1>
              <p className="mt-2 text-gray-600">Manage all client companies on the platform</p>
            </div>
            <Button variant="primary">Add Company</Button>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>All Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Company
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Employees
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Plan
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                        Monthly Revenue
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
                    {companies.map((company) => (
                      <tr
                        key={company.id}
                        className="border-b border-border hover:bg-muted transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-foreground font-medium">
                          {company.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{company.employees}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            {company.plan}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {company.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-green-600">
                          {company.revenue}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{company.joinDate}</td>
                        <td className="px-4 py-3 text-sm">
                          <Button variant="outline" size="sm">
                            View
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
