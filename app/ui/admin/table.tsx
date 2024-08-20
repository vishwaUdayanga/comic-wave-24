import Image from 'next/image';
import prisma from '@/app/lib/prisma';
// import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
// import InvoiceStatus from '@/app/ui/invoices/status';
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
// import { fetchFilteredInvoices } from '@/app/lib/data';
import { fetchUploadsByRegistrationNumber, changeUploadStatus } from '@/app/lib/actions';
import { students } from '@/app/lib/placeholder-data';
import Link from 'next/link';
import Deny from './deny';

export default async function UploadsTable({
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
  const uploads = await fetchUploadsByRegistrationNumber(query, currentPage);

  const deny = (registrationNumber: string) => {
    var update = changeUploadStatus(registrationNumber)
    if (!update) {
      alert('Could not deny')
    } else {
      window.location.href = '/admin/uploads'
    }
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg  p-2 md:pt-0">
          {/* <div className="md:hidden">
            {uploads?.map((upload) => (
              <div
                key={upload.studentId}
                className="mb-2 w-full rounded-md  p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{upload.type}</p>
                    </div>
                    <p className="text-sm text-gray-500">{upload.verified}</p>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <table className=" text-gray-900 md:table bg-violet-800">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-white">
                  Student ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Verified
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Slip
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Deny
                </th>
              </tr>
            </thead>
            <tbody className="">
              {uploads?.map((upload) => (
                <tr
                  key={upload.studentId}
                  className="bg-slate-900 w-full border-b py-3 text-sm last-of-type:border-none "
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 text-white">
                    {upload.studentId}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {upload.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {upload.verified ? (
                        `True`
                    ) : 
                        `False`
                    }
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {!upload.verified ? (
                      <Link href={`/admin/view/${upload.studentId}`} className='pl-4 pr-4 pt-1 pb-1 text-white bg-blue-700 rounded'>
                        View
                      </Link>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {upload.verified ? (
                      <Deny registrationNumber={upload.studentId} />
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
