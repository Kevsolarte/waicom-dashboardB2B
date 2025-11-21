import { type FC } from "react";
import type { DashboardKpis } from "../../../types/dashboard";
import {
    PaymentsOutlined,
    WhatsApp,
    ReceiptLong,
    PendingActions,
} from "@mui/icons-material";

interface KpiGridProps {
    kpis: DashboardKpis;
}

export const KpiGrid: FC<KpiGridProps> = ({ kpis }) => {
    const cards = [
        {
            title: "Ventas de hoy",
            value: `$${kpis.todaySales.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
            })}`,
            helper: "vs ayer",
            icon: <PaymentsOutlined fontSize="medium" />,
            accent: "bg-yellow-400",
        },
        {
            title: "Chats activos",
            value: kpis.activeWhatsappChats,
            helper: "En tiempo real",
            icon: <WhatsApp fontSize="medium" />,
            accent: "bg-green-500",
        },
        {
            title: "Ticket promedio",
            value: `$${kpis.averageTicket.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
            })}`,
            helper: "Ordenes de hoy",
            icon: <ReceiptLong fontSize="medium" />,
            accent: "bg-white",
        },
        {
            title: "Órdenes pendientes",
            value: kpis.pendingOrders,
            helper: "Por atender",
            icon: <PendingActions fontSize="medium" />,
            accent: "bg-orange-400",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, i) => (
                <div
                    key={i}
                    className="p-5 rounded-2xl shadow-lg  bg-[#020817] border border-white/5  hover:scale-[1.02] transition-all  duration-200 flex items-center gap-4
  "
                >
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg bg-linear-to-br from-[#0072FF] to-[#0052D4]
            `}
                    >
                        {card.icon}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm text-gray-200">{card.title}</span>

                        <span className="text-2xl font-bold text-white drop-shadow-sm">
                            {card.value}
                        </span>

                        <span className="text-xs text-blue-200 flex items-center gap-2">
                            {card.helper}
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
