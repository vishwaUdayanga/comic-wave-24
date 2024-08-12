import { z } from "zod";

export const signUpSchema = z.object({
      registration_number: z
        .string({ message: 'Registration number is required.' })
        .min(10, {message:'Please enter a valid number'})
        .max(10, {message:'Please enter a valid number'}),
      email: z
        .string({ message: 'Email is required.' })
        .email({ message:  'Pleas enter a valid email.'}),
      name: z
        .string({ message: 'Name is required.' })
        .min(3, { message: 'Please enter a name.' })
        .max(50, { message: 'Name is too long.'}),
      password: z
        .string({ message: 'Password is required.' })
        .min(10, { message: 'Password must be at least 10 characters' })
        .max(100, { message: 'Message is too long.'}),
      confirm_password: z
        .string({ message: 'Confirm your password.' })
        .min(10, { message: 'Password must be at least 10 characters' })
        .max(100, { message: 'Message is too long.'}),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"],
});
    