// 對應 Apps Script Config.gs 裡 FIELD_MAP 的英文 key,兩邊要保持一致

export interface OrderItem {
  itemId: string;
  orderId: string;
  productId: string;
  category: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  subtotal: number;
  isGift: '是' | '否';
  note: string;
}

export interface Order {
  orderId: string;
  orderDate: string;
  vendorId: string;
  brand: string;
  licensePlate: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  inquiryLocation: string;
  dispatchStatus: '未完成' | '已完成';
  carModel: string;
  wheelPosition: string;
  discSize: string;
  discType: '雙片' | '半浮' | '全浮' | '';
  centerCapPcd: string;
  capColor: string;
  caliperSize: string;
  caliperColor: string;
  logo: string;
  installLocation: string;
  installDate: string;
  orderStatus: '待安裝' | '已完成';
  paymentStatus: '未收款' | '已收訂金' | '已收全款';
  orderAmount: number;
  depositAmount: number;
  depositDate: string;
  depositMethod: string;
  finalPaymentAmount: number;
  finalPaymentDate: string;
  finalPaymentMethod: string;
  totalSalesAmount: number;
  customerNote: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  items?: OrderItem[];
}

export interface Cost {
  costId: string;
  orderId: string;
  discLaborCost: number;
  caliperMaintenanceCost: number;
  caliperPaintCost: number;
  installLaborCost: number;
  otherCost: number;
  otherCostNote: string;
  itemsCost: number;
  totalCost: number;
  grossProfit: number;
  grossMargin: number;
  updatedAt: string;
}

export interface Product {
  productId: string;
  productName: string;
  category: string;
  spec: string;
  vendorId: string;
  cost: number;
  price: number;
  status: '啟用' | '停用';
  note: string;
  updatedAt: string;
}

export interface DashboardSummary {
  todayRevenue: number;
  monthRevenue: number;
  yearRevenue: number;
  pendingInstallCount: number;
  doneCount: number;
  monthGrossProfit: number;
  monthOrderCount: number;
  recentOrders: Order[];
}

// 所有 API 統一回應格式
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}
