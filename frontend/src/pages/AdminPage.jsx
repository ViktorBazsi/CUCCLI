import { useState, useEffect } from "react";

import UserTable from "../components/admin/UserTable";
import PersonTable from "../components/admin/PersonTable";

const tabs = [
  { id: "users", label: "Felhasználók" },
  { id: "performers", label: "Performerek" },
  { id: "dates", label: "Előadás időpontok" },
  { id: "performances", label: "Előadások" },
  { id: "payments", label: "Fizetések" },
];

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    if (selectedTab === "users") {
      setUsers([
        {
          id: "1",
          firstName: "Elek",
          lastName: "Ágnes",
          username: "agnes123",
          email: "agnes@example.com",
          phoneNum: "06301234567",
          role: "USER",
          performances: [
            { id: "p1", title: "Macbeth újratöltve", status: "WRITING" },
            { id: "p2", title: "Az idő fogságában", status: "PAID_PARTIAL" },
          ],
        },
        {
          id: "2",
          firstName: "Kovács",
          lastName: "Béla",
          username: "bela99",
          email: "bela@example.com",
          phoneNum: null,
          role: "THEATER_ADMIN",
          performances: [],
        },
      ]);
    }
  }, [selectedTab]);

  function handleRoleChange(userId, newRole) {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    // TODO: Küldd el a backendnek a módosítást
    // fetch(`/api/users/${userId}/role`, { method: 'PUT', body: JSON.stringify({ role: newRole }) })
  }

  function handleStatusChange(performanceId, newStatus) {
    setUsers((prev) =>
      prev.map((user) => ({
        ...user,
        performances: user.performances.map((p) =>
          p.id === performanceId ? { ...p, status: newStatus } : p
        ),
      }))
    );
    // TODO: PATCH /api/performances/:id/status
  }

  function handleEditUser(updatedUser) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );

    // TODO: PATCH /api/users/:id a backend felé
    // Például:
    // fetch(`/api/users/${updatedUser.id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedUser),
    // })
  }

  useEffect(() => {
    if (selectedTab === "performers") {
      // TODO: fetch persons from backend
      setPersons([
        {
          id: "p1",
          name: "Szabó Júlia",
          roles: ["ACTOR"],
          availability: [
            { id: "a1", date: "2025-04-24" },
            { id: "a2", date: "2025-05-01" },
          ],
        },
        {
          id: "p2",
          name: "Nagy Dániel",
          roles: ["WRITER", "DIRECTOR"],
          availability: [],
        },
      ]);
    }
  }, [selectedTab]);

  function handleRoleToggle(personId, role) {
    setPersons((prev) =>
      prev.map((p) =>
        p.id === personId
          ? {
              ...p,
              roles: p.roles.includes(role)
                ? p.roles.filter((r) => r !== role)
                : [...p.roles, role],
            }
          : p
      )
    );
    // TODO: PATCH /api/person/:id/roles
  }

  function handleAddAvailability(personId, date) {
    setPersons((prev) =>
      prev.map((p) =>
        p.id === personId
          ? {
              ...p,
              availability: [
                ...p.availability,
                {
                  id: `temp-${Date.now()}`, // ideiglenes ID frontend oldalon
                  date,
                },
              ],
            }
          : p
      )
    );
    // TODO: POST /api/person/:id/availability
  }

  function handleEditAvailability(personId, availabilityId, newDate) {
    setPersons((prev) =>
      prev.map((p) =>
        p.id === personId
          ? {
              ...p,
              availability: p.availability.map((a) =>
                a.id === availabilityId ? { ...a, date: newDate } : a
              ),
            }
          : p
      )
    );
    // TODO: PATCH /api/person/:id/availability/:availabilityId
  }

  function handleRemoveAvailability(personId, availabilityId) {
    setPersons((prev) =>
      prev.map((p) =>
        p.id === personId
          ? {
              ...p,
              availability: p.availability.filter(
                (a) => a.id !== availabilityId
              ),
            }
          : p
      )
    );
    // TODO: DELETE /api/person/:id/availability/:availabilityId
  }

  return (
    <main className="pt-24 px-4 min-h-screen bg-gradient-to-b from-white to-gray-900 text-gray-800 flex">
      {/* Sidebar */}
      <aside className="w-64 mr-8">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <nav className="flex flex-col gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`text-left px-4 py-2 rounded-2xl border transition font-medium ${
                selectedTab === tab.id
                  ? "bg-black text-white"
                  : "border-black hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <section className="flex-1 bg-white p-6 rounded-2xl shadow-md">
        {/* {selectedTab === "users" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Felhasználók kezelése
            </h2>
            <p className="text-gray-600">
              👉 Itt lesz a felhasználók kezelése (lista, role váltás,
              rendelések stb.)
            </p>
          </div>
        )} */}

        {/* users tab tartalom */}
        {selectedTab === "users" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Felhasználók kezelése
            </h2>
            <UserTable
              users={users}
              onEditRole={handleRoleChange}
              onEditUser={handleEditUser}
              onStatusChange={handleStatusChange} // ✅ EZ HIÁNYZOTT!
            />
          </div>
        )}

        {/* {selectedTab === "performers" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Performerek kezelése
            </h2>
            <p className="text-gray-600">
              👉 Itt lesz a Person-ok listája, ráérés, role-ok, hozzáadás stb.
            </p>
          </div>
        )} */}

        {selectedTab === "performers" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Performerek kezelése
            </h2>
            <PersonTable
              persons={persons}
              onUpdateRoles={handleRoleToggle}
              onAddAvailability={handleAddAvailability}
              onRemoveAvailability={handleRemoveAvailability}
              onEditAvailability={handleEditAvailability}
            />
          </div>
        )}

        {selectedTab === "dates" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Előadás időpontok</h2>
            <p className="text-gray-600">
              👉 Itt lehet előadás időpontokat kezelni.
            </p>
          </div>
        )}

        {selectedTab === "performances" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Előadások kezelése</h2>
            <p className="text-gray-600">
              👉 Itt lehet performance-okat szerkeszteni, hozzáadni, státuszt
              módosítani.
            </p>
          </div>
        )}

        {selectedTab === "payments" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Fizetések ellenőrzése
            </h2>
            <p className="text-gray-600">
              👉 Itt ellenőrizheted az előadások fizetési állapotát.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
