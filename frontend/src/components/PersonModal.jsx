export default function PersonModal({
  person,
  isOpen,
  onClose,
  onSelect,
  isSelected,
}) {
  if (!isOpen || !person) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src={person.image}
            alt={person.name}
            className="w-32 h-32 rounded-full object-cover border mb-4"
          />
          <h2 className="text-2xl font-bold mb-1">{person.name}</h2>
        </div>

        {/* Tartalom */}
        <div className="mt-6 space-y-4 text-sm text-gray-700">
          {person.works?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900">Munkák:</h3>
              <ul className="list-disc list-inside">
                {person.works.map((work, i) => (
                  <li key={i}>{work}</li>
                ))}
              </ul>
            </div>
          )}

          {person.awards?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900">Díjak:</h3>
              <ul className="list-disc list-inside">
                {person.awards.map((award, i) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </div>
          )}

          {person.cuclis?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900">CUCLI-k:</h3>
              <ul className="list-disc list-inside">
                {person.cuclis.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {person.performances?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900">Előadások:</h3>
              <ul className="list-disc list-inside">
                {person.performances.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
          >
            Vissza
          </button>

          <button
            onClick={onSelect}
            className={`px-5 py-2 rounded-xl font-medium transition ${
              isSelected
                ? "bg-white text-black border border-black hover:bg-gray-100"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isSelected ? "Mégsem választom" : "Kiválasztom"}
          </button>
        </div>
      </div>
    </div>
  );
}
