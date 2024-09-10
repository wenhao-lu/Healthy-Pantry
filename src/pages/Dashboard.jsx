import { useQuery, useQueryClient } from '@tanstack/react-query';
import { HiOutlineBriefcase } from 'react-icons/hi2';
import { getStocks } from '../services/apiStocks';
import Spinner from '../ui/Spinner';
import { getRecipes } from '../services/apiRecipes';

function Dashboard() {
  const queryClient = useQueryClient();

  const {
    data: stocks,
    isLoading: loadingStocks,
    error: errorStocks,
  } = useQuery({
    queryKey: ['stocks'],
    queryFn: getStocks,
  });

  const {
    data: recipes,
    isLoading: loadingRecipes,
    error: errorRecipes,
  } = useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipes,
  });

  return (
    <>
      <div className="text-l pb-5 font-semibold leading-5">Dashboard</div>
      <div className="flex flex-col justify-center text-xs">
        <div className="grid grid-cols-4 gap-3">
          <div className="rounded-md border-gray-100 bg-gray-50 p-4">
            <div className="relative grid grid-cols-3 items-center gap-3">
              <div className="ml-[-0.5rem] flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                <HiOutlineBriefcase />
              </div>
              <div>
                <h5 className="mb-[-0.4rem] self-end text-[0.5rem] font-semibold uppercase tracking-wide text-gray-500">
                  Stocks
                </h5>
                <div className="text-sm">
                  {loadingStocks ? (
                    <Spinner />
                  ) : errorStocks ? (
                    <div>Error: {errorStocks.message}</div>
                  ) : (
                    stocks.length
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border-gray-100 bg-gray-50 p-4">
            <div className="relative grid grid-cols-3 items-center gap-3">
              <div className="ml-[-0.5rem] flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                <HiOutlineBriefcase />
              </div>
              <div>
                <h5 className="mb-[-0.4rem] self-end text-[0.5rem] font-semibold uppercase tracking-wide text-gray-500">
                  Recipes
                </h5>
                <div className="text-sm">
                  {loadingRecipes ? (
                    <Spinner />
                  ) : errorRecipes ? (
                    <div>Error: {errorRecipes.message}</div>
                  ) : (
                    recipes.length
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border-gray-100 bg-gray-50 p-4">
            <div className="relative grid grid-cols-3 items-center gap-3">
              <div className="ml-[-0.5rem] flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                <HiOutlineBriefcase />
              </div>
              <div>
                <h5 className="mb-[-0.4rem] self-end text-[0.5rem] font-semibold uppercase tracking-wide text-gray-500">
                  title
                </h5>
                <p className="text-sm">stat</p>
              </div>
            </div>
          </div>

          <div className="rounded-md border-gray-100 bg-gray-50 p-4">
            <div className="relative grid grid-cols-3 items-center gap-3">
              <div className="ml-[-0.5rem] flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                <HiOutlineBriefcase />
              </div>
              <div>
                <h5 className="mb-[-0.4rem] self-end text-[0.5rem] font-semibold uppercase tracking-wide text-gray-500">
                  title
                </h5>
                <p className="text-sm">stat</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 grid grid-cols-2 gap-3">
          <div className="rounded-md border-gray-100 bg-gray-50 py-14"></div>
          <div className="rounded-md border-gray-100 bg-gray-50 py-14"></div>
        </div>

        <div>
          <div className="rounded-md border-gray-100 bg-gray-50 py-24"></div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
