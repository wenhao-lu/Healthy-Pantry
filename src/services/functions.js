// onClick function to search for recipes based on selected food

import { APP_ID, APP_KEY } from './apiAuth';

export const handleSearchClick = async (itemName, setRecipes) => {
  try {
    let response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${itemName}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    let data = await response.json();

    // only display 10 recipes on the page
    const sliceData = data.hits.slice(0, 10);
    setRecipes(sliceData);
  } catch (err) {
    console.error(err.message);
  }
};
