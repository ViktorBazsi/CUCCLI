import { Formik, Form } from "formik";
import WriterSelector from "./WriterSelector";
import ActorSelector from "./ActorSelector";
import DateSelector from "./DateSelector";

export default function PerformanceForm({ initialValues, onSubmit }) {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-12">
          {/* Téma input */}
          <div className="text-center">
            <label htmlFor="topic" className="block text-xl font-semibold mb-2">
              Válassz témát
            </label>
            <textarea
              id="topic"
              name="topic"
              rows="4"
              placeholder="Pl. múlt, család, identitás, szerelem..."
              className="w-full max-w-xl mx-auto rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
              value={values.topic}
              onChange={(e) => setFieldValue("topic", e.target.value)}
            />
          </div>

          {/* Írók */}
          <WriterSelector
            selectedWriters={values.writers}
            setSelectedWriters={(newWriters) =>
              setFieldValue("writers", newWriters)
            }
          />

          {/* Színészek */}
          <ActorSelector
            selectedActors={values.actors}
            setSelectedActors={(newActors) =>
              setFieldValue("actors", newActors)
            }
          />

          {/* Felvétel kérés */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() =>
                setFieldValue("recordingRequest", !values.recordingRequest)
              }
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium border transition ${
                values.recordingRequest
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "border-gray-400 text-gray-800 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">🎙️</span>
              {values.recordingRequest ? "Felvételt kértem" : "Felvételt kérek"}
            </button>
          </div>

          {/* Dátum */}
          <DateSelector
            selectedDate={values.date}
            setSelectedDate={(date) => setFieldValue("date", date)}
          />

          {/* Kosárba gomb */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition mb-24"
            >
              Kosárba
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
