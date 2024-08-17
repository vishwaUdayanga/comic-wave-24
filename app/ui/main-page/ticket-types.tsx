'use client'

import Image from "next/image"
import Link from "next/link"

export default function TicketTypes() {
    return (
        <section className="flex p-1 justify-center items-center custom-dark-high flex-col">
            <h1 className="text-3xl font-bold -mt-5 z-10 text-center">Ticket <span className="text-violet-600">Types</span></h1>
            <p className="text-sm mt-1 text-center text-slate-400 z-10">Buy online now easily</p>
            <div className="flex justify-between md:w-4/5">
                <div className="flex flex-col md:flex-row w-full justify-center gap-8 mt-6">
                    <Link className="w-fit" href={'/'}>
                        <Image 
                            src={'/ticket-types/regular.jpg'}
                            alt={'Ticket Types | Regular'}
                            width={500}
                            height={500}
                        />
                        <div className="regular-gradient p-6 text-end mt-0 md:mt-8 flex justify-end">
                            <div className="flex gap-5 mr-10">
                                <Image 
                                    src={'/ticket-types/ticket.svg'}
                                    alt={'Ticket Types | Ticket Logo'}
                                    width={30}
                                    height={30}
                                />
                                <p className="text-sm mt-2 text-slate-400 text-left"><span className="text-xl text-slate-50">LKR 600</span><br />Only for comic-con</p>
                            </div>
                        </div>
                    </Link>
                    <Link className="w-fit" href={'/'}>
                        <Image 
                            src={'/ticket-types/regular.jpg'}
                            alt={'Ticket Types | Regular'}
                            width={500}
                            height={500}
                        />
                        <div className="premium-gradient p-6 text-end mt-0 md:mt-8 flex justify-start">
                            <div className="flex gap-5 ml-10">
                                <Image 
                                    src={'/ticket-types/ticket.svg'}
                                    alt={'Ticket Types | Ticket Logo'}
                                    width={30}
                                    height={30}
                                />
                                <p className="text-sm mt-2 text-slate-400 text-left"><span className="text-xl text-slate-50">LKR 600</span><br />Only for comic-con</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}