import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import TicketTypes from "./ui/main-page/ticket-types";
import ESport from "./ui/main-page/e-sports";
import About from "./ui/main-page/about";
 

export default async function Home() {
  return (
    <>
      <main className="flex flex-col items-center bg-cover bg-center mt-0 overflow-hidden z-10" style={{backgroundImage : "url('/main/main-bg.png')"}}>
        <Image 
          src={'/main/logo.png'}
          alt={'Main | Logo'}
          width={80}
          height={80}
          className="mt-3"
        />
        <h1 className="text-3xl font-bold mt-2">Comic Wave - <span className="text-violet-600">2024</span></h1>
        <p className="text-sm mt-2 text-center text-slate-400 text-wrap break-words">Combines an E-sport gathering and an on premise Comic-Con <br />Grab your tickets for an elegant day that will be full of joy, love, and friendship.</p>
        <Link href={'/'} className="pl-16 pr-16 pb-3 pt-3 custom-purple-low text-xs rounded mt-5 text-center">Buy Tickets Right Now</Link>
        <Image 
          src={'/main/main-img.png'}
          alt={'Main | Image'}
          width={700}
          height={700}
          className="mt-0"
        />
        <Image 
          src={'/main/ellipse.png'}
          alt={'Main | Ellipse'}
          width={2000}
          height={100}
          className="-mt-6"
        />
      </main>
      <TicketTypes />
      <ESport />
      <About />
    </>
  );
}
