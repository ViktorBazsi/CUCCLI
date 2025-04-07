// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function PersonModal({
  person,
  isOpen,
  onClose,
  onSelect,
  isSelected,
}) {
  if (!person) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const hasAnyPerformances =
    person.performancesWritten.length > 0 ||
    person.performancesPlayed.length > 0 ||
    person.performancesDirected.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
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
            {/* Bezárás */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            {/* Kép */}
            <img
              src={person.imageUrl}
              alt={person.name}
              className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
            />

            {/* Név és szerepek */}
            <h2 className="text-2xl font-bold mb-1">{person.name}</h2>
            <p className="text-sm text-gray-500 mb-4">
              {person.roles.join(", ")}
            </p>

            {/* Bio */}
            <p className="text-gray-700 mb-6">{person.bio}</p>

            {/* Elérhetőség */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Elérhető időpontjai:
              </h3>
              {person.availability?.length > 0 ? (
                <ul className="list-disc list-inside text-gray-600">
                  {person.availability.map((a) => (
                    <li key={a.id}>{formatDate(a.date)}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  Jelenleg nincs elérhető időpont.
                </p>
              )}
            </div>

            {/* Előadások */}
            <div className="space-y-4 mb-6">
              {person.performancesWritten.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Íróként közreműködött:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {person.performancesWritten.map((p) => (
                      <li key={p.id}>
                        {p.topic} ({formatDate(p.createdAt)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {person.performancesPlayed.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Színészként szerepelt:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {person.performancesPlayed.map((p) => (
                      <li key={p.id}>
                        {p.topic} ({formatDate(p.createdAt)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {person.performancesDirected.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Rendezőként dolgozott:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {person.performancesDirected.map((p) => (
                      <li key={p.id}>
                        {p.topic} ({formatDate(p.createdAt)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!hasAnyPerformances && (
                <p className="text-gray-500 italic">
                  Még nem kapcsolódott előadáshoz.
                </p>
              )}
            </div>

            {/* Footer gombok */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border text-gray-700 hover:bg-gray-100"
              >
                Mégsem
              </button>
              <button
                type="button"
                onClick={onSelect}
                className={`px-6 py-2 rounded-xl text-white transition ${
                  isSelected
                    ? "bg-black hover:bg-red-600"
                    : "bg-black hover:bg-green-600"
                }`}
              >
                {isSelected ? "Mégsem választom" : "Kiválasztás"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
