import prisma from '@/app/lib/prisma';
import Image from 'next/image';
import InvoiceForm from '@/app/ui/admin/invoice-form';

export default async function View({ params }: { params: { id: string } }) {
    const { id } = params;

    
    const upload = await prisma.uploads.findUnique({
        where: { studentId: id },
    });

    
    if (!upload) {
        return (
            <div>
                <h1>Details Page</h1>
                <p>No record found with ID: {id}</p>
            </div>
        );
    }

    const sasUrl = `${upload.fileUrl}?sv=2022-11-02&ss=bfqt&srt=o&sp=rwdlacupiytfx&se=2024-08-19T21:19:24Z&st=2024-08-19T13:19:24Z&spr=https,http&sig=xMZ5YbkoCfTTaIMXIor3yl8lnlKSfnUibafHzwOVbJ8%3D`;

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08090F]">
        <div className="w-full max-w-md p-4 rounded-md shadow-md bg-[#08090F] flex flex-col items-center gap-5">
            <h1 className="text-xl w-full text-center sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                {id}
            </h1>
            <Image 
                    src={sasUrl}
                    alt={'SLIP'}
                    width={390}
                    height={390}
            />
            <InvoiceForm  registrationNumber={upload.studentId} />
        </div>
      </div>
    );
}
