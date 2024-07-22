import { HiOutlineHome } from 'react-icons/hi';

function Sidebar() {
  return (
    <div className="hidden grid-rows-3 flex-col gap-6 border-r-2 bg-gray-50 px-9 py-9 sm:flex">
      <div className="flex flex-col items-center justify-center gap-3 text-sm font-semibold text-gray-600">
        <img
          src="/avatar.jpg"
          alt="user avatar"
          className="w-11 rounded-[50%] outline outline-1"
        />
        <p>User</p>
      </div>
      <nav>
        <ul className="flex flex-col gap-2">
          <li>
            <a
              href="/dashboard"
              className="flex items-center gap-2 rounded-sm px-1 py-2 text-sm font-normal text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 active:text-gray-800"
            >
              <HiOutlineHome className="text-xl text-gray-400 transition-all hover:text-gray-500" />
              <span>Stats</span>
            </a>
          </li>

          <li>
            <a
              href="/dashboard/account"
              className="flex items-center gap-2 rounded-sm px-1 py-2 text-sm font-normal text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 active:text-gray-800"
            >
              <HiOutlineHome className="text-xl text-gray-400 transition-all hover:text-gray-500" />
              <span>Account</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard/stocklist"
              className="flex items-center gap-2 rounded-sm px-1 py-2 text-sm font-normal text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 active:text-gray-800"
            >
              <HiOutlineHome className="text-xl text-gray-400 transition-all hover:text-gray-500" />
              <span>Stocks</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard/recipelist"
              className="flex items-center gap-2 rounded-sm px-1 py-2 text-sm font-normal text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 active:text-gray-800"
            >
              <HiOutlineHome className="text-xl text-gray-400 transition-all hover:text-gray-500" />
              <span>Recipes</span>
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="flex items-center gap-2 rounded-sm px-1 py-2 text-sm font-normal text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-800 active:text-gray-800"
            >
              <HiOutlineHome className="text-xl text-gray-400 transition-all hover:text-gray-500" />
              <span>Log out</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
