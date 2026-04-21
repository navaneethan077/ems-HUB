'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/lib/auth-context';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navConfig: Record<UserRole, NavItem[]> = {
  'super-admin': [
    { label: 'Dashboard', href: '/super-admin', icon: '📊' },
    { label: 'Companies', href: '/super-admin/companies', icon: '🏢' },
    { label: 'Users', href: '/super-admin/users', icon: '👥' },
    { label: 'Analytics', href: '/super-admin/analytics', icon: '📈' },
    { label: 'Subscriptions', href: '/super-admin/subscriptions', icon: '💳' },
  ],
  'company-admin': [
    { label: 'Dashboard', href: '/company-admin', icon: '📊' },
    { label: 'Employees', href: '/company-admin/employees', icon: '👥' },
    { label: 'Attendance', href: '/company-admin/attendance', icon: '📅' },
    { label: 'Payroll', href: '/company-admin/payroll', icon: '💰' },
    { label: 'Leave Requests', href: '/company-admin/leaves', icon: '🏖️' },
    { label: 'Reports', href: '/company-admin/reports', icon: '📋' },
  ],
  employee: [
    { label: 'Dashboard', href: '/employee', icon: '📊' },
    { label: 'Check In/Out', href: '/employee/attendance', icon: '⏱️' },
    { label: 'Leave Requests', href: '/employee/leave-request', icon: '📝' },
    { label: 'Payslips', href: '/employee/payslips', icon: '📄' },
    { label: 'Profile', href: '/employee/profile', icon: '👤' },
  ],
};

interface SidebarProps {
  role: UserRole;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const navItems = navConfig[role];

  return (
    <aside className="w-64 border-r border-border bg-muted p-6">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-foreground hover:bg-background'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
