
// --- KPIs ----
export interface DashboardKpis {
  todaySales: number;
  activeWhatsappChats: number;
  averageTicket: number;
  pendingOrders: number;
}

// --- Line Chart (Ventas por día) ---
export interface SalesByDay {
  date: string; 
  total: number; 
}

// --- Comparative chart (canal, pago, estado) ---
export interface SalesByChannel {
  channel: 'whatsapp' | 'web' | 'instagram';
  total: number;
}

export interface SalesByPayment {
  method: 'card' | 'transfer' | 'cash' | 'zelle' | 'mobile';
  total: number;
}

export interface OrdersByStatus {
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  count: number;
}

// --- Tabla de órdenes ---
export interface OrderRow {
  id: string;
  customerName: string;
  total: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  channel: 'whatsapp' | 'web' | 'instagram';
  paymentMethod: 'card' | 'transfer' | 'cash' | 'zelle' | 'mobile';
  createdAt: string;
}

// --- Paquete completo del dashboard ---
export interface DashboardData {
  kpis: DashboardKpis;
  salesByDay: SalesByDay[];
  salesByChannel: SalesByChannel[];
  salesByPayment: SalesByPayment[];
  ordersByStatus: OrdersByStatus[];
  orders: OrderRow[];
}
