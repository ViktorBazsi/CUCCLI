import prisma from "./src/models/prisma-client.js";

const resetDb = async () => {
  try {
    console.log("🚨 Adatok törlése indul...");

    // Kapcsolótáblák törlése először
    await prisma.performanceWriter.deleteMany();
    await prisma.performanceActor.deleteMany();
    await prisma.performanceDirector.deleteMany();

    // Függő entitások törlése
    await prisma.like.deleteMany();
    await prisma.feedback.deleteMany();

    await prisma.performance.deleteMany();
    await prisma.availableDate.deleteMany();
    await prisma.cart.deleteMany();

    await prisma.personAvailability.deleteMany();
    await prisma.person.deleteMany();

    await prisma.user.deleteMany();

    console.log("✅ Az adatbázis sikeresen kiürítve.");
  } catch (error) {
    console.error("❌ Hiba az adatbázis ürítése közben:", error);
  } finally {
    await prisma.$disconnect();
  }
};

resetDb();
