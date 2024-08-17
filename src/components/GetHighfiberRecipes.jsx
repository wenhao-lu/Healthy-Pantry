import { useEffect, useState } from 'react';
import { APP_ID, APP_KEY } from '../services/apiAuth';
import truncateText from '../services/truncateText';
import { Link } from 'react-router-dom';

function GetHighfiberRecipes() {
  const [highfiberRecipes, setHighfiberRecipes] = useState([]);

  useEffect(function () {
    async function fetchHighfiberRecipes() {
      try {
        /* save random recipes in localstorage for 6 hours, to prevent frequent API calls */

        const storedData = localStorage.getItem('highfiberRecipes');
        const storedTimestamp = localStorage.getItem(
          'highfiberRecipesTimestamp',
        );
        const currentTime = Date.now();

        if (storedData && storedTimestamp) {
          const ageInHours = (currentTime - storedTimestamp) / 1000 / 60 / 60;
          if (ageInHours < 6) {
            setHighfiberRecipes(JSON.parse(storedData));
            return;
          }
        }

        // fetch new random recipes
        const res = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&from=1&to=3&diet=high-fiber&mealType=Dinner&random=true`,
        );
        const data = await res.json();
        //console.log(data);
        // only disply 6 recipes on the page
        const sliceData = data.hits.slice(0, 6);
        setHighfiberRecipes(sliceData);

        // save the fetched data to localStorage

        localStorage.setItem('highfiberRecipes', JSON.stringify(data.hits));
        localStorage.setItem('highfiberRecipesTimestamp', currentTime);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchHighfiberRecipes();
  }, []);

  return (
    <div className="bg-green-50 px-4 py-4">
      <h2 className="ml-auto mr-auto w-96 pb-2 text-xl font-semibold"></h2>
      <div className="ml-auto mr-auto flex w-96 flex-row flex-wrap items-center justify-center gap-4">
        {highfiberRecipes.map((highfiberRecipe, index) => (
          <div key={index} className="w-44 border-b-[0.1rem] border-gray-200">
            <Link
              to={`/recipes/${highfiberRecipe.recipe.uri.split('_').pop()}`}
            >
              <img
                src={highfiberRecipe.recipe.image}
                alt={highfiberRecipe.recipe.label}
                className="rounded-md border border-gray-200 shadow-sm transition-all hover:opacity-60"
              />
              <p className="h-10 text-[0.8rem] font-semibold">
                {truncateText(highfiberRecipe.recipe.label, 42)}
              </p>

              <div className="flex flex-row items-center justify-between gap-2 pb-2 text-xs italic">
                <p className="capitalize">
                  <span className="text-green-600">
                    {Math.round(Number(highfiberRecipe.recipe.calories))}
                  </span>{' '}
                  calories
                </p>
                <p className="capitalize">
                  <span className="text-green-600">
                    {highfiberRecipe.recipe.ingredients.length}
                  </span>{' '}
                  ingredients
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetHighfiberRecipes;
