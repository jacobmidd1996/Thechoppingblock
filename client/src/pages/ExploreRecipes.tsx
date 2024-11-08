import React, { useState } from "react";
import { fetchRecipes } from "../api/userAPI";
import SearchBar from "../components/searchbar";
import { FavoriteData } from "../interfaces/FavoriteData" ;
import "../../main.css";

const ExploreRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<FavoriteData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecipes(query);
      console.log(data.hits);
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
  };

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreRecipes;
