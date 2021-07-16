import React from 'react';
import { fetchRecipes, createRecipe } from '../../services/api';
import { IRecipe, ITimeOfMeal } from '../../models/recipe';

export default function AddRecipe() {
  const formObject: IRecipe = {
    title: '',
    when: [],
    ingredients: [''],
  }
  const whenState: any = {
    'breakfast': false,
    'lunch': false,
    'dinner': false
  }
  const [formState, setFormState] = React.useState(formObject);

  React.useEffect(() => {
    // (async () => {
    //   console.log('ingredientState', ingredientState);
    //   const recipes = await fetchRecipes();
    //   console.log('recipes', recipes);
    // })();
  }, [
    formState,
  ]);

  const handleDeleteIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('event', event);
    console.log('event.target.dataset.key', event.currentTarget.dataset.key);
    const dataSet = event && event.currentTarget && event.currentTarget.dataset
    const key = dataSet && dataSet.key;
    const numKey = Number(key);
    const ingredientsList = formState.ingredients.filter((value: string, index: number) => index !== numKey);
    const formData = {
      ...formState,
      ingredients: ingredientsList,
    };
    setFormState(formData);
  }

  const handleAddIngredient = (key: number, ingredient: string, inc?: boolean) => (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault();
    }

    const ingredientList = formState.ingredients.map((val, index) => {
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

    const formData = { ...formState,
      ingredients: updatedIngredientList,
    }
    setFormState(formData);
  }

  const handleOnChangeIngredient = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const key = event && event.target && event.target.dataset && event.target.dataset.key;
    const numKey = Number(key);
    const value = event && event.target && event.target.value as any;
    handleAddIngredient(numKey, value)();
  }

  const handleAddRecipe = async (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const formResponse = await createRecipe(formState);
    console.log('formResponse', formResponse);
  };

  const handleOnChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event);
    const target = event && event.target;
    const value = target && target.value;
    const name: string = target && target.name;
    const data = {
      ...formState,
      [name]: value,
    }
    setFormState(data);
  }

  const handleOnChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event', event);
    const name = event.target.name;
    const value = event.target.value;
    const checked = event.target.checked;
    console.log('name', name, 'value', value, 'checked', checked);

    let when: string[] = formState.when.length > 0 ? formState.when : [];

    if (checked) {
      if (!when.find((val) => val === value)) {
        when.push(value);
        const formData = {
          ...formState,
          when
        }
        setFormState(formData);
      }
    } else {
      const updatedWhen = when.filter((val) => val !== value);
      const formData = {
        ...formState,
        when: updatedWhen
      }
      setFormState(formData);
    }
  }

  return (
    <section className="App-section App-recipe-add">
      <h2>Add Recipe</h2>
      <form className="App-recipe-add__form">
        <div className="App-form-group">
          <label className="App-form-group__label-title">Title</label>
          <input type="text" id="App-recipe-add__title" name="title" onChange={handleOnChangeInputText} />
        </div>

        <div className="App-form-group">
          <label className="App-form-group__label-title">When</label>
          {
            Object.keys(whenState).map((value: string, index: number) => {
              const isChecked: boolean = whenState[value];
              console.log('isChecked', value, isChecked);
              return (
                <div className="App-form-group--inline" key={index}>
                  <input type="checkbox" id={`App-recipe-add__when--${value}`} name="when" value={value} onChange={handleOnChangeCheckbox} />
                  <label htmlFor={`App-recipe-add__when--${value}`}>
                    {value}
                  </label>
                </div>
              )
            })
          }
        </div>
        
        <div className="App-form-group">
          <label className="App-form-group__label-title">Ingredients</label>
          {formState.ingredients.map((value, key) => {
            const newKey = key + 1;
            const showDelete = (key > 0) || (key >= 0 && formState.ingredients.length > 1);

            return (
              <div className="App-form-group--inline" key={key}>
                <input type="text" placeholder={`Enter ingredient ${newKey}`} value={value} data-key={key} onChange={handleOnChangeIngredient} />
                {showDelete && <button className="App-btn App-btn--small App-recipe-add__ingredient-btn-delete" data-key={key} data-ingredients={formState.ingredients} onClick={handleDeleteIngredient}>Delete Ingredient +</button>}
                {(formState.ingredients.length-1) === key && <button className="App-btn App-btn--small App-recipe-add__ingredient-btn-add" onClick={handleAddIngredient(key, value, true)}>Add Another Ingredient +</button>}
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

