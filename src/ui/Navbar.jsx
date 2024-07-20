import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavLink to="/app/stocks">Stocks</NavLink>
      <NavLink to="/app/recipes">Recipes</NavLink>
      <NavLink to="/app/dashboard">Dashboard</NavLink>
    </nav>
  );
}

export default Navbar;
