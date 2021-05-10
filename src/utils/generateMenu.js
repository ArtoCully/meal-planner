import { receipes, ITimeOfMeal } from '../dummyData';

export function getRandomMeal(items) {
  const randomItem = items[Math.floor(Math.random() * items.length)];
  return randomItem;
}

export function generateDailyMenu(receipes) {
  console.log('receipes', receipes);

  // get one breakfast,
  const breakfastMeals = receipes.filter(receipe => receipe.when.indexOf(ITimeOfMeal.breakfast) !== -1);
  const randomBreakfast = getRandomMeal(breakfastMeals)
  // console.log('breakfastMeals', breakfastMeals, randomBreakfast);

  // get one lunch
  const lunchMeals = receipes.filter(receipe => receipe.when.indexOf(ITimeOfMeal.lunch) !== -1);
  const randomLunch = getRandomMeal(lunchMeals)
  // console.log('lunchMeals', lunchMeals, randomLunch);

  // get one dinner 
  const dinnerMeals = receipes.filter(receipe => receipe.when.indexOf(ITimeOfMeal.dinner) !== -1);
  const randomDinner = getRandomMeal(dinnerMeals);
  // console.log('dinnerMeals', dinnerMeals, randomDinner);

  let a = [];
  a.push(randomBreakfast)
  a.push(randomLunch);
  a.push(randomDinner);
  const result = { 'monday': a }

  console.log('result', result);
}
