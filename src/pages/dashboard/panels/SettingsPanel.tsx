import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";

export const SettingsPanel = () => {
  const { currentUser, updateProfile } = useAuth();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: currentUser?.name || "",
      avatarUrl: currentUser?.avatarUrl || "",
    }
  });

  const onSubmit = (data: any) => {
    updateProfile({
      name: data.name,
      avatarUrl: data.avatarUrl,
      role: currentUser!.role 
    });
  };

  return (
    <div className="bg-(--wa-card) border border-(--wa-border) shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Ajustes de perfil</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="text-sm text-gray-300">Nombre</label>
          <input
            {...register("name")}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-(--wa-blue-dark) border border-white/10 text-white"
          />
        </div>

        {/* Avatar */}
        <div>
          <label className="text-sm text-gray-300">URL Avatar</label>
          <input
            {...register("avatarUrl")}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-(--wa-blue-dark) border border-white/10 text-white"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-(--wa-yellow) text-[#001B3A] font-semibold hover:bg-yellow-300"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};
