'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MobileTabBar from '@/components/layout/MobileTabBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoading, isLoggedIn, router]);

  // 還在確認登入狀態,或確認後準備導向登入頁,先不要閃一下畫面內容
  if (isLoading || !isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <TopBar />
        <main className="p-4 md:p-6 pb-24 md:pb-6 max-w-6xl mx-auto">{children}</main>
      </div>
      <MobileTabBar />
    </div>
  );
}
