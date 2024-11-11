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
  const [myPosts, setMyPosts] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = 1; 
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

    const fetchMyPosts = async () => {
      try {
        const response = await fetch(`/api/my-recipes`);
        if (response.ok) {
          const data = await response.json();
          setMyPosts(data);
        } else {
          console.error("Failed to fetch my posts.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFavorites();
    fetchMyPosts();
  }, []);

  return (
    <div>
      <h1>Favorites</h1>

      <h2>My Posts</h2>
      <div className="my-posts-container">
        {myPosts.map((post) => (
          <div key={post.recipeId} className="recipe-card">
            <h3>{post.name}</h3>
            <p>Ingredients: {post.ingredients.join(", ")}</p>
            <p>Instructions: {post.instructions.join(". ")}</p>
            <p>Calories: {post.calories}</p>
          </div>
        ))}
      </div>

      <h2>Favorite Recipes</h2>
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

