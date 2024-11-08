// models/Recipe.ts

import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define the attributes for the Recipe model
interface RecipeAttributes {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdAt?: Date;
  updatedAt?: Date;
}

// Optional fields for creating a new Recipe
interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

// Define the Recipe model class
class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
  public id!: number;
  public title!: string;
  public ingredients!: string;
  public instructions!: string;
  public prepTime!: number;
  public cookTime!: number;
  public servings!: number;
  public difficulty!: 'Easy' | 'Medium' | 'Hard';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// RecipeFactory function to initialize the model
export function RecipeFactory(sequelize: Sequelize): typeof Recipe {
  Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.TEXT,  // Use TEXT for longer strings
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      prepTime: {
        type: DataTypes.INTEGER,  // Time in minutes
        allowNull: false,
      },
      cookTime: {
        type: DataTypes.INTEGER,  // Time in minutes
        allowNull: false,
      },
      servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),  // Only allow these values
        allowNull: false,
      },
    },
    {
      sequelize,  // Passing the connection instance
      modelName: 'Recipe',
      tableName: 'recipes',  // Table name in the database
      timestamps: true,  // Enable timestamps for createdAt and updatedAt
    }
  );

  return Recipe;
}

export { Recipe };

// Example usage of helper functions

// Create a new recipe
export async function createRecipe(data: RecipeCreationAttributes): Promise<Recipe | null> {
  try {
    const recipe = await Recipe.create(data);
    return recipe;
  } catch (error) {
    console.error('Error creating recipe:', error);
    return null;
  }
}

// Find a recipe by ID
export async function getRecipeById(id: number): Promise<Recipe | null> {
  try {
    const recipe = await Recipe.findByPk(id);
    return recipe;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
}

// Find all recipes
export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const recipes = await Recipe.findAll();
    return recipes;
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    return [];
  }
}
