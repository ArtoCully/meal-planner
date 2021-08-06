import React from 'react';
import { weeklyMenu, receipes } from 'src/dummyData';
import { generateWeeklyMenu } from 'src/utils/generateMenu';
import { FixedNav } from 'src/components/Navigation';
import { fetchRecipesByUserId } from 'src/services/api';
import { IRecipe } from 'src/models/recipe';
import useUserContext from 'src/hooks/useUserContext';
import { Toaster } from 'src/components/Toaster';
import { IToaster } from 'src/components/Toaster/models';
import { IStatusType } from 'src/models/status';
import './WeeklyMenu.css';

export default function WeeklyMenu() {
  const { currentUser } = useUserContext();
  // NOTE eventually only update to
  // only fetch users recipes
  const recipeData: IRecipe[] = [];
  const [listRecipeState, setRecipeState] = React.useState(recipeData); // eslint-disable-line
  const [weeklyMenuState, setWeeklyMenuState] = React.useState(weeklyMenu);

  // TODO: move the toaster to main
  // App.tsx and have a global state that
  // detects updates to toast status
  // maybe using redux, we'll see
  const toastStatusObject: IToaster = {
    type: undefined,
    message: undefined,
  }

  const [toastStatus, setToastStatus] = React.useState(toastStatusObject);

  const handleGenerateWeeklyMenu = async () => {
    const recipeResponse = await fetchRecipesByUserId({ userId: currentUser.id });
    if (recipeResponse && recipeResponse.status === 200) {
      let recipeList = [];

      if (recipeResponse.data.length) {
        recipeList = recipeResponse.data;
      } else {
        recipeList = receipes; // TODO: Fix this typo
        setToastStatus({
          type: IStatusType.information,
          message: 'You do not have any recipes of your own so using example data',
        })
      }

      setRecipeState(recipeList);
      const menu = generateWeeklyMenu(recipeList);
      setWeeklyMenuState(menu);
    }
  }

  return (
    <section className="App-section App-weekly-menu">
      <FixedNav />
      <h2>Weekly Menu</h2>
      {toastStatus.type && toastStatus.message &&
          <div className="App-form-group">
            <Toaster type={toastStatus.type} message={toastStatus.message} />
          </div>
      }
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

