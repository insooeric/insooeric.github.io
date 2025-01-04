const AboutPage = () => {
  return (
    <>
      <div className="about-page">
        <div className="content">
          <h1>README.md</h1>
          <div className="divider" />
          <p>
            Hey, my name is <span className="name">Insoo Son</span>
            <br />A Computer Science graduate with hands-on experience in
            full-stack and game development from London, Ontario, Canada. And
            yes, my ethnicity is Asian from South Korea, and I’m
            bilingual—fluent in Korean and English.{" "}
            <span className="hidden-wrapper">
              <span className="hidden">
                Though I occasionally forget my Korean skills.
              </span>
            </span>
          </p>
          <p>
            I majored in{" "}
            <span className="strong">Computer Programming and Analysis</span> at
            Fanshawe College.
          </p>
          <p>
            To celebrate{" "}
            <span className="hidden-wrapper">
              <span className="hidden">and cure my boredom</span>
            </span>
            , I revamped this website, which is my very first web project.
          </p>
          <p>
            My babbling with computer started with printing “Hello World” with C
            language using Dev-C++.
            <br />
            (A real throwback!:{" "}
            <a
              href="https://www.bloodshed.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.bloodshed.net/ (^_^)b
            </a>
            )
          </p>
          <p>
            I’m all about sitting in front of a computer, grinding away at
            whatever catches my mind, and having conversion with others.{" "}
            <span className="small-font">I like ppl!😊</span>
            <br />
            <span className="hidden-wrapper">
              <span className="hidden">
                People have called me a geek, and honestly? I take that as a
                compliment.
              </span>
            </span>
          </p>
          <p>
            <h2>🎯What I can do?</h2>
            <ul>
              <li>Design and write clean, functional code (mostly🤞)</li>
              <li>Build apps that work (on good days☀️)</li>
              <li>Write error-free code in one tap (in solid 1% chance💨)</li>
              <li>
                Speak fluent JavaScript, C#, and a fair amount of sarcasm
                (guaranteed🎓)
              </li>
            </ul>
          </p>
          <p>
            <h2>🚀Fun facts</h2>
            <ul>
              <li>I thrive on caffeine and good challenges.☕</li>
              <li>
                I believe debugging is just a polite way of saying &quot;arguing
                with your computer.&quot;🧐
              </li>
              <li>
                I once thought HTML and CSS are types of programming language...
              </li>
            </ul>
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
