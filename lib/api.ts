import { getCookie } from './cookies';
import type { ApiResponse, Order, OrderItem, Cost, Product, DashboardSummary } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const TOKEN_COOKIE = 'feiting2024_token';

if (!API_URL && typeof window !== 'undefined') {
  // 開發時如果忘記設定環境變數,直接在畫面上看得到錯誤,而不是安靜地失敗
  console.error('缺少 NEXT_PUBLIC_API_URL 環境變數,請在 .env.local 或 Vercel 專案設定裡加上 Apps Script 的 /exec 網址');
}

function getToken(): string {
  return getCookie(TOKEN_COOKIE) || '';
}

// ===== 底層請求函式 =====
// GET:查詢類 action,參數放在網址上
async function apiGet<T>(action: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
  const query = new URLSearchParams({ action, token: getToken(), ...params });
  try {
    const res = await fetch(`${API_URL}?${query.toString()}`);
    return (await res.json()) as ApiResponse<T>;
  } catch (err) {
    return { success: false, data: null, message: '連線失敗,請確認網路連線或 API 網址是否正確' };
  }
}

// POST:新增/修改/刪除類 action,資料放在 body
// 用 text/plain 避免瀏覽器對 Apps Script 發出 CORS 預檢請求(Apps Script 對 OPTIONS 支援不完整)
async function apiPost<T>(action: string, data: Record<string, any> = {}): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action, token: getToken(), data }),
    });
    return (await res.json()) as ApiResponse<T>;
  } catch (err) {
    return { success: false, data: null, message: '連線失敗,請確認網路連線或 API 網址是否正確' };
  }
}

// ===== 登入 =====
export function login(username: string, password: string) {
  return apiGet<{ token: string; username: string; expiresInMinutes: number }>('login', {
    username,
    password,
  });
}

export function logout(token: string) {
  return apiPost<null>('logout', { token });
}

// ===== 訂單 =====
export interface GetOrdersParams {
  keyword?: string;
  dateFrom?: string;
  dateTo?: string;
  licensePlate?: string;
  phone?: string;
  orderStatus?: string;
  page?: number;
  pageSize?: number;
}

export function getOrders(params: GetOrdersParams = {}) {
  return apiGet<Order[]>('getOrders', params);
}

export function getOrderById(orderId: string) {
  return apiGet<Order & { cost: Cost; items: OrderItem[] }>('getOrderById', { orderId });
}

export function createOrder(data: Partial<Order> & { items?: Partial<OrderItem>[] }) {
  return apiPost<{ orderId: string; orderStatus: string; paymentStatus: string }>('createOrder', data);
}

export function updateOrder(orderId: string, data: Partial<Order> & { items?: Partial<OrderItem>[] }) {
  return apiPost<null>('updateOrder', { orderId, ...data });
}

export function deleteOrder(orderId: string) {
  return apiPost<null>('deleteOrder', { orderId });
}

export function getOrderItems(orderId: string) {
  return apiGet<OrderItem[]>('getOrderItems', { orderId });
}

// ===== 成本 =====
export function getCostByOrderId(orderId: string) {
  return apiGet<Cost>('getCostByOrderId', { orderId });
}

export function upsertCost(orderId: string, patch: Partial<Cost>) {
  return apiPost<{ orderId: string; totalCost: number; grossProfit: number; grossMargin: number }>(
    'upsertCost',
    { orderId, ...patch }
  );
}

// ===== 商品 =====
export function getProducts(params: { category?: string; status?: string; keyword?: string } = {}) {
  return apiGet<Product[]>('getProducts', params);
}

export function createProduct(data: Partial<Product>) {
  return apiPost<Product>('createProduct', data);
}

export function updateProduct(productId: string, data: Partial<Product>) {
  return apiPost<null>('updateProduct', { productId, ...data });
}

export function deleteProduct(productId: string) {
  return apiPost<null>('deleteProduct', { productId });
}

// ===== Dashboard =====
export function getDashboardSummary() {
  return apiGet<DashboardSummary>('getDashboardSummary');
}
