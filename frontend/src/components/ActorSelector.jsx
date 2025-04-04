
import { useState } from "react";
import PersonModal from "./PersonModal";

const actors = [
  {
    name: "Kiss Anna",
    image: "https://via.placeholder.com/150",
    performances: ["Üvegtest", "Éjfél előtt"],
    works: ["Szereplés 'Árnyékok között'", "CUCLI: Átváltozások"],
    awards: ["Legjobb női főszereplő – 2023"],
    cuclis: ["Csend és Zaj"],
  },
  {
    name: "Bálint Zoltán",
    image: "https://via.placeholder.com/150",
    performances: ["Kék Csend", "Nézőpontok"],
    works: ["Kiemelkedő alakítás 'Ébredés'-ben"],
    awards: ["Színművészeti Különdíj"],
    cuclis: ["Második Esély"],
  },
  {
    name: "Sipos Maja",
    image: "https://avatar.iran.liara.run/public/62",
    performances: ["Vonalak között", "Tükörjáték"],
    works: ["Főszerep a 'Belső Szoba'-ban"],
    awards: ["CUCLI Legjobb Monológ 2022"],
    cuclis: ["Határhelyzet"],
  },
  {
    name: "Tóth Bence",
    image: "https://avatar.iran.liara.run/public/48",
    performances: ["Fénytörés", "Hármas Átjáró"],
    works: ["Mellékszerep a 'Tér és Idő'-ben"],
    awards: ["Színészi Kiválóság Díj"],
    cuclis: ["Ütközéspont"],
  },
  {
    name: "Boros Ági",
    image: "https://avatar.iran.liara.run/public/79",
    performances: ["Szálak", "Másik Oldal"],
    works: ["Dramaturgiai kísérleti darab: 'Forma Nélkül'"],
    awards: ["CUCLI Kísérleti Díj"],
    cuclis: ["Nem Nevezhető"],
  },
  {
    name: "Major Gergő",
    image: "https://avatar.iran.liara.run/public/18",
    performances: ["Reflex", "Hangpróba"],
    works: ["CUCLI: 'Hangtalan Határ' egyedi megformálása"],
    awards: ["Kritikusok díja – Legjobb mozgás"],
    cuclis: ["Szöveg Nélküli Érintés"],
  },
  {
    name: "Kovács Kata",
    image: "https://avatar.iran.liara.run/public/84",
    performances: ["Ködfal", "Zárt Kör"],
    works: ["Rendezőként is közreműködött a 'Csoport'-ban"],
    awards: ["CUCLI Közreműködő díj"],
    cuclis: ["Küszöb"],
  },
  {
    name: "Szabó Marci",
    image: "https://avatar.iran.liara.run/public/45",
    performances: ["Töredékek", "Napfogyatkozás"],
    works: ["Rádiójáték – 'Visszhang a Fényben'"],
    awards: ["Rádió Dráma Díj"],
    cuclis: ["Hangalatti"],
  },
  {
    name: "Farkas Andi",
    image: "https://via.placeholder.com/150",
    performances: ["Súrlódások", "Kettős Tudat"],
    works: ["Improvizációs mestermunka a 'Határozatlanban'"],
    awards: ["CUCLI Közönségdíj 2023"],
    cuclis: ["Árnyék-fény"],
  },
  {
    name: "Juhász Patrik",
    image: "https://avatar.iran.liara.run/public/40",
    performances: ["Fáziseltolás", "Kettő az Egyben"],
    works: ["CUCLI: 'Újraírva' egyik főszereplője"],
    awards: ["Legjobb Fiatal Tehetség"],
    cuclis: ["Refrén"],
  },
];

export default function ActorSelector({
  selectedActors = [],
  setSelectedActors,
}) {
  const [modalActor, setModalActor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isSelected = (actor) =>
    selectedActors.some((a) => a.name === actor.name);

  const toggleActor = (actor) => {
    const alreadySelected = isSelected(actor);
    if (alreadySelected) {
      setSelectedActors(selectedActors.filter((a) => a.name !== actor.name));
    } else {
      setSelectedActors([...selectedActors, actor]);
    }
  };

  const handleOpenModal = (actor) => {
    setModalActor(actor);
    setIsModalOpen(true);
  };

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Válassz színészeket
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {actors.map((actor, index) => (
          <button
            key={index}
            onClick={() => handleOpenModal(actor)}
            className={`w-36 p-3 rounded-xl border text-center transition ${
              isSelected(actor)
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-black"
            }`}
          >
            {actor.name}
          </button>
        ))}
      </div>

      {modalActor && (
        <PersonModal
          person={modalActor}
          isOpen={isModalOpen}
          isSelected={isSelected(modalActor)}
          onClose={() => setIsModalOpen(false)}
          onSelect={() => {
            toggleActor(modalActor);
            setIsModalOpen(false);
          }}
        />
      )}
    </section>
  );
}
