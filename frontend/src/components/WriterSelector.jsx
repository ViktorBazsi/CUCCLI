import { useState } from "react";
import PersonModal from "./PersonModal";

const writers = [
  {
    id: 1,
    name: "Nádas Vera",
    image: "https://avatar.iran.liara.run/public/68",
    works: ["Csendek játéka", "Szárnyas árnyak"],
    awards: ["Kortárs Irodalom-díj", "CUCLI Közönség-díj"],
    cuclis: ["Az idő nyelve"],
    performances: ["Személyes Idők", "A Hangok Tánca"],
  },
  {
    id: 2,
    name: "Horváth András",
    image: "https://avatar.iran.liara.run/public/32",
    works: ["Suttogás", "A Semmi Szava"],
    awards: ["Nemzeti Dramaturg-díj"],
    cuclis: ["Láthatatlan Történetek"],
    performances: ["Árnyékzóna"],
  },
  {
    id: 3,
    name: "Fekete Luca",
    image: "https://avatar.iran.liara.run/public/78",
    works: ["Tükör mögött", "Emlékpor"],
    awards: ["Fiatal Alkotók Díja"],
    cuclis: ["Belülről fakad"],
    performances: ["Képzelet Határai"],
  },
  {
    id: 4,
    name: "Csányi Miklós",
    image: "https://avatar.iran.liara.run/public/31",
    works: ["Papírvilág", "Néma Kiáltás"],
    awards: ["Színházi Dráma Díj"],
    cuclis: ["A Láthatatlan Fal"],
    performances: ["Részletek Egy Életből"],
  },
];

export default function WriterSelector({
  selectedWriters = [],
  setSelectedWriters,
}) {
  const [modalWriter, setModalWriter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isWriterSelected = (writer) =>
    selectedWriters.some((w) => w.id === writer.id);

  const toggleWriter = (writer) => {
    if (isWriterSelected(writer)) {
      setSelectedWriters(selectedWriters.filter((w) => w.id !== writer.id));
    } else {
      setSelectedWriters([...selectedWriters, writer]);
    }
  };

  const handleOpenModal = (writer) => {
    setModalWriter(writer);
    setIsModalOpen(true);
  };

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Válassz írókat</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {writers.map((writer) => (
          <button
            type="button"
            key={writer.id}
            onClick={() => handleOpenModal(writer)}
            className={`w-40 p-4 rounded-xl border text-center transition
              ${
                isWriterSelected(writer)
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-black"
              }`}
          >
            {writer.name}
          </button>
        ))}
      </div>

      {modalWriter && (
        <PersonModal
          person={modalWriter}
          isOpen={isModalOpen}
          isSelected={isWriterSelected(modalWriter)}
          onClose={() => setIsModalOpen(false)}
          onSelect={() => {
            toggleWriter(modalWriter);
            setIsModalOpen(false);
          }}
        />
      )}
    </section>
  );
}
