import React, { useState } from "react";
import "../../main.css";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe = {
      name,
      ingredients: ingredients.split(",").map((item) => item.trim()), 
      instructions: instructions.split(".").map((item) => item.trim()), 
      calories: parseInt(calories, 10),
    };

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        alert("Recipe added successfully!");
        setName("");
        setIngredients("");
        setInstructions("");
        setCalories("");
      } else {
        console.error("Failed to add recipe.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <h1>Welcome to the Recipe App</h1>
      <p>Find and save your favorite recipes here!</p>
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="post-container">
        <label>
          Recipe Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Ingredients:
          <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </label>
        <label>
          Instructions:
          <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        </label>
        <label>
          Calories:
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
        </label>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default Home;

