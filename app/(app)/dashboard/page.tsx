'use client';

import { useEffect, useState } from 'react';
import * as api from '@/lib/api';
import type { DashboardSummary } from '@/types';
import StatCard from '@/components/dashboard/StatCard';
import RecentOrdersList from '@/components/dashboard/RecentOrdersList';

function formatCurrency(n: number) {
  return `NT$ ${Math.round(n).toLocaleString()}`;
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api.getDashboardSummary().then((res) => {
      if (cancelled) return;
      if (res.success && res.data) {
        setSummary(res.data);
      } else {
        setError(res.message || '讀取儀表板資料失敗');
      }
      setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return <p className="text-sm text-ink-secondary">讀取中…</p>;
  }

  if (error || !summary) {
    return <p className="text-sm text-danger">{error || '讀取失敗'}</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-medium mb-5">儀表板</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="今日營業額" value={formatCurrency(summary.todayRevenue)} />
        <StatCard label="本月營業額" value={formatCurrency(summary.monthRevenue)} />
        <StatCard label="年營業額" value={formatCurrency(summary.yearRevenue)} />
        <StatCard label="本月毛利" value={formatCurrency(summary.monthGrossProfit)} tone="success" />
        <StatCard label="待安裝" value={String(summary.pendingInstallCount)} tone="warning" />
        <StatCard label="已完成" value={String(summary.doneCount)} tone="success" />
        <StatCard label="本月訂單數" value={String(summary.monthOrderCount)} />
      </div>

      <div className="card">
        <h2 className="text-base font-medium mb-4">最近訂單</h2>
        <RecentOrdersList orders={summary.recentOrders} />
      </div>
    </div>
  );
}
