import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

export default function ContactForm() {
  const handleSubmit = async (values, { resetForm }) => {
    console.log("Visszajelzés elküldve:", values);
    // TODO: fetch vagy axios küldés a szervernek
    resetForm();
    toast.success("Köszönjük a visszajelzést!");
  };

  return (
    <section className="bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
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
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                name="name"
                placeholder="Név"
                className="border rounded-xl px-4 py-2 w-full"
                required
              />
              <Field
                name="username"
                placeholder="Felhasználónév"
                className="border rounded-xl px-4 py-2 w-full"
                required
              />
              <Field
                name="email"
                type="email"
                placeholder="Email cím"
                className="border rounded-xl px-4 py-2 w-full"
                required
              />
              <Field
                name="phone"
                placeholder="Telefonszám (nem kötelező)"
                className="border rounded-xl px-4 py-2 w-full"
              />
            </div>

            <Field
              as="textarea"
              name="message"
              rows="5"
              placeholder="Üzenet (visszajelzés, kérdés vagy észrevétel)"
              className="border rounded-xl px-4 py-2 w-full"
              required
            />

            <div className="text-center">
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-2xl font-semibold hover:bg-gray-800 transition"
              >
                Üzenet elküldése
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
