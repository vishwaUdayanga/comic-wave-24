import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt'
import mailjet from '../lib/mailjet';
import { randomUUID } from 'crypto'

const WEB_DOMAIN = process.env.DOMAIN || ''

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

          if (!user) {
            return null;
          }

          if (!user.active) {
            const token = await prisma.activateToken.findFirst({
              where: {
                studentId: user.id,
                createdAt: {
                  gt: new Date(Date.now() - 24*60*60*1000)
                }
              }
            })
            if (!token) {
              const token = await prisma.activateToken.create({
                data: {
                  token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
                  studentId: user.id
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
                            Email: user.email,
                          },
                        ],
                        Subject: 'Email verification for COMIC-WAVE-24',
                        TextPart: `Hello ${user.name}, Please activate your account by clicking this link : ${WEB_DOMAIN}/activate/${token.token}`,
                      },
                    ],
                  });
              } catch (error) {
                return null;
              }
            }
          }
  
          if (user && await bcrypt.compare(credentials.password, user.password) && user.active) {
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