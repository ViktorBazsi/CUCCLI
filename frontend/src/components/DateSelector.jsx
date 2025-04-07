import { useEffect, useState } from "react";
import dateService from "../services/date.service"; // a te service-ed

export default function DateSelector({ selectedDate, setSelectedDate }) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const data = await dateService.listAll();
        setDates(data);
      } catch (error) {
        console.error("Hiba az időpontok lekérésekor:", error);
      }
    };

    fetchDates();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="text-center space-y-4">
      <h2 className="text-2xl font-bold">Válassz egy időpontot</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {dates.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setSelectedDate(d)}
            className={`px-4 py-2 rounded-xl border transition ${
              selectedDate?.id === d.id
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-black"
            }`}
          >
            {formatDate(d.date)}
          </button>
        ))}
      </div>
    </section>
  );
}
