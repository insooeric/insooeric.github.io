import llm_pic from "../img/project/llm_readme.png";
import stemma_pic from "../img/stemma_pic.png";
import gamepad_icon from "../img/project/gamepad_icon.svg";
import webarcade_pic from "../img/webarcade_pic.png";
import fruit_ninja_pic from "../img/fruit_ninja_pic.png";
import flip_icon from "../img/project/flip_icon.svg";
import gomoku_pic from "../img/gomoku_pic.png";
import cacatua_pic from "../img/cacatua_pic.png";
import tts_pic from "../img/tts_pic.png";
import number_recognition_pic from "../img/number_recognition_pic.jpg";
import GithubIcon from "../svgs/GithubIcon";
//import info_glass_icon from "../img/project/info_glass_icon.svg" ;
import SearchIcon from "../svgs/SearchIcon";

// import card_gradient_bg_icon from "../img/project/card_gradient_bg_icon.svg";
const ProjectPage = () => {
  return (
    <div className="project-page">
      <div className="grid-container">
        
        <div className="box project-chatbot">
          <button
            onClick={() =>
              window.open(
                "https://github.com/insooeric/LLM_Small#readme",
                "_blank"
              )
            }
          >
            <span className="button_top">
              <GithubIcon className="github-icon" />
            </span>
          </button>

          <div className="card">
            <div className="browser">
              <div className="tabs-head">
                <div className="tabs">
                  <div className="tab-open">
                    <div className="rounded-l"><div className="mask-round"></div></div>
                    <span>GitHub.com</span>
                    <div className="close-tab">✕</div>
                    <div className="rounded-r"><div className="mask-round"></div></div>
                  </div>
                </div>

                <div className="window-opt">
                  <button>-</button>
                  <button>□</button>
                  <button className="window-close">✕</button>
                </div>
              </div>

              <div className="head-browser">
                <button>←</button>
                <button disabled="">→</button>

                <input
                  type="text"
                  name=""
                  id="something"
                  placeholder="Search Google or type URL"
                  value="https://github.com/insooeric/LLM_Small#readme"
                />

                <button>⋮</button>

                <button className="star">✰</button>
              </div>
              <div className="content">
                <img src={llm_pic} alt="LLM Small Image" />
              </div>
            </div>

          </div>
          <div className="details">
            <div className="skills-stack">
              <img
                className="skill-icon"
                src="https://stemma.onrender.com/api/badge?user=insooeric&badge=python"
                alt="TechStack1"
              />
            </div>
            <div className="description">
              <p>
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open(
                      "https://en.wikipedia.org/wiki/Large_language_model/",
                      "_blank"
                    );
                  }}
                >
                  Large Language Model 
                  <SearchIcon />
                </span>{" "}
                <br/>
                (this will be updated unless i'm lazy)
              </p>
            </div>
          </div>
        </div>
        
        <div className="box project-stemma">
          <button
            onClick={() =>
              window.open(
                "https://github.com/insooeric/Stemma#readme",
                "_blank"
              )
            }
          >
            <span className="button_top">
              <GithubIcon className="github-icon" />
            </span>
          </button>

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
                  <span className="search-span">Click Me!</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 16.89 16.887"
                    onClick={() => {
                      window.open("https://stemma.vercel.app/", "_blank");
                    }}
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
                <span
                  className="logo-link"
                  onClick={() => {
                    window.open("https://stemma.vercel.app/", "_blank");
                  }}
                >
                  Stemma
                  <SearchIcon />
                </span>{" "}
                is a web application that allow users to{" "}
                <b>display customized badges</b> like the one at the top.
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

        <div className="box project-webarcade">
          <button
            onClick={() =>
              window.open(
                "https://github.com/insooeric/WebArcade#readme",
                "_blank"
              )
            }
          >
            <span className="button_top">
              <GithubIcon className="github-icon" />
            </span>
          </button>

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
                src="https://stemma.onrender.com/api/badge?user=insooeric&badge=javascript,mongodb,expressjs,react"
                alt="TechStack1"
              />
              <img
                className="skill-icon"
                src="https://stemma.onrender.com/api/badge?user=insooeric&badge=nodejs,render"
                alt="TechStack2"
              />
            </div>
            <div className="description">
              <p>
                {" "}
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open(
                      "https://www.geeksforgeeks.org/mern-stack/",
                      "_blank"
                    );
                  }}
                >
                  MERN stack
                  <SearchIcon />
                </span>{" "}
                web application where users can play various games.
                <br />
                It supports register/login to keep in track of scores,
                displaying overall analysis.
              </p>
            </div>
          </div>
        </div>
        <div className="box project-numberrecognition">
          <button
            onClick={() =>
              window.open(
                "https://github.com/insooeric/NumberRecognition#readme",
                "_blank"
              )
            }
          >
            <span className="button_top">
              <GithubIcon className="github-icon" />
            </span>
          </button>

          <div className="left-tab">
            <div className="card">
              <img src={number_recognition_pic} alt="" />
              <div className="card__content">
                <p className="card__title">Number Recognition</p>
                <p className="card__description">
                  Number Recognition application using Convolutional Neural
                  Network (CNN) built from scratch without using TensorFlow or
                  any other training libraries
                </p>
              </div>
            </div>
          </div>

          <div className="right-tab">
            <div className="skills-stack">
              <img
                className="skill-icon"
                src="https://stemma.onrender.com/api/badge?user=insooeric&badge=python"
                alt="TechStack1"
              />
            </div>
            <div className="description">
              Application where AI predicts user&apos;s drawing of digit between
              0 to 9 with confidency. <br />
              48000 hand-drawn images from MNIST database are used for training.
              (separately downloaded)
              <br />
              <span
                className="bold-link"
                onClick={() => {
                  window.open(
                    "https://en.wikipedia.org/wiki/Convolutional_neural_network",
                    "_blank"
                  );
                }}
              >
                Convolutional Neural Network
                <SearchIcon />
              </span>
              algorithm and other algorithms used for enhancing the accuracy.
            </div>
          </div>
        </div>

        <div className="box project-gomoku">
          <button
            onClick={() =>
              window.open(
                "https://github.com/insooeric/Gomoku-AI#readme",
                "_blank"
              )
            }
          >
            <span className="button_top">
              <GithubIcon className="github-icon" />
            </span>
          </button>
          <div className="card">
            <div className="card2">
              <div className="inner-content">
                <img src={gomoku_pic} alt="gomoku ai preview" />
              </div>
            </div>
          </div>

          <div className="details">
            <div className="skills-stack">
              <img
                className="skill-icon"
                src="https://stemma.onrender.com/api/badge?user=insooeric&badge=cs,javascript,react,dotnet"
                alt="TechStack1"
              />
              <img
                className="skill-icon"
                src="https://stemma.onrender.com/api/badge?user=insooeric&badge=docker,render,github"
                alt="TechStack2"
              />
            </div>
            <div className="description">
              <p>
                An advanced artificial intelligence for{" "}
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open("https://wikipedia.org/wiki/Gomoku", "_blank");
                  }}
                >
                  Gomoku
                  <SearchIcon />
                </span>{" "}
                game (connect 5 to win).
                <br />
                Implemented{" "}
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open("https://wikipedia.org/wiki/Minimax", "_blank");
                  }}
                >
                  Minimax
                  <SearchIcon />
                </span>{" "}
                with{" "}
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open(
                      "https://wikipedia.org/wiki/Heuristic_evaluation",
                      "_blank"
                    );
                  }}
                >
                  Heuristic
                  <SearchIcon />
                </span>{" "}
                and{" "}
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open(
                      "https://wikipedia.org/wiki/Alpha%E2%80%93beta_pruning",
                      "_blank"
                    );
                  }}
                >
                  Alpha-Beta Pruning
                  <SearchIcon />
                </span>
                , and{" "}
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open(
                      "https://wikipedia.org/wiki/Monte_Carlo_tree_search",
                      "_blank"
                    );
                  }}
                >
                  Monte Carlo Tree Search
                  <SearchIcon />
                </span>{" "}
                with{" "}
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open(
                      "https://github.com/insooeric/Gomoku-AI/blob/master/Gomoku_AI/AIModels/MCTS/Prioritizer.cs",
                      "_blank"
                    );
                  }}
                >
                  priority
                  <SearchIcon />
                </span>{" "}
                for evaluation.
                <br />
                It uses also supports{" "}
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open(
                      "https://wikipedia.org/wiki/Gomoku#Freestyle_gomoku",
                      "_blank"
                    );
                  }}
                >
                  FreeStyle
                  <SearchIcon />
                </span>{" "}
                and{" "}
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open(
                      "https://wikipedia.org/wiki/Gomoku#Renju",
                      "_blank"
                    );
                  }}
                >
                  Renju
                  <SearchIcon />
                </span>{" "}
                rules.
              </p>
            </div>
          </div>
        </div>

        <div className="box project-fruitninja">
          <button
            onClick={() =>
              window.open(
                "https://github.com/insooeric/FruitNinja_Mock_Game#readme",
                "_blank"
              )
            }
          >
            <span className="button_top">
              <GithubIcon className="github-icon" />
            </span>
          </button>

          <div className="card">
            <div className="front">
              <img className="preview" src={fruit_ninja_pic} alt="card bg" />
              <span>Fruit Ninja</span>
              <img className="flip-icon" src={flip_icon} alt="flip icon" />
            </div>
            <div className="card__content">
              <p className="card__title">Fruit Ninja</p>
              <p className="card__description">
                <span
                  className="bold-link flip-color"
                  onClick={() => {
                    window.open(
                      "http://en.wikipedia.org/wiki/Unity_(game_engine)",
                      "_blank"
                    );
                  }}
                >
                  Unity
                  <SearchIcon />
                </span>{" "}
                game where user slash valid fruits for points within timelimit.
              </p>
            </div>
          </div>
          <div className="skills-stack">
            <img
              className="skill-icon"
              src="https://stemma.onrender.com/api/badge?user=insooeric&badge=unity,cs"
              alt="TechStack1"
            />
          </div>
        </div>
        <div className="box project-cacatua">
          <button
            onClick={() =>
              window.open(
                "https://github.com/insooeric/Cacatua#readme",
                "_blank"
              )
            }
          >
            <span className="button_top">
              <GithubIcon className="github-icon" />
            </span>
          </button>

          <div className="preview-container">
            <div className="title">Cacatua</div>
            <div className="glow-card">
              <div className="content">
                <img
                  className="cacatua-preview"
                  src={cacatua_pic}
                  alt="cacatua preview"
                />
              </div>
            </div>
          </div>

          <div className="details">
            <div className="skills-stack">
              <img
                className="skill-icon"
                src="https://stemma.onrender.com/api/badge?user=insooeric&badge=electron,dotnet,firebase"
                alt="TechStack1"
              />
              <img
                className="skill-icon"
                src="https://stemma.onrender.com/api/badge?user=insooeric&badge=typescript,cs"
                alt="TechStack2"
              />
            </div>
            <div className="description">
              <p>
                Team project using{" "}
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open("https://www.electronforge.io/", "_blank");
                  }}
                >
                  Electron Forge
                  <SearchIcon />
                </span>{" "}
                and{" "}
                <span
                  className="bold-link"
                  onClick={() => {
                    window.open(
                      "https://wikipedia.org/wiki/ASP.NET_Core",
                      "_blank"
                    );
                  }}
                >
                  ASP.NET Core
                  <SearchIcon />
                </span>
                , unifying socialization and project management.
              </p>
              <p>Contributers:</p>
              <div className="contributer-container">
                <a href="https://github.com/insooeric" target="_blank">
                  @insooeric
                </a>
                <a href="https://github.com/brendokht" target="_blank">
                  @brendokht
                </a>
              </div>
              <div className="contributer-container">
                <a href="https://github.com/Llevere" target="_blank">
                  @Llevere
                </a>
                <a href="https://github.com/Garenium" target="_blank">
                  @Garenium
                </a>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>

        <div className="box project-tts">
          <button
            onClick={() =>
              window.open(
                "https://github.com/insooeric/TextToSpeech#readme",
                "_blank"
              )
            }
          >
            <span className="button_top">
              <GithubIcon className="github-icon" />
            </span>
          </button>
          <div className="container">
            <div className="card">
              <div className="front">
                <img src={tts_pic} alt="tts preview" />
                <p className="title">Text To Speech</p>
              </div>
              <div className="back">
                <p className="title-in">Text To Speech</p>
                <div className="grid-container">
                  <div className="description">
                    <p>
                      A text to speech application using{" "}
                      <span
                        className="bold-link black-color"
                        onClick={() => {
                          window.open(
                            "https://openai.com/index/whisper/",
                            "_blank"
                          );
                        }}
                      >
                        Open AI: Whisper
                        <SearchIcon />
                      </span>
                      , analyizing inputs to show detailed overall statistics.
                    </p>
                  </div>
                  <div className="skills-stack">
                    <img
                      className="skill-icon"
                      src="https://stemma.onrender.com/api/badge?user=insooeric&row=3&badge=cs,javascript,react,dotnet,docker,render,github,chatgpt,firebase"
                      alt="TechStack1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-border"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
