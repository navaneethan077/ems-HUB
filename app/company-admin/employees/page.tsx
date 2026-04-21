'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaUsers, FaPlus, FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';

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
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', department: '', position: '' });

  useEffect(() => {
    if (user && user.role !== 'company-admin') {
      router.push(`/${user.role}`);
    }
  }, [user, router]);

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setNewEmployee({ name: '', email: '', department: '', position: '' });
  };

  if (!user || user.role !== 'company-admin') {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={user.role} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="flex items-center gap-2 text-3xl font-bold text-foreground">
                  <FaUsers className="text-primary" />
                  Employees
                </h1>
                <p className="mt-2 text-gray-600">Manage all employees in your company</p>
              </div>
              <Button onClick={() => setShowModal(true)} className="bg-primary hover:bg-primary-dark text-white flex items-center gap-2">
                <FaPlus /> Add Employee
              </Button>
            </div>

            <Card className="border border-border p-6">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Employee Directory</h2>
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
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent text-white px-3 py-1 text-xs font-semibold">
                            <FaCheckCircle /> {emp.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{emp.joinDate}</td>
                        <td className="px-4 py-3 text-sm space-x-2">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <FaEdit /> Edit
                          </Button>
                          <Button size="sm" className="bg-destructive hover:bg-red-700 text-white flex items-center gap-1">
                            <FaTrash /> Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Add Employee Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <Card className="border border-border p-6 w-full max-w-md">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">Add New Employee</h3>
                  <form onSubmit={handleAddEmployee} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                      <select
                        value={newEmployee.department}
                        onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Position</label>
                      <input
                        type="text"
                        value={newEmployee.position}
                        onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1 bg-accent hover:bg-accent-light text-white">
                        Add Employee
                      </Button>
                      <Button type="button" onClick={() => setShowModal(false)} variant="outline" className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
