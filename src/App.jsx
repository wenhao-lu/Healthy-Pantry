import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import RootLayout from './ui/RootLayout';
import Homepage from './pages/Homepage';
import StocksPage from './pages/StocksPage';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import About from './ui/About';
import Login from './ui/Login';

import Dashboard from './pages/Dashboard';

import StockList from './components/StockList';
import RecipeList from './components/RecipeList';
import Account from './pages/Account';
import PageNotFound from './ui/PageNotFound';
import DashboardLayout from './ui/DashboardLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <BrowserRouter>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />

            <Route path="/stocks" element={<StocksPage />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="stocklist" element={<StockList />} />
              <Route path="recipelist" element={<RecipeList />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </RootLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
