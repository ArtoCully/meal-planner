import React from 'react';
import { weeklyMenu, receipes } from '../../dummyData';
import { generateWeeklyMenu } from '../../utils/generateMenu';

export default function WeeklyMenu() {
  const [weeklyMenuState, setWeeklyMenuState] = React.useState(weeklyMenu);

  const handleGenerateWeeklyMenu = () => {
    const menu = generateWeeklyMenu(receipes);
    setWeeklyMenuState(menu);
  }

  console.log('weeklyMenuStat', weeklyMenuState, 'receipes', receipes);

  return (
    <section>
        <button
          className="App-btn App-btn__generate-receipe"
          onClick={handleGenerateWeeklyMenu}>
            Generate Weekly Meal Plan
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

