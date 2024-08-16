// types/next-auth.d.ts

import NextAuth, { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Add custom fields
      email: string;
      registrationNumber: string;
      name?: string | null;
      image?: string | null;
    } & DefaultUser; // Use DefaultUser to keep existing fields
  }
}


export type FormValuesRegistration = {
    registration_number: string;
    email: string;
    name: string;
    password: string;
    confirm_password: string;
}

export type FormValuesLogin = {
    registration_number: string;
    password: string;
}

