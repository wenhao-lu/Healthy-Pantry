import GetHighfiberRecipes from '../components/GetHighfiberRecipes';
import GetLowfatRecipes from '../components/GetLowfatRecipes';

function Recipes({
  highfiberRecipes,
  setHighfiberRecipes,
  lowfatRecipes,
  setLowfatRecipes,
}) {
  return (
    <>
      <p>Today's popular Recipes 🔥</p>
      <div>
        <p>High-Fiber 🍠</p>
        <GetHighfiberRecipes
          highfiberRecipes={highfiberRecipes}
          setHighfiberRecipes={setHighfiberRecipes}
        />
      </div>
      <div>
        <p>Low-Fat 🥗</p>
        <GetLowfatRecipes
          lowfatRecipes={lowfatRecipes}
          setLowfatRecipes={setLowfatRecipes}
        />
      </div>
    </>
  );
}

export default Recipes;
