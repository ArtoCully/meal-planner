import React from 'react';
import { fetchRecipes } from '../../services/api';
import { IRecipe } from '../../models/recipe';

export default function ListRecipe() {
  const recipeData: IRecipe[] = [];
  const [listRecipeState, setRecipeState] = React.useState(recipeData);
  React.useEffect(() => {
    (async () => {
      const recipeResponse = await fetchRecipes();
      if (recipeResponse && recipeResponse.status === 200) {
        console.log('recipeResponse', recipeResponse);
        const recipes = recipeResponse.data;
        setRecipeState(recipes);
      }
    })();
  }, []);

  return (
    <section className="App-section App-recipe-list">
      <h2>List Recipes</h2>
      <ul className="App-list App-recipe-list__container">
        {listRecipeState.map((recipe, index) => {
          return (
            <li className="App-recipe-list__item" key={index}>
              <h3>{recipe.title}</h3>
              <h4>When to eat</h4>
              <ul className="App-list App-recipe-list__when">
                {recipe.when.map((w, key) => (
                  <li key={key}>
                    <input type="checkbox" disabled checked={true} />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
              <h4>Ingredients</h4>
              <ul className="App-list App-recipe-list__ingredients">
                {recipe.ingredients.map((ingredient, key) => (
                  <li key={key}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </section>
  )
};
