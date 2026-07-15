'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const { loginWithPassword } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const result = await loginWithPassword(username, password);
    setIsSubmitting(false);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-xl font-medium">feiting2024</h1>
          <p className="text-sm text-ink-secondary mt-1">營運管理系統</p>
        </div>

        <form onSubmit={handleSubmit} className="card">
          <label className="field-label" htmlFor="username">
            帳號
          </label>
          <input
            id="username"
            className="field-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <label className="field-label mt-4" htmlFor="password">
            密碼
          </label>
          <input
            id="password"
            type="password"
            className="field-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <p className="text-sm text-danger mt-3">{error}</p>}

          <button type="submit" className="btn-primary w-full mt-6" disabled={isSubmitting}>
            {isSubmitting ? '登入中…' : '登入'}
          </button>
        </form>
      </div>
    </div>
  );
}
