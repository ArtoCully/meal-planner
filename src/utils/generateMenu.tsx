import {
  receipes as defaultReceipes,
  ITimeOfMeal,
  IReceipe,
  IDailyMenuProps,
  IWeeklyMenuProps,
} from '../dummyData';
import { generateDayOfWeek, IDayOfWeekText } from './generateDayOfWeek';

export function getRandomMeal(items: IReceipe[], when: ITimeOfMeal): IDailyMenuProps {
  let randomItem = items[Math.floor(Math.random() * items.length)];

  return {
    ...randomItem,
    when,
  }
}

export function generateDailyMenu(
  receipes: IReceipe[] = defaultReceipes,
  day: IDayOfWeekText = 'monday'
) {
  // get one breakfast,
  const breakfastMeals = receipes.filter(receipe => receipe.when.indexOf(ITimeOfMeal.breakfast) !== -1);
  const randomBreakfast = getRandomMeal(breakfastMeals, ITimeOfMeal.breakfast);

  // get one lunch
  const lunchMeals = receipes.filter(receipe => receipe.when.indexOf(ITimeOfMeal.lunch) !== -1);
  const randomLunch = getRandomMeal(lunchMeals, ITimeOfMeal.lunch)

  // get one dinner 
  const dinnerMeals = receipes.filter(receipe => receipe.when.indexOf(ITimeOfMeal.dinner) !== -1);
  const randomDinner = getRandomMeal(dinnerMeals, ITimeOfMeal.dinner);

  let a = [];
  a.push(randomBreakfast)
  a.push(randomLunch);
  a.push(randomDinner);
  const result = { [day]: a }

  return result;
}

export function generateWeeklyMenu(receipes = defaultReceipes) {
  const week = [0, 1, 2, 3, 4, 5, 6];
  let result: IWeeklyMenuProps[] = [];

  week.forEach(d => {
    const day = generateDayOfWeek(d);
    const dayMenu = generateDailyMenu(receipes, day);
    result.push(dayMenu);
  });

  return result;
}