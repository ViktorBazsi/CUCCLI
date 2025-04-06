import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";

export default function CartPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Kosár betöltése: location.state → fallback localStorage
  const [formData, setFormData] = useState(location.state || null);

  useEffect(() => {
    if (!formData) {
      const stored = localStorage.getItem("cucli_cart");
      if (stored) {
        setFormData(JSON.parse(stored));
      }
    }
  }, [formData]);

  // 2. Árértékek
  const actorPrice = 40000;
  const writerPrice = 40000;
  const recordingPrice = 100000;
  const shortNoticeDatePrice = 20000;

  const actorSubtotal = (formData?.actors?.length || 0) * actorPrice;
  const writerSubtotal = (formData?.writers?.length || 0) * writerPrice;
  const recordingCost = formData?.recordingRequest ? recordingPrice : 0;

  const dateCost = useMemo(() => {
    if (!formData?.date) return 0;
    const selectedDate = new Date(formData.date);
    const today = new Date();
    const diffInDays = Math.floor(
      (selectedDate - today) / (1000 * 60 * 60 * 24)
    );
    return diffInDays <= 14 ? shortNoticeDatePrice : 0;
  }, [formData?.date]);

  const total = actorSubtotal + writerSubtotal + recordingCost + dateCost;

  // 3. Kosár törlése funkció
  const handleClearCart = () => {
    localStorage.removeItem("cucli_cart");
    setFormData(null);
    navigate("/cart");
  };

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-b from-white to-gray-900 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">Kosár</h1>

        {!formData ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-6">A kosarad üres.</p>
            <button
              onClick={() => {
                // localStorage.removeItem("cucli_cart");
                navigate("/performance");
              }}
              className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-800 transition"
            >
              Előadásom összeállítása
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Téma */}
            <div>
              <h2 className="text-xl font-semibold">Téma</h2>
              <p className="text-gray-700 mt-1">
                {formData.topic || "(nincs megadva)"}
              </p>
            </div>

            {/* Írók */}
            <div>
              <h2 className="text-xl font-semibold">Írók</h2>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                {formData.writers?.map((writer, idx) => (
                  <li key={idx}>
                    {writer.name} – {writerPrice.toLocaleString()} Ft
                  </li>
                ))}
              </ul>
            </div>

            {/* Színészek */}
            <div>
              <h2 className="text-xl font-semibold">Színészek</h2>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                {formData.actors?.map((actor, idx) => (
                  <li key={idx}>
                    {actor.name} – {actorPrice.toLocaleString()} Ft
                  </li>
                ))}
              </ul>
            </div>

            {/* Felvétel */}
            {formData.recordingRequest && (
              <div>
                <h2 className="text-xl font-semibold">Felvétel</h2>
                <p className="text-gray-700 mt-1">
                  Kér: Igen – {recordingPrice.toLocaleString()} Ft
                </p>
              </div>
            )}

            {/* Dátum */}
            {formData.date && (
              <div>
                <h2 className="text-xl font-semibold">Dátum</h2>
                <p className="text-gray-700 mt-1">
                  {new Date(formData.date).toLocaleDateString("hu-HU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {dateCost > 0
                    ? ` (Közeli időpont: +${shortNoticeDatePrice.toLocaleString()} Ft)`
                    : " (Nincs extra díj)"}
                </p>
              </div>
            )}

            {/* Végösszeg */}
            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold">
                Végösszeg: {total.toLocaleString()} Ft
              </h2>
            </div>

            {/* Gombok */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <button
                onClick={() => {
                  const fullCartData = {
                    ...formData,
                    summary: {
                      actors: actorSubtotal,
                      writers: writerSubtotal,
                      recording: recordingCost,
                      date: dateCost,
                      total,
                    },
                  };
                  console.log("Mentett kosár:", fullCartData);
                }}
                className="bg-white text-black border border-black px-6 py-3 rounded-2xl font-medium hover:bg-gray-100 transition"
              >
                Kosár mentése
              </button>

              <button
                onClick={() => console.log("Vásárlás indítva...")}
                className="bg-green-600 text-white px-6 py-3 rounded-2xl font-medium hover:bg-green-700 transition"
              >
                Vásárlás
              </button>

              <button
                onClick={handleClearCart}
                className="bg-red-600 text-white px-6 py-3 rounded-2xl font-medium hover:bg-red-700 transition"
              >
                Kosár ürítése
              </button>
            </div>

            {/* Vissza */}
            <div className="text-center pt-8">
              <button
                onClick={() => {
                //   localStorage.removeItem("cucli_cart");
                  navigate("/performance");
                }}
                className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:bg-gray-800 transition mb-32"
              >
                Vissza az előadásomhoz
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
