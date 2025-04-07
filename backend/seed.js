import { PrismaClient } from "@prisma/client";
import data from "./seed.json" assert { type: "json" };

const prisma = new PrismaClient();

function toDayOnlyDate(dateString) {
  const date = new Date(dateString);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

async function main() {
  // 1. Users
  await prisma.user.createMany({
    data: data.users,
    skipDuplicates: true,
  });

  // 2. Available Dates
  await prisma.availableDate.createMany({
    data: data.availableDates.map((d) => ({
      id: d.id,
      date: toDayOnlyDate(d.date),
    })),
    skipDuplicates: true,
  });

  // 3. Persons
  await prisma.person.createMany({
    data: data.persons.map((p) => ({
      id: p.id,
      name: p.name,
      imageUrl: p.imageUrl,
      bio: p.bio,
    })),
    skipDuplicates: true,
  });

  // 4. Person Roles
  for (const person of data.persons) {
    await prisma.person.update({
      where: { id: person.id },
      data: {
        roles: { set: person.roles },
      },
    });
  }

  // 5. Person Availability
  await prisma.personAvailability.createMany({
    data: data.personAvailabilities.map((pa) => ({
      id: pa.id,
      personId: pa.personId,
      date: toDayOnlyDate(pa.date),
    })),
    skipDuplicates: true,
  });

  // 6. Performances
  await prisma.performance.create({
    data: {
      id: data.performances[0].id,
      topic: data.performances[0].topic,
      recordingRequest: data.performances[0].recordingRequest,
      archived: data.performances[0].archived,
      status: data.performances[0].status,
      userId: data.performances[0].userId,
      availableDateId: data.performances[0].availableDateId,
    },
  });

  console.log("✅ Seed sikeresen lefutott (nap szintű dátumokkal)!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
