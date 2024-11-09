import React, { useEffect, useState } from "react";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  calories: number;
}

const Favorites: React.FC = () => {
  const [myPosts, setMyPosts] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await fetch("/api/my-recipes");
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

    fetchMyPosts();
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      <h2>My Posts</h2>
      <div className="favorites-container">
        {myPosts.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
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

