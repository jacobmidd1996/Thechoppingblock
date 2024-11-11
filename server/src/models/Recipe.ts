import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface RecipeAttributes {
  recipeId: number;
  label: string;
  image: string;
  calories: number;
  ingredientLines: string[];
  instructions: string;
  cuisineType: string[];
  dietLabels: string[];
  healthLabels: string[];
  servings: number;
  cookTime: number;
  userCreated?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'recipeId'> {}

class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
  public recipeId!: number;
  public label!: string;
  public image!: string;
  public calories!: number;
  public ingredientLines!: string[];
  public instructions!: string;
  public cuisineType!: string[];
  public dietLabels!: string[];
  public healthLabels!: string[];
  public servings!: number;
  public cookTime!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function RecipeFactory(sequelize: Sequelize): typeof Recipe {
  Recipe.init(
    {
      recipeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      calories: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      ingredientLines: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cuisineType: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      dietLabels: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      healthLabels: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cookTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userCreated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },      
    },
    {
      sequelize,
      modelName: 'Recipe',
      tableName: 'recipes',
      timestamps: true,
    }
  );

  return Recipe;
}

export { Recipe };
