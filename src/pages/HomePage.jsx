import { useEffect, useState } from "react";
import { useTheme } from "../components/ThemeProvider";
import { useNavigate } from "react-router-dom";
import githubProfile from "../img/github_profile.jpg";
import githubIcon from "../img/github.png";
import cs_icon from "../img/cs_icon.png";
import dotnet_icon from "../img/dotnet_icon.png";
import expressJS_icon from "../img/expressJS_icon.png";
import js_icon from "../img/javascript_icon.png";
import mongo_icon from "../img/mongodb_icon.png";
// import mysql_icon from "../img/mysql_icon.png";
import nodeJS_icon from "../img/nodeJS_icon.png";
import reactJS_icon from "../img/reactJS_icon.png";
import electron_icon from "../img/electron_icon.png";
import typescript_icon from "../img/typescript_icon.png";
import firebase_icon from "../img/firebase_icon.png";
import unity_icon from "../img/unity_icon.png";
import java_icon from "../img/java_icon.png";
import NightIcon from "../svgs/NightIcon";
import SunIcon from "../svgs/SunIcon";
// import LawIcon from "../svgs/LawIcon";

// other pics
import webarcade_pic from "../img/webarcade_pic.png";
import stemma_pic from "../img/stemma_pic.png";
import DocumentIcon from "../svgs/DocumentIcon";
import ResumePDF from "../files/Resume.pdf";

const HomePage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [emailSender, setEmailSender] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [isScreen600, setIsScreen600] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      // console.log(`Current window width: ${window.innerWidth}`);
      setIsScreen600(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   if (isScreen600) {
  //     console.log("screen is <= 600");
  //   } else {
  //     console.log("yeet");
  //   }
  // }, [isScreen600]);

  const sendEmail = async () => {
    try {
      console.log("Starting API call with abort controller.");

      const response = await fetch(
        "https://emailapplication-wgae.onrender.com/api/Email/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderEmail: emailSender,
            subject: emailSubject,
            message: emailContent,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the minimax move");
      }

      const data = await response.json();
      console.log(data);

      if (data !== null) {
        console.log("Email sent successfully!");
      }
    } catch (error) {
      console.log("Something went wrong :(", error);
    } finally {
      console.log("Done!");
    }
  };

  const handleGithubClick = () => {
    window.open("https://github.com/insooeric", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/eric-son-6742b7173/", "_blank");
  };

  const handleAboutClick = () => {
    navigate("/about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProject1Click = () => {
    navigate("/projects");
  };

  const handleProject2Click = () => {
    navigate("/projects");
  };

  useEffect(() => {
    const bodyClass = document.body.classList;
    if (isDarkMode) {
      bodyClass.add("dark-theme");
    } else {
      bodyClass.remove("dark-theme");
    }
  }, [isDarkMode]);

  return (
    <div className="home-page">
      <div className="home-grid">
        <div className="box box-2w box-intro">
          Hi, I&apos;m
          <br />
          <span>Insoo Son</span> A software developer and engineer from South
          Korea. <br />
          I&apos;m proficient in Full-Stack development and passionate about
          creating efficient, user-friendly applications that solve real-world
          problems.
          <div className="resume-btn">
            <a href={ResumePDF} download="Resume.pdf">
              <DocumentIcon />
            </a>
          </div>
        </div>
        <div
          className="box box-github"
          onClick={handleGithubClick}
          style={{ cursor: "pointer" }}
        >
          <div className="circle">
            <span className="circle__profile">
              <img src={githubProfile} alt="Profile Picture" />
            </span>
            <span className="circle__back-1"></span>
            <span className="circle__back-2"></span>
            <button className="circle__expand-btn">
              <img src={githubIcon} alt="GitHub Icon" />
            </button>
            <span className="circle__label">GitHub</span>
          </div>
        </div>
        <div className={`box box-skills ${isScreen600 ? "box-2w" : "box-2h"}`}>
          <div className="skills-grid">
            <img src={cs_icon} alt="C#" />
            <img src={dotnet_icon} alt=".NET" />
            <img src={expressJS_icon} alt="ExpressJS" />
            <img src={js_icon} alt="JavaScript" />
            <img src={mongo_icon} alt="MongoDB" />
            <img src={nodeJS_icon} alt="NodeJS" />
            <img src={reactJS_icon} alt="ReactJS" />
            <img src={electron_icon} alt="Electron" />
            <img src={typescript_icon} alt="TypeScript" />
            <img src={firebase_icon} alt="Firebase" />
            <img src={unity_icon} alt="Unity" />
            <img src={java_icon} alt="Java" />
          </div>
        </div>
        <div className="box box-light">
          <div className="switch">
            <div className="switch__1">
              <input
                id="switch-1"
                type="checkbox"
                onChange={toggleTheme}
                checked={isDarkMode}
              />
              <label htmlFor="switch-1"></label>
              <div className="circle-frame">
                {isDarkMode ? <NightIcon /> : <SunIcon />}
              </div>
            </div>
          </div>
        </div>
        <div
          className="box box-linkedin"
          onClick={handleLinkedInClick}
          style={{ cursor: "pointer" }}
        >
          <svg
            className="linkedin-icon"
            width="75.121"
            height="61.052"
            viewBox="0 0 24 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.98 2.5C4.98 3.881 3.87 5 2.5 5C1.13 5 0.02 3.881 0.02 2.5C0.02 1.12 1.13 0 2.5 0C3.87 0 4.98 1.12 4.98 2.5ZM5 7H0V23H5V7ZM12.982 7H8.014V23H12.983V14.601C12.983 9.931 19.012 9.549 19.012 14.601V23H24V12.869C24 4.989 15.078 5.276 12.982 9.155V7Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <div className="box box-2h box-project">
          <div
            className="content"
            onClick={handleProject1Click}
            style={{ cursor: "pointer" }}
          >
            <h2>Web Arcade</h2>
            <div className="project-preview">
              <img src={webarcade_pic} alt="Webarcade" />
            </div>
          </div>
          <div className="divider" />
          <div
            className="content"
            onClick={handleProject2Click}
            style={{ cursor: "pointer" }}
          >
            <h2>Stamma</h2>
            <div className="project-preview">
              <img src={stemma_pic} alt="Cacatua" />
            </div>
          </div>
        </div>
        <div
          className="box box-2w box-about"
          onClick={handleAboutClick}
          style={{ cursor: "pointer" }}
        >
          <h1>
            <b>WHO AM I?</b>
          </h1>
          <p>
            I brew coffee into <span>code</span>, bugs into{" "}
            <span>features</span>, and the occasional crash into{" "}
            <span>&apos;intentional design choices&apos;</span>.
          </p>
          <em>CLICK ME!</em>
        </div>
        <div className="box box-mail">
          <form
            className="mail-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendEmail();
              alert("Your message has been sent!");
            }}
          >
            <input
              type="email"
              id="sender"
              name="sender"
              placeholder="Your email"
              required
              value={emailSender}
              onChange={(e) => setEmailSender(e.target.value)}
            />

            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              required
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />

            <textarea
              id="content"
              name="content"
              placeholder="Write your message here"
              rows="5"
              required
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            ></textarea>

            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
