import prisma from "../models/prisma-client.js";
const create = async (userId, performanceId, message) => {
  const feedback = await prisma.feedback.create({
    data: {
      userId,
      performanceId,
      message
    }
  });
  return feedback;
};
const listall = async () => {
  const allFeedback = await prisma.feedback.findMany();
  return allFeedback;
};
const getById = async id => {
  const feedbackById = await prisma.feedback.findUnique({
    where: {
      id
    }
  });
  return feedbackById;
};
const destroy = async id => {
  const destroyedFeedbackById = await prisma.feedback.delete({
    where: {
      id
    }
  });
  return destroyedFeedbackById;
};
const beenFeedbacked = async (userId, performanceId) => {
  const existing = await prisma.feedback.findFirst({
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
  beenFeedbacked
};