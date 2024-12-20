import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
interface UserAttributes {
  userId: number;
  username: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "userId"> {}

interface UserCreationAttributes extends Optional<UserAttributes, "userId"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public userId!: number;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  // Hash the password before saving the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          await user.setPassword(user.password);
        },
      },
    }
  );
  return User;
}
