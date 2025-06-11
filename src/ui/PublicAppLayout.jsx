import { Outlet } from 'react-router-dom';
import Main from './Main';

// import Header from './Header';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import ScrollToTopButton from './ScrollTotop';

function PublicAppLayout() {
  return (
    <div className="">
      <PublicHeader />
      <div className="min-h-screens flex h-full w-full md:mb-0">
        <Main type="primary">
          <Outlet />
          <Footer />
        </Main>
        <ScrollToTopButton />
      </div>
    </div>
  );
}

export default PublicAppLayout;
