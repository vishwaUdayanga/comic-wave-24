'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FieldError } from 'react-hook-form';
import { FormValuesRegistration } from './types';
import prisma from './prisma';
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'
import formDataTemp from 'form-data'
import mailjet from './mailjet';
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';


export type IncomingState = {
  error?: String | null,
  message?: String | null
}

const WEB_DOMAIN = process.env.DOMAIN || ''

// export async function createStudent(prevState: State, formData: FormData)

export async function createStudent(prevState: IncomingState, formData: FormValuesRegistration) {
    const password = await hash(formData.password as string, 12);
    
    const student = await prisma.student.create({
      data: {
          registrationNumber: formData.registration_number as string,
          email: formData.email as string,
          name: formData.name as string,
          password: password as string
      }
    })

    const token = await prisma.activateToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        studentId: student.id
      }
    })

    try {
      const request = await mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: 'vishwaudayanga310@gmail.com',
                Name: 'Vishwa Udayanga',
              },
              To: [
                {
                  Email: student.email,
                },
              ],
              Subject: 'Email verification for COMIC-WAVE-24',
              TextPart: `Hello ${student.name}, Please activate your account by clicking this link : ${WEB_DOMAIN}/activate/${token.token}`,
            },
          ],
        });
    } catch (error) {
      await prisma.activateToken.delete({
        where: {token: token.token}
      })
      await prisma.student.delete({
        where: {id: student.id}
      })      
      return {
        error: 'Email error',
        message: 'Please provide a correct email.'
      }
    }


    return {
      error: null,
      message: 'Success'
    }
    
    // revalidatePath('/dashboard/login'); // For example
    // redirect('/dashboard/login'); //For example
}
