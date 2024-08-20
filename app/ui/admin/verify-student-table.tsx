import Image from 'next/image';
import prisma from '@/app/lib/prisma';
import { fetchStudentsByRegistrationNumber } from '@/app/lib/actions';
import { students } from '@/app/lib/placeholder-data';
import Link from 'next/link';
import DenyStudent from './deny-student';

export default async function VerifyStudentTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) { // Adjust the import path as needed

type Upload = {
    id: number;
    studentId: string;
    type: number;
    verified: boolean;
    fileUrl: string;
    student: {
        name: string; // Adjust according to your `Student` model
    };
};
  const students = await fetchStudentsByRegistrationNumber(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg  p-2 md:pt-0">
          <table className=" text-gray-900 md:table bg-violet-800">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-white">
                  Student ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Verified
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Accept
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Deny
                </th>
              </tr>
            </thead>
            <tbody className="">
              {students?.map((student) => (
                <tr
                  key={student.registrationNumber}
                  className="bg-slate-900 w-full border-b py-3 text-sm last-of-type:border-none "
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 text-white">
                    {student.registrationNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {student.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {student.verifiedByAdmin ? (
                        `True`
                    ) : 
                        `False`
                    }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {!student.verifiedByAdmin ? (
                      <Link href={`/admin/verify-view/${student.registrationNumber}`} className='pl-4 pr-4 pt-1 pb-1 text-white bg-blue-700 rounded'>
                        Verify
                      </Link>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {student.verifiedByAdmin ? (
                      <DenyStudent  registrationNumber={student.registrationNumber} />
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
