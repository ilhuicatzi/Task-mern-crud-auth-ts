import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is required",
    })
    .min(2, "First Name must be a least 2 characters")
    .max(50, "First Name must be at most 50 characters")
    .refine((value) => !/\s/.test(value), "First Name must not contain spaces")
    .transform((value) => value.trim()),

  lastName: z
    .string({
      required_error: "Last Name is required",
    })
    .min(2, "Last Name must be a least 2 charactes")
    .max(50, "Last Name must be at most 50 characters")
    .refine((value) => !/\s/.test(value), "Last Name must not contain spaces")
    .transform((value) => value.trim()),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid Email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at most 50 characters")
    .refine((value) => !/\s/.test(value), "Password must not contain spaces"),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid Email",
    }),
  password: z.string({
    required_error: "Password is required",
  }),
});
