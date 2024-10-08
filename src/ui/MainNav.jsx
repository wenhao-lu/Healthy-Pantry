import { NavLink } from 'react-router-dom';

function MainNav() {
  return (
    <div className="z-10 flex gap-3 text-xs font-semibold text-green-900 sm:text-xl">
      <NavLink to="/stocks" className="transition-colors hover:text-green-500">
        Stocks
      </NavLink>
      <NavLink to="/recipes" className="transition-colors hover:text-green-500">
        Recipes
      </NavLink>
      <NavLink to="/about" className="transition-colors hover:text-green-500">
        About
      </NavLink>
      <NavLink
        to="/dashboard"
        className="transition-colors hover:text-green-500"
      >
        Dashboard
      </NavLink>
    </div>
  );
}

export default MainNav;
