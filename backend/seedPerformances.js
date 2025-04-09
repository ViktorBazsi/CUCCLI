import { PrismaClient } from "@prisma/client";
import performances from "./seedPerformances.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  for (const perf of performances) {
    try {
      await prisma.performance.create({
        data: {
          id: perf.id,
          title: perf.title,
          recordingRequest: perf.recordingRequest ?? false,
          archived: perf.archived ?? false,
          imageUrl: perf.imageUrl ?? null,
          quote: perf.quote ?? null,
          status: perf.status ?? "CREATED",

          // Opcionális kapcsolatok (null is lehet!)
          userId: perf.userId ?? null,
          availableDateId: perf.availableDateId ?? null,
          cartId: perf.cartId ?? null,
        },
      });
      console.log(`✅ Beszúrva: ${perf.title}`);
    } catch (error) {
      console.error(`❌ Hiba: ${perf.title}`, error.message);
    }
  }

  console.log("🎉 Seed sikeresen lefutott!");
}

main()
  .catch((e) => {
    console.error("❌ Kritikus hiba a seed során:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
