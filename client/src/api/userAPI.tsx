const fetchRecipes = async (query: string) => {
  try {
    const edamamUrl = import.meta.env.REACT_APP_EDAMAM_URL;
    const edamamKey = import.meta.env.REACT_APP_EDAMAM_KEY;
    const edamamId = import.meta.env.REACT_APP_EDAMAM_ID;

    if (!edamamUrl || !edamamKey || !edamamId) {
      console.error("EDAMAM API URL, KEY, or ID is missing.");
      return null;
    }

    const response = await fetch(
      `${edamamUrl}&q=${query}&app_id=${edamamId}&app_key=${edamamKey}`,
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
  }
};

const fetchNutrients = async (query: string) => {
  try {
    const nutritionixUrl = import.meta.env.REACT_APP_NUTRITIONIX_URL;
    const nutritionixKey = import.meta.env.REACT_APP_NUTRITIONIX_KEY;
    const nutritionixId = import.meta.env.REACT_APP_NUTRITIONIX_ID;

    if (!nutritionixUrl || !nutritionixKey || !nutritionixId) {
      throw new Error(
        "Missing required environment variables: Nutritionix API URL, Key, or ID"
      );
    }

    const response = await fetch(nutritionixUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": nutritionixId,
        "x-app-key": nutritionixKey,
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

export { fetchRecipes, fetchNutrients };
