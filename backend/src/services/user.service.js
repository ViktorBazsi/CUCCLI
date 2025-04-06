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

export default {
  create,
};
