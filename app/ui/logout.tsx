'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Logout() {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await signOut({ redirect: false });
        router.push('/');
        window.location.href = '/'
    };

    return (
        <form onSubmit={handleSubmit}>
            <button
                type="submit"
                className="pl-4 pr-4 pb-1 pt-1 bg-slate-800 border-slate-600 border text-xs rounded"
            >
                Logout
            </button>
        </form>
    );
}