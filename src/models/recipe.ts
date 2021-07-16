export enum ITimeOfMeal {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner'
}

export interface IRecipe {
  title: string;
  when: string[];
  ingredients: string[];
}
