'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie, deleteCookie } from './cookies';
import * as api from './api';

const TOKEN_COOKIE = 'feiting2024_token';
const USERNAME_COOKIE = 'feiting2024_username';

interface AuthContextValue {
  username: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  loginWithPassword: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 網頁重新整理後,靠 Cookie 判斷是否還處於登入狀態
    const savedUsername = getCookie(USERNAME_COOKIE);
    const savedToken = getCookie(TOKEN_COOKIE);
    if (savedUsername && savedToken) {
      setUsername(savedUsername);
    }
    setIsLoading(false);
  }, []);

  async function loginWithPassword(usernameInput: string, password: string) {
    const res = await api.login(usernameInput, password);
    if (res.success && res.data) {
      const days = (res.data.expiresInMinutes || 360) / 60 / 24;
      setCookie(TOKEN_COOKIE, res.data.token, days);
      setCookie(USERNAME_COOKIE, res.data.username, days);
      setUsername(res.data.username);
      return { success: true, message: '' };
    }
    return { success: false, message: res.message || '登入失敗' };
  }

  function logoutUser() {
    deleteCookie(TOKEN_COOKIE);
    deleteCookie(USERNAME_COOKIE);
    setUsername(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ username, isLoggedIn: !!username, isLoading, loginWithPassword, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth 必須在 <AuthProvider> 底下使用');
  return ctx;
}
