import express from "express";
import type { Request, Response } from "express";
import { Recipe } from "../../models/index.js";

const router = express.Router();

// GET /users - Get all users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id - Get a user by id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /users - Create a new user
router.post("/", async (req: Request, res: Response) => {
  const { recipeName, recipeInst } = req.body;
  try {
    const newRecipe = await Recipe.create({ recipeName, recipeInst });
    res.status(201).json(newRecipe);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /users/:id - future development
// router.put("/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { username, password } = req.body;
//   try {
//     const user = await User.findByPk(id);
//     if (user) {
//       user.username = username;
//       user.password = password;
//       await user.save();
//       res.json(user);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// });

// DELETE /users/:id - Delete a user by id
router.delete("/:id", async (req: Request, res: Response) => {
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
