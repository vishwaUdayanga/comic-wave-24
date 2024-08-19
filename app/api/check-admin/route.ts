// app/api/check-access/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Login required' });
    }

    const restrictedNumbers = process.env.RESTRICTED_REGISTRATION_NUMBERS?.split(',') || [];
    const hasAccess = restrictedNumbers.includes(session.user.registrationNumber);

    if (hasAccess) {
        return NextResponse.json({ access: true });
    } else {
        return NextResponse.json({ access: false });
    }
}
