import { useState } from "react";

export default function PerformanceCard({ performance, onClick, isLoggedIn }) {
  const [isLiked, setIsLiked] = useState(performance.isLiked || false);

  // const toggleLike = (e) => {
  //   e.stopPropagation(); // ne nyissa meg a modalt
  //   setIsLiked((prev) => !prev);

  //   // Később: itt lehet majd fetch/axios POST a szervernek
  //   // fetch(`/api/like/${performance.id}`, { method: "POST", body: JSON.stringify({ like: !isLiked }) })
  // };

  const toggleLike = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return; // nem engedjük a nem bejelentkezett usernek
    setIsLiked((prev) => !prev);
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden relative hover:shadow-xl transition"
    >
      <img
        src={performance.imageUrl}
        alt={`${performance.title} kép helye`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{performance.topic}</h2>
        <p className="text-gray-600 italic mb-2">
          „{performance.quote || "nincs még idézet"}”
        </p>
        <p className="text-sm text-gray-500">
          {performance.date || "nincs még dátum"}
        </p>
      </div>

      {/* Szívecske ikon */}
      <button
        onClick={toggleLike}
        className="absolute top-3 right-3 text-2xl cursor-pointer"
        disabled={!isLoggedIn}
        title={isLoggedIn ? "Kedvenc" : "Jelentkezz be a lájkoláshoz"}
      >
        {isLiked ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
