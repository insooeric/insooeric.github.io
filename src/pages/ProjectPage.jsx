import stemma_logo_pic from "../img/project/stemma_logo_pic.svg";
import stemma_pic from "../img/stemma_pic.png";
import gamepad_icon from "../img/project/gamepad_icon.svg";
import webarcade_pic from "../img/webarcade_pic.png";

const ProjectPage = () => {
  return (
    <div className="project-page">
      ProjectPage
      <div>dump something here</div>
      <div className="grid-container">
        <div className="box project-stemma box-4w box-2h">
          <div className="card">
            <div className="nav-pannel">
              <div className="circles">
                <div className="c"></div>
                <div className="c"></div>
                <div className="c"></div>
              </div>

              <div className="browser">
                <div className="chevrons">
                  <svg
                    viewBox="0 0 20 20"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="20"
                    id="_20"
                  >
                    <path
                      transform="translate(6.25 3.75)"
                      d="M0,6.25,6.25,0l.875.875L1.75,6.25l5.375,5.375L6.25,12.5Z"
                      id="Fill"
                    ></path>
                  </svg>
                  <svg
                    viewBox="0 0 20 20"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="20"
                    id="_20"
                  >
                    <path
                      transform="translate(6.625 3.75)"
                      d="M7.125,6.25.875,12.5,0,11.625,5.375,6.25,0,.875.875,0Z"
                      id="Fill"
                    ></path>
                  </svg>
                </div>
                <div className="search-bar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7.89"
                    height="7.887"
                    viewBox="0 0 16.89 16.887"
                  >
                    <path
                      id="Fill"
                      d="M16.006,16.887h0l-4.743-4.718a6.875,6.875,0,1,1,.906-.906l4.719,4.744-.88.88ZM6.887,1.262a5.625,5.625,0,1,0,5.625,5.625A5.631,5.631,0,0,0,6.887,1.262Z"
                      transform="translate(0.003 0)"
                    ></path>
                  </svg>
                  stemma.vercel.app
                </div>
              </div>
            </div>

            <div className="content">
              <img src={stemma_pic} alt="Stemma Image" />
            </div>
          </div>
          <div className="details">
            <div className="skills-stack">
              <img
                className="skill-icon"
                src="https://stemma.onrender.com/api/badge?user=insooeric&badge=typescript,cs,react,dotnet,google_cloud,redis"
                alt="TechStack1"
              />
              <img
                className="skill-icon"
                src="https://stemma.onrender.com/api/badge?user=insooeric&badge=docker,oauth0,github,render,vercel"
                alt="TechStack1"
              />
            </div>
            <div className="description">
              <p>
                <img src={stemma_logo_pic} className="inline" alt="logo" /> is a
                web application that allow users to display customized badges
                like the one at the top.
              </p>
              <br />
              <div className="description-span2">
                <p>You can also add some cool features like:</p>
                <img
                  src="https://stemma.onrender.com/api/UserInfo/profile?GitHubUserName=insooeric&FullName=Insoo Son"
                  alt="profile"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="box project-webarcade box-1w box-2h">
          <div className="card work">
            <div className="img-section">
              <img src={gamepad_icon} alt="gamepad" />
            </div>
            <div className="card-desc">
              <div className="card-header">
                <div className="card-title">Web Arcade</div>
                <div className="card-menu">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
              <div className="card-image">
                <img src={webarcade_pic} alt="" />
              </div>
            </div>
          </div>
          <div className="details">
            <div className="skills-stack">
              <img
                className="skill-icon"
                src="https://stemma.onrender.com/api/badge?user=insooeric&badge=javascript,mongodb,expressjs,react,nodejs,render"
                alt="TechStack1"
              />
            </div>
            <div className="description">
              <p>
                A fullstack web application where users can play various games.
                <br />
                It supports register/login to keep in track of scores,
                displaying overall analysis.
              </p>
            </div>
          </div>
        </div>
        <div className="box project-wackafood box-1w box-1h">
          <div className="uno-card">
            <div className="card-inner">
              <div className="front">
                <div className="front-bg"></div>
                <div className="front-content">asdf</div>
              </div>
              <div className="back">
                <div className="back-bg"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="box project-gomoku box-2w box-2h">Gomoku</div>
        <div className="box project-fruitninja box-1w box-1h">
          <div className="uno-card">
            <div className="card-inner">
              <div className="front">
                <div className="front-bg"></div>
              </div>
              <div className="back">
                <div className="back-bg">
                  <p className="uno">UNO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box project-cacatua box-2w box-1h">Cacatua</div>
        <div className="box project-tts box-2w box-1h">Text To Speech</div>
      </div>
    </div>
  );
};

export default ProjectPage;
