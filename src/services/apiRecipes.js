import supabase from './supabase';

export async function getRecipes() {
  let { data, error } = await supabase.from('recipes').select('*');

  if (error) {
    console.error(error);
    throw new Error('Recipes could not be loaded');
  }

  return data;
}

export async function addRecipe(newRecipe) {
  const { data, error } = await supabase.from('recipes').insert([newRecipe]);

  if (error) {
    console.error(error);
    throw new Error('Recipe could not be added');
  }

  return data;
}

export async function deleteRecipe(recipeUri) {
  const { data, error } = await supabase
    .from('recipes')
    .delete()
    .eq('recipeUri', recipeUri);

  if (error) {
    console.error(error);
    throw new Error('Recipe could not be deleted');
  }

  return data;
}
