import type { OrderRow } from "../../../types/dashboard";

type OrdersTableProps = {
  orders: OrderRow[];
};

const STATUS_LABEL: Record<OrderRow["status"], string> = {
  paid: "Pagada",
  pending: "Pendiente",
  failed: "Fallida",
  refunded: "Reembolsada",
};

const STATUS_STYLES: Record<OrderRow["status"], string> = {
  paid: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
  pending: "bg-amber-500/10 text-amber-300 border-amber-500/40",
  failed: "bg-rose-500/10 text-rose-300 border-rose-500/40",
  refunded: "bg-sky-500/10 text-sky-300 border-sky-500/40",
};

const CHANNEL_LABEL: Record<OrderRow["channel"], string> = {
  whatsapp: "WhatsApp",
  web: "Web",
  instagram: "Instagram",
};

const PAYMENT_LABEL: Record<OrderRow["paymentMethod"], string> = {
  card: "Tarjeta",
  mobile: "Pago móvil",
  zelle: "Zelle",
  transfer: "Transferencia",
  cash: ""
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("es-VE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <div
      className="rounded-2xl border shadow-lg overflow-hidden"
      style={{
        background: "#020817", 
        borderColor: "rgba(148,163,184,0.35)",
      }}
    >
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-700/60">
        <div>
          <p className="text-xs font-medium tracking-wide uppercase text-cyan-400">
            Órdenes
          </p>
          <h3 className="text-lg font-semibold text-slate-100">
            Estado de las órdenes
          </h3>
        </div>

        {orders.length > 0 && (
          <p className="text-xs text-slate-400">
            Mostrando <span className="text-slate-100 font-medium">{orders.length}</span>{" "}
            órdenes recientes
          </p>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-slate-400">
          No hay órdenes registradas todavía. Cuando empieces a vender, verás el
          detalle aquí en tiempo real.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/80">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  ID
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  Cliente
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  Total
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  Canal
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  Pago
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  Estado
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                  Fecha
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-slate-700/50 hover:bg-slate-900/60 transition-colors"
                >
                  <td className="px-5 py-3 text-[13px] font-mono text-slate-200">
                    {order.id}
                  </td>

                  <td className="px-5 py-3 text-[13px] text-slate-100">
                    {order.customerName}
                  </td>

                  <td className="px-5 py-3 text-[13px] text-slate-100">
                    {formatCurrency(order.total)}
                  </td>

                  <td className="px-5 py-3 text-[13px] text-slate-300">
                    {CHANNEL_LABEL[order.channel] ?? order.channel}
                  </td>

                  <td className="px-5 py-3 text-[13px] text-slate-300">
                    {PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod}
                  </td>

                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-medium ${STATUS_STYLES[order.status]}`}
                    >
                      {STATUS_LABEL[order.status] ?? order.status}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-[12px] text-slate-400">
                    {formatDateTime(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
