import { useState } from "react";

export default function PerformanceCard({ performance, onClick }) {
  const [isLiked, setIsLiked] = useState(performance.isLiked || false);

  const toggleLike = (e) => {
    e.stopPropagation(); // ne nyissa meg a modalt
    setIsLiked((prev) => !prev);

    // Később: itt lehet majd fetch/axios POST a szervernek
    // fetch(`/api/like/${performance.id}`, { method: "POST", body: JSON.stringify({ like: !isLiked }) })
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden relative hover:shadow-xl transition"
    >
      <img
        src={performance.image}
        alt={performance.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{performance.title}</h2>
        <p className="text-gray-600 italic mb-2">„{performance.quote}”</p>
        <p className="text-sm text-gray-500">{performance.date}</p>
      </div>

      {/* Szívecske ikon */}
      <button
        onClick={toggleLike}
        className="absolute top-3 right-3 text-2xl cursor-pointer"
      >
        {isLiked ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
