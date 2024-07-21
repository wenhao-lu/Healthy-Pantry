import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="z-10 flex items-center gap-3">
      <img
        src="/logo.png"
        alt="healty pantry logo"
        className="h-12 w-12 sm:h-16 sm:w-16"
      />
      <span className="text-l font-semibold text-green-900 transition-colors hover:text-green-500 sm:text-xl">
        Healthy Pantry
      </span>
    </Link>
  );
}

export default Logo;
