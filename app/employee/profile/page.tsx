'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
              <p className="mt-2 text-gray-600">Manage your personal information</p>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="primary">
                Edit Profile
              </Button>
            )}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user.name.split(' ')[0]}
                          disabled={!isEditing}
                          className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground disabled:opacity-75 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user.name.split(' ')[1] || ''}
                          disabled={!isEditing}
                          className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground disabled:opacity-75 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        disabled={!isEditing}
                        className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground disabled:opacity-75 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Department
                        </label>
                        <input
                          type="text"
                          defaultValue={user.department || 'Engineering'}
                          disabled={!isEditing}
                          className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground disabled:opacity-75 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          defaultValue={user.company || 'Demo Company'}
                          disabled={true}
                          className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground disabled:opacity-75 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        disabled={!isEditing}
                        className="w-full rounded-lg border border-border bg-muted px-4 py-2 text-foreground disabled:opacity-75 disabled:cursor-not-allowed"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 pt-4">
                        <Button variant="primary">Save Changes</Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Employment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">
                          Employee ID
                        </p>
                        <p className="mt-2 font-medium text-foreground">EMP-{String(Date.now()).slice(-6)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">
                          Join Date
                        </p>
                        <p className="mt-2 font-medium text-foreground">March 15, 2022</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">
                          Position
                        </p>
                        <p className="mt-2 font-medium text-foreground">Senior Developer</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">
                          Reports To
                        </p>
                        <p className="mt-2 font-medium text-foreground">Manager Name</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4">
                    {user.name[0]}
                  </div>
                  {isEditing && (
                    <Button variant="outline" size="sm" className="w-full">
                      Change Photo
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600">Attendance Rate</p>
                      <p className="mt-1 text-lg font-bold text-green-600">98.5%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Performance Score</p>
                      <p className="mt-1 text-lg font-bold text-blue-600">9.2/10</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Leave Balance</p>
                      <p className="mt-1 text-lg font-bold text-orange-600">12 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" size="md" className="w-full">
                      Change Password
                    </Button>
                    <Button variant="outline" size="md" className="w-full">
                      Two-Factor Auth
                    </Button>
                    <Button variant="destructive" size="md" className="w-full">
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
