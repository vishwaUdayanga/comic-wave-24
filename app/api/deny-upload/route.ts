import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request : Request) {
    const {registrationNumber} = await request.json();

    try {
        const deleted = await prisma.bought.delete({
          where: { studentId: registrationNumber },
        });
        if (!deleted) {
          return NextResponse.json({ error: 'Could not update', updated: false }, { status: 500 });
        }
        const deletedInvoice = await prisma.invoice.delete({
          where: { studentId: registrationNumber },
        });
        if (!deletedInvoice) {
          return NextResponse.json({ error: 'Could not update', updated: false }, { status: 500 });
        }
        const update = await prisma.uploads.update({
            where: {
              studentId: registrationNumber
            },
            data: {
              verified: false
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
