import { Outlet } from 'react-router-dom';
import Main from './Main';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MobileNav from './MobileNav';
import ScrollToTopButton from './ScrollTotop';
import BibleWidget from './BibleWidget';

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-bgSecondary">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <Main type="primary">
          <Outlet />
          <Footer />
        </Main>
      </div>
      <MobileNav />
      <ScrollToTopButton />
      <BibleWidget />
    </div>
  );
}

export default AppLayout;
