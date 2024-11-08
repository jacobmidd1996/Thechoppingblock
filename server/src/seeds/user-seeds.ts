import { User } from "../models/index.js";

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: "JollyGuru", password: "password" },
      {
        username: "SunnyScribe",
        password: "password",
      },
      {
        username: "RadiantComet",
        password: "password",
      },
    ],
    { individualHooks: true }
  );
};
