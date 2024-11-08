
import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

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

interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

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
        type: DataTypes.TEXT, 
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      prepTime: {
        type: DataTypes.INTEGER,  
        allowNull: false,
      },
      cookTime: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
      servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM('Easy', 'Medium', 'Hard'), 
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
