import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request : Request) {
    const {registrationNumber} = await request.json();

    try {
        const ticket = await prisma.bought.findUnique({
            where: { studentId: registrationNumber },
        });

        if (!ticket) {
            return NextResponse.json({ error: 'Could not update', updated: false }, { status: 500 });
        }

        const issued = await prisma.issued.create({
            data: {
                studentId: registrationNumber,
                ticketId: ticket?.id
            }
        })

        if (!issued) {
            return NextResponse.json({ error: 'Could not update', updated: false }, { status: 500 });
        }

        const update = await prisma.bought.update({
            where: {
              studentId: registrationNumber
            },
            data: {
              issued: true
            }
        })

        if (!update) {
            return NextResponse.json({ error: 'Could not update', updated: false }, { status: 500 });
        }

        return NextResponse.json({ message: 'Updated successfully' });

    } catch(error) {
      console.log(error)
        return NextResponse.json({ error: 'Could not update', updated: false }, { status: 500 });
    }
}
