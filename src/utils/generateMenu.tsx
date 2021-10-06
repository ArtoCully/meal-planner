import {
  recipes as defaultrecipes,
  ITimeOfMeal,
  IRecipe,
  IDailyMenuProps,
  IWeeklyMenuProps,
} from '../dummyData';
import { generateDayOfWeek, IDayOfWeekText } from './generateDayOfWeek';

export function getRandomMeal(items: IRecipe[], when: ITimeOfMeal): IDailyMenuProps {
  let randomItem = items[Math.floor(Math.random() * items.length)];

  return {
    ...randomItem,
    when,
  }
}

export function generateDailyMenu(
  recipes: IRecipe[] = defaultrecipes,
  day: IDayOfWeekText = 'monday'
) {
  // get one breakfast,
  const breakfastMeals = recipes.filter(receipe => receipe.when.indexOf(ITimeOfMeal.breakfast) !== -1);
  const randomBreakfast = getRandomMeal(breakfastMeals, ITimeOfMeal.breakfast);

  // get one lunch
  const lunchMeals = recipes.filter(receipe => receipe.when.indexOf(ITimeOfMeal.lunch) !== -1);
  const randomLunch = getRandomMeal(lunchMeals, ITimeOfMeal.lunch)

  // get one dinner 
  const dinnerMeals = recipes.filter(receipe => receipe.when.indexOf(ITimeOfMeal.dinner) !== -1);
  const randomDinner = getRandomMeal(dinnerMeals, ITimeOfMeal.dinner);

  let a = [];
  a.push(randomBreakfast)
  a.push(randomLunch);
  a.push(randomDinner);
  const result = { [day]: a }

  return result;
}

export function generateWeeklyMenu(recipes = defaultrecipes) {
  const week = [0, 1, 2, 3, 4, 5, 6];
  let result: IWeeklyMenuProps[] = [];

  week.forEach(d => {
    const day = generateDayOfWeek(d);
    const dayMenu = generateDailyMenu(recipes, day);
    result.push(dayMenu);
  });

  return result;
}
