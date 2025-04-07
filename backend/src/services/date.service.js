import prisma from "../models/prisma-client.js";

const listAll = async () => {
  const allDates = await prisma.availableDate.findMany();
  return allDates;
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
