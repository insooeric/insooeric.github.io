import SelfiPic from "../svgs/SelfiPic";
import RightArrowIcon from "../svgs/RightArrowIcon";
import UpArrowIcon from "../svgs/UpArrowIcon";

const AboutReadme = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOldProfileClick = () => {
    window.open("https://github.com/insooeric/My_Old_Profile_Page", "_blank");
  };

  return (
    <>
      <h2>About Me</h2>
      <div className="divider" />
      <div className="selfie-container">
        <SelfiPic />
      </div>
      <p>
        Hey, this is <span className="name">Insoo Son</span>
        <br />I am a Computer Science graduate with hands-on experience in
        Full-Stack development from Canada. I am a deep learner, always
        passionate about leveraging my abilities.
        <br />
        <span className="hidden-wrapper">
          <RightArrowIcon className="icon" />
          <span className="hidden">Unless my brain gets toasted</span>
        </span>
      </p>
      <p>
        I’m all about sitting in front of a computer, grinding away at whatever
        catches my mind, and having conversion with others. <br />
        <span className="small-font">I like ppl😊</span>
      </p>
      <br />
      <h2>Built With</h2>
      <div className="divider" />
      <ul>
        <li>Some amount of Korea and Canada</li>
        <li>Small amount of Philippines.</li>
        <li>Mostly consists of 0s and 1s</li>
      </ul>
      <br />
      <h2>Getting Started</h2>
      <div className="divider" />
      <h3>Prerequisites</h3>
      <ul>
        <li>
          coffee
          <div className="code-block">
            npm install coffee@drink --while-looking-around
          </div>
        </li>
      </ul>
      <h3>Installation</h3>
      <ol>
        <li>
          My babbling with computer started with printing &quot;Hello
          World&quot; with C language using Dev-C++ when I was young.
          <div className="code-block">
            git clone{" "}
            <a
              href="https://www.bloodshed.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.bloodshed.net/ {"<"}- Click Me!
            </a>
          </div>
          <span className="hidden-wrapper">
            <RightArrowIcon className="icon" />
            <span className="hidden">
              On absolute highkey, I regret not starting from Python (T^T)
            </span>
          </span>
        </li>
        <li>
          I used to be (and still am) a digital nomad, wandering around,
          learning Linux, OpenGL, Unity, and exploring various programming
          languages.
        </li>
        <li>Then I started stacking up Full-Stack knowledge since College!</li>
      </ol>
      <br />
      <h2>Updates</h2>
      <div className="divider" />
      <ul>
        <li>
          v_2024_12
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: "1rem",
            }}
          >
            <li className="narrow-li">- Fanshawe College🎓</li>
            <li className="narrow-li">- Computer Programming and Analysis</li>
            <li className="narrow-li">- Advanced Diploma</li>
          </ul>
        </li>
      </ul>
      <br />
      <h2>Features</h2>
      <div className="divider" />
      <ul>
        <li className="narrow-li">
          Design and write clean, functional code (mostly🤞)
        </li>
        <li className="narrow-li">Build apps that work (on good days☀️)</li>
        <li className="narrow-li">
          Write error-free code in one tap (in solid 1% chance💨)
        </li>
        <li className="narrow-li">
          Speak fluent JavaScript, C#, and fair amount of sarcasm (guarenteed💯)
        </li>
        <li className="narrow-li">
          Bilingual-fluent in Korean and English. <br />
          <span className="hidden-wrapper">
            <RightArrowIcon className="icon" />
            <span className="hidden">
              Though I occasionally forget my Korean skills.
            </span>
          </span>
        </li>
      </ul>
      <br />
      <h2>TMI</h2>
      <div className="divider" />
      <ul>
        <li className="narrow-li">I thrive on caffeine and good challenges</li>
        <li className="narrow-li">
          I believe debugging is a polite way of saying &quot;yapping with your
          computer.&quot;
        </li>
        <li className="narrow-li">
          This was my first web project, and I revamped it. (
          <span
            onClick={handleOldProfileClick}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Old one
          </span>
          )
        </li>

        <li className="narrow-li">
          If you&apos;re a desktop user, you probably didn&apos;t notice that
          the favicon in the website&apos;s tab changes every time you reload.
          :p
        </li>
        <li className="narrow-li">
          I genuinly beleive none of experiences are unmeaningful.{" "}
          <span className="hidden-wrapper">
            <RightArrowIcon className="icon" />
            <span className="hidden">except for crimes</span>
          </span>
        </li>
      </ul>
      <br />
      <h2>License</h2>
      <div className="divider" />
      <p>What&apos;s in the license page...?</p>
      <div className="scroll-top" onClick={handleScrollToTop}>
        <UpArrowIcon />
      </div>
    </>
  );
};

export default AboutReadme;
