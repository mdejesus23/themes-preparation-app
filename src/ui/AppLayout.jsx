import { Outlet } from 'react-router-dom';
import Main from './Main';

import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Main type="primary">
        <Outlet />
      </Main>
    </div>
  );
}

export default AppLayout;
