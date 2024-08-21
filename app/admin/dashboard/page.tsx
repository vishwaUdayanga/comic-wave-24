import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session ) {
        redirect('/login');
    }

    if (session?.user.registrationNumber == process.env.ADMIN_1 ||
        session?.user.registrationNumber == process.env.ADMIN_2 || 
        session?.user.registrationNumber == process.env.ADMIN_3 || 
        session?.user.registrationNumber == process.env.ADMIN_4 || 
        session?.user.registrationNumber == process.env.ADMIN_5 || 
        session?.user.registrationNumber == process.env.ADMIN_6) {

    } else {
        redirect('/login');
    }

    return (
        <div className='min-h-screen flex items-center flex-col justify-center'>
            <h1 className='text-4xl text-indigo-500 font-bold text-center'>Admin Dashboard</h1>
            <div className='flex justify-center items-center flex-wrap gap-4 mt-10'>
                <Link className="w-fit" href={'/admin/uploads'}>
                    <div className='p-5 border rounded border-current'>
                        <p className='text-xl'>Payment Uploads</p>
                    </div>   
                </Link>
                <Link className="w-fit" href={'/admin/bought'}>
                    <div className='p-5 border rounded border-current'>
                        <p className='text-xl'>Bought tickets</p>
                    </div>   
                </Link>
                <Link className="w-fit" href={'/admin/issued'}>
                    <div className='p-5 border rounded border-current'>
                        <p className='text-xl'>Issued tickets</p>
                    </div>   
                </Link>
                <Link className="w-fit" href={'/admin/verify-students'}>
                    <div className='p-5 border rounded border-current'>
                        <p className='text-xl'>Verify students</p>
                    </div>   
                </Link>
            </div>
        </div>
        
    );
}
