import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request : Request) {
    const {registrationNumber} = await request.json();

    try {
        const bought = await prisma.bought.delete({
            where: { studentId: registrationNumber },
        });

        if (!bought) {
            return NextResponse.json({ error: 'Could not update', updated: false }, { status: 500 });
        }

        const update = await prisma.student.update({
            where: {
              registrationNumber: registrationNumber
            },
            data: {
              verifiedByAdmin: false
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
