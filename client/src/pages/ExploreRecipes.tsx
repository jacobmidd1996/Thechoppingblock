import React, { useState, useEffect } from "react";
import { fetchNutrients, fetchRecipes } from "../api/userAPI";
import SearchBar from "../components/searchbar";

import { FavoriteData } from "../interfaces/FavoriteData";
import { FoodItem } from "../interfaces/NutrientData";

const ExploreRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<FavoriteData[]>([]);
  const [nutrients, setNutrients] = useState<FoodItem | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecipes(query);
      if (data) {
        setRecipes(data.hits);
      } else {
        setError("No recipes found.");
      }
    } catch (err) {
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
    try {
      const data2 = await fetchNutrients(query);
      if (data2) {
        setNutrients(data2);
      } else {
        setError("No nutrient info found.");
      }
    } catch (err) {
      setError("Failed to fetch nutrient info.");
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (userId: number, recipeId: number) => {
    try {
      const token = localStorage.getItem("authToken"); // Get token from localStorage or use your state management solution
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token here for JWT-based authentication
        },
        body: JSON.stringify({ userId, recipeId }),
      });
  
      if (response.ok) {
        alert("Recipe added to favorites!");
      } else {
        alert("Failed to add recipe to favorites.");
      }
    } catch (error) {
      alert("Error adding to favorites.");
    }
  };
  

  useEffect(() => {
    console.log(nutrients);
  }, [nutrients]);

  return (
    <div>
      <h2>Explore Recipes</h2>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="explore-container">
        {recipes.map((hit, index) => (
          <div key={index} className="recipe-card">
            <h3>{hit.recipe.label}</h3>
            <img src={hit.recipe.image} alt={hit.recipe.label} />
            <p>Ingredients: {hit.recipe.ingredientLines.join(", ")}</p>
            <p>Calories: {Math.round(hit.recipe.calories)}</p>
            <button onClick={() => handleFavorite(1, hit.recipe.recipeId)}>Add to Favorites</button>
          </div>
        ))}
        {nutrients && (
          <div>
            <h3>Nutrient Information</h3>
            <p>Food: {nutrients?.food_name}</p>
            <p>Calories: {nutrients?.nf_calories}</p>
            <p>Protein: {nutrients?.nf_protein}</p>
            <p>Cholesterol: {nutrients?.nf_cholesterol}</p>
            <p>Sodium: {nutrients?.nf_sodium}</p>
            <p>Total Carbohydrate: {nutrients?.nf_total_carbohydrate}</p>
            <p>Dietary Fiber: {nutrients?.nf_dietary_fiber}</p>
            <p>Sugars: {nutrients?.nf_sugars}</p>
            <img src={nutrients?.photo.thumb} alt={nutrients?.food_name}></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreRecipes;
