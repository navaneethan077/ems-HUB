'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaSignOutAlt, FaBuilding } from 'react-icons/fa';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-border bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <FaBuilding className="text-primary text-2xl" />
          <div>
            <p className="text-2xl font-bold text-primary">EMS Hub</p>
            <p className="text-xs text-gray-600">Employee Management System</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="text-right">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user.role.replace('-', ' ')}</p>
              </div>
              <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
                <FaSignOutAlt className="text-sm" />
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
