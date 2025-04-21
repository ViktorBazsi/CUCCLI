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

const getById = async (id) => {
  return await prisma.person.findUnique({
    where: { id },
    include: {
      performancesDirected: true,
      performancesWritten: true,
      performancesPlayed: true,
      availability: true, // kapcsolódó elérhetőségek
    },
  });
};

const findByName = async (name) => {
  return await prisma.person.findFirst({
    where: { name },
  });
};

// const create = async (data) => {
//   return await prisma.person.create({
//     data,
//   });
// };

const create = async (data) => {
  return await prisma.person.create({ data });
};

// const update = async (id, data) => {
//   return await prisma.person.update({
//     where: { id },
//     data,
//   });
// };

const update = async (id, data) => {
  return await prisma.person.update({
    where: { id },
    data,
  });
};

const destroy = async (id) => {
  return await prisma.person.delete({
    where: { id },
  });
};

const addAvailability = async (personId, date) => {
  return await prisma.personAvailability.create({
    data: {
      personId,
      date: new Date(date),
    },
  });
};

const updateAvailability = async (availabilityId, date) => {
  return await prisma.personAvailability.update({
    where: { id: availabilityId },
    data: { date: new Date(date) },
  });
};

const removeAvailability = async (availabilityId) => {
  return await prisma.personAvailability.delete({
    where: { id: availabilityId },
  });
};

export default {
  listAll,
  getById,
  findByName,
  create,
  update,
  destroy,
  addAvailability,
  updateAvailability,
  removeAvailability,
};
