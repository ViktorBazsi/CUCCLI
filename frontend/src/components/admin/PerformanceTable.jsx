// components/admin/PerformanceTable.jsx
import { useState } from "react";
import EditPerformanceModal from "./EditPerformanceModal";

export default function PerformanceTable({
  performances,
  onStatusChange,
  onUpdatePerformance,
  onCreatePerformance,
  onDeletePerformance,
  availableDates = [], // ⬅️ új prop
}) {
  const [editing, setEditing] = useState(null);

  return (
    <div className="space-y-6">
      {/* Új előadás gomb */}
      <div className="flex justify-end">
        <button
          onClick={() =>
            setEditing({
              id: null,
              title: "",
              quote: "",
              status: "CREATED",
              isArchived: false,
              createdAt: new Date().toISOString(),
            })
          }
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          + Új előadás
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-800">
              <th className="p-3">Cím</th>
              <th className="p-3">Státusz</th>
              <th className="p-3">Archivált</th>
              <th className="p-3">Bemutató</th>
              <th className="p-3">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {performances.map((p, index) => (
              <tr
                key={p.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-t`}
              >
                <td className="p-3 font-medium">{p.title}</td>
                <td className="p-3">
                  <select
                    value={p.status}
                    onChange={(e) => onStatusChange(p.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {[
                      "CREATED",
                      "IN_PREPARATION",
                      "WRITING",
                      "REHEARSAL",
                      "PREMIERE",
                      "COMPLETED",
                      "CANCELLED",
                    ].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 text-sm">
                  {p.isArchived ? (
                    <span className="text-green-600 font-semibold">✔</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="p-3 text-sm">
                  {p.availableDate?.date
                    ? new Date(p.availableDate.date).toLocaleDateString("hu-HU")
                    : "Nincs dátum"}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setEditing(p)}
                    className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    ✏️ Szerkesztés
                  </button>
                  <button
                    onClick={() => onDeletePerformance(p.id)}
                    className="text-sm px-3 py-1 border rounded text-red-500 hover:bg-red-100"
                  >
                    ❌ Törlés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditPerformanceModal
          performance={editing}
          onClose={() => setEditing(null)}
          onSave={(updated) => {
            if (updated.id) {
              onUpdatePerformance(updated);
            } else {
              onCreatePerformance(updated);
            }
            setEditing(null);
          }}
          availableDates={availableDates} // ⬅️ új prop a modalba
        />
      )}
    </div>
  );
}
