import { useState } from "react";
import PersonModal from "./PersonModal";

// (Lehet azonos listát használsz a színészekhez és rendezőkhöz — itt most ezt másoljuk)
// const directors = [
//   {
//     name: "Tóth Bence",
//     image: "https://avatar.iran.liara.run/public/48",
//     performances: ["Fénytörés", "Hármas Átjáró"],
//     works: ["Mellékszerep a 'Tér és Idő'-ben"],
//     awards: ["Színészi Kiválóság Díj"],
//     cuclis: ["Ütközéspont"],
//   },
//   {
//     name: "Boros Ági",
//     image: "https://avatar.iran.liara.run/public/79",
//     performances: ["Szálak", "Másik Oldal"],
//     works: ["Dramaturgiai kísérleti darab: 'Forma Nélkül'"],
//     awards: ["CUCLI Kísérleti Díj"],
//     cuclis: ["Nem Nevezhető"],
//   },
//   {
//     name: "Major Gergő",
//     image: "https://avatar.iran.liara.run/public/18",
//     performances: ["Reflex", "Hangpróba"],
//     works: ["CUCLI: 'Hangtalan Határ' egyedi megformálása"],
//     awards: ["Kritikusok díja – Legjobb mozgás"],
//     cuclis: ["Szöveg Nélküli Érintés"],
//   },
//   {
//     name: "Kovács Kata",
//     image: "https://avatar.iran.liara.run/public/84",
//     performances: ["Ködfal", "Zárt Kör"],
//     works: ["Rendezőként is közreműködött a 'Csoport'-ban"],
//     awards: ["CUCLI Közreműködő díj"],
//     cuclis: ["Küszöb"],
//   },
// ];

export default function DirectorSelector({
  selectedDirectors = [],
  setSelectedDirectors,
  people = [],
}) {
  const directors = people;
  const [modalDirector, setModalDirector] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isSelected = (director) =>
    selectedDirectors.some((d) => d.name === director.name);

  const toggleDirector = (director) => {
    const alreadySelected = isSelected(director);
    if (alreadySelected) {
      setSelectedDirectors(
        selectedDirectors.filter((d) => d.name !== director.name)
      );
    } else {
      setSelectedDirectors([...selectedDirectors, director]);
    }
  };

  const handleOpenModal = (director) => {
    setModalDirector(director);
    setIsModalOpen(true);
  };

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Válassz rendezőt</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {directors.map((director, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleOpenModal(director)}
            className={`w-36 p-3 rounded-xl border text-center transition ${
              isSelected(director)
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-black"
            }`}
          >
            {director.name}
          </button>
        ))}
      </div>

      {modalDirector && (
        <PersonModal
          person={modalDirector}
          isOpen={isModalOpen}
          isSelected={isSelected(modalDirector)}
          onSelect={() => {
            toggleDirector(modalDirector);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
