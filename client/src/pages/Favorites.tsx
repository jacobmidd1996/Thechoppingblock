import React, { useEffect, useState } from "react";

interface Recipe {
  recipeId: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  calories: number;
}

const Favorites: React.FC = () => {
  const [myFavorites, setMyFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchMyFavorites = async () => {
      try {
        const userId = 1; // Replace this with the actual logged-in user ID
        const response = await fetch(`/api/favorites?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setMyFavorites(data);
        } else {
          console.error("Failed to fetch favorites.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMyFavorites();
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      <h2>My Favorite Recipes</h2>
      <div className="favorites-container">
        {myFavorites.map((recipe) => (
          <div key={recipe.recipeId} className="recipe-card">
            <h3>{recipe.name}</h3>
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
            <p>Instructions: {recipe.instructions.join(". ")}</p>
            <p>Calories: {recipe.calories}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
