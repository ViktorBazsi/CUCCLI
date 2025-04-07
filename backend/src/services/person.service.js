import prisma from "../models/prisma-client.js";

const listAll = async (filter = {}) => {
  return await prisma.person.findMany({
    ...filter,
    include: {
      performancesDirected: true,
      performancesWritten: true,
      performancesPlayed: true,
      availability: true, // kapcsolódó elérhetőségek
    },
  });
};

export default {
  listAll,
};
