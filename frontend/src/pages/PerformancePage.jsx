import { Formik, Form } from "formik";
import WriterSelector from "../components/WriterSelector";
import ActorSelector from "../components/ActorSelector";
import DateSelector from "../components/DateSelector";

export default function PerformancePage() {
  const initialValues = {
    topic: "",
    writers: [],
    actors: [],
    recordingRequest: false,
    date: "",
  };

  const handleSubmit = (values) => {
    console.log("Beküldött adatok:", values);
    // fetch vagy axios POST kérés itt jöhet
    // például:
    // fetch("/api/performances", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
  };

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-b from-white to-gray-500 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12">
          Állítsd össze az előadásod
        </h1>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form className="space-y-12">
              {/* Téma input */}
              <div className="text-center">
                <label
                  htmlFor="topic"
                  className="block text-xl font-semibold mb-2"
                >
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

              {/* Írók választása */}
              <WriterSelector
                selectedWriters={values.writers}
                setSelectedWriters={(newSelection) =>
                  setFieldValue("writers", newSelection)
                }
              />

              {/* Színészek választása */}
              <ActorSelector
                selectedActors={values.actors}
                setSelectedActors={(newSelection) =>
                  setFieldValue("actors", newSelection)
                }
              />

              {/* Felvétel kérés gomb */}
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
                  {values.recordingRequest
                    ? "Felvételt kértem"
                    : "Felvételt kérek"}
                </button>
              </div>

              <DateSelector
                selectedDate={values.date}
                setSelectedDate={(date) => setFieldValue("date", date)}
              />

              {/* Beküldés gomb */}
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
      </div>
    </main>
  );
}
