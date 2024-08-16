import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; 
      email: string;
      registrationNumber: string;
      name?: string | null;
      image?: string | null;
    } & DefaultUser; 
  }


  interface User {
    id: string; 
    email: string;
    registrationNumber: string;
    name?: string;
    image?: string;
  }
}
