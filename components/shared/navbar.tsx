'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-border bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div>
          <Link href="/" className="text-2xl font-bold text-primary">
            EMS Hub
          </Link>
          <p className="text-xs text-gray-600">Employee Management System</p>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="text-right">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user.role.replace('-', ' ')}</p>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <p className="text-sm text-gray-600">Not logged in</p>
          )}
        </div>
      </div>
    </nav>
  );
}
