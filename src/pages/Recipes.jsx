import GetRandomRecipes from '../components/GetRandomRecipes';

function Recipes({ randomRecipes, setRandomRecipes }) {
  return (
    <div>
      Healthy Recipes 🥗
      <GetRandomRecipes
        randomRecipes={randomRecipes}
        setRandomRecipes={setRandomRecipes}
      />
    </div>
  );
}

export default Recipes;
