import React, { useState } from "react";
import { fetchRecipes } from "../api/userAPI";
import SearchBar from "../components/searchbar";
import { FavoriteData } from "../interfaces/favoritedata";

const ExploreRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<FavoriteData[]>([]);
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
  };

  return (
    <div>
      <h2>Explore Recipes</h2>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.recipe.label}</h3>
            <img
              src={recipe.recipe.image}
              alt={recipe.recipe.label}
              style={{ width: "200px" }}
            />
            <p>{recipe.recipe.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreRecipes;
