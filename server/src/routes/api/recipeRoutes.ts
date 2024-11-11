import express from "express";
import type { Request, Response } from "express";
import { Recipe } from "../../models/Recipe.js";
import { Favorite } from "../../models/Favorite.js";
import { authenticateToken } from "../../middleware/auth.js";

const router = express.Router();

// GET /recipes - Get all recipes
router.get("/", async (_req: Request, res: Response) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /recipes/:id - Get a recipe by id
router.get("/:id", async (req: Request, res: Response) => {
  const { recipeId } = req.params;
  try {
    const recipe = await Recipe.findByPk(recipeId); 
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /recipes - Create a new recipe
router.post("/", async (req: Request, res: Response) => {
  const {
    label,
    image,
    calories,
    ingredientLines,
    instructions,
    cuisineType,
    dietLabels,
    healthLabels,
    servings,
    cookTime
  } = req.body;

  try {
    const newRecipe = await Recipe.create({
      label,
      image,
      calories,
      ingredientLines,
      instructions,
      cuisineType,
      dietLabels,
      healthLabels,
      servings,
      cookTime
    });
    res.status(201).json(newRecipe);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// POST /favorites - Mark a recipe as favorite for a specific user
router.post("/favorites", authenticateToken, async (req: Request, res: Response) => {
  const { userId, recipeId } = req.body;
  if (req.user && req.user.id !== userId) {
    return res.status(403).json({ message: "Forbidden: User not authorized" });
  }

  try {
    const [favorite, created] = await Favorite.findOrCreate({
      where: { userId, recipeId },
      defaults: { userId, recipeId, favorited: true },
    });

    if (!created) {
      favorite.favorited = true; 
      await favorite.save();
    }

    return res.status(200).json({ message: "Recipe favorited successfully!" });

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// GET /favorites - Get all favorited recipes for a user
router.get("/favorites", authenticateToken, async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const favorites = await Favorite.findAll({
      where: { userId: userId as string | undefined, favorited: true },
      include: [
        {
          model: Recipe,
          as: 'recipe',
          required: true
        }
      ]
    });

    const favoriteRecipes = favorites.map(fav => fav.recipe);
    res.json(favoriteRecipes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /my-recipes - Get user-created recipes
router.get("/favorites", authenticateToken, async (_req: Request, res: Response) => {
  try {
    const recipes = await Recipe.findAll({ where: { userCreated: true } });
    res.json(recipes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /recipes/:id - Delete a recipe by id
router.delete("/:id", authenticateToken, async (req: Request, res: Response) => {
  const { id } = req.params; 
  try {
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      await recipe.destroy();
      res.json({ message: "Recipe deleted" });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as recipeRouter };
