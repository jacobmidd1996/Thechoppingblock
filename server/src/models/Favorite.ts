import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './User.js';  
import { Recipe } from './Recipe.js';  

interface FavoriteAttributes {
  id: number;
  userId: number;
  recipeId: number;
  createdAt?: Date;
  updatedAt?: Date;
  favorited: boolean;
  recipe?: Recipe;  
}

interface FavoriteCreationAttributes extends Optional<FavoriteAttributes, 'id'> {}

export class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> implements FavoriteAttributes {
  public id!: number;
  public userId!: number;
  public recipeId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public userCreated!: boolean;
  public favorited!: boolean;
  public recipe?: Recipe; 
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
      favorited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize, 
      modelName: 'Favorite',
      tableName: 'favorites',  
      timestamps: true, 
    }
  );

  // Define relationships between Favorite, User, and Recipe
  Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Favorite.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

  return Favorite
};