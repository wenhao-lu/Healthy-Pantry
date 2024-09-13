import supabase from './supabase';

export async function getRecipes() {
  let { data, error } = await supabase.from('recipes').select('*');

  if (error) {
    console.error(error);
    throw new Error('Recipes could not be loaded');
  }

  return data;
}

// Function to upload image to Supabase Storage
/*
export const uploadImageToSupabase = async (recipeImage, recipeName) => {
  try {
    // Convert image URL to Blob
    const response = await fetch(recipeImage);
    const blob = await response.blob();

    // Create a unique file name
    const fileName = `${recipeName}-${Date.now()}.jpg`;

    // Upload the image to Supabase Storage
    const { data, error } = await supabase.storage
      .from('recipe-images') // Ensure this is the correct bucket name
      .upload(fileName, blob);

    if (error) throw error;

    // Return the file path of the uploaded image
    return data.path;
  } catch (error) {
    console.error('Error uploading image to Supabase:', error.message);
    throw error;
  }
};

// Add a new recipe to Supabase with the image file path
export const addRecipe = async (recipe) => {
  try {
    // Upload the image first
    const imageFilePath = await uploadImageToSupabase(recipe.recipeImage, recipe.recipeName);
    
    // Update recipe object with the image file path
    const recipeWithImage = { ...recipe, recipeImageFilePath: imageFilePath };
    
    // Insert the recipe into the 'recipes' table
    const { data, error } = await supabase
      .from('recipes')
      .insert([recipeWithImage]);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error('Error adding recipe:', error.message);
    throw error;
  }
};

*/

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

export async function editRecipe(recipeUri, updatedRecipe) {
  const { data, error } = await supabase
    .from('recipes')
    .update(updatedRecipe)
    .eq('recipeUri', recipeUri);

  if (error) {
    console.error(error);
    throw new Error('Recipe could not be updated');
  }

  return data;
}

export async function getRecipeByUri(recipeUri) {
  let { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('recipeUri', recipeUri)
    .maybeSingle();
  //console.log(data);

  if (error && error.code !== 'PGRST116') {
    console.error(error);
    throw new Error('Error fetching recipe by URI');
  }

  return data;
}
