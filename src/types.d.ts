export interface IMeals {
  id: string
  meals: string;
  description: string;
  kcal: number;
}

export interface IMealsAdd {
  meals: string;
  description: string;
  kcal: number;
  id?: string;
}