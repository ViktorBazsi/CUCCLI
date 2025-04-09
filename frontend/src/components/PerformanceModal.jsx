// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function PerformanceModal({ performance, onClose, isLoggedIn }) {
  const [isLiked, setIsLiked] = useState(performance.isLiked || false);

  const handleLikeToggle = () => {
    if (!isLoggedIn) return;
    setIsLiked((prev) => !prev);
    // TODO: Backend kérés ide
  };

  const textUrl = performance.textUrl || "https://example.com/sample.pdf";

  return (
    <AnimatePresence>
      {performance && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative overflow-hidden"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Bezárás gomb */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            {/* Kép + szívecske */}
            <div className="relative mb-6">
              <img
                src={performance.imageUrl}
                alt={`${performance.title} kép helye`}
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />

              {isLoggedIn && (
                <button
                  onClick={handleLikeToggle}
                  className={`absolute bottom-3 right-3 text-3xl transition transform hover:scale-110 hover:animate-pulse ${
                    isLiked ? "text-red-500" : "text-white hover:text-red-400"
                  }`}
                  title={isLiked ? "Kedvelted" : "Kedvelés"}
                >
                  {isLiked ? "❤️" : "🤍"}
                </button>
              )}
            </div>

            {/* Tartalom */}
            <h2 className="text-2xl font-bold mb-2">{performance.title}</h2>
            <p className="text-gray-500 italic mb-4">
              „{performance.quote || "még nincs idézet"}”
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {performance.date || "Nincs dátum megadva"}
            </p>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">Írók:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {performance.writers.map((writer, i) => (
                  <li key={i}>{writer}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800">Színészek:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {performance.actors.map((actor, i) => (
                  <li key={i}>{actor}</li>
                ))}
              </ul>
            </div>

            {/* Letöltés gomb */}
            {textUrl && (
              <div className="text-center">
                <a
                  href={textUrl}
                  download
                  className="inline-block bg-black text-white px-6 py-2 rounded-2xl hover:bg-gray-800 transition"
                >
                  Előadás szövegének letöltése
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
