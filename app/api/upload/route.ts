import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.registrationNumber) {
        return NextResponse.json({ auth: false, success: false, message: 'Not authenticated' });
    }
    const data = await request.formData();
    const file : File | null = data.get('file') as unknown as File

    if (!file) {
        return NextResponse.json({ auth: true, success: false, message: 'No file' })
    }

    const bytes = await file.arrayBuffer()
    const uint8Array = new Uint8Array(bytes);

    // Define the path where the file will be saved
    const fileExtension = file.name.split('.').pop();
    const newFilename = `${session.user.registrationNumber}.${fileExtension}`;
    const directoryPath = join(process.cwd(), 'tmp');
    const filePath = join(directoryPath, newFilename);
    await writeFile(filePath, uint8Array)

    return NextResponse.json({ auth: true, success: true, message: 'Success' });
}