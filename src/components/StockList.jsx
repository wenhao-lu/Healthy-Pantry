function StockList() {
  return (
    <div className="flex w-full items-center justify-between">
      <div
        role="table"
        className="overflow-hidden rounded-sm border-l border-gray-200 bg-gray-50 text-sm"
      >
        <header
          role="row"
          className="grid w-full grid-cols-5 items-center justify-center gap-6 px-6 py-6"
        >
          <div>Ingredient</div>
          <div>Nutrition</div>
          <div>Calories</div>
          <div>Quantity</div>
          <div>Operation</div>
        </header>
        <section>
          <div role="row"></div>
        </section>
        <footer></footer>
      </div>
    </div>
  );
}

export default StockList;
