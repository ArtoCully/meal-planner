import React from 'react';
import {
  Button,
  Heading,
  Pane,
  majorScale,
  Checkbox,
} from 'evergreen-ui';
import styled from 'styled-components';
import { fetchRecipes, deleteRecipe } from 'src/services/api';
import { IRecipe } from 'src/models/recipe';
import { FixedNav } from 'src/components/Navigation';
import useAuth from 'src/hooks/useAuth';

const ListItem = styled(Pane)`
  border-bottom: 1px solid var(--global-colour-grey-1);

  &:last-child {
    border-bottom: 0;
  }
`;

const NextListItem = styled(Pane)`
  font-size: 14px;
`;

export default function ListRecipe() {
  const { currentUser } = useAuth();
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
      const newListRecipeState = listRecipeState.filter((f) => f._id !== id);
      setRecipeState(newListRecipeState);
    }
  };

  const currentUserRecipes = currentUser && currentUser.recipes;

  return (
    <Pane is="section" className="App-section App-recipe-list">
      <FixedNav />
      <Heading
        size={700}
        marginBottom={majorScale(2)}
        marginTop={majorScale(1)}
      >
        List Recipes
      </Heading>
      <Pane
        is="ul"
        display="flex"
        flexDirection="column"
        justifyContent="flexStart"
        alignItems="flexStart"
        textAlign="left"
        listStyle="none"
        paddingLeft="0"
      >
        {listRecipeState.map((recipe) => {
          const userHasAccessToRecipe = currentUserRecipes
            ? currentUserRecipes.find((r: string) => (r === recipe._id))
            : false

          console.log('userHasHaccessToRecipe', userHasAccessToRecipe);

          return (
            <ListItem
              is="li"
              paddingTop={majorScale(3)}
              paddingBottom={majorScale(3)}
              width="100%"
              key={recipe._id}
            >
              <Heading size={500} marginBottom={majorScale(2)}>{recipe.title}</Heading>
              <Heading size={400} marginBottom={majorScale(1)}>When to eat</Heading>
              <Pane is="ul" listStyle="none" paddingLeft="0">
                {recipe.when.map((w, key) => (
                  <NextListItem is="li" key={key}>
                    <Checkbox disabled checked label={w} />
                  </NextListItem>
                ))}
              </Pane>
              <Heading size={400} marginBottom={majorScale(1)}>Ingredients</Heading>
              <Pane is="ul" listStyle="none" paddingLeft="0">
                {recipe.ingredients.map((ingredient, key) => (
                  <NextListItem is="li" key={key}>
                    {ingredient}
                  </NextListItem>
                ))}
              </Pane>
              {
                userHasAccessToRecipe && <Button
                  marginTop={majorScale(2)}
                  width="100%"
                  appearance="primary"
                  data-id={recipe._id}
                  onClick={handleDeleteRecipe}
                >
                  Delete
                </Button>
              }
            </ListItem>
          )
        })}
      </Pane>
    </Pane>
  )
};
