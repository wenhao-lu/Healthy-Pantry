import { HiOutlineUser } from 'react-icons/hi';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { PiForkKnife } from 'react-icons/pi';
import { MdQueryStats } from 'react-icons/md';
import { LuBanana } from 'react-icons/lu';

function MobileNav() {
  return (
    <div className="flex w-screen items-center justify-between gap-6 border-b-2 bg-gray-50 px-9 py-3">
      <div className="flex items-center justify-center gap-3 text-xs font-semibold text-gray-600">
        <img
          src="/avatar.jpg"
          alt="user avatar"
          className="w-8 rounded-[50%] outline outline-1"
        />
        <p>User</p>
      </div>
      <nav>
        <ul className="flex items-center justify-around gap-6">
          <li>
            <a
              href="/dashboard"
              className="flex rounded-sm px-1 py-2 hover:bg-gray-100"
            >
              <MdQueryStats className="text-xl text-gray-400 transition-all visited:bg-blue-400 hover:text-gray-500 active:bg-green-900 active:text-green-500" />
            </a>
          </li>

          <li>
            <a
              href="/dashboard/stocklist"
              className="flex rounded-sm px-1 py-2 hover:bg-gray-100"
            >
              <LuBanana className="text-xl text-gray-400 transition-all visited:bg-blue-400 hover:text-gray-500 active:bg-green-900 active:text-green-500" />
            </a>
          </li>
          <li>
            <a
              href="/dashboard/recipelist"
              className="flex rounded-sm px-1 py-2 hover:bg-gray-100"
            >
              <PiForkKnife className="text-xl text-gray-400 transition-all hover:text-gray-500" />
            </a>
          </li>
          <li>
            <a
              href="/dashboard/account"
              className="flex rounded-sm px-1 py-2 hover:bg-gray-100"
            >
              <HiOutlineUser className="text-xl text-gray-400 transition-all hover:text-gray-500" />
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="flex rounded-sm px-1 py-2 hover:bg-gray-100"
            >
              <FaArrowRightFromBracket className="text-xl text-gray-400 transition-all hover:text-gray-500" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MobileNav;
