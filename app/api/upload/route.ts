import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import prisma from "@/app/lib/prisma";
import { authOptions } from './../../utils/authOptions';
import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || '';
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || '';

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);

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

    try {
        const fileExtension = file.name.split('.').pop();
        const newFilename = `${session.user.registrationNumber}-${Date.now()}.${fileExtension}`;
        const blockBlobClient = containerClient.getBlockBlobClient(newFilename);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await blockBlobClient.uploadData(buffer);

        const fileUrl = blockBlobClient.url;

        const upload = await prisma.uploads.create({
            data: {
                studentId: session.user.registrationNumber as string,
                type: 1,
                fileUrl: fileUrl,
            },
        });

        return NextResponse.json({ auth: true, success: true, message: 'Upload successful', upload });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ auth: true, success: false, message: 'Error uploading file' });
    }
}