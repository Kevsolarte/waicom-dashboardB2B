// src/pages/dashboard/DashboardPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { KpiGrid } from "../components/kpiGrid";
import { SalesCharts } from "../components/salesCharts";
import { OrdersTable } from "../components/ordersTable";
import { SettingsPanel } from "./SettingsPanel";

export const DashboardPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<"dashboard" | "settings">(
    "dashboard"
  );

  useEffect(() => {
    if (!currentUser) navigate("/login", { replace: true });
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const { dashboard } = currentUser;

  return (
    <div className="min-h-screen w-full bg-(--wa-bg-dark) text-white flex">
   
      <aside
        className="
          hidden md:flex md:flex-col
          md:w-64 md:fixed md:inset-y-0 md:left-0
          bg-(--wa-blue-dark)/60 
          border-r border-(--wa-border)
          backdrop-blur-lg
        "
      >
        <div className="h-16 flex items-center px-6 border-b border-(--wa-border)">
          <div
            className="
              w-9 h-9 rounded-xl 
              bg-(--wa-blue-primary) 
              flex items-center justify-center 
              text-white text-lg font-bold mr-3 shadow-lg
            "
          >
            W
          </div>
          <span className="font-semibold tracking-wide text-[15px]">
            Waicom Panel
          </span>
        </div>

        <nav className="px-4 py-6 space-y-2 text-sm">
          {/* Dashboard */}
          <button
            type="button"
            onClick={() => setActiveSection("dashboard")}
            className={`w-full text-left px-3 py-2 rounded-lg transition ${activeSection === "dashboard"
                ? "bg-(--wa-blue-primary)/20 text-(--wa-blue-secondary) font-semibold shadow-inner"
                : "text-slate-300 hover:bg-(--wa-blue-primary)/10 hover:text-white"
              }`}
          >
            Dashboard
          </button>

          {/* Ajustes */}
          <button
            type="button"
            onClick={() => setActiveSection("settings")}
            className={`w-full text-left px-3 py-2 rounded-lg transition ${activeSection === "settings"
                ? "bg-(--wa-blue-primary)/20 text-(--wa-blue-secondary) font-semibold shadow-inner"
                : "text-slate-300 hover:bg-(--wa-blue-primary)/10 hover:text-white"
              }`}
          >
            Ajustes
          </button>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col w-full md:ml-64">
        <header
          className="
            h-16 sticky top-0
            flex items-center justify-between 
            px-4 md:px-6 
            bg-(--wa-blue-dark)/40 
            backdrop-blur-xl
            border-b border-(--wa-border) 
            z-10
          "
        >
          <div className="flex items-center gap-3">
            <h1 className="hidden md:block text-lg font-semibold tracking-wide">
              {activeSection === "dashboard" ? "Dashboard" : "Ajustes de perfil"}
            </h1>

            <div className="md:hidden flex gap-2">
              <button
                type="button"
                onClick={() => setActiveSection("dashboard")}
                className={`px-3 py-1 rounded-full text-xs border transition ${activeSection === "dashboard"
                    ? "bg-(--wa-blue-primary) text-white border-transparent"
                    : "border-(--wa-border) text-slate-200"
                  }`}
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("settings")}
                className={`px-3 py-1 rounded-full text-xs border transition ${activeSection === "settings"
                    ? "bg-(--wa-blue-primary) text-white border-transparent"
                    : "border-(--wa-border) text-slate-200"
                  }`}
              >
                Ajustes
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-right text-xs md:text-sm">
              <p className="font-medium truncate max-w-[120px] md:max-w-xs">
                {currentUser.name}
              </p>
              <p className="text-[10px] md:text-xs text-slate-400 capitalize">
                {currentUser.role}
              </p>
            </div>

            {currentUser.avatarUrl && (
              <img
                src={currentUser.avatarUrl}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-(--wa-border) shadow-md"
              />
            )}

            <button
              onClick={logout}
              className="
                text-[10px] md:text-xs 
                px-3 py-1.5 rounded-full 
                border border-(--wa-border)
                hover:border-(--wa-yellow) 
                hover:text-(--wa-yellow) 
                transition
              "
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <main
          className="
            p-4 md:p-6 space-y-6 
            w-full max-w-6xl mx-auto
          "
        >
          {activeSection === "dashboard" && (
            <>
              {/* KPIs */}
              <KpiGrid kpis={dashboard.kpis} />

              {/* Charts */}
              <Box mt={4}>
                <SalesCharts
                  salesByDay={dashboard.salesByDay}
                  salesByChannel={dashboard.salesByChannel}
                  salesByPayment={dashboard.salesByPayment}
                  ordersByStatus={dashboard.ordersByStatus}
                />
              </Box>

              {/* Tabla */}
              <Box mt={4}>
                <OrdersTable orders={dashboard.orders} />
              </Box>
            </>
          )}

          {activeSection === "settings" && (
            <div className="w-full max-w-xl">
              <SettingsPanel user={currentUser} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
