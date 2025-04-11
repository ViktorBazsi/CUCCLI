// seedPersonAvailability.js
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

function toDayOnlyDate(date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

async function main() {
  const allPersons = await prisma.person.findMany();
  const allDates = await prisma.availableDate.findMany();

  if (allPersons.length === 0 || allDates.length === 0) {
    console.log("❌ Nincs elérhető person vagy date az adatbázisban.");
    return;
  }

  const personAvailabilities = [];

  for (const person of allPersons) {
    // Adjunk hozzá minden személyhez 2 random dátumot
    const shuffledDates = [...allDates]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    for (const date of shuffledDates) {
      personAvailabilities.push({
        id: uuidv4(),
        personId: person.id,
        date: toDayOnlyDate(new Date(date.date)),
      });
    }
  }

  await prisma.personAvailability.createMany({
    data: personAvailabilities,
    skipDuplicates: true,
  });

  console.log(
    `✅ Sikeresen generáltunk ${personAvailabilities.length} elérhetőséget!`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
