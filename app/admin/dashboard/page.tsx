import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.registrationNumber !== process.env.ADMIN_1) {
        redirect('/login');
    }

    return (
        <div className='flex items-center flex-col justify-center'>
            <h1 className='text-4xl text-indigo-500 font-bold mt-6 text-center'>Admin Dashboard</h1>
            <div className='flex justify-center items-center flex-wrap gap-4 mt-10'>
                <Link className="w-fit" href={'/admin/uploads'}>
                    <div className='p-5 border rounded border-current'>
                        <p className='text-xl'>Payment Uploads</p>
                    </div>   
                </Link>
                <Link className="w-fit" href={'/admin/uploads'}>
                    <div className='p-5 border rounded border-current'>
                        <p className='text-xl'>Bought tickets</p>
                    </div>   
                </Link>
                <Link className="w-fit" href={'/admin/uploads'}>
                    <div className='p-5 border rounded border-current'>
                        <p className='text-xl'>Issued tickets</p>
                    </div>   
                </Link>
            </div>
        </div>
        
    );
}
