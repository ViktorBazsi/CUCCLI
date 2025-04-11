import prisma from "../models/prisma-client.js";

const listAll = async (filter) => {
  const where = {};

  if (filter?.possible === "true") {
    const today = new Date();
    const cutoff = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );
    cutoff.setUTCDate(cutoff.getUTCDate() + 5);

    where.date = {
      gt: cutoff, // Csak a mai nap + 5 napnál későbbi dátumok
    };
  }

  const dates = await prisma.availableDate.findMany({
    where,
    orderBy: { date: "asc" }, // csak hogy rendezett legyen
  });

  return dates;
};

const getById = async (id) => {
  const getById = await prisma.availableDate.findUnique({
    where: { id },
  });
  return getById;
};

export default {
  listAll,
  getById,
};
