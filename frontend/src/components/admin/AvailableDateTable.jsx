// components/admin/AvailableDateTable.jsx
import { Formik, Form, Field } from "formik";

export default function AvailableDateTable({
  dates,
  onAddDate,
  onToggleActive,
}) {
  return (
    <div className="space-y-6">
      {/* Új időpont hozzáadása */}
      <div className="bg-white p-4 rounded-xl shadow-md max-w-md">
        <h3 className="text-lg font-semibold mb-3">Új időpont hozzáadása</h3>
        <Formik
          initialValues={{ date: "" }}
          onSubmit={(values, { resetForm }) => {
            onAddDate(values.date);
            resetForm();
          }}
        >
          <Form className="flex gap-4 items-center">
            <Field
              type="date"
              name="date"
              className="border px-3 py-2 rounded w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Mentés
            </button>
          </Form>
        </Formik>
      </div>

      {/* Időpontok listája */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-800">
              <th className="p-3">Dátum</th>
              <th className="p-3">Státusz</th>
              <th className="p-3">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {dates.map((date, index) => (
              <tr
                key={date.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-t`}
              >
                <td className="p-3">
                  {new Date(date.date).toLocaleDateString("hu-HU")}
                </td>
                <td className="p-3">
                  {date.isActive ? (
                    <span className="text-green-600 font-semibold">Aktív</span>
                  ) : (
                    <span className="text-gray-500">Inaktív</span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => onToggleActive(date.id)}
                    className={`px-3 py-1 text-sm rounded ${
                      date.isActive
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}
                  >
                    {date.isActive ? "Inaktiválás" : "Aktiválás"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
