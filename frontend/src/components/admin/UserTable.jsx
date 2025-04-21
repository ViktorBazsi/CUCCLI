// components/admin/UserTable.jsx

import { useState } from "react";
import { toast } from "react-toastify";

import UserPerformances from "./UserPerformances";
import UserPerformanceTable from "./UserPerformanceTable";
import EditUserModal from "./EditUserModal";

export default function UserTable({
  users,
  onEditRole,
  onEditUser,
  onCreateUser, // ⬅️ új prop
  onStatusChange,
  onEditPerformance, // ⬅️ új prop
  onCreatePerformance, // ⬅️ új prop
  onDeletePerformance, // ⬅️ új prop
  availableDates = [], // ⬅️ ADD THIS
  onDeleteUser, // ⬅️ új prop
}) {
  const [editingUser, setEditingUser] = useState(null);
  const [expandedUserId, setExpandedUserId] = useState(null);

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() =>
            setEditingUser({
              id: null,
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              phoneNum: "",
              password: "",
              role: "USER",
            })
          }
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          + Új felhasználó
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-xl">
        <thead>
          <tr className="bg-gray-100 text-gray-800 text-left">
            <th className="p-3">Név</th>
            <th className="p-3">Felhasználónév</th>
            <th className="p-3">Email</th>
            <th className="p-3">Telefon</th>
            <th className="p-3">Szerepkör</th>
            <th className="p-3">Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">
                {user.firstName} {user.lastName}
              </td>
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.phoneNum || "-"}</td>
              <td className="p-3">
                <select
                  value={user.role}
                  onChange={(e) => onEditRole(user.id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="USER">USER</option>
                  <option value="PERFORMER">PERFORMER</option>
                  <option value="THEATER_ADMIN">THEATER_ADMIN</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => setEditingUser(user)}
                  className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
                >
                  Szerkesztés
                </button>
                <button
                  onClick={() =>
                    setExpandedUserId((prev) =>
                      prev === user.id ? null : user.id
                    )
                  }
                  className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
                >
                  Előadások
                </button>
                <button
                  onClick={() => {
                    toast.warning(
                      ({ closeToast }) => (
                        <div>
                          <p className="font-medium mb-2">
                            Biztosan törölni szeretnéd{" "}
                            <span className="font-semibold">
                              {user.firstName} {user.lastName}
                            </span>{" "}
                            felhasználót?
                          </p>
                          <div className="flex justify-end gap-2 mt-3">
                            <button
                              onClick={() => {
                                onDeleteUser(user.id);
                                closeToast();
                              }}
                              className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Igen, törlöm
                            </button>
                            <button
                              onClick={closeToast}
                              className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
                            >
                              Mégse
                            </button>
                          </div>
                        </div>
                      ),
                      {
                        autoClose: false,
                        closeOnClick: false,
                        closeButton: false,
                      }
                    );
                  }}
                  className="text-sm border px-3 py-1 rounded text-red-500 hover:bg-red-100"
                >
                  Törlés
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Expanded performance list */}
      {/* {expandedUserId && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Előadások</h3>
          <UserPerformances
            performances={
              users.find((u) => u.id === expandedUserId)?.performances || []
            }
            onStatusChange={onStatusChange}
          />
        </div>
      )} */}

      {expandedUserId && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Előadások – {users.find((u) => u.id === expandedUserId)?.firstName}{" "}
            {users.find((u) => u.id === expandedUserId)?.lastName}
          </h3>
          <UserPerformanceTable
            performances={
              users.find((u) => u.id === expandedUserId)?.performances || []
            }
            onStatusChange={onStatusChange}
            onUpdatePerformance={onEditPerformance} // ✅ ez most prop lesz
            onCreatePerformance={onCreatePerformance} // ✅ ez is
            onDeletePerformance={onDeletePerformance} // ✅ ez is
            userId={expandedUserId}
            availableDates={availableDates} // ⬅️ ITT ADD ÁT
          />
        </div>
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={(updatedUser) => {
            if (updatedUser.id) {
              onEditUser(updatedUser);
            } else {
              onCreateUser(updatedUser); // ⬅️ toast is itt fut
            }
            setEditingUser(null);
          }}
        />
      )}
    </>
  );
}
