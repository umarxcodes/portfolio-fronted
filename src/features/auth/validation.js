import { z } from "zod";
import { email, loginPassword, strongPassword } from "@/lib/validators";

export const loginSchema = z
  .object({
    email,
    password: loginPassword,
  })
  .strict();

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Current password must be at least 8 characters" })
      .max(128, { message: "Current password must not exceed 128 characters" }),
    newPassword: strongPassword("New password"),
    confirmNewPassword: strongPassword("Confirm password"),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export default { loginSchema, changePasswordSchema };
