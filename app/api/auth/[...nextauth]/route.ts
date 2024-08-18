import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt'
import type { NextAuthOptions } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';

  
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}