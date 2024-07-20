import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      AppLayout
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
