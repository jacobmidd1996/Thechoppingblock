// delete before push
// const EDAMAM_URL = "https://api.edamam.com/api/recipes/v2?type=public";
// const EDAMAM_KEY = "28eac20e6daed0094f81025de5ab31f3";
// const EDAMAM_ID = "06bde0fe";
// const NUTRITIONIX_URL = "https://trackapi.nutritionix.com/v2/natural/nutrients";
// const NUTRITIONIX_KEY = "f2508c42d076fa0b1c8794b5e1b16aff";
// const NUTRITIONIX_ID = "12e03b7c";

const fetchRecipes = async (query: string) => {
  try {
    const edamamUrl = import.meta.env.VITE_EDAMAM_URL;
    const edamamKey = import.meta.env.VITE_EDAMAM_KEY;
    const edamamId = import.meta.env.VITE_EDAMAM_ID;
    // const edamamUrl = EDAMAM_URL;
    // const edamamKey = EDAMAM_KEY;
    // const edamamId = EDAMAM_ID;
    console.log(edamamUrl, edamamKey, edamamId);
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
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error fetching recipes:", err);
    return null;
  }
};

const fetchNutrients = async (query: string) => {
  try {
    const nutritionixUrl = import.meta.env.VITE_NUTRITIONIX_URL;
    const nutritionixKey = import.meta.env.VITE_NUTRITIONIX_KEY;
    const nutritionixId = import.meta.env.VITE_NUTRITIONIX_ID;
    // const nutritionixUrl = NUTRITIONIX_URL;
    // const nutritionixKey = NUTRITIONIX_KEY;
    // const nutritionixId = NUTRITIONIX_ID;

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

    const exData = data.foods[0];

    return exData;
  } catch (err) {
    console.error("Error fetching nutrients:", err);
    return null;
  }
};

export { fetchRecipes, fetchNutrients };
