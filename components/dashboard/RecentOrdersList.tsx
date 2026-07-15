import Link from 'next/link';
import type { Order } from '@/types';

function formatCurrency(n: number) {
  return `NT$ ${n.toLocaleString()}`;
}

function StatusBadge({ status }: { status: string }) {
  const isDone = status === '已完成' || status === '已收全款';
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full ${
        isDone ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'
      }`}
    >
      {status}
    </span>
  );
}

export default function RecentOrdersList({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <p className="text-sm text-ink-secondary py-6 text-center">還沒有訂單資料</p>;
  }

  return (
    <div>
      {/* 桌機:表格 */}
      <table className="hidden md:table w-full text-sm">
        <thead>
          <tr className="text-left text-ink-secondary border-b border-border">
            <th className="py-2 font-normal">訂單編號</th>
            <th className="py-2 font-normal">客戶</th>
            <th className="py-2 font-normal">車牌</th>
            <th className="py-2 font-normal">訂單狀態</th>
            <th className="py-2 font-normal text-right">金額</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.orderId} className="border-b border-border last:border-0 hover:bg-surface-1">
              <td className="py-2.5">
                <Link href={`/orders/${o.orderId}`} className="hover:underline">
                  {o.orderId}
                </Link>
              </td>
              <td className="py-2.5">{o.customerName}</td>
              <td className="py-2.5">{o.licensePlate}</td>
              <td className="py-2.5">
                <StatusBadge status={o.orderStatus} />
              </td>
              <td className="py-2.5 text-right">{formatCurrency(o.orderAmount || o.totalSalesAmount || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 手機:卡片 */}
      <div className="md:hidden flex flex-col gap-3">
        {orders.map((o) => (
          <Link
            key={o.orderId}
            href={`/orders/${o.orderId}`}
            className="block bg-surface-2 border border-border rounded-card p-4"
          >
            <div className="flex justify-between items-start mb-2.5">
              <div>
                <div className="font-medium text-sm">{o.orderId}</div>
                <div className="text-xs text-ink-secondary mt-0.5">
                  {o.customerName} · {o.licensePlate}
                </div>
              </div>
              <StatusBadge status={o.orderStatus} />
            </div>
            <div className="border-t border-border pt-2.5 flex justify-between text-xs text-ink-secondary">
              <span>{o.orderDate}</span>
              <span className="font-medium text-ink-primary">
                {formatCurrency(o.orderAmount || o.totalSalesAmount || 0)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
