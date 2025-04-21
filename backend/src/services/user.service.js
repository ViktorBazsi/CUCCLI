import prisma from "../models/prisma-client.js";
import HttpError from "../utils/HttpError.js";
import bcrypt from "bcrypt";

const create = async ({
  username,
  firstName,
  lastName,
  email,
  password,
  phoneNum,
}) => {
  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (existingEmail) {
    throw new HttpError("Ezzel az email címmel már regisztráltak", 400);
  }
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUsername) {
    throw new HttpError("Ezzel a felhasználónévvel már regisztráltak", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = await prisma.user.create({
    data: {
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNum,
    },
  });
  return newUser;
};

const listAll = async () => {
  const allUsers = await prisma.user.findMany({
    include: {
      performances: true,
      likes: true,
      carts: true,
      feedbacks: true,
      ratings: true,
    },
  });
  return allUsers;
};

const getById = async (id) => {
  const userById = await prisma.user.findUnique(id);
  return userById;
};

const update = async (id, data) => {
  const updateData = { ...data };

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 5);
  }

  return prisma.user.update({
    where: { id },
    data: updateData,
  });
};

const updateRole = async (id, role) => {
  return prisma.user.update({
    where: { id },
    data: { role },
  });
};

const remove = async (id) => {
  return prisma.user.delete({
    where: { id },
  });
};

export default {
  create,
  listAll,
  getById,
  update,
  updateRole,
  remove,
};
