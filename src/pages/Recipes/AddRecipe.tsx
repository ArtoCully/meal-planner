import React from 'react';
import { Toaster } from 'src/components/Toaster';
import { IToaster } from 'src/components/Toaster/models';
import { IRecipe } from 'src/models/recipe';
import { createRecipe } from 'src/services/api';
import { IStatusType } from 'src/models/status';
import { FixedNav } from 'src/components/Navigation';
import './AddRecipe.css';
interface IFormObject extends IRecipe {
  whenState: any;
}

export default function AddRecipe() {
  const formObject: IFormObject = {
    title: '',
    when: [],
    ingredients: [''],
    whenState: {
      'breakfast': false,
      'lunch': false,
      'dinner': false
    }
  }

  const formStatusObject: IToaster = {
    type: undefined,
    message: undefined,
  }

  const [formState, setFormState] = React.useState(formObject);
  const [formStatus, setFormStatus] = React.useState(formStatusObject);

  React.useEffect(() => {}, [
    formState,
  ]);

  const handleDeleteIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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

  const filterWhenArray = (whenState: any) => {
    const when = Object.keys(whenState).filter((value) => {
      if (whenState[value] === true) {
        return value;
      }
      return false;
    });
    return when;
  }

  const handleAddRecipe = async (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { whenState, ...otherFormState } = formState;
    const when = filterWhenArray(whenState);
    const params = { ...otherFormState, when };
    const formResponse = await createRecipe(params);

    if (formResponse) {
      if (formResponse.status === 200) {
        setFormStatus({
          type: IStatusType.success,
          message: 'Successfully saved',
        });

        setFormState(formObject);
      }
      if (formResponse.status >= 400 && formResponse.status < 500) {
        const message = formResponse.data.message ? formResponse.data.message : 'Something went wrong try again';
        setFormStatus({
          type: IStatusType.error,
          message,
        })
      }
    }
    console.log('formResponse', formResponse);
  };

  const handleOnChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event && event.target;
    const value = target && target.value;
    const name: string = target && target.name;
    const data = {
      ...formState,
      [name]: value,
    }
    setFormState(data);
  }

  const handleOnChangeCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const checked = event.target.checked;

    const formData = {
      ...formState,
      whenState: {
        ...formState.whenState,
        [value]: checked
      }
    }

    setFormState(formData);
  }

  return (
    <section className="App-section App-recipe-add">
      <FixedNav />
      <h2>Add Recipe</h2>
      <form className="App-recipe-add__form">
        {formStatus.type && formStatus.message && 
          <div className="App-form-group">
            <Toaster type={formStatus.type} message={formStatus.message} />
          </div>
        }
        <div className="App-form-group">
          <label className="App-form-group__label-title">Title</label>
          <input type="text" id="App-recipe-add__title" name="title" onChange={handleOnChangeInputText} value={formState.title}/>
        </div>

        <div className="App-form-group">
          <label className="App-form-group__label-title">When</label>
          {
            Object.keys(formState.whenState).map((value: string, index: number) => {
              return (
                <div className="App-form-group--inline" key={index}>
                  <input type="checkbox" id={`App-recipe-add__when--${value}`} name="when" value={value} onChange={handleOnChangeCheckbox} checked={formState.whenState[value]} />
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
                <input className="App-recipe-add__ingredient" type="text" placeholder={`Enter ingredient ${newKey}`} value={value} data-key={key} onChange={handleOnChangeIngredient} />
                {showDelete && <button className="App-btn App-btn--small App-btn--delete App-recipe-add__ingredient-btn" data-key={key} data-ingredients={formState.ingredients} onClick={handleDeleteIngredient}>-</button>}
                {(formState.ingredients.length-1) === key && <button className="App-btn App-btn--small App-btn--secondary App-recipe-add__ingredient-btn" onClick={handleAddIngredient(key, value, true)}>+</button>}
              </div>
            )
          })}
        </div>

        <button
          className="App-btn App-btn--primary App-btn__add-recipe"
          onClick={handleAddRecipe}>
            Add
        </button>
      </form>
    </section>
  );
}

