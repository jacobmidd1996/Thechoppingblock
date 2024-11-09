import React, { useState, useEffect } from "react";
import { fetchNutrients, fetchRecipes } from "../api/userAPI";
import SearchBar from "../components/searchbar";

import { FavoriteData } from "../interfaces/FavoriteData";
import { FoodItem } from "../interfaces/NutrientData";
// import Grid from '@mui/material/Grid2';
// comment this in if you want grid mary suggests
// npm install @mui/material @emotion/react @emotion/styled
//run this install command in client directory :)

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
      // console.log(data.hits);
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
      // console.log(data2);
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
  useEffect(() => {
    console.log(nutrients);
  }, [nutrients]);
  return (
    <div>
      <h2>Explore Recipes</h2>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* <Grid container spacing={2}></Grid> */}
      {/* turn the below div into a grid container from up above (see links in slack) - <3 jacob/mary */}
      <div className="explore-container">
        {/*  <Grid size={4}> */}
        {/* turn the below div into a grid item from up above (see links in slack) - <3 jacob/mary */}
        {recipes.map((hit, index) => (
          <div key={index} className="recipe-card">
            <h3>{hit.recipe.label}</h3>
            <img src={hit.recipe.image} alt={hit.recipe.label} />
            <p>Ingredients: {hit.recipe.ingredientLines.join(", ")}</p>
            <p>Calories: {Math.round(hit.recipe.calories)}</p>
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
            {/* Add more nutrient fields as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreRecipes;
