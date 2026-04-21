'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/shared/navbar';
import { Sidebar } from '@/components/shared/sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaUser, FaEdit, FaSave, FaTimes, FaPhone, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || 'John');
  const [lastName, setLastName] = useState(user?.name?.split(' ')[1] || 'Doe');
  const [email, setEmail] = useState('john.doe@company.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [department, setDepartment] = useState('Software Engineering');
  const [location, setLocation] = useState('San Francisco, CA');
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    if (user && user.role !== 'employee') {
      router.push(`/${user.role}`);
    }
  }, [user, router]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEditing(false);
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || user.role !== 'employee') {
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
                  <FaUser className="text-primary" />
                  My Profile
                </h1>
                <p className="mt-2 text-gray-600">Manage your personal information</p>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary-dark text-white flex items-center gap-2">
                  <FaEdit /> Edit Profile
                </Button>
              )}
            </div>

            {savedMessage && (
              <div className="mb-6 rounded-lg border border-accent bg-green-50 p-4 text-accent">
                ✓ Profile updated successfully!
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Form Card */}
              <div className="lg:col-span-2">
                <Card className="border border-border p-6">
                  <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
                    <FaUser className="text-primary" />
                    Personal Information
                  </h2>

                  <form className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          disabled={!isEditing}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          disabled={!isEditing}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          <FaBriefcase className="inline mr-2 text-primary" />
                          Department
                        </label>
                        <input
                          type="text"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          disabled={!isEditing}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          <FaMapMarkerAlt className="inline mr-2 text-primary" />
                          Location
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          disabled={!isEditing}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <FaPhone className="inline mr-2 text-primary" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!isEditing}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 pt-4">
                        <Button 
                          type="button"
                          onClick={handleSave}
                          disabled={isLoading}
                          className="flex-1 bg-accent hover:bg-accent-light text-white flex items-center justify-center gap-2"
                        >
                          <FaSave /> {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          variant="outline"
                          className="flex-1 flex items-center justify-center gap-2"
                        >
                          <FaTimes /> Cancel
                        </Button>
                      </div>
                    )}
                  </form>
                </Card>

                <Card className="mt-6 border border-border p-6">
                  <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
                    <FaBriefcase className="text-primary" />
                    Employment Information
                  </h2>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                          Employee ID
                        </p>
                        <p className="mt-2 text-lg font-bold text-foreground">EMP-2024-001</p>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                          Join Date
                        </p>
                        <p className="mt-2 text-lg font-bold text-foreground">Mar 15, 2022</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                          Position
                        </p>
                        <p className="mt-2 text-lg font-bold text-foreground">Senior Developer</p>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                          Reports To
                        </p>
                        <p className="mt-2 text-lg font-bold text-foreground">Jane Smith</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Side Panels */}
              <div className="space-y-6">
                <Card className="border border-border p-6 text-center">
                  <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-foreground">
                    <FaUser className="text-primary" /> Profile Picture
                  </h3>
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white mb-4">
                    {firstName.charAt(0)}
                  </div>
                  {isEditing && (
                    <Button variant="outline" className="w-full">
                      Change Photo
                    </Button>
                  )}
                </Card>

                <Card className="border border-border p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    📊 Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-gray-600 font-semibold">Attendance Rate</p>
                      <p className="mt-2 text-2xl font-bold text-accent">98.5%</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-gray-600 font-semibold">Performance Score</p>
                      <p className="mt-2 text-2xl font-bold text-primary">9.2/10</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-gray-600 font-semibold">Leave Balance</p>
                      <p className="mt-2 text-2xl font-bold text-warning">12 days</p>
                    </div>
                  </div>
                </Card>

                <Card className="border border-border p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    ⚙️ Account Settings
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full">
                      Two-Factor Auth
                    </Button>
                    <Button className="w-full bg-destructive hover:bg-red-700 text-white">
                      Logout
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
