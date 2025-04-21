// components/admin/UserTable.jsx

import { useState } from "react";

import UserPerformances from "./UserPerformances";
import UserPerformanceTable from "./UserPerformanceTable";
import EditUserModal from "./EditUserModal";

export default function UserTable({
  users,
  onEditRole,
  onEditUser,
  onStatusChange,
  onEditPerformance, // ⬅️ új prop
  onCreatePerformance, // ⬅️ új prop
  onDeletePerformance, // ⬅️ új prop
  availableDates = [], // ⬅️ ADD THIS
}) {
  const [editingUser, setEditingUser] = useState(null);
  const [expandedUserId, setExpandedUserId] = useState(null);

  return (
    <>
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
          onSave={onEditUser} // 🟢 Itt hívjuk meg a szülőből kapott handleEditUser-t
        />
      )}
    </>
  );
}
