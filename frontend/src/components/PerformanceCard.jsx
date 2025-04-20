import { useState, useEffect } from "react";

const renderStars = (count) =>
  [...Array(5)].map((_, i) => <span key={i}>{i < count ? "⭐" : "☆"}</span>);

export default function PerformanceCard({
  performance,
  onClick,
  isLoggedIn,
  onToggleLike, // 👈 ide jön a parentből
}) {
  const [isLiked, setIsLiked] = useState(performance.isLiked || false);

  // 🔄 Ha performance.isLiked változik (pl. újratöltésnél), frissítjük a belső állapotot is
  useEffect(() => {
    setIsLiked(performance.isLiked || false);
  }, [performance.isLiked]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    setIsLiked((prev) => !prev);
    onToggleLike(performance.id); // 👈 helyes hívás
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
        <h2 className="text-xl font-bold text-gray-900">{performance.title}</h2>
        <p className="text-gray-600 italic mb-2">
          „{performance.quote || "nincs még idézet"}”
        </p>
        <p className="text-sm text-gray-500">
          {performance.date || "nincs még dátum"}
        </p>

        <div className="text-yellow-600 text-sm">
          {renderStars(Math.round(performance.averageRating || 0))}
          <span className="ml-2 text-gray-500">
            ({performance.averageRating?.toFixed(1) || "0.0"})
            {performance.ratingCount > 0 &&
              ` – ${performance.ratingCount} értékelés`}
          </span>
        </div>

        {performance.feedbacks?.length > 0 && (
          <p className="text-sm italic text-gray-600 mt-1">
            „{performance.feedbacks[0].message}”
          </p>
        )}
      </div>

      {isLoggedIn && (
        <button
          onClick={handleClick}
          className="absolute top-3 right-3 text-2xl cursor-pointer"
          disabled={!isLoggedIn}
          title="Kedvenc"
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
      )}
    </div>
  );
}
