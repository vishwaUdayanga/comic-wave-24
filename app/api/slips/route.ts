// app/api/uploads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const uploads = await prisma.uploads.findMany({
            include: {
                student: true, // Include related student data if needed
            },
        });

        return NextResponse.json(uploads);
    } catch (error) {
        console.error('Error fetching uploads:', error);
        return NextResponse.json({ error: 'Error fetching uploads' }, { status: 500 });
    }
}
