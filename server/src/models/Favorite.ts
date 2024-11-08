// models/Favorite.ts

import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './Users';  // Import User model
import { Recipe } from './Recipe';  // Import Recipe model

// Define the attributes for the Favorite model
interface FavoriteAttributes {
  id: number;
  userId: number;
  recipeId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Fields for creating a new Favorite
interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, 'id'> {}

// Define the Favorite model class
class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> implements FavoriteAttributes {
  public id!: number;
  public userId!: number;
  public recipeId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// FavoriteFactory function to initialize the model
export function FavoriteFactory(sequelize: Sequelize): typeof Favorite {
  Favorite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,  // Reference to User model
          key: 'id',
        },
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Recipe,  // Reference to Recipe model
          key: 'id',
        },
      },
    },
    {
      sequelize,  // Passing the connection instance
      modelName: 'Favorite',
      tableName: 'favorites',  // Table name in the database
      timestamps: true,  // Enable timestamps for createdAt and updatedAt
    }
  );

  // Define relationships
  Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Favorite.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

  return Favorite;
}

// Helper functions

// Add a favorite recipe for a user
export async function addFavorite(userId: number, recipeId: number): Promise<Favorite | null> {
  try {
    const favorite = await Favorite.create({ userId, recipeId });
    return favorite;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return null;
  }
}

// Remove a favorite recipe for a user
export async function removeFavorite(userId: number, recipeId: number): Promise<boolean> {
  try {
    const result = await Favorite.destroy({ where: { userId, recipeId } });
    return result > 0;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
}

// Check if a recipe is a favorite for a user
export async function isFavorite(userId: number, recipeId: number): Promise<boolean> {
  try {
    const favorite = await Favorite.findOne({ where: { userId, recipeId } });
    return !!favorite;
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
}

export { Favorite };
