import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APP_ID, APP_KEY } from '../services/apiAuth';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        // save selected recipe in localstorage to prevent frequent API calls
        // styling purpose
        const storedData = localStorage.getItem('selectedRecipe');
        const storedTimestamp = localStorage.getItem('selectedRecipeTimestamp');
        const currentTime = Date.now();

        if (storedData && storedTimestamp) {
          const ageInHours = (currentTime - storedTimestamp) / 1000 / 60 / 60;
          if (ageInHours < 6) {
            setRecipe(JSON.parse(storedData));
            return;
          }
        }

        const res = await fetch(
          `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`,
        );
        const data = await res.json();
        console.log(data);
        setRecipe(data.recipe);

        // save the fetched data to localStorage
        localStorage.setItem('selectedRecipe', JSON.stringify(data.recipe));
        localStorage.setItem('selectedRecipeTimestamp', currentTime);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchRecipe();
  }, [id]);

  return (
    <>
      {recipe && (
        <div className="flex flex-col gap-4 rounded-sm p-2">
          <div className="flex min-w-96 justify-around px-4 py-4 shadow-xl">
            <div>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={recipe.image}
                  alt={recipe.label}
                  className="w-40 rounded-sm border border-gray-200 shadow-sm transition-all hover:opacity-80"
                />
              </a>
            </div>

            <div className="text-center text-xs">
              <p className="h-10 text-sm font-bold">{recipe.label}</p>

              <div className="mb-0.5 flex justify-center gap-1">
                {recipe.cuisineType &&
                  recipe.cuisineType.map((cuiType, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-yellow-500 px-0.5 italic"
                    >
                      {cuiType}
                    </span>
                  ))}
              </div>

              <div className="mb-0.5 flex justify-center gap-1">
                {recipe.dishType &&
                  recipe.dishType.map((diType, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-orange-500 px-0.5 italic"
                    >
                      {diType}
                    </span>
                  ))}
              </div>

              <div className="mb-0.5 flex justify-center gap-1">
                {recipe.mealType &&
                  recipe.mealType.map((meType, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-cyan-500 px-0.5 italic"
                    >
                      {meType}
                    </span>
                  ))}
              </div>

              <div className="mb-0.5 flex justify-center gap-1">
                {recipe.dietLabels &&
                  recipe.dietLabels.map((dietLabel, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-lime-500 px-0.5 italic"
                    >
                      {dietLabel}
                    </span>
                  ))}
              </div>

              <div className="mt-2">
                <p className="mb-2">See full instruction on </p>
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-gray-400 bg-gray-200 p-1 shadow-sm transition-all hover:bg-gray-100"
                >
                  {recipe.source}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between shadow-md">
            <div className="">
              <p>Ingredients</p>
            </div>
            <div>
              <p>Nutrition</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeDetail;
