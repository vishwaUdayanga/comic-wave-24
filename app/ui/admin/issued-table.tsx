import Image from 'next/image';
import prisma from '@/app/lib/prisma';
import { fetchIssuedByRegistrationNumber } from '@/app/lib/actions';

export default async function IssuedTable({
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
  const issues = await fetchIssuedByRegistrationNumber(query, currentPage);

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
                  Ticket 
                </th>
              </tr>
            </thead>
            <tbody className="">
              {issues?.map((issue) => (
                <tr
                  key={issue.studentId}
                  className="bg-slate-900 w-full border-b py-3 text-sm last-of-type:border-none "
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 text-white">
                    {issue.studentId}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {issue.ticketId}
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