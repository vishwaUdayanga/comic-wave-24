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

export const signInSchema = z.object({
  registration_number: z
    .string({ message: 'Registration number is required.' })
    .min(10, {message:'Please enter a valid number'})
    .max(10, {message:'Please enter a valid number'}),
  password: z
    .string({ message: 'Password is required.' })
    .min(10, { message: 'Password must be at least 10 characters' })
    .max(100, { message: 'Message is too long.'}),
});

export const uploadFileSchema = z.object({
  file: z.instanceof(FileList).refine(fileList => fileList.length > 0, {
    message: 'You must select a file',
  }).refine(fileList => {
    const file = fileList[0];
    return file ? file.size < 5000000 : false; // 5MB limit
  }, {
    message: 'File size should be less than 5MB',
  }).refine(fileList => {
    const file = fileList[0];
    return file ? ['image/png'].includes(file.type) : false; // Allowed types
  }, {
    message: 'Only PNG images are allowed',
  }),
});
    