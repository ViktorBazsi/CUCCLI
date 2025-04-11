import { PrismaClient } from "@prisma/client";
import data from "./seedDates.json" assert { type: "json" };

const prisma = new PrismaClient();

// Segédfüggvény: csak év-hónap-nap rész konvertálása UTC-re
function toDayOnlyDate(dateString) {
  const date = new Date(dateString);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

async function main() {
  // Csak az availableDate tömb seedelése
  await prisma.availableDate.createMany({
    data: data.availableDates.map((d) => ({
      id: d.id,
      date: toDayOnlyDate(d.date),
    })),
    skipDuplicates: true,
  });

  console.log("📅 Csak az availableDate rekordok lettek seedelve!");
}

main()
  .catch((e) => {
    console.error("❌ Hiba a dátum seedelés közben:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
