import { useState } from "react";
import PerformanceCard from "../components/PerformanceCard";
import PerformanceModal from "../components/PerformanceModal";
import { dummyPerformances } from "../assets/dummyPerformances";

const ITEMS_PER_PAGE = 6;

export default function ArchivePage() {
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [filters, setFilters] = useState({
    title: "",
    creator: "",
    date: "",
    isLikedOnly: false, // új szűrő
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1); // szűrésnél mindig lapozzunk vissza az első oldalra
  };

  const filteredPerformances = dummyPerformances.filter((perf) => {
    const titleMatch = perf.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());
    const creatorMatch =
      perf.writers.some((w) =>
        w.toLowerCase().includes(filters.creator.toLowerCase())
      ) ||
      perf.actors.some((a) =>
        a.toLowerCase().includes(filters.creator.toLowerCase())
      );
    const dateMatch = perf.date.includes(filters.date);
    const likedMatch = !filters.isLikedOnly || perf.isLiked;

    return titleMatch && creatorMatch && dateMatch && likedMatch;
  });

  const totalPages = Math.ceil(filteredPerformances.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredPerformances.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-b from-white to-gray-900 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
          Archívum
        </h1>

        {/* Szűrés */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="isLikedOnly"
              checked={filters.isLikedOnly}
              onChange={(e) =>
                setFilters({ ...filters, isLikedOnly: e.target.checked })
              }
              className="form-checkbox h-4 w-4 text-black"
            />
            Csak kedvencek
          </label>
          <input
            type="text"
            name="title"
            placeholder="Előadás címe"
            value={filters.title}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-xl w-60"
          />
          <input
            type="text"
            name="creator"
            placeholder="Író vagy színész"
            value={filters.creator}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-xl w-60"
          />
          <input
            type="text"
            name="date"
            placeholder="Dátum (pl. 2023)"
            value={filters.date}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-xl w-40"
          />
        </div>

        {/* Előadások kártyák */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((perf) => (
            <PerformanceCard
              key={perf.id}
              performance={perf}
              onClick={() => setSelectedPerformance(perf)}
            />
          ))}
        </div>

        {/* Lapozás */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl border border-gray-100 bg-gray-200 hover:bg-gray-100 disabled:opacity-50"
            >
              Előző
            </button>
            <span className="px-4 py-2 text-gray-700">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl border border-gray-100 bg-gray-200 hover:bg-gray-100 disabled:opacity-50"
            >
              Következő
            </button>
          </div>
        )}

        {/* Modal megjelenítés */}
        {selectedPerformance && (
          <PerformanceModal
            performance={selectedPerformance}
            onClose={() => setSelectedPerformance(null)}
          />
        )}
      </div>
    </main>
  );
}
