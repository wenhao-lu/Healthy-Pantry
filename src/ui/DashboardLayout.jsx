import { Outlet } from 'react-router-dom';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';
import Footer from './Footer';

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
        <main className="grow overflow-scroll px-6 pt-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;
