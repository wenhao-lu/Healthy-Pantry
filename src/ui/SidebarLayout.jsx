import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function SidebarLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default SidebarLayout;
