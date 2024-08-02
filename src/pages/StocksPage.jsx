import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { APP_ID, APP_KEY } from '../services/apiAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addStock, getStocks } from '../services/apiStocks';
import Spinner from '../ui/Spinner';

function StocksPage() {
  const [stockName, setStockName] = useState('');
  const [stockQuantity, setStockQuantity] = useState(0);
  const [stockUnit, setStockUnit] = useState('g');
  const [recipes, setRecipes] = useState([]);
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

  const queryClient = useQueryClient();

  const {
    data: stocks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['stocks'],
    queryFn: getStocks,
  });

  const addStockMutation = useMutation({
    mutationFn: addStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stocks'] });
    },
  });

  const handleSearchClick = async (itemName) => {
    try {
      let response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${itemName}&app_id=${APP_ID}&app_key=${APP_KEY}`,
      );
      let data = await response.json();

      console.log(data);
      setRecipes(data.hits);
    } catch (err) {
      console.error(err.message);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!stockName || stockQuantity <= 0) return;

    const newStock = {
      stockName,
      stockQuantity,
      stockUnit,
    };

    try {
      addStockMutation.mutate(newStock);

      setStockName('');
      setStockQuantity(0);
      setStockUnit('g');
    } catch (error) {
      console.err('Error adding stock', error);
    }
  }

  {
    /*
  function handleDeleteItem(id) {
    setStockList((items) => items.filter((item) => item.id !== id));
  }
  */
  }

  return (
    <div className="w-screen">
      <p className="bg-emerald-100 py-10 text-center text-xl font-semibold">
        🥪 Manage your food stock 🌮
      </p>
      <form
        className="flex flex-col items-center justify-center bg-emerald-200 py-4"
        onSubmit={handleSubmit}
      >
        <p className="text-l pb-4">What food 🍗 in your fridge? </p>

        <div className="flex justify-center gap-4 pb-4">
          <input
            type="text"
            placeholder="food..."
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            className="w-32 rounded-md border border-gray-300 bg-yellow-50 px-2 py-1.5"
          ></input>
          <input
            type="text"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            className="w-32 rounded-md border border-gray-300 bg-yellow-50 px-2 py-1.5"
          ></input>

          <select
            className="rounded-md bg-yellow-50 text-center"
            value={stockUnit}
            onChange={(e) => setStockUnit(e.target.value)}
          >
            <option value="g">g</option>
            <option value="L">L</option>
            <option value="lb">lb</option>
            <option value="kg">kg</option>
            <option value="oz">oz</option>
            <option value="bag">bag</option>
          </select>
        </div>

        <Button type="primary">Add</Button>
      </form>

      <div className="h-[30dvh] bg-indigo-50 px-4 py-4">
        <div className="ml-auto mr-auto w-96">
          <p className="pb-2 text-xl font-semibold">Food List 🧀</p>

          {isLoading ? (
            <Spinner />
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            <ul>
              {stocks.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b-2 border-gray-100 px-2"
                >
                  <div className="flex py-1 text-gray-700">
                    <p className="capitalize">{item.stockName}</p>
                    <p className="pl-4 pr-1">{item.stockQuantity}</p>
                    <p>{item.stockUnit}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      className="text-xl opacity-70 hover:opacity-100"
                      onClick={() => handleSearchClick(item.stockName)}
                    >
                      🧑‍🍳
                    </button>
                    <button
                      className="opacity-60 hover:opacity-100"
                      //onClick={() => handleDeleteItem(item.id)}
                    >
                      ✖️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : recipes.length > 0 ? (
        <div className="bg-green-50 px-4 py-4">
          <h2 className="ml-auto mr-auto w-96 pb-2 text-xl font-semibold">
            Recipes😋:
          </h2>
          <div className="ml-auto mr-auto flex w-96 flex-row flex-wrap items-center justify-center gap-4">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="w-44 border-b-[0.1rem] border-gray-200"
              >
                <a href={recipe.recipe.url} target="_blank">
                  <img
                    src={recipe.recipe.image}
                    alt={recipe.recipe.label}
                    className="rounded-md border border-gray-200 shadow-sm transition-all hover:opacity-60"
                  />
                  <p className="h-10 text-[0.8rem] font-semibold">
                    {recipe.recipe.label}
                  </p>
                </a>
                <div className="flex flex-row items-center justify-between gap-2 pb-2 text-xs italic">
                  <p className="capitalize">
                    <span className="text-green-600">
                      {Math.round(Number(recipe.recipe.calories))}
                    </span>{' '}
                    calories
                  </p>
                  <p className="capitalize">
                    <span className="text-green-600">
                      {recipe.recipe.ingredients.length}
                    </span>{' '}
                    ingredients
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-green-50 px-4 py-4">
          <h2 className="ml-auto mr-auto w-96 pb-2 text-xl font-semibold">
            Recipes😋:
          </h2>
          <div className="ml-auto mr-auto flex w-96 flex-row flex-wrap items-center justify-center gap-4">
            {randomRecipes.map((randomRecipe, index) => (
              <div
                key={index}
                className="w-44 border-b-[0.1rem] border-gray-200"
              >
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
      )}
    </div>
  );
}

export default StocksPage;
