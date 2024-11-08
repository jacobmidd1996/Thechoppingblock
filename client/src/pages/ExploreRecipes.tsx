import React, { useState } from "react";
import { fetchRecipes } from "../api/userAPI";
import SearchBar from "../components/searchbar";
import { FavoriteData } from "../interfaces/FavoriteData" ;

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
      <div>
        {recipes.map((hit, index) => (
  <h3 key={index}>{hit.recipe.label}</h3>
  // <p>{hit.recipe.ingredients.map}</p>
))}
            {/* <img
              src={recipe.recipe.image}
              alt={recipe.recipe.label}
              style={{ width: "200px" }}
            /> */}
            {/* <p>{recipe.userId}</p> */}
          </div>
      </div>
  );
};

export default ExploreRecipes;
