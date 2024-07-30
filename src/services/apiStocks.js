import supabase from './supabase';

export async function getStocks() {
  let { data, error } = await supabase.from('stocks').select('*');

  if (error) {
    console.error(error);
    throw new Error('Stocks could not be loaded');
  }

  return data;
}

export async function addStock(newStock) {
  const { data, error } = await supabase.from('stocks').insert([newStock]);

  if (error) {
    console.error(error);
    throw new Error('Stock could not be added');
  }

  return data;
}
