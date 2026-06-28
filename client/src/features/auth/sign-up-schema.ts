import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least 1 uppercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least 1 number",
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: "Password must contain at least 1 symbol",
      }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
