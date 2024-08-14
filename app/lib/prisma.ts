import { PrismaClient } from '@prisma/client';

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Export the client instance
export default prisma;