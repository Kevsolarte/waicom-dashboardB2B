import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormValues } from "./loginSchema";
import { useAuth } from "../../hooks/useAuth";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null);

    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch {
      setAuthError("Credenciales incorrectas. Revisa tu email o contraseña.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* --- EMAIL --- */}
      <div>
        <label className="block text-xs font-medium text-white/90">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-xl bg-white/95 px-4 py-2.5 text-sm text-slate-900 shadow-inner border border-white/70
            focus:ring-2 focus:ring-[#ffd34d]"
          placeholder="tu@correo.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-200">{errors.email.message}</p>
        )}
      </div>

      {/* --- PASSWORD --- */}
      <div>
        <label className="block text-xs font-medium text-white/90">
          Contraseña
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full rounded-xl bg-white/95 px-4 py-2.5 text-sm text-slate-900 shadow-inner border border-white/70
            focus:ring-2 focus:ring-[#ffd34d]"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-200">
            {errors.password.message}
          </p>
        )}
      </div>

      {authError && (
        <p className="text-xs text-center text-red-200 bg-red-500/10 border border-red-400/40 rounded-lg py-2 px-3">
          {authError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-full bg-[#ffd34d] py-2.5 text-sm font-semibold text-[#14213d]"
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </button>

      <p className="mt-3 text-center text-[11px] text-white/80">
        ¿No tienes cuenta?{" "}
        <span className="cursor-pointer text-[#ffd34d] hover:underline">
          Solicita tu demo
        </span>
      </p>
    </form>
  );
};
