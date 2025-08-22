// src/pages/HomePage.jsx
import DesktopView from '../views/DesktopView';
import MobileView from '../views/MobileView';

const HomePage = () => {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopView />
      </div>
      <div className="block lg:hidden">
        <MobileView />
      </div>
    </>
  );
};

export default HomePage;