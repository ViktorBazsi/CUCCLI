// components/admin/EditUserModal.jsx
import { Formik, Form, Field } from "formik";

export default function EditUserModal({ user, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Felhasználó szerkesztése</h2>

        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNum: user.phoneNum || "",
          }}
          onSubmit={(values) => {
            onSave({ ...user, ...values }); // 🟢 Meghívja a UserTable-ben kapott függvényt
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
