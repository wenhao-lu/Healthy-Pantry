import GetLowfatRecipes from '../components/GetLowfatRecipes';

function Recipes({ lowfatRecipes, setLowfatRecipes }) {
  return (
    <div>
      Healthy Recipes 🥗
      <GetLowfatRecipes
        lowfatRecipes={lowfatRecipes}
        setLowfatRecipes={setLowfatRecipes}
      />
    </div>
  );
}

export default Recipes;
