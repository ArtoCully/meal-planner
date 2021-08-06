import React from 'react';
import { fetchRecipes, deleteRecipe } from 'src/services/api';
import { IRecipe } from 'src/models/recipe';
import FixedNav from 'src/components/Navigation/FixedNav';
import LinkButton from 'src/components/LinkButton/LinkButton';
import useUserContext from 'src/hooks/useUserContext';
import './ListRecipe.css';

export default function ListRecipe() {
  const { currentUser } = useUserContext();
  const recipeData: IRecipe[] = [];
  const [listRecipeState, setRecipeState] = React.useState(recipeData);

  React.useEffect(() => {
    (async () => {
      const recipeResponse = await fetchRecipes();
      if (recipeResponse && recipeResponse.status === 200) {
        const recipes = recipeResponse.data;
        setRecipeState(recipes);
      }
    })();
  }, []);

  const handleDeleteRecipe = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = event && event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.id;
    const response = await deleteRecipe(id);

    if (response && response.status === 200) {
      console.log('recipe deleted', response);
      const newListRecipeState = listRecipeState.filter((f) => f._id !== id);
      setRecipeState(newListRecipeState);
    }
  };

  const currentUserRecipes = currentUser && currentUser.recipes;

  return (
    <section className="App-section App-recipe-list">
      <FixedNav />
      <h2>List Recipes</h2>
      <ul className="App-list App-recipe-list__container">
        {listRecipeState.map((recipe) => {
          const userHasAccessToRecipe = currentUserRecipes.find((r: string) => r === recipe._id);

          return (
            <li className="App-recipe-list__item" key={recipe._id}>
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
              {userHasAccessToRecipe && <LinkButton data-id={recipe._id} onClick={handleDeleteRecipe} text="Delete" />}
            </li>
          )
        })}
      </ul>
    </section>
  )
};
