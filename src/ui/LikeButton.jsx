import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { addRecipe, deleteRecipe } from '../services/apiRecipes';

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

  function handleLikeClick() {
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
        addRecipeMutation.mutate(newRecipe);
      } catch (error) {
        console.err('Error adding recipe', error);
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
          className="w-8 cursor-pointer"
          onClick={handleLikeClick}
        />
      )}
    </div>
  );
}

export default LikeButton;
