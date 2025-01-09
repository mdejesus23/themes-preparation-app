import { Outlet } from 'react-router-dom';
import Main from './Main';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function AppLayout() {
  return (
    <div className="">
      <Header />
      <div className="min-h-screens flex h-full w-full md:mb-0">
        <Sidebar />
        <Main type="primary">
          <Outlet />
          <Footer />
        </Main>
      </div>
    </div>
  );
}

export default AppLayout;
