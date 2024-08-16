import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        registration_number: { label: 'registration_number', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.student.findUnique({
          where: { registrationNumber: credentials?.registration_number },
        });

        if (user && (await bcrypt.compare(credentials?.password as string, user.password))) {
          return { id: user.id.toString(), email: user.email, registrationNumber: user.registrationNumber };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login', // Custom sign-in page
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.registrationNumber = user.registrationNumber;
      return session;
    },
  },
});
