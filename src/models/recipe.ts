export enum ITimeOfMeal {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner'
}

export interface IRecipe {
  _id?: string;
  title: string;
  when: string[];
  ingredients: string[];
}
