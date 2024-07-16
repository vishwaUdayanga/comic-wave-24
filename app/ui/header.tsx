import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <div className="flex p-4 justify-center bg-slate-950">
            <div className="flex justify-between md:w-4/5">
                <div className="flex align-middle gap-4">
                    <Image
                        src={'/header/header-logo.png'}
                        alt={'Header | Logo'}
                        width={130}
                        height={130}
                    />
                    <div className="flex gap-4 items-center">  
                        <div className="w-fit rounded bg-slate-800 p-2 border border-slate-600 flex gap-1">
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
                        <p className="text-xs">Ticket price | <Link href={'/'}>Regular - LKR 600</Link> | <Link href={'/'}>Premium - LKR 800</Link></p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
