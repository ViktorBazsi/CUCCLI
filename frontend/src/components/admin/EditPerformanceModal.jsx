// components/admin/EditPerformanceModal.jsx
import { Formik, Form, Field } from "formik";

export default function EditPerformanceModal({
  performance,
  onClose,
  onSave,
  availableDates = [], // ⬅️ date selectorhoz
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {performance.id ? "Előadás szerkesztése" : "Új előadás"}
        </h2>

        <Formik
          initialValues={{
            title: performance.title,
            quote: performance.quote || "",
            status: performance.status,
            isArchived: performance.isArchived ?? false,
            recordingRequest: performance.recordingRequest ?? false,
            imageUrl: performance.imageUrl || "",
            textUrl: performance.textUrl || "",
            payment: performance.payment || "NOT_PAID",
            availableDateId: performance.availableDateId || "",
          }}
          onSubmit={(values) => {
            onSave({ ...performance, ...values });
          }}
        >
          <Form className="flex flex-col gap-4">
            <Field
              name="title"
              placeholder="Cím"
              className="border p-2 rounded"
            />
            <Field
              name="quote"
              placeholder="Idézet (opcionális)"
              className="border p-2 rounded"
            />
            <Field
              name="imageUrl"
              placeholder="Plakát URL"
              className="border p-2 rounded"
            />
            <Field
              name="textUrl"
              placeholder="Szövegkönyv URL"
              className="border p-2 rounded"
            />

            <Field as="select" name="status" className="border p-2 rounded">
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

            <Field as="select" name="payment" className="border p-2 rounded">
              {["NOT_PAID", "PAID_PARTIAL", "PAID_FULL"].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Field>

            <Field
              as="select"
              name="availableDateId"
              className="border p-2 rounded"
            >
              <option value="">Válassz időpontot</option>
              {availableDates.map((d) => (
                <option key={d.id} value={d.id}>
                  {new Date(d.date).toLocaleDateString("hu-HU")}
                </option>
              ))}
            </Field>

            <label className="inline-flex items-center gap-2">
              <Field type="checkbox" name="recordingRequest" />
              <span className="text-sm">Videófelvétel kérés</span>
            </label>

            <label className="inline-flex items-center gap-2">
              <Field type="checkbox" name="isArchived" />
              <span className="text-sm">Archivált (isArchived)</span>
            </label>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Mégse
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Mentés
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
