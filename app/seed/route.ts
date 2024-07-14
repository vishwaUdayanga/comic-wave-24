import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { students, tokens } from '../lib/placeholder-data';

const client = await db.connect();

async function seedStudents() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS students (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      registration_number VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      password TEXT NOT NULL,
      paid BOOLEAN DEFAULT FALSE,
      paid_at TIMESTAMP DEFAULT now(),
      verified BOOLEAN DEFAULT FALSE,
      verified_at TIMESTAMP DEFAULT now()
    );
  `;

  const insertedStudents = await Promise.all(
    students.map(async (student) => {
      const hashedPassword = await bcrypt.hash(student.password, 10);
      return client.sql`
        INSERT INTO students (id, registration_number, email, name, password)
        VALUES (${student.id}, ${student.registration_number}, ${student.email}, ${student.name}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedStudents;
}

async function seedTokens() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS tokens (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            student_id UUID NOT NULL,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now(),
            token TEXT NOT NULL
        );
    `;

    const insertedTokens = await Promise.all(
        tokens.map(async (token) => {
          return client.sql`
            INSERT INTO tokens (student_id, token)
            VALUES (${token.student_id}, ${token.token});
          `;
        }),
      );
    
      return insertedTokens;
}

export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedStudents();
      await seedTokens();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }