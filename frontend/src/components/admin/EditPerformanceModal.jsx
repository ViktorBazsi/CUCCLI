import { Formik, Form, Field } from "formik";
import { handleFileUpload } from "../../utils/uploadFile";

export default function EditPerformanceModal({
  performance,
  onClose,
  onSave,
  availableDates = [],
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl shadow-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {performance.id ? "Előadás szerkesztése" : "Új előadás"}
        </h2>

        <Formik
          initialValues={{
            title: performance.title || "",
            quote: performance.quote || "",
            status: performance.status || "CREATED",
            isArchived: performance.isArchived ?? false,
            recordingRequest: performance.recordingRequest ?? false,
            imageUrl: performance.imageUrl || "",
            textUrl: performance.textUrl || "",
            payment: performance.payment || "NOT_PAID",
            availableDateId: performance.availableDateId || "",
          }}
          onSubmit={(values) => {
            onSave({ ...performance, ...values });
            onClose();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-6">
              <fieldset className="space-y-3">
                <legend className="text-base font-medium text-gray-700">
                  Alapadatok
                </legend>
                <Field
                  name="title"
                  placeholder="Előadás címe"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                <Field
                  name="quote"
                  placeholder="Idézet (opcionális)"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-base font-medium text-gray-700">
                  Plakát
                </legend>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileUpload(e, setFieldValue, "imageUrl")
                  }
                  className="text-sm"
                />
                {values.imageUrl && (
                  <img
                    src={values.imageUrl}
                    alt="Plakát"
                    className="w-28 rounded shadow mt-2"
                  />
                )}
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-base font-medium text-gray-700">
                  Szövegkönyv
                </legend>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    handleFileUpload(e, setFieldValue, "textUrl")
                  }
                  className="text-sm"
                />
                {values.textUrl && (
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {values.textUrl}
                  </p>
                )}
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-base font-medium text-gray-700">
                  Státusz
                </legend>
                <Field
                  as="select"
                  name="status"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
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
                </Field>
                <legend className="text-base font-medium text-gray-700">
                  Fizetési státusz
                </legend>
                <Field
                  as="select"
                  name="payment"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                >
                  {["NOT_PAID", "PAID_PARTIAL", "PAID_FULL"].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Field>

                <legend className="text-base font-medium text-gray-700">
                  Lehetséges időpontok
                </legend>

                <Field
                  as="select"
                  name="availableDateId"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Válassz időpontot</option>
                  {availableDates.map((d) => (
                    <option key={d.id} value={d.id}>
                      {new Date(d.date).toLocaleDateString("hu-HU")}
                    </option>
                  ))}
                </Field>
              </fieldset>

              <div className="flex flex-col gap-2 text-sm mt-2">
                <label className="inline-flex items-center gap-2">
                  <Field type="checkbox" name="recordingRequest" />
                  Videófelvétel kérés
                </label>
                <label className="inline-flex items-center gap-2">
                  <Field type="checkbox" name="isArchived" />
                  Archivált (isArchived)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mégse
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800"
                >
                  Mentés
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
