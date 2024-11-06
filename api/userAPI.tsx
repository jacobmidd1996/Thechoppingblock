const fetchRecipes = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_EDAMAM_URL}&app_id=06bde0fe&app_key=${process.env.REACT_APP_EDAMAM_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching recipes:", err);
    return null;
  git checkoput 
};

const fetchNutrients = async (query: string) => {
  try {
    const response = await fetch(process.env.REACT_APP_NUTRITIONIX_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": "12e03b7c",
        "x-app-key": process.env.REACT_APP_NUTRITIONIX_KEY as string,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch nutrients");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching nutrients:", err);
    return null;
  }
};
