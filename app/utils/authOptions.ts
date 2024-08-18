import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
      CredentialsProvider({
        name: 'Sign in',
        credentials: {
          registration_number: { label: 'Registration Number', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials) return null;
  
          const user = await prisma.student.findUnique({
            where: { registrationNumber: credentials.registration_number },
          });
  
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return { id: user.id.toString(), name: user.name, email: user.email, registrationNumber: user.registrationNumber };
          }
          
  
          return null;
        },
      }),
    ],
    // pages: {
    //   signIn: '/login', // Custom sign-in page
    // },
    callbacks: {
        async session({ session, token }) {
            // For JWT strategy, use the token object
            if (token) {
              session.user = {
                id: token.id as string,
                name: token.name as string,
                email: token.email as string,
                registrationNumber: token.registrationNumber as string, // Ensure this is added
              };
            }
            return session;
          },
          async jwt({ token, user }) {
            // Include custom fields in the JWT token
            if (user) {
              token.id = user.id;
              token.name = user.name;
              token.email = user.email;
              token.registrationNumber = user.registrationNumber; // Ensure this is added
            }
            return token;
          },
          async redirect({ url, baseUrl }) {
            // Redirect to the home page or any custom page after login
            return baseUrl;
          },
    },
};