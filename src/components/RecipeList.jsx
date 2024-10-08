import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteRecipe, getRecipes } from '../services/apiRecipes';
import Spinner from '../ui/Spinner';
import { Link } from 'react-router-dom';

function RecipeList() {
  const queryClient = useQueryClient();

  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipes,
  });

  const deleteRecipeMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
    },
  });

  function handleDeleteClick(recipeUri) {
    deleteRecipeMutation.mutate(recipeUri);
  }

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex w-full items-center justify-between">
      <div
        role="table"
        className="grow overflow-hidden rounded-sm border-l border-gray-200 bg-gray-50 text-xs"
      >
        <header
          role="row"
          className="grid w-full grid-cols-7 items-center justify-center px-2 pb-2 pt-4 text-center text-[0.6rem] font-bold uppercase text-gray-600"
        >
          <div>Image</div>
          <div className="col-span-2">Recipe</div>
          <div>Style</div>
          <div>Type</div>
          <div className="text-[0.5rem]">
            <div>Cabs</div>
            <div className="border-t-[0.1rem]">Serving</div>
          </div>

          <div></div>
        </header>
        <section>
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              role="row"
              className="border-b-1 grid grid-cols-7 items-center justify-center gap-2 border-gray-100 px-3 py-2 text-center text-[0.6rem] font-[600] text-gray-600"
            >
              <Link to={`/recipes/${recipe.recipeUri.split('_').pop()}`}>
                <img
                  src={recipe.recipeImage}
                  alt={recipe.recipeName}
                  className="mx-auto my-auto w-16 rounded-lg"
                />
              </Link>
              <div className="col-span-2 font-semibold">
                {recipe.recipeName}
              </div>
              <div className="break-words text-[0.55rem] italic">
                {recipe.recipeStyle}
              </div>
              <div className="break-words text-[0.55rem] italic">
                {recipe.recipeType}
              </div>
              <div className="text-[0.55rem] italic">
                {Math.round(
                  Number(recipe.recipeCabs) / Number(recipe.recipeServe),
                )}
              </div>
              <button
                className="opacity-60 hover:opacity-100"
                onClick={() => handleDeleteClick(recipe.recipeUri)}
              >
                ✖️
              </button>
            </div>
          ))}

          <div
            role="row"
            className="border-b-1 grid grid-cols-7 items-center justify-center gap-6 whitespace-normal border-gray-100 px-4 py-2 text-center font-[600] text-gray-600"
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </section>
        <footer></footer>
      </div>
    </div>
  );
}

export default RecipeList;
