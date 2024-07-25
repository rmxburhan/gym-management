import dayjs from "dayjs";
import User, { IUser } from "../models/user.model";

export const getTrainers = async (): Promise<IUser[] | null> =>
  await User.find({ role: "trainer", deletedAt: undefined }).sort({
    createdAt: -1,
  });

export const deleteTrainer = async (id: string): Promise<IUser> => {
  const user = await User.findOne({
    _id: id,
    deletedAt: undefined,
    role: "trainer",
  });

  if (!user) {
    const error = new Error("Delete trainer failed. Id not found");
    error.name = "NotFound";
    throw error;
  }

  user.deletedAt = dayjs().toDate();
  return await user.save();
};

export const addTrainer = async (
  name: string,
  email: string,
  password: string,
  addresses: any,
  bank: string,
  bankNumber: number,
  identificationNumber: string,
  phoneNumber: string,
  profile?: Express.Multer.File
) => {
  const exist = await User.findOne({ email, role: "trainer" });
  if (exist) {
    const error = new Error("Email already taken. use another email");
    throw error;
  }

  const trainer = new User({
    name,
    email,
    password,
    role: "trainer",
    trainerDetail: {
      bank,
      bankNumber,
      address: addresses,
      identificationNumber,
      phoneNumber,
    },
  });

  if (profile) {
    trainer.profile = profile.path;
  }

  return await trainer.save();
};

export const updateTrainer = async (
  id: string,
  name: string,
  email: string,
  password: string,
  addresses: any,
  bank: string,
  bankNumber: number,
  phoneNumber: string,
  identificationNumber: string,
  profile?: Express.Multer.File
) => {
  let trainer = await User.findOne({ role: "trainer", _id: id });
  if (!trainer) {
    const error = new Error("Update trainer failed. Id not found");
    error.name = "NotFound";
    throw error;
  }

  if (name) trainer.name = name;
  if (email) trainer.email = email;
  if (password) trainer.password = password;
  if (addresses) trainer.trainerDetail!.address = addresses;
  if (bank) trainer.trainerDetail!.bank = bank;
  if (bankNumber) trainer.trainerDetail!.bankNumber = bankNumber;
  if (phoneNumber) trainer.trainerDetail!.phoneNumber = phoneNumber;
  if (identificationNumber)
    trainer.trainerDetail!.identificationNumber = identificationNumber;

  return await trainer.save();
};

export default {
  getTrainers,
  deleteTrainer,
  addTrainer,
  updateTrainer,
};