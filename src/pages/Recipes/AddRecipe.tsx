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
  toaster,
} from 'evergreen-ui';
import { PageTitle } from 'src/components/atoms';
import { IRecipe } from 'src/models/recipe';
import { createRecipe } from 'src/services/api';
import { FixedNav } from 'src/components/Navigation';
import useAuth from 'src/hooks/useAuth';
interface IFormObject extends IRecipe {
  whenState: any,
}

export default function AddRecipe() {
  const lastIngredientField = React.useRef<HTMLInputElement>(null);
  const { currentUser, setCurrentUser } = useAuth();
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

  const [formState, setFormState] = React.useState(formObject);

  React.useEffect(() => {
  }, [
    formState,
  ]);

  React.useLayoutEffect(() => {
    console.log('lastIngre', lastIngredientField); // eslint-disable-line
  }, [
    lastIngredientField
  ])
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

    if (null !== lastIngredientField.current) {
      lastIngredientField.current.value = String(updatedIngredientList.length - 1);
      lastIngredientField.current.focus();
    }
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
        toaster.success('Successfully saved recipe');

        setFormState(formObject);

        const newRecipes = currentUser.recipes.length ? [...currentUser.recipes, formResponse.data.id] : [formResponse.data.id];
        const updateCurrentUser = {
          ...currentUser,
          recipes: newRecipes
        }

        setCurrentUser(updateCurrentUser);
      }
      if (formResponse.status >= 400 && formResponse.status < 500) {
        const message = formResponse.data.message ? formResponse.data.message : 'Something went wrong try again';
        toaster.danger(message);
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
      <PageTitle>Add Recipe</PageTitle>

      <form className="App-recipe-add__form">
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
            width="100%"
          >
            <TextInput
              width="100%"
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
                width="100%"
              >
                <TextInput
                  width="98vw"
                  type="text" 
                  placeholder={`Enter ingredient ${newKey}`}
                  value={value}
                  data-key={key}
                  onChange={handleOnChangeIngredient}
                  ref={lastIngredientField}
                />
                {(formState.ingredients.length-1) === key &&
                  <IconButton
                    height={majorScale(4)}
                    marginLeft={majorScale(1)}
                    onClick={handleAddIngredient(key, value, true)}
                    icon={PlusIcon}></IconButton>
                }
                {showDelete &&
                  <IconButton
                    height={majorScale(4)}
                    marginLeft={majorScale(1)}
                    data-key={key}
                    data-ingredients={formState.ingredients}
                    onClick={handleDeleteIngredient}
                    icon={MinusIcon}></IconButton>
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
            Tags
          </Heading>

          <TagInput
            width="100%"
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

