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
import { getServerSession } from 'next-auth';
import { authOptions } from '../utils/authOptions';
import { Message } from 'node-mailjet';
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

// lib/fetchUploads.ts

// lib/fetchUploadsByRegistrationNumber.ts

const ITEMS_PER_PAGE = 10;

export async function fetchUploadsByRegistrationNumber(
  registrationNumber: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Fetch uploads with pagination
    const whereClause = registrationNumber
      ? { studentId: registrationNumber } 
      : {}; 

    const uploads = await prisma.uploads.findMany({
      where: whereClause,
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    return uploads;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch uploads.');
  }
}

export async function fetchBoughtByRegistrationNumber(
  registrationNumber: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Fetch uploads with pagination
    const whereClause = registrationNumber
      ? { studentId: registrationNumber } 
      : {}; 

    const uploads = await prisma.bought.findMany({
      where: whereClause,
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    return uploads;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch uploads.');
  }
}

export async function fetchUploads(
  registrationNumber: string
) {

  try {
    // Fetch uploads with pagination
    const whereClause = registrationNumber
      ? { studentId: registrationNumber } 
      : {}; 

    const count = await prisma.uploads.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch uploads.');
  }
}


export async function changeUploadStatus(registrationNumber:string) {
    const update = await prisma.uploads.update({
      where: {
        studentId: registrationNumber
      },
      data: {
        verified: false
      }
    })

    if (!update) {
      return false
    } else {
      return true
    }
}

export async function fetchBought(
  registrationNumber: string
) {

  try {
    // Fetch uploads with pagination
    const whereClause = registrationNumber
      ? { studentId: registrationNumber } 
      : {}; 

    const count = await prisma.bought.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch uploads.');
  }
}

export async function fetchIssued(
  registrationNumber: string
) {

  try {
    // Fetch uploads with pagination
    const whereClause = registrationNumber
      ? { studentId: registrationNumber } 
      : {}; 

    const count = await prisma.issued.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch uploads.');
  }
}

export async function fetchIssuedByRegistrationNumber(
  registrationNumber: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Fetch uploads with pagination
    const whereClause = registrationNumber
      ? { studentId: registrationNumber } 
      : {}; 

    const uploads = await prisma.issued.findMany({
      where: whereClause,
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    return uploads;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch uploads.');
  }
}

export async function fetchStudents(
  registrationNumber: string
) {

  try {
    // Fetch uploads with pagination
    const whereClause = registrationNumber
      ? { registrationNumber: registrationNumber } 
      : {}; 

    const count = await prisma.student.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch uploads.');
  }
}

export async function fetchStudentsByRegistrationNumber(
  registrationNumber: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Fetch uploads with pagination
    const whereClause = registrationNumber
      ? { registrationNumber: registrationNumber } 
      : {}; 

    const students = await prisma.student.findMany({
      where: whereClause,
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    return students;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch uploads.');
  }
}

