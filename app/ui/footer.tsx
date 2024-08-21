import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return(
        <div className="flex p-4 justify-center bg-[#08090F] w-full">
            <div className="flex w-full justify-between md:w-4/5">
                <div className="flex align-middle gap-4 items-center">
                    <Link href={'/'}>
                        <Image
                            src={'/header/header-logo.png'}
                            alt={'Header | Logo'}
                            width={100}
                            height={100}
                        />
                    </Link>
                    <div className="text-xs flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-c-circle" viewBox="0 0 16 16">
                        <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512"/>
                        </svg>
                        <p>2024 | All rights reserved | Comic-Con 24</p>
                    </div>
                </div>
                <div className="flex gap-4 items-center">  
                    <div className="w-fit rounded bg-slate-800 p-2 border border-slate-600 gap-1 hidden sm:flex">
                        <Image 
                            src={'/ticket-types/premium.jpg'}
                            alt={'Ticket | Premium'}
                            width={50}
                            height={50}
                        />
                        <Image 
                            src={'/ticket-types/regular.jpg'}
                            alt={'Ticket | Regular'}
                            width={50}
                            height={50}
                        />
                    </div>
                    <p className="text-xs hidden lg:block">Ticket price | <Link href={'/tickets/ticket_regular'}>Premium - LKR 800</Link></p>
                </div>
            </div>
        </div>
    )
}