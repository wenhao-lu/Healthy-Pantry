import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="z-10 flex items-center gap-1">
      <img
        src="/logo.png"
        alt="healty pantry logo"
        className="h-10 w-10 sm:h-16 sm:w-16"
      />
      <span className="sm:text-l text-xs font-semibold text-green-900 transition-colors hover:text-green-500">
        Healthy Pantry
      </span>
    </Link>
  );
}

export default Logo;
