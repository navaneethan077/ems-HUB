'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/lib/auth-context';
import {
  FaChartPie,
  FaBuilding,
  FaUsers,
  FaChartLine,
  FaCreditCard,
  FaCalendar,
  FaDollarSign,
  FaUmbrellaBeach,
  FaClipboardList,
  FaClock,
  FaFileAlt,
  FaUser,
} from 'react-icons/fa';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navConfig: Record<UserRole, NavItem[]> = {
  'super-admin': [
    { label: 'Dashboard', href: '/super-admin', icon: <FaChartPie /> },
    { label: 'Companies', href: '/super-admin/companies', icon: <FaBuilding /> },
    { label: 'Users', href: '/super-admin/users', icon: <FaUsers /> },
    { label: 'Analytics', href: '/super-admin/analytics', icon: <FaChartLine /> },
    { label: 'Subscriptions', href: '/super-admin/subscriptions', icon: <FaCreditCard /> },
  ],
  'company-admin': [
    { label: 'Dashboard', href: '/company-admin', icon: <FaChartPie /> },
    { label: 'Employees', href: '/company-admin/employees', icon: <FaUsers /> },
    { label: 'Attendance', href: '/company-admin/attendance', icon: <FaCalendar /> },
    { label: 'Payroll', href: '/company-admin/payroll', icon: <FaDollarSign /> },
    { label: 'Leave Requests', href: '/company-admin/leaves', icon: <FaUmbrellaBeach /> },
    { label: 'Reports', href: '/company-admin/reports', icon: <FaClipboardList /> },
  ],
  employee: [
    { label: 'Dashboard', href: '/employee', icon: <FaChartPie /> },
    { label: 'Check In/Out', href: '/employee/attendance', icon: <FaClock /> },
    { label: 'Leave Requests', href: '/employee/leave-request', icon: <FaFileAlt /> },
    { label: 'Payslips', href: '/employee/payslips', icon: <FaFileAlt /> },
    { label: 'Profile', href: '/employee/profile', icon: <FaUser /> },
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
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
