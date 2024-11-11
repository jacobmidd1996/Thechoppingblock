export interface FavoriteData {
  recipe: Recipe;
}

export interface Recipe {
  recipeId: number;
  label: string;
  image: string;
  calories: number;
  cautions?: string[];
  co2EmissionsClass?: string;
  cuisineType?: string[];
  dietLabels?: string[];
  digest: Digest[];
  dishType?: string[];
  healthLabels?: string[];
  images: Images;
  ingredientLines: string[];
  ingredients: Ingredient[];
}

export interface Images {
  THUMBNAIL: ImageDetail;
  SMALL: ImageDetail;
  REGULAR: ImageDetail;
  LARGE: ImageDetail;
}

export interface ImageDetail {
  url: string;
  width: number;
  height: number;
}

export interface Ingredient {
  text: string;
  weight: number;
}

export interface Digest {
  label: string;
  tag: string;
  schemaOrgTag: string | null;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
}
