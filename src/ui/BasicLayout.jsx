import { Outlet } from 'react-router-dom';

function BasicLayout() {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
}

export default BasicLayout;
