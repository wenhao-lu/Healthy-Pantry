import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import {
  addRecipe,
  deleteRecipe,
  getRecipeByUri,
} from '../services/apiRecipes';

function LikeButton({
  recipeName,
  recipeStyle,
  recipeType,
  recipeCabs,
  recipeImage,
  recipeUri,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const queryClient = useQueryClient();

  const addRecipeMutation = useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });

  const deleteRecipeMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
    },
  });

  async function handleLikeClick() {
    const newRecipe = {
      recipeName,
      recipeStyle,
      recipeType,
      recipeCabs,
      recipeImage,
      recipeUri,
    };

    if (isLiked) {
      deleteRecipeMutation.mutate(recipeUri);
    } else {
      try {
        // Check if a recipe with the same recipeUri already exists
        const existingRecipe = await getRecipeByUri(recipeUri);

        if (existingRecipe) {
          console.log('Recipe already exists in the database.');
        } else {
          addRecipeMutation.mutate(newRecipe);
        }
      } catch (error) {
        console.error('Error checking or adding recipe', error);
      }
    }
    setIsLiked(!isLiked);
  }

  return (
    <div>
      {isLiked ? (
        <IoHeartSharp
          className="w-8 cursor-pointer text-red-500"
          onClick={handleLikeClick}
        />
      ) : (
        <IoHeartOutline
          className="w-8 cursor-pointer hover:text-red-500"
          onClick={handleLikeClick}
        />
      )}
    </div>
  );
}

export default LikeButton;
