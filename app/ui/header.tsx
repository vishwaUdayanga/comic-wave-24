import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import Logout from "./logout";
import { authOptions } from './../utils/authOptions';


export default async function Header() {
    const session = await getServerSession(authOptions);
    // const handleLogout = async () => {
    //     await signOut({
    //       redirect: false,
    //     });
    //     window.location.href = "/";
    // };
    return (
        <div className="flex p-4 justify-center custom-dark-low w-full">
            <div className="flex w-full justify-between md:w-4/5">
                <div className="flex align-middle gap-4">
                    <Image
                        src={'/header/header-logo.png'}
                        alt={'Header | Logo'}
                        width={130}
                        height={130}
                    />
                    <div className="flex gap-4 items-center">  
                        <div className="w-fit rounded bg-slate-800 p-2 border border-slate-600 gap-1 hidden sm:flex">
                            <Image 
                                src={'/header/ticket-premium.jpg'}
                                alt={'Ticket | Premium'}
                                width={50}
                                height={50}
                            />
                            <Image 
                                src={'/header/ticket-regular.jpg'}
                                alt={'Ticket | Regular'}
                                width={50}
                                height={50}
                            />
                        </div>
                        <p className="text-xs hidden lg:block">Ticket price | <Link href={'/'}>Regular - LKR 600</Link> | <Link href={'/'}>Premium - LKR 800</Link></p>
                    </div>
                </div>
                {(session) ? (
                    <>
                        <div className="flex gap-3 items-center">
                            <p className="text-sm"><span >Hi </span>{session.user.name}!</p>
                            <Logout />
                        </div>
                    </>   
                ) : (
                    <>
                        <div className="flex gap-3 items-center">
                            <Link href={'/login'} className="pl-4 pr-4 pb-1 pt-1 bg-slate-800 border-slate-600 border text-xs rounded">
                                Log In
                            </Link>
                            <Link href={'/signup'} className="pl-4 pr-4 pb-1 pt-1 custom-purple-low text-xs rounded hidden md:block">
                                Sign Up
                            </Link>
                        </div>
                    </>
                )}
                
            </div>
        </div>
    );
}
