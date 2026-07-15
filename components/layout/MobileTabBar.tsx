'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ClipboardList, PlusCircle, Package, BarChart3 } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: '儀表板', icon: LayoutDashboard },
  { href: '/orders', label: '訂單', icon: ClipboardList },
  { href: '/orders/new', label: '新增', icon: PlusCircle },
  { href: '/products', label: '商品', icon: Package },
  { href: '/reports', label: '報表', icon: BarChart3 },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border flex items-stretch h-16 z-10">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-xs ${
              isActive ? 'text-ink-primary' : 'text-ink-secondary'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
