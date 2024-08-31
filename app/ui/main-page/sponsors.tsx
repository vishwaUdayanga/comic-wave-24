import Image from 'next/image';

export default function Sponsors() {
    return (
        <>
            <section className="flex pt-2 pr-4 pl-4 pb-20 justify-center items-center custom-dark-high flex-col">
                <div className="flex w-full justify-center md:w-2/4 flex-col items-center">
                    <h1 className="text-3xl font-bold z-10 text-center">Partners and <span className="text-violet-600">Sponsors</span></h1>
                    <div className="container mx-auto mt-6">
                        <div className="rounded-3xl border border-slate-800 overflow-hidden">
                            <div className="grid grid-cols-2">
                                <div className="border border-slate-800 p-10 flex items-center justify-center">
                                    <Image 
                                        src={'/sponsors/sponsor1.png'}
                                        alt={'TECROOT'}
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <div className="border border-slate-800 p-10 flex items-center justify-center">
                                    <Image 
                                        src={'/sponsors/sponsor2.png'}
                                        alt={'AlterNativeOne'}
                                        width={250}
                                        height={250}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );     
}