import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Footer from './Footer';

function SidebarLayout() {
  return (
    <>
      <div className="block sm:hidden">
        <MobileNav />
      </div>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default SidebarLayout;
