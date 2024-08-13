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
          <div className="flex min-w-[26rem] justify-around px-4 py-4 shadow-xl">
            <div>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={recipe.image}
                  alt={recipe.label}
                  className="w-40 rounded-sm border border-gray-200 shadow-sm transition-all hover:opacity-80"
                />
              </a>
            </div>

            <div className="text-center">
              <p className="h-10 text-sm font-bold">{recipe.label}</p>
              <div className="mx-auto my-0 flex max-w-[40vw] flex-row flex-wrap justify-center gap-2 px-2 text-[0.6rem]">
                <div className="flex justify-center gap-1">
                  {recipe.cuisineType &&
                    recipe.cuisineType.map((cuiType, index) => (
                      <span
                        key={index}
                        className="rounded-md bg-orange-500 px-1 italic"
                      >
                        {cuiType}
                      </span>
                    ))}
                </div>

                <div className="flex justify-center gap-1">
                  {recipe.dishType &&
                    recipe.dishType.map((diType, index) => (
                      <span
                        key={index}
                        className="rounded-md bg-yellow-500 px-1 italic"
                      >
                        {diType}
                      </span>
                    ))}
                </div>

                <div className="flex justify-center gap-1">
                  {recipe.mealType &&
                    recipe.mealType.map((meType, index) => (
                      <span
                        key={index}
                        className="rounded-md bg-cyan-500 px-1 italic"
                      >
                        {meType}
                      </span>
                    ))}
                </div>

                <div className="flex justify-center gap-1">
                  {recipe.dietLabels &&
                    recipe.dietLabels.map((dietLabel, index) => (
                      <span
                        key={index}
                        className="rounded-md bg-lime-500 px-1 italic"
                      >
                        {dietLabel}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <div>
                  <div className="text-sm text-gray-500">
                    {Math.round(Number(recipe.calories / recipe.yield))}
                  </div>
                  <div className="text-[0.6rem] uppercase">
                    calories/serving
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">
                    {Math.round(
                      Number(
                        recipe.totalDaily.ENERC_KCAL.quantity / recipe.yield,
                      ),
                    )}
                    %
                  </div>
                  <div className="text-[0.6rem] uppercase">daily value</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">{recipe.yield}</div>
                  <div className="text-[0.6rem] uppercase">servings</div>
                </div>
              </div>

              <div className="mt-2 flex justify-center gap-2 text-xs">
                <p className="mb-2">Full instruction</p> 👉
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-lime-500 via-cyan-500 to-orange-500 bg-clip-text text-transparent transition-all duration-300 hover:from-yellow-500 hover:via-indigo-500 hover:to-lime-500"
                >
                  {recipe.source}
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 px-2 shadow-md">
            <div className="">
              <p className="border-b-2 pb-2">Ingredients</p>
              <div className="mb-4">
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="mt-4 flex items-center gap-2">
                      <img
                        src={ingredient.image}
                        alt={ingredient.text}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="text-[0.7rem] text-gray-600">
                        {ingredient.text}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <p className="border-b-2 pb-2">Nutrition</p>
              <div>
                {recipe.digest &&
                  recipe.digest.map((nutrient, index) => (
                    <div key={index} className="mt-4 flex items-center gap-2">
                      <div className="flex text-[0.7rem] text-gray-600">
                        <div className="w-20">{nutrient.label}</div>
                        <div className="w-10">
                          {Math.round(Number(nutrient.total / recipe.yield))}
                        </div>
                        <div className="w-8">{nutrient.unit}</div>
                        <div>
                          {Math.round(Number(nutrient.daily / recipe.yield))}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeDetail;
