import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { APP_ID, APP_ID_1, APP_KEY, APP_KEY_1 } from '../services/apiAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addStock,
  deleteStock,
  editStock,
  getStocks,
} from '../services/apiStocks';
import Spinner from '../ui/Spinner';
import GetLowfatRecipes from '../components/GetLowfatRecipes';
import { Link } from 'react-router-dom';
import truncateText from '../services/truncateText';
import LikeButton from '../ui/LikeButton';

function StocksPage({ lowfatRecipes, setLowfatRecipes }) {
  const [stockName, setStockName] = useState('');
  const [stockQuantity, setStockQuantity] = useState(0);
  const [stockUnit, setStockUnit] = useState('g');
  const [recipes, setRecipes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // add new food to stock and load them from database 'stocks'
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

  const deleteStockMutation = useMutation({
    mutationFn: deleteStock,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stocks'],
      });
    },
  });

  const editStockMutation = useMutation({
    mutationFn: ({ id, updatedStock }) => editStock(id, updatedStock),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stocks'],
      });
    },
  });

  function hendleDeleteStock(id) {
    deleteStockMutation.mutate(id);
  }

  // handle editing a selected stock item
  function handleEditStock(id) {
    const selectedStock = stocks.find((item) => item.id === id);
    setStockName(selectedStock.stockName);
    setStockQuantity(selectedStock.stockQuantity);
    setStockUnit(selectedStock.stockUnit);
    setSelectedId(id);
    setShowEditForm(true);
  }

  function handleSubmitEdit(e) {
    e.preventDefault();
    if (!stockName || stockQuantity <= 0) return;
    const updatedStock = {
      stockName,
      stockQuantity,
      stockUnit,
    };
    try {
      editStockMutation.mutate(
        { id: selectedId, updatedStock },
        {
          onSuccess: () => {
            setStockName('');
            setStockQuantity(0);
            setStockUnit('g');
            setShowEditForm(false);
          },
          onError: (error) => {
            console.error('Error updating stock', error);
          },
        },
      );
    } catch (error) {
      console.err('Error updating stock', error);
    }
  }

  function handleToggleEditForm() {
    setShowEditForm((showEditForm) => !showEditForm);
  }

  // onClick to search for recipes based on selected food
  const handleSearchClick = async (itemName) => {
    try {
      let response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${itemName}&app_id=${APP_ID}&app_key=${APP_KEY}`,
      );
      let data = await response.json();

      //console.log(data);
      // only disply 10 recipes on the page
      const sliceData = data.hits.slice(0, 10);
      setRecipes(sliceData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // fetch nutrition data when adding new food stocks, then save combined info to supabase
  async function fetchStockNutrition(stockName, stockQuantity, stockUnit) {
    try {
      const res = await fetch(
        `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID_1}&app_key=${APP_KEY_1}&nutrition-type=cooking&ingr=${stockQuantity}%20${stockUnit}%20${stockName}`,
      );
      const data = await res.json();
      console.log(data);

      const nutritionData = {
        calories: data?.totalNutrients?.ENERC_KCAL
          ? Math.round(Number(data.totalNutrients.ENERC_KCAL.quantity) * 100) /
              100 +
            data.totalNutrients.ENERC_KCAL.unit
          : '0kcal',
        protein: data?.totalNutrients?.PROCNT
          ? Math.round(Number(data.totalNutrients.PROCNT.quantity) * 100) /
              100 +
            data.totalNutrients.PROCNT.unit
          : '0g',
        carbohydrate: data?.totalNutrients?.CHOCDF
          ? Math.round(Number(data.totalNutrients.CHOCDF.quantity) * 100) /
              100 +
            data.totalNutrients.CHOCDF.unit
          : '0g',
        fat: data?.totalNutrients?.FAT
          ? Math.round(Number(data.totalNutrients.FAT.quantity) * 100) / 100 +
            data.totalNutrients.FAT.unit
          : '0g',
        fiber: data?.totalNutrients?.FIBTG
          ? Math.round(Number(data.totalNutrients.FIBTG.quantity) * 100) / 100 +
            data.totalNutrients.FIBTG.unit
          : '0g',
        sugar: data?.totalNutrients?.SUGAR
          ? Math.round(Number(data.totalNutrients.SUGAR.quantity) * 100) / 100 +
            data.totalNutrients.SUGAR.unit
          : '0g',
      };

      return nutritionData;
    } catch (error) {
      console.error('Error fetching stock nutrition:', error);
      throw new Error('Failed to fetch stock nutrition');
    }
  }

  // handle form submittion, add new food stock
  function handleSubmit(e) {
    e.preventDefault();

    if (!stockName || stockQuantity <= 0) return;

    const newStock = {
      stockName,
      stockQuantity,
      stockUnit,
    };

    try {
      fetchStockNutrition(stockName, stockQuantity, stockUnit)
        .then((nutritionData) => {
          const combinedData = {
            ...newStock,
            ...nutritionData,
          };

          addStockMutation.mutate(combinedData);

          setStockName('');
          setStockQuantity(0);
          setStockUnit('g');
        })
        .catch((error) => {
          console.error('Error adding stock', error);
        });
    } catch (error) {
      console.err('Error adding stock', error);
    }
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
            //value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            className="w-32 rounded-md border border-gray-300 bg-yellow-50 px-2 py-1.5"
          ></input>
          <input
            type="text"
            //value={stockQuantity}
            placeholder="1"
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            className="w-32 rounded-md border border-gray-300 bg-yellow-50 px-2 py-1.5"
          ></input>

          <select
            className="rounded-md bg-yellow-50 text-center"
            //value={stockUnit}
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

        <Button style="primary">Add</Button>
      </form>

      <div className="min-h-[30dvh] bg-indigo-50 px-4 py-4">
        <div className="ml-auto mr-auto w-[28rem]">
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
                  className="grid grid-cols-4 items-center justify-between border-b-2 border-gray-200"
                >
                  <div className="flex w-48 text-gray-700">
                    <p className="capitalize">{item.stockName}</p>
                    <p className="pl-4 pr-1 text-gray-500">
                      {item.stockQuantity}
                    </p>
                    <p className="italic text-gray-500">{item.stockUnit}</p>
                  </div>

                  <div className="col-span-2 flex flex-wrap items-center gap-2 py-1 text-[0.5rem]">
                    <div className="flex">
                      <p className="rounded-sm bg-gray-300 px-0.5">Calories</p>
                      <p className="rounded-sm bg-gray-50 px-0.5">
                        {item.calories}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="rounded-sm bg-gray-300 px-0.5">Protein</p>
                      <p className="rounded-sm bg-gray-50 px-0.5">
                        {item.protein}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="rounded-sm bg-gray-300 px-0.5">Cabs</p>
                      <p className="rounded-sm bg-gray-50 px-0.5">
                        {item.carbohydrate}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="rounded-sm bg-gray-300 px-0.5">Fat</p>
                      <p className="rounded-sm bg-gray-50 px-0.5">{item.fat}</p>
                    </div>
                    <div className="flex">
                      <p className="rounded-sm bg-gray-300 px-0.5">Fiber</p>
                      <p className="rounded-sm bg-gray-50 px-0.5">
                        {item.fiber}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="rounded-sm bg-gray-300 px-0.5">Sugar</p>
                      <p className="rounded-sm bg-gray-100 px-0.5">
                        {item.sugar}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 pl-3">
                    <button
                      className="opacity-60 hover:opacity-100"
                      onClick={() => handleEditStock(item.id)}
                    >
                      📝
                    </button>

                    <button
                      className="opacity-60 hover:opacity-100"
                      onClick={() => hendleDeleteStock(item.id)}
                    >
                      ✖️
                    </button>

                    <button
                      className="text-xl opacity-70 hover:opacity-100"
                      onClick={() => handleSearchClick(item.stockName)}
                    >
                      🧑‍🍳
                    </button>
                  </div>
                </li>
              ))}

              {showEditForm && (
                <form
                  onSubmit={handleSubmitEdit}
                  className="m-auto flex w-4/5 flex-col items-center rounded-md border border-indigo-200 shadow-sm transition"
                >
                  <div className="flex flex-nowrap gap-2 pt-2">
                    <input
                      type="text"
                      id="stockName"
                      value={stockName}
                      onChange={(e) => setStockName(e.target.value)}
                      className="w-20 rounded-sm"
                    />
                    <input
                      type="text"
                      id="stockQuantity"
                      value={stockQuantity}
                      onChange={(e) => setStockQuantity(e.target.value)}
                      className="w-20 rounded-sm"
                    />
                    <input
                      type="text"
                      id="stockUnit"
                      value={stockUnit}
                      onChange={(e) => setStockUnit(e.target.value)}
                      className="w-20 rounded-sm"
                    />
                  </div>
                  <div className="flex gap-2 py-2 tracking-tighter">
                    <Button style="small" onClick={handleToggleEditForm}>
                      Cancel
                    </Button>
                    <Button style="small">Edit</Button>
                  </div>
                </form>
              )}
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
            Your Recipes 🌿:
          </h2>
          <div className="ml-auto mr-auto flex w-96 flex-row flex-wrap items-center justify-center gap-4">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="w-44 border-b-[0.1rem] border-gray-200"
              >
                <Link to={`/recipes/${recipe.recipe.uri.split('_').pop()}`}>
                  <img
                    src={recipe.recipe.image}
                    alt={recipe.recipe.label}
                    className="rounded-md border border-gray-200 shadow-sm transition-all hover:opacity-60"
                  />
                </Link>
                <div className="flex items-center justify-between">
                  <p className="h-10 text-[0.8rem] font-semibold">
                    {truncateText(recipe.recipe.label, 40)}
                  </p>
                  <LikeButton
                    recipeName={recipe.recipe.label}
                    recipeStyle={recipe.recipe.cuisineType[0]}
                    recipeType={recipe.recipe.mealType[0]}
                    recipeCabs={Math.round(Number(recipe.recipe.calories))}
                    recipeImage={recipe.recipe.image}
                    recipeUri={recipe.recipe.uri.split('_').pop()}
                  />
                </div>

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
        <GetLowfatRecipes
          lowfatRecipes={lowfatRecipes}
          setLowfatRecipes={setLowfatRecipes}
        />
      )}
    </div>
  );
}

export default StocksPage;
