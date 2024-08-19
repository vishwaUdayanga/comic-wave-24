// pages/api/send-ticket.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/prisma';
import { PDFDocument, rgb } from 'pdf-lib';
import { promises as fs } from 'fs';
import mailjet from '@/app/lib/mailjet';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
      const { registrationNumber, invoiceNumber } = await request.json();

    try {
      // Fetch student email
      const student = await prisma.student.findUnique({
        where: { registrationNumber },
      });

      if (!student) {
        return NextResponse.json({ error: 'Student not found' }, { status: 500 });
      }

      // Generate PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 400]);
      const { width, height } = page.getSize();

      // Add image
        const imagePath = path.join(process.cwd(), 'public/ticket-types/premium.png');
        const imageBytes = await fs.readFile(imagePath);
        const image = await pdfDoc.embedPng(imageBytes); 
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: width,
            height: height,
            opacity: 1,
          });
      
          page.drawText(`Ticket number: ${invoiceNumber}`, {
            x: width - 150, 
            y: 40, 
            size: 12,
            color: rgb(0, 0, 0),
            font: await pdfDoc.embedFont('Helvetica'), 
          });

      // Save PDF to buffer
      const pdfBytes = await pdfDoc.save();
      const base64PDF = Buffer.from(pdfBytes).toString('base64');

      
      try{
        const request = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
            Messages: [
                {
                From: {
                    Email: 'vishwaudayanga310@gmail.com',
                    Name: 'Vishwa Udayanga',
                },
                To: [
                    {
                    Email: student.email,
                    },
                ],
                Subject: 'Ticket for COMIC-WAVE-24',
                TextPart: `Hello ${student.name}, We have attached your ticket. Keep it to get your wrist band from later.`,
                Attachments: [
                    {
                    ContentType: 'application/pdf',
                    Filename: 'ticket.pdf',
                    Base64Content: base64PDF,
                    },
                ],
                },
            ],
            });
            return NextResponse.json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error fetching uploads:', error);
            return NextResponse.json({ error: 'Error fetching uploads' }, { status: 500 });
        }
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
    }
}
