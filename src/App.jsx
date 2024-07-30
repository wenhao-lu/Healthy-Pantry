import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RootLayout from './ui/RootLayout';
import Homepage from './pages/Homepage';
import Stocks from './pages/Stocks';
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      <BrowserRouter>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />

            <Route path="/stocks" element={<Stocks />} />
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
