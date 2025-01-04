// import SelfiPic from "../svgs/SelfiPic";
import { useState, useEffect, useRef } from "react";
import LawIcon from "../svgs/LawIcon";
import BookIcon from "../svgs/BookIcon";
import AboutReadme from "../components/AboutReadme";
import AboutLicense from "../components/AboutLicense";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("README");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const updateIndicatorStyle = () => {
      const activeTabElement = navRef.current.querySelector(
        `li[data-tab="${activeTab}"] a`
      );
      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
        setIndicatorStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    };

    updateIndicatorStyle();
    window.addEventListener("resize", updateIndicatorStyle);

    return () => {
      window.removeEventListener("resize", updateIndicatorStyle);
    };
  }, [activeTab]);

  return (
    <>
      <div className="about-page">
        <nav className="tab-nav" ref={navRef}>
          <ul className="tab-ul">
            <li
              data-tab="README"
              onClick={() => handleTabClick("README")}
              className={activeTab === "README" ? "active" : ""}
            >
              <a
                style={{
                  fontWeight: activeTab === "README" ? "bold" : "normal",
                }}
              >
                <BookIcon />
                README
              </a>
            </li>
            <li
              data-tab="Apache-2.0 license"
              onClick={() => handleTabClick("Apache-2.0 license")}
              className={activeTab === "Apache-2.0 license" ? "active" : ""}
            >
              <a
                style={{
                  fontWeight:
                    activeTab === "Apache-2.0 license" ? "bold" : "normal",
                }}
              >
                <LawIcon />
                Apache-2.0 license
              </a>
            </li>
            <div className="selection-indicator" style={indicatorStyle} />
          </ul>
        </nav>

        <div className="content">
          {activeTab === "README" && <AboutReadme />}
          {activeTab === "Apache-2.0 license" && <AboutLicense />}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
