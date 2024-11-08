import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
<<<<<<< HEAD
import { UserFactory } from "./User.js";
import { RecipeFactory } from "./Recipe.js";
import { FavoriteFactory } from "./Favorite.js";
=======
import { UserFactory } from "./Users";
import { RecipeFactory } from "./Recipe";
import { FavoriteFactory } from "./Favorite";
>>>>>>> 5eaafe18684da342371e6a6dbc0f97835572ed61

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

const User = UserFactory(sequelize);
const Recipe = RecipeFactory(sequelize);
const Favorite = FavoriteFactory(sequelize);

User.hasMany(Recipe, { foreignKey: "assignedUserId" });
Recipe.belongsTo(User, { foreignKey: "assignedUserId", as: "assignedUser" });
Favorite.belongsTo(User, { foreignKey: "assignedUserId", as: "assignedUser" });

export { sequelize, User, Recipe, Favorite };
