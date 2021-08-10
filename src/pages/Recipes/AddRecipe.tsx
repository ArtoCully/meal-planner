import React from 'react';
import {
  Button,
  IconButton,
  MinusIcon,
  PlusIcon,
  TextInput,
  Pane,
  Checkbox,
  Heading,
  TagInput,
  majorScale,
} from 'evergreen-ui';
import { Toaster } from 'src/components/Toaster';
import { IToaster } from 'src/components/Toaster/models';
import { IRecipe } from 'src/models/recipe';
import { createRecipe } from 'src/services/api';
import { IStatusType } from 'src/models/status';
import { FixedNav } from 'src/components/Navigation';

interface IFormObject extends IRecipe {
  whenState: any,
  tags?: string[],
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
    },
    tags: [],
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

  const handleOnChangeTags = (values: any) => {
    const data = {
      ...formState,
      tags: values
    }
    setFormState(data);
  }

  return (
    <Pane className="App-section">
      <FixedNav />

      <Heading
        size={700}
        marginBottom={majorScale(2)}
        marginTop={majorScale(1)}
      >
          Add Recipe
      </Heading>

      <form className="App-recipe-add__form">
        {formStatus.type && formStatus.message && 
          <div className="App-form-group">
            <Toaster type={formStatus.type} message={formStatus.message} />
          </div>
        }

        <Pane className="App-form-group">
          <Heading
            size={400}
            marginBottom={majorScale(2)}
          >
            Title
          </Heading>
  
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
          >
            <TextInput
              width="80vw"
              type="text"
              name="title"
              onChange={handleOnChangeInputText}
              value={formState.title}
            />
          </Pane>
        </Pane>

        <Pane className="App-form-group">
          <Heading
            size={400}
            marginBottom={majorScale(2)}
          >
            When
          </Heading>

          <Pane>
            {Object.keys(formState.whenState).map((value: string, index: number) => {
              return (
                  <Checkbox
                    marginTop={0}
                    marginBottom={majorScale(1)}
                    key={index}
                    label={value}
                    id={`App-recipe-add__when--${value}`}
                    name="when"
                    value={value}
                    onChange={handleOnChangeCheckbox}
                    checked={formState.whenState[value]}
                  />
              )})
            }
          </Pane>
        </Pane>

        <Pane className="App-form-group">
          <Heading
            size={400}
            marginBottom={majorScale(2)}
          >
            Ingredients
          </Heading>

          {formState.ingredients.map((value, key) => {
            const newKey = key + 1;
            const showDelete = (key > 0) || (key >= 0 && formState.ingredients.length > 1);

            return (
              <Pane
                key={key}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                marginBottom={majorScale(1)}
              >
                <TextInput
                  width="80vw"
                  type="text" 
                  placeholder={`Enter ingredient ${newKey}`}
                  value={value}
                  data-key={key}
                  onChange={handleOnChangeIngredient}
                  marginRight={majorScale(1)}
                />
                {showDelete &&
                  <IconButton
                    height={majorScale(4)}
                    data-key={key}
                    data-ingredients={formState.ingredients}
                    onClick={handleDeleteIngredient}
                    marginRight={majorScale(1)}
                    icon={MinusIcon}></IconButton>
                }
                {(formState.ingredients.length-1) === key &&
                  <IconButton
                    height={majorScale(4)}
                    onClick={handleAddIngredient(key, value, true)}
                    icon={PlusIcon}></IconButton>
                }
              </Pane>
            )
          })}
        </Pane>

        <Pane className="App-form-group">
          <Heading
            size={400}
            marginBottom={majorScale(2)}
          >
            Ingredients
          </Heading>

          <TagInput
            inputProps={{ placeholder: 'Add tags...' }}
            values={formState.tags}
            onChange={values => {
              handleOnChangeTags(values)
            }}
          />
        </Pane>
        <Button
          width="100%"
          appearance="primary"
          intent="none"
          size="large"
          onClick={handleAddRecipe}>
            Add
        </Button>
      </form>
    </Pane>
  );
}

