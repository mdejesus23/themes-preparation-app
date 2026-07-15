import { Outlet } from 'react-router-dom';
import Main from './Main';

// import Header from './Header';
import PublicHeader from './PublicHeader';
import Footer from './Footer';
import ScrollToTopButton from './ScrollTotop';

function PublicAppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-bgSecondary">
      <PublicHeader />
      <div className="flex w-full flex-1">
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
