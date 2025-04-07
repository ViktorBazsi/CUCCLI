import { useEffect, useState } from "react";
import personService from "../services/person.service";
import WriterSelector from "./WriterSelector";
import ActorSelector from "./ActorSelector";
import DirectorSelector from "./DirectorSelector";

export default function PersonSelector({
  dateId,
  selectedWriters,
  setSelectedWriters,
  selectedActors,
  setSelectedActors,
  selectedDirectors,
  setSelectedDirectors,
}) {
  const [availablePeople, setAvailablePeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dateId) return;
    setLoading(true);

    personService
      .listPeopleByDate(dateId)
      .then((data) => {
        setAvailablePeople(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hiba a személyek lekérésekor:", err);
        setLoading(false);
      });
  }, [dateId]);

  const writers = availablePeople.filter((p) => p.roles.includes("WRITER"));
  const actors = availablePeople.filter((p) => p.roles.includes("ACTOR"));
  const directors = availablePeople.filter((p) => p.roles.includes("DIRECTOR"));

  if (loading) {
    return <p className="text-center text-gray-500">Betöltés...</p>;
  }

  return (
    <>
      {writers.length > 0 ? (
        <WriterSelector
          people={writers}
          selectedWriters={selectedWriters}
          setSelectedWriters={setSelectedWriters}
        />
      ) : (
        <p className="text-center text-black text-lg italic">
          Az adott időpontban nem érhető el egyetlen író sem.
        </p>
      )}

      {actors.length > 0 ? (
        <ActorSelector
          people={actors}
          selectedActors={selectedActors}
          setSelectedActors={setSelectedActors}
        />
      ) : (
        <p className="text-center text-black text-lg italic">
          Az adott időpontban nem érhető el egyetlen színész sem.
        </p>
      )}

      {directors.length > 0 ? (
        <DirectorSelector
          people={directors}
          selectedDirectors={selectedDirectors}
          setSelectedDirectors={setSelectedDirectors}
        />
      ) : (
        <p className="text-center text-black text-lg italic">
          Az adott időpontban nem érhető el egyetlen rendező sem.
        </p>
      )}
    </>
  );
}
