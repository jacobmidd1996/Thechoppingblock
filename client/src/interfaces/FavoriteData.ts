// Define the interface for each item in the hits array
export interface FavoriteData {
  recipe: Recipe;
}

// Define the main recipe interface
export interface Recipe {
  label: string;
  image: string;
  calories: number;
  cautions: string[];
  co2EmissionsClass: string;
  cuisineType: string[];
  dietLabels: string[];
  digest: Digest[];
  dishType: string[];
  healthLabels: string[];
  images: Images;
  ingredientLines: string[];
  ingredients: Ingredient[];
}

// Define the interface for each image size
export interface Images {
  THUMBNAIL: ImageDetail;
  SMALL: ImageDetail;
  REGULAR: ImageDetail;
  LARGE: ImageDetail;
}

// Define the interface for each image object
export interface ImageDetail {
  url: string;
  width: number;
  height: number;
}

// Define the interface for each ingredient
export interface Ingredient {
  text: string;
  weight: number;
}

// Define the interface for each item in the digest array
export interface Digest {
  label: string;
  tag: string;
  schemaOrgTag: string | null;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
}

