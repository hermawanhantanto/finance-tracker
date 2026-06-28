import { z } from "zod";

export const signInSchema = z.object({
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
});

export type SignInFormValues = z.infer<typeof signInSchema>;
