import { useEffect, useState } from 'react';
import { APP_ID, APP_KEY } from '../services/apiAuth';

function GetRandomRecipes() {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(function () {
    async function fetchRandomRecipes() {
      try {
        const res = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&diet=low-fat&random=true`,
        );
        const data = await res.json();
        console.log(data);
        setRandomRecipes(data.hits);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchRandomRecipes();
  }, []);
  return (
    <div className="bg-green-50 px-4 py-4">
      <h2 className="ml-auto mr-auto w-96 pb-2 text-xl font-semibold">
        Recipes😋:
      </h2>
      <div className="ml-auto mr-auto flex w-96 flex-row flex-wrap items-center justify-center gap-4">
        {randomRecipes.map((randomRecipe, index) => (
          <div key={index} className="w-44 border-b-[0.1rem] border-gray-200">
            <a href={randomRecipe.recipe.url} target="_blank">
              <img
                src={randomRecipe.recipe.image}
                alt={randomRecipe.recipe.label}
                className="rounded-md border border-gray-200 shadow-sm transition-all hover:opacity-60"
              />
              <p className="h-10 text-[0.8rem] font-semibold">
                {randomRecipe.recipe.label}
              </p>
            </a>
            <div className="flex flex-row items-center justify-between gap-2 pb-2 text-xs italic">
              <p className="capitalize">
                <span className="text-green-600">
                  {Math.round(Number(randomRecipe.recipe.calories))}
                </span>{' '}
                calories
              </p>
              <p className="capitalize">
                <span className="text-green-600">
                  {randomRecipe.recipe.ingredients.length}
                </span>{' '}
                ingredients
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetRandomRecipes;
