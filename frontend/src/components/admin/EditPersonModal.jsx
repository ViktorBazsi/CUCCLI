import { Formik, Form, Field } from "formik";
import { handleFileUpload } from "../../utils/uploadFile";

export default function EditPersonModal({ person, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl shadow-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {person.id ? "Alkotó szerkesztése" : "Új alkotó felvétele"}
        </h2>

        <Formik
          initialValues={{
            name: person.name || "",
            bio: person.bio || "",
            imageUrl: person.imageUrl || "",
            roles: person.roles || [],
          }}
          onSubmit={(values) => {
            onSave({ ...person, ...values });
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
                  name="name"
                  placeholder="Név"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                <Field
                  name="bio"
                  as="textarea"
                  placeholder="Bemutatkozás"
                  className="w-full border rounded px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-1 focus:ring-black"
                />
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-base font-medium text-gray-700">
                  Portré
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
                    alt="Előnézet"
                    className="w-24 h-24 rounded object-cover shadow"
                  />
                )}
              </fieldset>

              <fieldset className="space-y-2">
                <legend className="text-base font-medium text-gray-700">
                  Szerepkörök
                </legend>
                <div className="flex flex-wrap gap-4">
                  {["WRITER", "ACTOR", "DIRECTOR"].map((role) => (
                    <label
                      key={role}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={values.roles.includes(role)}
                        onChange={() =>
                          setFieldValue(
                            "roles",
                            values.roles.includes(role)
                              ? values.roles.filter((r) => r !== role)
                              : [...values.roles, role]
                          )
                        }
                        className="accent-black"
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </fieldset>

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
