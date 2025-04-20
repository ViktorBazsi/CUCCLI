import { useState } from "react";
import { Formik, Form, Field } from "formik";

export default function PersonTable({
  persons,
  onUpdateRoles,
  onAddAvailability,
  onRemoveAvailability,
  onEditAvailability, // ⬅️ Új prop: meglévő availability módosítása
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [dateFormVisibleId, setDateFormVisibleId] = useState(null);
  const [editingAvailability, setEditingAvailability] = useState(null); // ⬅️ Ez tárolja az aktuálisan szerkesztett availability-t

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-xl">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-800">
            <th className="p-3">Név</th>
            <th className="p-3">Szerepek</th>
            <th className="p-3">Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.id} className="border-t align-top">
              <td className="p-3">{person.name}</td>
              <td className="p-3">
                <div className="flex flex-wrap gap-2">
                  {["WRITER", "ACTOR", "DIRECTOR"].map((role) => (
                    <label
                      key={role}
                      className="inline-flex items-center gap-1"
                    >
                      <input
                        type="checkbox"
                        checked={person.roles.includes(role)}
                        onChange={() => onUpdateRoles(person.id, role)}
                        className="accent-black"
                      />
                      <span className="text-sm">{role}</span>
                    </label>
                  ))}
                </div>
              </td>
              <td className="p-3 space-x-2">
                <button
                  className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
                  onClick={() =>
                    setExpandedId((prev) =>
                      prev === person.id ? null : person.id
                    )
                  }
                >
                  Ráérések
                </button>
                <button
                  className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
                  onClick={() =>
                    setDateFormVisibleId((prev) =>
                      prev === person.id ? null : person.id
                    )
                  }
                >
                  + Ráérés
                </button>
              </td>
            </tr>
          ))}

          {/* Ráérések listája bővítve szerkesztés gombbal */}
          {persons.map((person) =>
            expandedId === person.id ? (
              <tr key={person.id + "_expanded"}>
                <td colSpan={3} className="p-4 bg-gray-50 rounded-b-xl">
                  <div className="text-sm font-medium mb-2">
                    {person.name} Ráérései:
                  </div>
                  {person.availability.length === 0 ? (
                    <p className="text-gray-500">Nincs megadva ráérés.</p>
                  ) : (
                    <ul className="list-inside">
                      {person.availability.map((a, index) => (
                        <li
                          key={a.id}
                          className={`flex items-center justify-between gap-4 px-3 py-2 rounded ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }`}
                        >
                          {editingAvailability?.id === a.id ? (
                            <Formik
                              initialValues={{ date: a.date.slice(0, 10) }}
                              onSubmit={(values) => {
                                onEditAvailability(
                                  person.id,
                                  a.id,
                                  values.date
                                );
                                setEditingAvailability(null);
                              }}
                            >
                              <Form className="flex items-center gap-3 w-full">
                                <Field
                                  type="date"
                                  name="date"
                                  className="border px-2 py-1 rounded text-sm"
                                />
                                <button
                                  type="submit"
                                  className="text-sm px-2 py-1 bg-black text-white rounded hover:bg-gray-800"
                                >
                                  Mentés
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingAvailability(null)}
                                  className="text-sm text-gray-600 hover:underline"
                                >
                                  Mégse
                                </button>
                              </Form>
                            </Formik>
                          ) : (
                            <>
                              <span>
                                {new Date(a.date).toLocaleDateString("hu-HU")}
                              </span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setEditingAvailability(a)}
                                  className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
                                >
                                  ✏️ Módosítás
                                </button>
                                <button
                                  onClick={() =>
                                    onRemoveAvailability(person.id, a.id)
                                  }
                                  className="text-xs px-2 py-1 border rounded text-red-500 hover:bg-red-100"
                                >
                                  ❌ Törlés
                                </button>
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ) : null
          )}

          {/* Új ráérés hozzáadása Formik-kal */}
          {persons.map((person) =>
            dateFormVisibleId === person.id ? (
              <tr key={person.id + "_form"}>
                <td colSpan={3} className="p-4 bg-gray-100 rounded-b-xl">
                  <Formik
                    initialValues={{ date: "" }}
                    onSubmit={(values, { resetForm }) => {
                      onAddAvailability(person.id, values.date);
                      resetForm();
                      setDateFormVisibleId(null);
                    }}
                  >
                    <Form className="flex gap-3 items-center">
                      <Field
                        type="date"
                        name="date"
                        className="border px-2 py-1 rounded"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
                      >
                        Mentés
                      </button>
                      <button
                        type="button"
                        onClick={() => setDateFormVisibleId(null)}
                        className="text-sm text-gray-600 hover:underline"
                      >
                        Mégse
                      </button>
                    </Form>
                  </Formik>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
}
