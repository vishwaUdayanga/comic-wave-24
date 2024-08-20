import prisma from '@/app/lib/prisma';
import Image from 'next/image';
import VerifyStudentForm from '@/app/ui/admin/verify-student-form';

export default async function View({ params }: { params: { id: string } }) {
    const { id } = params;

    
    const student = await prisma.student.findUnique({
        where: { registrationNumber: id },
    });

    
    if (!student) {
        return (
            <div>
                <h1>Details Page</h1>
                <p>No record found with ID: {id}</p>
            </div>
        );
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08090F]">
        <div className="w-full max-w-md p-4 rounded-md shadow-md bg-[#08090F] flex flex-col items-center gap-5">
            <h1 className="text-xl w-full text-center sm:text-3xl font-bold text-white">
                {id}
            </h1>
            <p className='text-xs w-full text-center sm:text-3xl font-bold text-white mb-4 sm:mb-6'>Verify this student</p>
            <VerifyStudentForm  registrationNumber={student.registrationNumber} />
        </div>
      </div>
    );
}
