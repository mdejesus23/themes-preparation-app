import { Outlet } from 'react-router-dom';
import Main from './Main';

// import Header from './Header';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import ScrollToTopButton from './ScrollTotop';

function PublicAppLayout() {
  return (
    <div className="bg-bgPrimary transition-colors duration-300">
      <PublicHeader />
      <div className="min-h-screens flex h-full w-full md:mb-0">
        <Main>
          <Outlet />
          <Footer />
        </Main>
        <ScrollToTopButton />
      </div>
    </div>
  );
}

export default PublicAppLayout;
