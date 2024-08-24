export default function About() {
    const whatsappUrl = `https://wa.me/+94772522355`;
    return (
        <section className="flex pt-20 pr-4 pl-4 pb-20 justify-center items-center custom-dark-high flex-col" style={{backgroundImage : "url('/main/about1.jpg')", backgroundSize: 'cover'}}>
                <div className="flex w-full justify-center md:w-2/4 flex-col items-center">
                    <h1 className="text-3xl font-bold mt-5 z-10 text-center">About <span className="text-violet-600">COMIC Wave</span></h1>
                    <p className="text-sm mt-5 text-center text-slate-400 z-10"> The “ComicWave 24” combines an E-sport event and an on-premise
                    comic con decided to be held at the end of September. It comprises of several interactive activities such as Art competition, Escape room, E-sport tournament, Interactive games, DJ and so on.</p>
                    <a
                        href="mailto:comic.wave.event@gmail.com?subject=Contact%20ComicWave"
                        className="pl-16 pr-16 pb-3 pt-3 custom-purple-low text-xs rounded mt-5 text-center inline-block"
                        >
                        Contact ComicWave Via Email
                    </a>
                    <a
                        href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                        className="pl-16 pr-16 pb-3 pt-3 custom-purple-low text-xs rounded mt-5 text-center inline-block"
                        >
                        Contact ComicWave Via Whatsapp
                    </a>
                </div>
        </section>
    )
}