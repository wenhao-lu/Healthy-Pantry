import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './ui/Navbar';
import Homepage from './pages/Homepage';
import Stocks from './pages/Stocks';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import About from './ui/About';
import Login from './ui/Login';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Status from './components/Status';
import StockList from './components/StockList';
import RecipeList from './components/RecipeList';
import Account from './pages/Account';
import PageNotFound from './ui/PageNotFound';
import BasicLayout from './ui/BasicLayout';
import SidebarLayout from './ui/SidebarLayout';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col items-center gap-6 px-4 py-6">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />

          <Route path="app" element={<AppLayout />}>
            <Route element={<BasicLayout />}>
              <Route path="stocks" element={<Stocks />} />
              <Route path="recipes" element={<Recipes />} />
              <Route path="recipes/:id" element={<RecipeDetail />} />
            </Route>

            <Route element={<SidebarLayout />}>
              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<Status />} />
                <Route path="stocklist" element={<StockList />} />
                <Route path="recipelist" element={<RecipeList />} />
                <Route path="account" element={<Account />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
