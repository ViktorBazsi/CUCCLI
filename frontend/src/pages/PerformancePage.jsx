import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PerformanceForm from "../components/PerformanceForm";

export default function PerformancePage() {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cucli_cart");
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        setInitialValues({
          topic: parsed.topic || "",
          writers: parsed.writers || [],
          actors: parsed.actors || [],
          recordingRequest: parsed.recordingRequest || false,
          date: parsed.date || "",
          directors: parsed.directors || "",
        });
      } catch (err) {
        console.error("Hibás kosárformátum a localStorage-ben.", err);
        setInitialValues({
          topic: "",
          writers: [],
          actors: [],
          recordingRequest: false,
          date: "",
          directors: [],
        });
      }
    } else {
      setInitialValues({
        topic: "",
        writers: [],
        actors: [],
        recordingRequest: false,
        date: "",
      });
    }
  }, []);

  const handleSubmit = (values) => {
    console.log("Beküldött adatok:", values);
    localStorage.setItem("cucli_cart", JSON.stringify(values));
    navigate("/cart", { state: values });
  };

  if (!initialValues) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Betöltés...</p>
      </main>
    );
  }

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-b from-white to-gray-900 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12">
          Állítsd össze az előadásod
        </h1>

        <PerformanceForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
