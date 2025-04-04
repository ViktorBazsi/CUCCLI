export default function NextPerformance() {
  return (
    <section className="w-full bg-white py-16 px-6 rounded-xl">
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
            Következő előadás:{" "}
            <span className="italic">„?”</span>
          </h2>
          <p className="text-gray-700 mb-6">
            Egy egyedi, személyre szabott CUCLI előadás, ahol a néző történetei
            kelnek életre. Ne maradj le!
          </p>
          <p className="text-gray-500 text-sm mb-6">
            2025. április 12. — Apertúra Bázis
          </p>
          <a
            href="https://jegyek.apertura.hu/aranyak-es-fenyek" // csak minta link
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
