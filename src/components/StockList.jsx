import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '../ui/Spinner';
import { deleteStock, getStocks } from '../services/apiStocks';

function StockList() {
  const queryClient = useQueryClient();

  const {
    data: stocks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['stocks'],
    queryFn: getStocks,
  });

  const deleteRecipeMutation = useMutation({
    mutationFn: deleteStock,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stocks'],
      });
    },
  });

  function handleDeleteClick(id) {
    deleteRecipeMutation.mutate(id);
  }

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex w-full items-center justify-between">
      <div
        role="table"
        className="grow overflow-hidden rounded-sm border-l border-gray-200 bg-gray-50 text-xs"
      >
        <header
          role="row"
          className="grid w-full grid-cols-7 items-center justify-center px-2 pb-2 pt-4 text-center text-[0.6rem] font-bold uppercase text-gray-600"
        >
          <div>Name</div>
          <div>Quantity</div>
          <div className="col-span-2">Calories</div>
          <div>Protein</div>
          <div>Cabs</div>
          <div></div>
        </header>
        <section>
          {stocks.map((stock) => (
            <div
              key={stock.id}
              role="row"
              className="border-b-1 grid grid-cols-7 items-center justify-center gap-2 border-gray-100 px-3 py-2 text-center text-[0.6rem] font-[600] text-gray-600"
            >
              <div className="font-semibold capitalize">{stock.stockName}</div>
              <div className="break-words text-[0.55rem] italic">
                {`${stock.stockQuantity} ${stock.stockUnit}`}
              </div>

              <div className="col-span-2 text-[0.55rem] italic">
                {stock.calories}
              </div>
              <div className="text-[0.55rem] italic">{stock.protein}</div>
              <div className="text-[0.50rem] italic">{stock.carbohydrate}</div>
              <div>
                <button
                  className="px-1 opacity-60 hover:opacity-100"
                  onClick={() => handleDeleteClick(stock.id)}
                >
                  ✖️
                </button>
                <button
                  className="px-1 text-[0.8rem] opacity-70 hover:opacity-100"
                  onClick={() => handleSearchClick(stock.stockName)}
                >
                  🧑‍🍳
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default StockList;
