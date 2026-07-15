'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard', label: '儀表板' },
  { href: '/orders', label: '訂單管理' },
  { href: '/products', label: '商品資料庫' },
  { href: '/reports', label: '報表' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-56 md:shrink-0 border-r border-border bg-white p-4">
      <div className="text-lg font-medium px-2 mb-6">feiting2024</div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-surface-1 font-medium' : 'text-ink-secondary hover:bg-surface-1'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
