import { Formik, Form, Field } from "formik";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const res = await register(values);
    setSubmitting(false);

    if (res.ok) {
      navigate("/"); // vagy nyithatod a login modalt is
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Vezetéknév</label>
              <Field
                name="lastName"
                type="text"
                required
                className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Keresztnév</label>
              <Field
                name="firstName"
                type="text"
                required
                className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Felhasználónév</label>
            <Field
              name="username"
              type="text"
              required
              className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <Field
              name="email"
              type="email"
              required
              className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Telefonszám (opcionális)
            </label>
            <Field
              name="phoneNum"
              type="tel"
              className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Jelszó</label>
            <Field
              name="password"
              type="password"
              required
              className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-800 transition"
          >
            Regisztráció
          </button>

          <p className="text-sm text-center mt-2">
            Már van fiókod?{" "}
            <a href="/login" className="underline text-black">
              Jelentkezz be
            </a>
          </p>
        </Form>
      )}
    </Formik>
  );
}
