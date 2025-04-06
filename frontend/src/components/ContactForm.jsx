import { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef();
  const [sent, setSent] = useState(false);

  const handleEmailSend = (values, { resetForm }) => {
    emailjs
      .sendForm(
        "service_hariv19", // EmailJS service ID
        "template_3tdu6xd", // EmailJS template ID
        formRef.current,
        "pv-N3kyXCwDqUX5J2" // EmailJS public key
      )
      .then(() => {
        setSent(true);
        resetForm();
      })
      .catch((error) => {
        console.error("Hiba az email küldés során:", error);
      });
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Küldj visszajelzést
      </h2>

      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          phone: "",
          message: "",
        }}
        onSubmit={handleEmailSend}
      >
        <Form ref={formRef} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              name="name"
              placeholder="Név"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
            <Field
              name="username"
              placeholder="Felhasználónév"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
            <Field
              name="email"
              type="email"
              placeholder="E-mail cím"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
            <Field
              name="phone"
              placeholder="Telefonszám (opcionális)"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
          </div>

          <Field
            as="textarea"
            name="message"
            rows="5"
            placeholder="Írd be az üzeneted..."
            required
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />

          <div className="text-center">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Üzenet elküldése
            </button>
          </div>

          {sent && (
            <p className="text-green-600 text-center pt-4 font-medium">
              Köszönjük! Üzenetedet elküldtük.
            </p>
          )}
        </Form>
      </Formik>
    </section>
  );
}
