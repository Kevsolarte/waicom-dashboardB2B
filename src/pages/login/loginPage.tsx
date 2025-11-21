import { LoginForm } from "./loginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const LoginPage = () => {
   const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate]); 
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f6fff] via-[#2a86ff] to-[#003a9c] px-4 relative overflow-hidden">
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex flex-col items-center gap-2 text-white">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0043a8] font-semibold shadow-lg">
              W
            </div>
            <span className="text-xl font-semibold tracking-tight">
              waicom
            </span>
          </div>
          <p className="text-[11px] uppercase tracking-[0.25em] opacity-80">
            Acceso clientes
          </p>
        </div>

        <div className="group rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-[0_18px_45px_rgba(0,0,0,0.35)] p-8 text-sm text-slate-50 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
          <h2 className="mb-1 text-center text-lg font-semibold">
            Inicia sesión en tu panel
          </h2>
          <p className="mb-6 text-center text-xs text-white/80">
            Automatiza tus ventas por WhatsApp y controla tus órdenes en un solo lugar.
          </p>

          <LoginForm />
        </div>

        <p className="mt-6 text-center text-[11px] text-white/80">
          Asistente 24/7 · Cobros seguros · Datos cifrados
        </p>
      </div>
    </div>
  );
};
