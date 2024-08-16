import { useEffect, useState } from 'react';
import { APP_ID, APP_KEY } from '../services/apiAuth';

function GetLowfatRecipes() {
  const [lowfatRecipes, setLowfatRecipes] = useState([]);

  useEffect(function () {
    async function fetchLowfatRecipes() {
      try {
        // save random recipes in localstorage for 6 hours, to prevent frequent API calls
        const storedData = localStorage.getItem('lowfatRecipes');
        const storedTimestamp = localStorage.getItem('lowfatRecipesTimestamp');
        const currentTime = Date.now();

        if (storedData && storedTimestamp) {
          const ageInHours = (currentTime - storedTimestamp) / 1000 / 60 / 60;
          if (ageInHours < 6) {
            setLowfatRecipes(JSON.parse(storedData));
            return;
          }
        }

        // fetch new random recipes
        const res = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&diet=low-fat&random=true`,
        );
        const data = await res.json();
        //console.log(data);
        setLowfatRecipes(data.hits);

        // save the fetched data to localStorage
        localStorage.setItem('lowfatRecipes', JSON.stringify(data.hits));
        localStorage.setItem('lowfatRecipesTimestamp', currentTime);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchLowfatRecipes();
  }, []);
  return (
    <div className="bg-green-50 px-4 py-4">
      <h2 className="ml-auto mr-auto w-96 pb-2 text-xl font-semibold">
        Popular Recipes 🔥:
      </h2>
      <div className="ml-auto mr-auto flex w-96 flex-row flex-wrap items-center justify-center gap-4">
        {lowfatRecipes.map((lowfatRecipe, index) => (
          <div key={index} className="w-44 border-b-[0.1rem] border-gray-200">
            <a href={lowfatRecipe.recipe.url} target="_blank">
              <img
                src={lowfatRecipe.recipe.image}
                alt={lowfatRecipe.recipe.label}
                className="rounded-md border border-gray-200 shadow-sm transition-all hover:opacity-60"
              />
              <p className="h-10 text-[0.8rem] font-semibold">
                {lowfatRecipe.recipe.label}
              </p>
            </a>
            <div className="flex flex-row items-center justify-between gap-2 pb-2 text-xs italic">
              <p className="capitalize">
                <span className="text-green-600">
                  {Math.round(Number(lowfatRecipe.recipe.calories))}
                </span>{' '}
                calories
              </p>
              <p className="capitalize">
                <span className="text-green-600">
                  {lowfatRecipe.recipe.ingredients.length}
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

export default GetLowfatRecipes;
