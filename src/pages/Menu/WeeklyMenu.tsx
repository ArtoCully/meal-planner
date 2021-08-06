import React from 'react';
import { weeklyMenu, receipes } from 'src/dummyData';
import { generateWeeklyMenu } from 'src/utils/generateMenu';
import { FixedNav } from 'src/components/Navigation';
import { fetchRecipes } from 'src/services/api';
import { IRecipe } from 'src/models/recipe';
import './WeeklyMenu.css';

export default function WeeklyMenu() {
  // NOTE eventually only update to
  // only fetch users recipes
  const recipeData: IRecipe[] = [];
  const [listRecipeState, setRecipeState] = React.useState(recipeData);
  const [weeklyMenuState, setWeeklyMenuState] = React.useState(weeklyMenu);

  const handleGenerateWeeklyMenu = async () => {
    const recipeResponse = await fetchRecipes();
    if (recipeResponse && recipeResponse.status === 200) {
      const recipeList = recipeResponse.data || receipes;
      setRecipeState(recipeList);
      const menu = generateWeeklyMenu(recipeList);
      setWeeklyMenuState(menu);
    }
  }

  console.log('weeklyMenuState', weeklyMenuState);
  console.log('listRecipeState', listRecipeState);

  return (
    <section className="App-section App-weekly-menu">
      <FixedNav />
      <h2>Weekly Menu</h2>
      <button
        className="App-btn App-btn__generate-receipe"
        onClick={handleGenerateWeeklyMenu}>
          Generate New Weekly Meal Plan
      </button>
      <table className="App-table">
        <thead>
          <tr>
            <td></td>
            <th scope="col">Breakfast</th>
            <th scope="col">Lunch</th>
            <th scope="col">Dinner</th>
          </tr>
        </thead>
        <tbody>
          {weeklyMenuState.map((menu, dayIndex) => {
            const day = Object.keys(menu)[0];
            const dayMenu = menu[day];

            return (
              <tr key={`row-${day}-${dayMenu}-${dayIndex}`}>
                <th scope="row">{day}</th>
                {dayMenu.map((receipe, index) => {
                  return (
                    <td key={`cell-${day}-${index}-meal`}>
                      {receipe.title}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  );
}

