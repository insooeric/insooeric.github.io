import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("tab-1");

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("tab-1");
    } else if (location.pathname === "/about") {
      setActiveTab("tab-2");
    } else if (location.pathname === "/projects") {
      setActiveTab("tab-3");
    } else if (location.pathname === "/playground") {
      setActiveTab("tab-4");
    }
  }, [location]);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="segmented-control">
          <input
            type="radio"
            name="radio2"
            value="tab-1"
            id="tab-1"
            checked={activeTab === "tab-1"}
            onChange={() => setActiveTab("tab-1")}
          />
          <Link to="/" className="segmented-control__1">
            <label htmlFor="tab-1">Home</label>
          </Link>

          <input
            type="radio"
            name="radio2"
            value="tab-2"
            id="tab-2"
            checked={activeTab === "tab-2"}
            onChange={() => setActiveTab("tab-2")}
          />
          <Link to="/about" className="segmented-control__2">
            <label htmlFor="tab-2">About</label>
          </Link>

          <input
            type="radio"
            name="radio2"
            value="tab-3"
            id="tab-3"
            checked={activeTab === "tab-3"}
            onChange={() => setActiveTab("tab-3")}
          />
          <Link to="/projects" className="segmented-control__3">
            <label htmlFor="tab-3">Projects</label>
          </Link>

          <input
            type="radio"
            name="radio2"
            value="tab-4"
            id="tab-4"
            checked={activeTab === "tab-4"}
            onChange={() => setActiveTab("tab-4")}
          />
          <Link to="/playground" className="segmented-control__4">
            <label htmlFor="tab-4">Junks</label>
          </Link>

          <div className="segmented-control__color" />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
