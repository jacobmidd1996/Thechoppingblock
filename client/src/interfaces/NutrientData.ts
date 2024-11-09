export interface FoodItem {
  food_name: string;
  brand_name: string | null;
  serving_qty: number;
  serving_unit: string;
  serving_weight_grams: number;
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_potassium: number;
  nf_p: number;
  full_nutrients: Nutrient[];
  nix_brand_name: string | null;
  nix_brand_id: string | null;
  nix_item_name: string | null;
  nix_item_id: string | null;
  upc: string | null;
  consumed_at: string;
  metadata: Metadata;
  source: number;
  ndb_no: number;
  tags: Tags;
  alt_measures: AltMeasure[];
  lat: number | null;
  lng: number | null;
  meal_type: number;
  photo: Photo;
  sub_recipe: null;
  class_code: null;
  brick_code: null;
}

export interface Nutrient {
  attr_id: number;
  value: number;
}

export interface Metadata {
  is_raw_food: boolean;
}

export interface Tags {
  item: string;
  measure: string | null;
  quantity: string;
  food_group: number;
  tag_id: number;
}

export interface AltMeasure {
  serving_weight: number;
  measure: string;
  seq: number | null;
  qty: number;
}

export interface Photo {
  thumb: string;
  highres: string;
  is_user_uploaded: boolean;
}
