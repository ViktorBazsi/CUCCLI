// components/admin/EditUserModal.jsx
import { Formik, Form, Field } from "formik";

export default function EditUserModal({ user, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {user.id ? "Felhasználó szerkesztése" : "Új felhasználó"}
        </h2>

        <Formik
          initialValues={{
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            username: user.username || "",
            email: user.email || "",
            phoneNum: user.phoneNum || "",
            password: "", // csak új vagy módosított jelszó
            role: user.role || "USER",
          }}
          onSubmit={(values) => {
            const finalData = { ...user, ...values };
            if (!values.password) {
              delete finalData.password; // ha nincs megadva új jelszó, ne küldjük
            }
            onSave(finalData);
            onClose();
          }}
        >
          <Form className="flex flex-col gap-4">
            <Field
              name="firstName"
              placeholder="Keresztnév"
              className="border p-2 rounded w-full"
            />
            <Field
              name="lastName"
              placeholder="Vezetéknév"
              className="border p-2 rounded w-full"
            />
            <Field
              name="username"
              placeholder="Felhasználónév"
              className="border p-2 rounded w-full"
            />
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="border p-2 rounded w-full"
            />
            <Field
              name="phoneNum"
              placeholder="Telefonszám"
              className="border p-2 rounded w-full"
            />
            <Field
              name="password"
              type="password"
              placeholder="Jelszó (csak új vagy módosított)"
              className="border p-2 rounded w-full"
            />
            <Field
              as="select"
              name="role"
              className="border p-2 rounded w-full"
            >
              {["USER", "PERFORMER", "THEATER_ADMIN", "ADMIN"].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Field>

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
              >
                Mégse
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
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
