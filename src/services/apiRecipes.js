import supabase from './supabase';

export async function getRecipes() {
  let { data, error } = await supabase.from('recipes').select('*');

  if (error) {
    console.error(error);
    throw new Error('Recipes could not be loaded');
  }

  return data;
}
