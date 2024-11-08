
import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './User.js';  
import { Recipe } from './Recipe.js';  

interface FavoriteAttributes {
  id: number;
  userId: number;
  recipeId: number;
  createdAt?: Date;
  updatedAt?: Date;
}


interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, 'id'> {}


class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> implements FavoriteAttributes {
  public id!: number;
  public userId!: number;
  public recipeId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
          model: User, 
          key: 'id',
        },
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Recipe, 
          key: 'id',
        },
      },
    },
    {
      sequelize, 
      modelName: 'Favorite',
      tableName: 'favorites',  
      timestamps: true, 
    }
  );

  Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Favorite.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

  return Favorite;
}

export async function addFavorite(userId: number, recipeId: number): Promise<Favorite | null> {
  try {
    const favorite = await Favorite.create({ userId, recipeId });
    return favorite;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return null;
  }
}

export async function removeFavorite(userId: number, recipeId: number): Promise<boolean> {
  try {
    const result = await Favorite.destroy({ where: { userId, recipeId } });
    return result > 0;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
}

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
