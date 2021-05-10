import React from 'react';
import logo from './logo.svg';
import './App.css';
import { weeklyMenu } from './dummyData';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section>
        <button className="App-btn">Generate Random Receipes</button>
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
            {weeklyMenu.map((menu, dayIndex) => {
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
    </div>
  );
}

export default App;
