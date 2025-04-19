import prisma from "../models/prisma-client.js";
const likePerformance = async (userId, performanceId) => {
  return await prisma.like.create({
    data: {
      userId,
      performanceId
    }
  });
};
const dislikePerformance = async (userId, performanceId) => {
  return await prisma.like.delete({
    where: {
      userId_performanceId: {
        userId,
        performanceId
      }
    }
  });
};
const hasLiked = async (userId, performanceId) => {
  const existing = await prisma.like.findUnique({
    where: {
      userId_performanceId: {
        userId,
        performanceId
      }
    }
  });
  return !!existing;
};
export default {
  likePerformance,
  dislikePerformance,
  hasLiked
};