// components/admin/UserPerformances.jsx
export default function UserPerformances({ performances, onStatusChange }) {
  if (!performances.length) {
    return <p className="text-sm text-gray-500">Nincs előadás</p>;
  }

  return (
    <div className="mt-4 space-y-4">
      {performances.map((perf) => (
        <div
          key={perf.id}
          className="border p-4 rounded-xl shadow-sm bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{perf.title}</h3>
              <p className="text-sm text-gray-600">
                Állapot: <span className="font-medium">{perf.status}</span>
              </p>
            </div>
            <select
              value={perf.status}
              onChange={(e) => onStatusChange(perf.id, e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="CREATED">Megrendelve</option>
              <option value="PAID_PARTIAL">Előleg fizetve</option>
              <option value="PAID_FULL">Teljesen kifizetve</option>
              <option value="IN_PREPARATION">Előkészítés</option>
              <option value="WRITING">Írás alatt</option>
              <option value="REHEARSAL">Próba</option>
              <option value="PREMIERE">Bemutató</option>
              <option value="COMPLETED">Teljesítve</option>
              <option value="CANCELLED">Lemondva</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
