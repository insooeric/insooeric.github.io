import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <NavBar />
        <div className="main-content">
          <div className="main-content-boundary">
            <Outlet />
          </div>
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
