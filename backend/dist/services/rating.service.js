import prisma from "../models/prisma-client.js";
const create = async (userId, performanceId, value) => {
  const rating = await prisma.rating.create({
    data: {
      userId,
      performanceId,
      value
    }
  });
  return rating;
};
const listall = async () => {
  const allRatings = await prisma.rating.findMany();
  return allRatings;
};
const getById = async id => {
  const ratingById = await prisma.rating.findUnique({
    where: {
      id
    }
  });
  return ratingById;
};
const destroy = async id => {
  const destroyedRatingById = await prisma.rating.delete({
    where: {
      id
    }
  });
  return destroyedRatingById;
};
const beenRated = async (userId, performanceId) => {
  const existing = await prisma.rating.findFirst({
    where: {
      userId,
      performanceId
    }
  });
  return !!existing;
};
export default {
  create,
  listall,
  getById,
  destroy,
  beenRated
};