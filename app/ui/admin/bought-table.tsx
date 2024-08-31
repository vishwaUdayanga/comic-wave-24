import Image from 'next/image';
import prisma from '@/app/lib/prisma';
import { fetchBoughtByRegistrationNumber } from '@/app/lib/actions';
import { students } from '@/app/lib/placeholder-data';
import VerifyBought from './verify-bought';
import DenyBought from './deny-bought';

export default async function BoughtTable({
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
  const boughts = await fetchBoughtByRegistrationNumber(query, currentPage);

  return (
    <div className="mt-6 flow-root w-full">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg  p-2 md:pt-0">
          <table className=" text-gray-900 w-full bg-violet-800">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-white">
                  Ticket
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-white">
                  Student ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Issued
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Verify 
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Deny
                </th>
              </tr>
            </thead>
            <tbody className="">
              {boughts?.map((bought) => (
                <tr
                  key={bought.studentId}
                  className="bg-slate-900 w-full border-b py-3 text-sm last-of-type:border-none "
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 text-white">
                    {bought.id}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 text-white">
                    {bought.studentId}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {bought.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {bought.issued ? (
                        `True`
                    ) : 
                        `False`
                    }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {!bought.issued ? (
                      <VerifyBought registrationNumber={bought.studentId}  />
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {bought.issued ? (
                        <DenyBought registrationNumber={bought.studentId} />
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