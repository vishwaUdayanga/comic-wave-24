export default function About() {
    return (
        <section className="flex pt-20 pr-4 pl-4 pb-20 justify-center items-center custom-dark-high flex-col" style={{backgroundImage : "url('/main/about1.jpg')", backgroundSize: 'cover'}}>
                <div className="flex w-full justify-center md:w-2/4 flex-col items-center">
                    <h1 className="text-3xl font-bold mt-5 z-10 text-center">About <span className="text-violet-600">COMIC Wave</span></h1>
                    <p className="text-sm mt-5 text-center text-slate-400 z-10"> The “ComicWave 24” combines an E-sport event and an on-premise
                    comic con decided to be held at the end of September. It comprises of several interactive activities such as Art competition, Escape room, E-sport tournament, Interactive games, DJ and so on.</p>
                </div>
        </section>
    )
}