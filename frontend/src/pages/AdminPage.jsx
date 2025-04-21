import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import UserTable from "../components/admin/UserTable";
import PersonTable from "../components/admin/PersonTable";
import AvailableDateTable from "../components/admin/AvailableDateTable";
import PerformanceTable from "../components/admin/PerformanceTable";
import PaymentTable from "../components/admin/PaymentTable";

import userService from "../services/user.service";

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
  const [availableDates, setAvailableDates] = useState([]);
  const [performances, setPerformances] = useState([]);

  // USER MOCK:
  // useEffect(() => {
  //   if (selectedTab === "users") {
  //     setUsers([
  //       {
  //         id: "1",
  //         firstName: "Elek",
  //         lastName: "Ágnes",
  //         username: "agnes123",
  //         email: "agnes@example.com",
  //         phoneNum: "06301234567",
  //         role: "USER",
  //         performances: [
  //           {
  //             id: "p1",
  //             title: "Macbeth újratöltve",
  //             status: "WRITING",
  //             availableDate: {
  //               date: "2025-05-01", // ⬅️ IDE KELL
  //             },
  //             payment: "PAID_PARTIAL",
  //           },
  //           {
  //             id: "p2",
  //             title: "Az idő fogságában",
  //             status: "PAID_PARTIAL",
  //             availableDate: {
  //               date: "2025-05-12",
  //             },
  //             payment: "NOT_PAID",
  //           },
  //         ],
  //       },
  //       {
  //         id: "2",
  //         firstName: "Kovács",
  //         lastName: "Béla",
  //         username: "bela99",
  //         email: "bela@example.com",
  //         phoneNum: null,
  //         role: "THEATER_ADMIN",
  //         performances: [],
  //       },
  //     ]);
  //   }
  // }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === "users") {
      userService.listAll().then(setUsers).catch(console.error);
    }
  }, [selectedTab]);

  async function handleCreateUser(newUser) {
    try {
      const created = await userService.create(newUser);
      setUsers((prev) => [...prev, { ...created, performances: [] }]);
      toast.success("Felhasználó sikeresen létrehozva! 🙌");
    } catch (error) {
      console.error("Hiba az új user létrehozásakor:", error.message);
      toast.error("Hiba történt a felhasználó létrehozásakor. 😞");
    }
  }

  // MOCK:
  // function handleRoleChange(userId, newRole) {
  //   setUsers((prev) =>
  //     prev.map((user) =>
  //       user.id === userId ? { ...user, role: newRole } : user
  //     )
  //   );
  // TODO: Küldd el a backendnek a módosítást
  // fetch(`/api/users/${userId}/role`, { method: 'PUT', body: JSON.stringify({ role: newRole }) })
  // }

  async function handleRoleChange(userId, newRole) {
    try {
      const updatedUser = await userService.updateRole(userId, newRole);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: updatedUser.role } : user
        )
      );
    } catch (error) {
      console.error("Szerepkör módosítás hiba:", error);
    }
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

  // MOCK:
  // function handleEditUser(updatedUser) {
  //   setUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.id === updatedUser.id ? { ...user, ...updatedUser } : user
  //     )
  //   );

  //   // TODO: PATCH /api/users/:id a backend felé
  //   // Például:
  //   // fetch(`/api/users/${updatedUser.id}`, {
  //   //   method: "PATCH",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   body: JSON.stringify(updatedUser),
  //   // })
  // }

  async function handleEditUser(updatedUser) {
    try {
      const response = await userService.update(updatedUser.id, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? response : user))
      );
    } catch (error) {
      console.error("Sikertelen user frissítés:", error);
    }
  }

  async function handleDeleteUser(userId) {
    try {
      await userService.destroy(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Hiba a törlés során:", err);
    }
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

  function handleCreatePerson(newPerson) {
    const newId = `temp-${Date.now()}`;
    setPersons((prev) => [
      ...prev,
      { ...newPerson, id: newId, availability: [] },
    ]);
    // TODO: POST /api/persons
  }

  function handleUpdatePerson(updatedPerson) {
    setPersons((prev) =>
      prev.map((p) =>
        p.id === updatedPerson.id ? { ...p, ...updatedPerson } : p
      )
    );
    // TODO: PATCH /api/persons/:id
  }

  useEffect(() => {
    if (selectedTab === "dates") {
      // TODO: fetch from backend
      setAvailableDates([
        {
          id: "d1",
          date: "2025-05-01",
          isActive: true,
        },
        {
          id: "d2",
          date: "2025-05-10",
          isActive: false,
        },
      ]);
    }
  }, [selectedTab]);

  function handleAddDate(newDate) {
    const newId = `temp-${Date.now()}`;
    setAvailableDates((prev) => [
      ...prev,
      { id: newId, date: newDate, isActive: true },
    ]);
    // TODO: POST /api/available-date
  }

  function handleToggleActive(dateId) {
    setAvailableDates((prev) =>
      prev.map((d) => (d.id === dateId ? { ...d, isActive: !d.isActive } : d))
    );
    // TODO: PATCH /api/available-date/:id/toggle
  }

  useEffect(() => {
    if (selectedTab === "performances" || selectedTab === "payments") {
      // TODO: fetch from backend
      setPerformances([
        {
          id: "pf1",
          title: "Macbeth 2025",
          quote: "Lesz itt vér, ne aggódj",
          status: "WRITING",
          createdAt: "2025-04-01",
          availableDate: {
            date: "2025-05-02",
          },
        },
        {
          id: "pf2",
          title: "Az utolsó novella",
          quote: "",
          status: "IN_PREPARATION",
          createdAt: "2025-04-10",
          availableDate: {
            date: "2025-05-14",
          },
        },
      ]);
    }
  }, [selectedTab]);

  function handlePerfStatusChange(performanceId, newStatus) {
    setPerformances((prev) =>
      prev.map((p) =>
        p.id === performanceId ? { ...p, status: newStatus } : p
      )
    );
    // TODO: PATCH /api/performances/:id/status
  }

  function handleUpdatePerformance(updated) {
    setPerformances((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    // TODO: PATCH /api/performances/:id
  }

  function handleCreatePerformance(newPerf) {
    const newId = `temp-${Date.now()}`;
    setPerformances((prev) => [...prev, { ...newPerf, id: newId }]);
    // TODO: POST /api/performances
  }

  function handleDeletePerformance(performanceId) {
    setPerformances((prev) => prev.filter((p) => p.id !== performanceId));
    // TODO: DELETE /api/performances/:id
  }

  function handleEditPerformance(updated) {
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        performances: user.performances.map((p) =>
          p.id === updated.id ? { ...p, ...updated } : p
        ),
      }))
    );
    // TODO: PATCH /api/performances/:id
  }

  // PAYMENT:
  function handlePaymentChange(performanceId, newStatus) {
    setPerformances((prev) =>
      prev.map((p) =>
        p.id === performanceId ? { ...p, payment: newStatus } : p
      )
    );

    // TODO: PATCH /api/performances/:id/payment
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
              onCreateUser={handleCreateUser} // ⬅️ Itt átadod
              onStatusChange={handleStatusChange}
              onEditPerformance={handleEditPerformance} // ⬅️ ezeket is add át
              onCreatePerformance={handleCreatePerformance}
              onDeletePerformance={handleDeletePerformance}
              availableDates={availableDates} // ⬅️ ITT IS KELL
              onDeleteUser={handleDeleteUser} // ⬅️ ezt add hozzá
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
              onUpdatePerson={handleUpdatePerson}
              onCreatePerson={handleCreatePerson}
            />
          </div>
        )}

        {/* {selectedTab === "dates" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Előadás időpontok</h2>
            <p className="text-gray-600">
              👉 Itt lehet előadás időpontokat kezelni.
            </p>
          </div>
        )} */}

        {selectedTab === "dates" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Előadás időpontok</h2>
            <AvailableDateTable
              dates={availableDates}
              onAddDate={handleAddDate}
              onToggleActive={handleToggleActive}
            />
          </div>
        )}

        {/* {selectedTab === "performances" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Előadások kezelése</h2>
            <p className="text-gray-600">
              👉 Itt lehet performance-okat szerkeszteni, hozzáadni, státuszt
              módosítani.
            </p>
          </div>
        )} */}

        {selectedTab === "performances" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Előadások kezelése</h2>
            <PerformanceTable
              performances={performances}
              onStatusChange={handlePerfStatusChange}
              onUpdatePerformance={handleUpdatePerformance}
              onCreatePerformance={handleCreatePerformance}
              onDeletePerformance={handleDeletePerformance}
              availableDates={availableDates} // ⬅️ ITT ADD ÁT
            />
          </div>
        )}
        {/* 
        {selectedTab === "payments" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Fizetések ellenőrzése
            </h2>
            <p className="text-gray-600">
              👉 Itt ellenőrizheted az előadások fizetési állapotát.
            </p>
          </div>
        )} */}

        {selectedTab === "payments" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Fizetések ellenőrzése
            </h2>
            <PaymentTable
              performances={performances}
              onPaymentChange={handlePaymentChange}
            />
          </div>
        )}
      </section>
    </main>
  );
}
