'use server';

import { z } from 'zod'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';
 
const FormSchema = z.object({
//   id: z.string(),
  registration_number: z
    .string({
      invalid_type_error: 'Please enter your registration number.',
    })
    .min(10, 'Please enter a valid number')
    .max(10, 'Please enter a valid number'),
  email: z
    .string({
      invalid_type_error: 'Please enter your email.',
    })
    .email('Pleas enter a valid email.'),
  name: z
    .string({
      invalid_type_error: 'Please enter your name.',
    })
    .max(50, 'Name is too long.'),
  password: z
    .string({
      invalid_type_error: 'Please enter your password.',
    })
    .min(10, 'Password must be at least 10 characters')
    .max(100),
  confirm_password: z
    .string({
      invalid_type_error: 'Please enter your password.',
    })
    .min(10, 'Password must be at least 10 characters')
    .max(100)
})
.refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
})

 
// const CreateStudent = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    registration_number?: string[];
    email?: string[];
    name?: string[];
    password?: string[];
    confirm_password?: string[];
  };
  message?: string | null;
};

export async function createStudent(prevState: State, formData: FormData) {
    const validatedFields = FormSchema.safeParse({
        registration_number: formData.get('registration_number'),
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password')
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create student.',
      };
    }
    
    const { registration_number, email, name, password, confirm_password } = validatedFields.data;

    console.log(registration_number);

    // try {
    //   await sql`
    //   INSERT INTO students (registration_number, email, name, password)
    //   VALUES (${registration_number}, ${email}, ${name}, ${password})
    //   `;  
    // } catch (error) {
    //   return { message: 'Database error: Failed to create invoice' };
    // }
    
    revalidatePath('/dashboard/login'); // For example
    redirect('/dashboard/login'); //For example
}
