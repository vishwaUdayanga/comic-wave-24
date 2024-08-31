import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Search from '@/app/ui/admin/search';
import UploadsTable from '@/app/ui/admin/table';
import { fetchUploads } from '@/app/lib/actions';
import Pagination from '@/app/ui/admin/pagination';

export default async function Page({
        searchParams,
    }: {
        searchParams?: {
        query?: string;
        page?: string;
        };
    }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const session = await getServerSession(authOptions);
    if (!session ) {
      redirect('/login');
    }

    if (session?.user.registrationNumber == process.env.ADMIN_1 ||
        session?.user.registrationNumber == process.env.ADMIN_2 || 
        session?.user.registrationNumber == process.env.ADMIN_3 || 
        session?.user.registrationNumber == process.env.ADMIN_4 || 
        session?.user.registrationNumber == process.env.ADMIN_5 || 
        session?.user.registrationNumber == process.env.ADMIN_6 ||
        session?.user.registrationNumber == process.env.ADMIN_7 ||
        session?.user.registrationNumber == process.env.ADMIN_8) {

    } else {
        redirect('/login');
    }

    const totalPages = await fetchUploads(query);

    return (
        <div className="min-h-screen flex w-full flex-col">
            <h1 className="text-4xl text-indigo-500 font-bold mt-6 text-center">Slip Uploads</h1>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search invoices..." />
          </div>
          <UploadsTable query={query} currentPage={currentPage} />
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      );
}