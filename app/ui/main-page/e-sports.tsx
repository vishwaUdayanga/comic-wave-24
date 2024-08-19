'use client'

import Image from "next/image"
import Link from "next/link"

export default function ESport() {
    return (
        <section className="flex p-1 pb-20 justify-center items-center custom-dark-high flex-col">
            <div className="flex w-full justify-center md:w-4/5 flex-col items-center">
                <h1 className="text-3xl font-bold mt-5 z-10 text-center">Games for the <span className="text-violet-600">Tournament</span></h1>
                <p className="text-sm mt-1 text-center text-slate-400 z-10">Games included for the final day of E-sport event</p>
                <div className="mt-6 flex gap-5 flex-wrap w-full items-center justify-center">
                    <div className="md:w-96 w-full rounded-2xl h-32 flex justify-center items-center" style={{backgroundImage : "url('/games/valorant.jpg')", backgroundSize: 'cover'}}>
                        <Image 
                            src={'/games/valorant-name.png'}
                            alt={'Valorant | Name'}
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className="md:w-96 w-full rounded-2xl h-32 flex justify-center items-center" style={{backgroundImage : "url('/games/cod.jpg')", backgroundSize: 'cover'}}>
                        <Image 
                            src={'/games/codm-name.png'}
                            alt={'Valorant | Name'}
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className="md:w-96 w-full rounded-2xl h-32 flex justify-center items-center" style={{backgroundImage : "url('/games/pubg.jpg')", backgroundSize: 'cover'}}>
                        <Image 
                            src={'/games/pubg-name.png'}
                            alt={'Valorant | Name'}
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className="md:w-96 w-full rounded-2xl h-32 flex justify-center items-center" style={{backgroundImage : "url('/games/cod4.jpg')", backgroundSize: 'cover'}}>
                        <Image 
                            src={'/games/cod4-name.png'}
                            alt={'Valorant | Name'}
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}