function RecipeList() {
  return (
    <div className="flex w-full items-center justify-between">
      <div
        role="table"
        className="grow overflow-hidden rounded-sm border-l border-gray-200 bg-gray-50 text-xs"
      >
        <header
          role="row"
          className="grid w-full grid-cols-5 items-center justify-center gap-6 px-4 pb-2 pt-4 text-[0.6rem] font-bold uppercase tracking-wide text-gray-600"
        >
          <div>Photo</div>
          <div>Recipe</div>
          <div>Ingredients</div>
          <div>Styles</div>
          <div>Operation</div>
        </header>
        <section>
          <div
            role="row"
            className="border-b-1 grid grid-cols-5 items-center justify-center gap-6 border-gray-100 px-4 py-2 font-[600] text-gray-600"
          >
            <div>Image</div>
            <div>Chicken Tikka Masala</div>
            <div>Chicken, Garlic Cloves, Onion, Yogurt</div>
            <div>Mexican</div>
            <div>CRUD</div>
          </div>

          <div
            role="row"
            className="border-b-1 grid grid-cols-5 items-center justify-center gap-6 whitespace-normal border-gray-100 px-4 py-2 font-[600] text-gray-600"
          >
            <div>Image</div>
            <div>Spicy Tuna Roll</div>
            <div>Tuna, Rice, Avocado, Soy Sauce</div>
            <div>Japanese</div>
            <div>CRUD</div>
          </div>
        </section>
        <footer></footer>
      </div>
    </div>
  );
}

export default RecipeList;
