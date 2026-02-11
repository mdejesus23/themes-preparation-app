import { Outlet } from 'react-router-dom';
import Main from './Main';
import Logout from '../features/authentication/Logout';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollTotop';
import BibleWidget from './BibleWidget';

function AppLayout() {
  return (
    <div className="bg-bgPrimary transition-colors duration-300">
      <Header />
      <div className="min-h-screens flex h-full w-full md:mb-0">
        <Sidebar />
        <Main type="primary">
          <Logout />
          <Outlet />
          <Footer />
        </Main>
        <ScrollToTopButton />
        <BibleWidget />
      </div>
    </div>
  );
}

export default AppLayout;
