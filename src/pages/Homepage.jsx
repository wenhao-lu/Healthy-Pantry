import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="mt-[26vh]">
      <img
        src="/bg.jpg"
        alt="healthy recipe"
        className="absolute inset-0 z-0 h-screen w-full object-cover object-top"
      />
      <div className="relative z-10 text-center">
        <h1 className="mb-10 pb-6 text-5xl font-normal tracking-tight text-green-50">
          Everything Healthy
        </h1>
        <Link
          to="/recipes"
          className="bg-green-200 px-8 py-6 text-lg font-semibold text-green-800 transition-all hover:bg-green-500"
        >
          Explore Recipes
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
