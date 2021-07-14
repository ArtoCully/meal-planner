import React from 'react';
import { fetchRecipes } from '../../services/api';

export default function AddRecipe() {
  React.useEffect(() => {
    (async () => {
      const recipes = await fetchRecipes();
      console.log('recipes', recipes);
    })();
  }, []);

  return (
    <section className="App-recipes-add">
      <h2>Add Recipe</h2>
    </section>
  );
}

