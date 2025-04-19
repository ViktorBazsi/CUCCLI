export default function NextPerformance() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-200 to-gray-400 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Kép oldal */}
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1588928781379-c355ab3edc9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Következő előadás"
            className="w-full h-auto rounded-2xl shadow-md object-cover"
          />
        </div>

        {/* Szöveg oldal */}
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Következő előadás: <span className="italic">„Cucli XXV”</span>
          </h2>
          <p className="text-gray-700 mb-6">
            Hogy miről is van szó? A társulat éppen kapható írói/rendezői fogják
            magukat és egész nap híreket olvasnak, hogy a megfelelőt
            kiválasztva, egyetlen éjszaka alatt darabot írjanak belőle. Másnap
            reggel 10-kor olvasópróba, aztán jön a fény-hang-jelmez-díszlet (már
            ha van rá idő) és este 18:45-kor premier, először és utoljára. Nem
            tud nem aktuális lenni. De nem vicces sem. Mindenesetre játékos,
            mindenki számára. Sztárvendég:{" "}
            <span className="italic">„ZSIGMOND EMŐKE”</span>
          </p>
          <p className="text-gray-500 text-sm mb-6">
            2025. május 17. — Apertúra Bázis
          </p>
          <a
            href="https://apertura.jegyx1.hu/eloadas/3002/cucli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-6 py-3 rounded-2xl text-base font-medium hover:bg-gray-800 transition"
          >
            Jegyet kérek
          </a>
        </div>
      </div>
    </section>
  );
}
