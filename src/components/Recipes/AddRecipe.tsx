import React from 'react';
import { fetchRecipes, createRecipe } from '../../services/api';
import { IRecipe, ITimeOfMeal } from '../../models/recipe';

export default function AddRecipe() {
  const [formState, setFormState] = React.useState({
    title: '',
    when: '',
    ingredients: [],
  });

  const [ingredientState, setIngredientState] = React.useState(['']);

  // React.useEffect(() => {
  //   (async () => {
  //     console.log('ingredientState', ingredientState);
  //     const recipes = await fetchRecipes();
  //     console.log('recipes', recipes);
  //   })();
  // }, [ingredientState]);

  const handleDeleteIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('event', event);
    console.log('event.target.dataset.key', event.currentTarget.dataset.key);
    const dataSet = event && event.currentTarget && event.currentTarget.dataset
    const key = dataSet && dataSet.key;
    const numKey = Number(key);
    const ingredientsList = ingredientState.filter((value: string, index: number) => index !== numKey);
    setIngredientState(ingredientsList);
    const formData = {
      ...formState,
      ingredients: ingredientsList,
    };
    // setFormState(formData);
  }

  const handleAddIngredient = (key: number, ingredient: string, inc?: boolean) => (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault();
    }

    const ingredientList = ingredientState.map((val, index) => {
      if (key === index) {
        return ingredient;
      }
      return val;
    });

    let updatedIngredientList = [];

    if (inc) {
      updatedIngredientList = [...ingredientList, ''] as any;
    } else {
      updatedIngredientList = [...ingredientList];
    }

    setIngredientState(updatedIngredientList);
  }

  const handleOnChangeIngredient = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const key = event && event.target && event.target.dataset && event.target.dataset.key;
    const numKey = Number(key);
    const value = event && event.target && event.target.value as any;
    handleAddIngredient(numKey, value)();
  }

  const handleAddRecipe = async () => {
    const r = await createRecipe({
      title: 'Apples',
      when: [ITimeOfMeal.breakfast],
      ingredients: [
        '2 apples',
        '1 banana',
        '500ml milk'
      ]
    });

    console.log('r', r);
  };

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event);
    const target = event && event.target;
    const name = target && target.name;
    const value = target && target.value;
    const data = {
      ...formState,
      [name]: value
    };

    setFormState(data);
  }

  return (
    <section className="App-section App-recipe-add">
      <h2>Add Recipe</h2>
      <form className="App-recipe-add__form">
        <div className="App-form-group">
          <label>Title</label>
          <input type="text" id="App-recipe-add__title" name="title" onChange={handleOnChangeInput} />
        </div>

        <div className="App-form-group">
          <label>When</label>
          <input type="checkbox" id="App-recipe-add__when--breakfast" name="when" value="breakfast" onChange={handleOnChangeInput} />
          <input type="checkbox" id="App-recipe-add__when--lunch" name="when" value="lunch" onChange={handleOnChangeInput} />
          <input type="checkbox" id="App-recipe-add__when--dinner" name="when" value="dinner" onChange={handleOnChangeInput} />
        </div>
        
        <div className="App-form-group">
          <label>Ingredients</label>
          {ingredientState.map((value, key) => {
            const newKey = key + 1;
            const showDelete = (key > 0) || (key >= 0 && ingredientState.length > 1);

            return (
              <div className="App-form-group--inline" key={key}>
                <input type="text" placeholder={`Enter ingredient ${newKey}`} value={value} data-key={key} onChange={handleOnChangeIngredient} />
                {showDelete && <button className="App-btn App-btn--small App-recipe-add__ingredient-btn-delete" data-key={key} data-ingredients={ingredientState} onClick={handleDeleteIngredient}>Delete Ingredient +</button>}
                {(ingredientState.length-1) === key && <button className="App-btn App-btn--small App-recipe-add__ingredient-btn-add" onClick={handleAddIngredient(key, value, true)}>Add Another Ingredient +</button>}
              </div>
            )
          })}
        </div>

        <button
          className="App-btn"
          onClick={handleAddRecipe}>
            Add
        </button>
      </form>
    </section>
  );
}

