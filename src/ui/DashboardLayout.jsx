import { Outlet } from 'react-router-dom';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';

function DashboardLayout() {
  return (
    <>
      <div className="block sm:hidden">
        <MobileNav />
      </div>
      <div className="flex h-screen">
        <div className="hidden sm:block">
          <Sidebar />
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;
