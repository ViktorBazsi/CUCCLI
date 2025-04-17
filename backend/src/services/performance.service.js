import prisma from "../models/prisma-client.js";

const listArchived = async (filter = {}) => {
  const allArchived = await prisma.performance.findMany({
    ...filter,
    include: {
      writers: true,
      actors: true,
      directors: true,
      likes: true,
      feedbacks: true,
      ratings: true,
    },
  });
  return allArchived;
};

export default {
  listArchived,
};
