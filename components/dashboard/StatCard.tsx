interface StatCardProps {
  label: string;
  value: string;
  tone?: 'default' | 'success' | 'warning';
}

export default function StatCard({ label, value, tone = 'default' }: StatCardProps) {
  const toneClass = tone === 'success' ? 'text-success' : tone === 'warning' ? 'text-warning' : 'text-ink-primary';

  return (
    <div className="rounded-card bg-surface-1 p-4">
      <div className="text-sm text-ink-secondary">{label}</div>
      <div className={`text-2xl font-medium mt-1 ${toneClass}`}>{value}</div>
    </div>
  );
}
