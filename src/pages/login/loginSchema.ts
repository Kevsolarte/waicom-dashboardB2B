import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(4, "La contraseña es demasiado corta"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
