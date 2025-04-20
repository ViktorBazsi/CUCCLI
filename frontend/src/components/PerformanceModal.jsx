import { useEffect, useState, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import feedbackService from "../services/feedback.service";
import ratingService from "../services/rating.service";
import AuthContext from "../contexts/AuthContext";

const renderStars = (count) =>
  [...Array(5)].map((_, i) => <span key={i}>{i < count ? "⭐" : "☆"}</span>);

export default function PerformanceModal({
  performance,
  onClose,
  isLoggedIn,
  onToggleLike,
  onRefresh, // 👈 új prop
}) {
  const [isLiked, setIsLiked] = useState(performance.isLiked || false);

  const { user } = useContext(AuthContext);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [ratingValue, setRatingValue] = useState(0);

  const [feedbacks, setFeedbacks] = useState(performance.feedbacks || []);
  const [averageRating, setAverageRating] = useState(
    performance.averageRating || 0
  );

  const hasRated =
    isLoggedIn && performance.ratings?.some((r) => r.userId === user?.id);

  const userRating = isLoggedIn
    ? performance.ratings?.find((r) => r.userId === user?.id)
    : null;

  // Ha a performance prop frissül (pl. újratöltés után), szinkronizáljuk:
  useEffect(() => {
    setIsLiked(performance.isLiked || false);
  }, [performance]);

  const handleLikeClick = () => {
    if (!isLoggedIn) return;
    onToggleLike(performance.id);
    setIsLiked((prev) => !prev); // lokális frissítés animációhoz
  };
  

  const handleFeedbackSubmit = async () => {
    try {
      await feedbackService.addFeedback(performance.id, feedbackMessage);
      setFeedbacks((prev) => [...prev, { message: feedbackMessage }]);
      setFeedbackMessage("");
      if (onRefresh) onRefresh(); // frissíti az archív oldalt is
    } catch (err) {
      console.error("❌ Hiba feedback mentéskor:", err);
    }
  };

  const handleRatingSubmit = async () => {
    if (hasRated) return;
    try {
      await ratingService.addRating(performance.id, ratingValue);
      const newRatings = [
        ...(performance.ratings || []),
        { value: ratingValue },
      ];
      const avg =
        newRatings.reduce((sum, r) => sum + r.value, 0) / newRatings.length;
      setAverageRating(avg);
      setRatingValue(null);
      if (onRefresh) onRefresh(); // 👈 frissítés
    } catch (err) {
      console.error("❌ Hiba rating mentéskor:", err);
    }
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
            className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
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
                  onClick={handleLikeClick}
                  className={`absolute bottom-3 right-3 text-3xl transition transform hover:scale-110 hover:animate-pulse ${
                    isLiked ? "text-red-500" : "text-white hover:text-red-400"
                  }`}
                  title={isLiked ? "Kedvelted" : "Kedvelés"}
                >
                  {isLiked ? "❤️" : "🤍"}
                </button>
              )}
            </div>

            <div className="mb-4 text-right">
              <h3 className="font-semibold text-gray-800">Értékelés:</h3>
              <div className="text-yellow-600 text-lg">
                {renderStars(Math.round(averageRating || 0))}
                <span className="ml-2 text-sm text-gray-500">
                  ({averageRating?.toFixed(1) || "0.0"})
                  {performance.ratingCount > 0 &&
                    ` – ${performance.ratingCount} értékelés`}
                </span>
              </div>
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

            {feedbacks.length > 0 && (
              <div className="mt-4 text-right">
                <h3 className="font-semibold text-lg mb-2">Visszajelzések</h3>
                {performance.feedbacks.length === 0 ? (
                  <p className="text-gray-500 italic">
                    Még nincs visszajelzés.
                  </p>
                ) : (
                  performance.feedbacks.map((fb) => (
                    <div key={fb.id} className="mb-4 border-b pb-2">
                      <p className="italic">"{fb.message}"</p>
                      <p className="text-sm text-gray-600">
                        – {fb.user?.firstName || "Ismeretlen"}:
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

            {isLoggedIn && (
              <div className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Véleményed:
                  </label>
                  <textarea
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2"
                    rows={3}
                  />
                  <button
                    onClick={handleFeedbackSubmit}
                    className="mt-2 bg-black text-white px-4 py-1 rounded-xl hover:bg-gray-800"
                  >
                    Feedback beküldése
                  </button>
                </div>

                <div>
                  {hasRated ? (
                    <div className="text-sm text-gray-600">
                      <p className="italic mb-1">Már értékelted az előadást:</p>
                      <div className="text-yellow-600 text-lg">
                        {renderStars(userRating?.value || 0)}
                      </div>
                    </div>
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Értékelés (1–5):
                      </label>

                      <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setRatingValue(v)}
                            className="focus:outline-none"
                          >
                            <span
                              className={`text-3xl transition-colors ${
                                ratingValue >= v
                                  ? "text-yellow-500"
                                  : "text-gray-400"
                              }`}
                            >
                              {ratingValue >= v ? "⭐" : "☆"}
                            </span>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleRatingSubmit}
                        className="bg-black text-white px-4 py-1 rounded-xl hover:bg-gray-800 disabled:opacity-50"
                        disabled={ratingValue === 0}
                      >
                        Értékelés beküldése
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Letöltés gomb */}
            {textUrl && (
              <div className="text-center mt-10">
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
