import { Outlet } from 'react-router-dom';
import Main from './Main';

import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div>
      <Header />
      <div className="min-h-screens flex w-full">
        <Sidebar />
        <Main type="primary">
          <Outlet />
        </Main>
      </div>
    </div>
  );
}

export default AppLayout;
