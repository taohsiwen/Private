'use client';

import { useAuth } from '@/lib/auth-context';

export default function TopBar() {
  const { username, logoutUser } = useAuth();

  return (
    <header className="h-14 border-b border-border bg-white flex items-center justify-between px-4 md:px-6">
      <div className="text-sm text-ink-secondary md:hidden font-medium">feiting2024</div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-3">
        <span className="text-sm text-ink-secondary">{username}</span>
        <button onClick={logoutUser} className="text-sm text-ink-secondary hover:text-ink-primary">
          登出
        </button>
      </div>
    </header>
  );
}
