// src/pages/dashboard/components/SalesCharts.tsx
import { useState } from "react";
import type { SalesByDay, SalesByChannel, SalesByPayment, OrdersByStatus, } from "../../../types/dashboard";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, } from "recharts";


type SalesChartsProps = {
    salesByDay: SalesByDay[];
    salesByChannel: SalesByChannel[];
    salesByPayment: SalesByPayment[];
    ordersByStatus: OrdersByStatus[];
};

// Paleta Waicom aproximada
const COLORS = {
    bgDark: "#020617", // fondo general
    card: "#020817", // tarjetas
    border: "rgba(148, 163, 184, 0.35)", // slate-400 con opacidad
    textPrimary: "#e5e7eb", // slate-200
    textMuted: "#9ca3af", // gray-400
    accentYellow: "#FFC400",
    accentTeal: "#01C9C7",
    accentPurple: "#7C3AED",
};

export const SalesCharts: React.FC<SalesChartsProps> = ({
    salesByDay,
    salesByChannel,
    salesByPayment,
    ordersByStatus,
}) => {
    const [view, setView] = useState<"channel" | "payment" | "status">("channel");

    // Normalizar los datos de la grafica dependiendo de la vistA seleccionada
    const barData =
        view === "channel"
            ? salesByChannel.map((item) => ({
                name:
                    item.channel === "whatsapp"
                        ? "WhatsApp"
                        : item.channel === "web"
                            ? "Web"
                            : item.channel === "instagram"
                                ? "Instagram"
                                : item.channel,
                value: item.total,
            }))
            : view === "payment"
                ? salesByPayment.map((item) => ({
                    name:
                        item.method === "card"
                            ? "Tarjeta"
                            : item.method === "mobile"
                                ? "Pago móvil"
                                : item.method === "zelle"
                                    ? "Zelle"
                                    : item.method === "transfer"
                                        ? "Transferencia"
                                        : item.method,
                    value: item.total,
                }))
                : ordersByStatus.map((item) => ({
                    name:
                        item.status === "paid"
                            ? "Pagadas"
                            : item.status === "pending"
                                ? "Pendientes"
                                : item.status === "failed"
                                    ? "Fallidas"
                                    : item.status === "refunded"
                                        ? "Reembolsadas"
                                        : item.status,
                    value: item.count,
                }));

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div
                className="rounded-2xl border shadow-lg p-5 lg:p-6 h-[360px]"
                style={{
                    background: COLORS.card,
                    borderColor: COLORS.border,
                }}
            >
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p
                            className="text-xs font-medium tracking-wide uppercase"
                            style={{ color: COLORS.accentTeal }}
                        >
                            Tendencia
                        </p>
                        <h3
                            className="text-lg font-semibold"
                            style={{ color: COLORS.textPrimary }}
                        >
                            Ventas por día
                        </h3>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-[11px]">
                        <button
                            className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-200"
                            type="button"
                        >
                            Últimos 7 días
                        </button>
                        <button
                            className="px-2.5 py-1 rounded-full border border-transparent text-gray-400 hover:border-white/10 hover:text-gray-200 transition"
                            type="button"
                        >
                            14 días
                        </button>
                        <button
                            className="px-2.5 py-1 rounded-full border border-transparent text-gray-400 hover:border-white/10 hover:text-gray-200 transition"
                            type="button"
                        >
                            30 días
                        </button>
                    </div>
                </div>

                <p
                    className="text-xs mb-4"
                    style={{ color: COLORS.textMuted }}
                >
                    Visualiza cómo se comportaron tus ventas en el tiempo y detecta picos
                    o caídas en cuestión de segundos.
                </p>

                <div className="w-full h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesByDay}>
                            <CartesianGrid
                                stroke="rgba(148, 163, 184, 0.25)"
                                strokeDasharray="3 3"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="date"
                                stroke={COLORS.textMuted}
                                tick={{ fontSize: 11, fill: COLORS.textMuted }}
                                tickLine={false}
                            />
                            <YAxis
                                stroke={COLORS.textMuted}
                                tick={{ fontSize: 11, fill: COLORS.textMuted }}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#020617",
                                    borderRadius: "0.75rem",
                                    border: `1px solid ${COLORS.border}`,
                                    padding: "0.5rem 0.75rem",
                                }}
                                labelStyle={{ color: COLORS.textMuted, fontSize: 11 }}
                                itemStyle={{ color: COLORS.accentYellow, fontSize: 12 }}
                                cursor={{ stroke: "rgba(148,163,184,0.3)", strokeWidth: 1 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke={COLORS.accentYellow}
                                strokeWidth={2.4}
                                dot={{ r: 3, strokeWidth: 1, stroke: COLORS.bgDark }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div
                className="rounded-2xl border shadow-lg p-5 lg:p-6 h-[360px] flex flex-col"
                style={{
                    background: COLORS.card,
                    borderColor: COLORS.border,
                }}
            >
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p
                            className="text-xs font-medium tracking-wide uppercase"
                            style={{ color: COLORS.accentPurple }}
                        >
                            Distribución
                        </p>
                        <h3
                            className="text-lg font-semibold"
                            style={{ color: COLORS.textPrimary }}
                        >
                            Desglose de ventas y órdenes
                        </h3>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px]">
                        <button
                            type="button"
                            onClick={() => setView("channel")}
                            className={`px-2.5 py-1 rounded-full border transition ${view === "channel"
                                ? "border-[#01C9C7] bg-[#01C9C7]/10 text-gray-100"
                                : "border-transparent text-gray-400 hover:border-white/10 hover:text-gray-100"
                                }`}
                        >
                            Canal
                        </button>
                        <button
                            type="button"
                            onClick={() => setView("payment")}
                            className={`px-2.5 py-1 rounded-full border transition ${view === "payment"
                                ? "border-[#FFC400] bg-[#FFC400]/10 text-gray-100"
                                : "border-transparent text-gray-400 hover:border-white/10 hover:text-gray-100"
                                }`}
                        >
                            Pago
                        </button>
                        <button
                            type="button"
                            onClick={() => setView("status")}
                            className={`px-2.5 py-1 rounded-full border transition ${view === "status"
                                ? "border-[#7C3AED] bg-[#7C3AED]/10 text-gray-100"
                                : "border-transparent text-gray-400 hover:border-white/10 hover:text-gray-100"
                                }`}
                        >
                            Estado
                        </button>
                    </div>
                </div>

                <p
                    className="text-xs mb-4"
                    style={{ color: COLORS.textMuted }}
                >
                    Cambia la vista para analizar tus ventas por canal, método de pago o
                    estado de las órdenes y detectar rápidamente dónde estás convirtiendo
                    mejor.
                </p>

                <div className="flex-1 w-full h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} barSize={32}>
                            <CartesianGrid
                                stroke="rgba(148, 163, 184, 0.25)"
                                strokeDasharray="3 3"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="name"
                                stroke={COLORS.textMuted}
                                tick={{ fontSize: 11, fill: COLORS.textMuted }}
                                tickLine={false}
                            />
                            <YAxis
                                stroke={COLORS.textMuted}
                                tick={{ fontSize: 11, fill: COLORS.textMuted }}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#020617",
                                    borderRadius: "0.75rem",
                                    border: `1px solid ${COLORS.border}`,
                                    padding: "0.5rem 0.75rem",
                                }}
                                labelStyle={{ color: COLORS.textMuted, fontSize: 11 }}
                                itemStyle={{ color: COLORS.accentTeal, fontSize: 12 }}
                                cursor={{ fill: "rgba(148,163,184,0.06)" }}
                            />
                            <Bar
                                dataKey="value"
                                radius={[8, 8, 0, 0]}
                                fill={
                                    view === "channel"
                                        ? COLORS.accentTeal
                                        : view === "payment"
                                            ? COLORS.accentYellow
                                            : COLORS.accentPurple
                                }
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
