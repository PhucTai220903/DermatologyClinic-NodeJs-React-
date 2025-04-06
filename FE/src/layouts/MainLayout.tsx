import { Outlet } from "react-router-dom";
import Footer from "../components/customer/Footer";
import Navigation_bar from "../components/customer/Navigation_bar";

const MainLayout = () => {
  return (
    <>
      <Navigation_bar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
