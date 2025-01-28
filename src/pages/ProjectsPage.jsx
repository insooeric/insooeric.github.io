// pics
import default_pic from "../img/default_pic.png";
import webarcade_pic from "../img/webarcade_pic.png";
import cacatua_pic from "../img/cacatua_pic.png";
import profile_pic from "../img/profile_pic.png";
// import maze_pic from "../img/maze_pic.png";
// import fruit_ninja_pic from "../img/fruit_ninja_pic.png";
import wack_food_pic from "../img/wack_food_pic.png";
import dating_app_pic from "../img/dating_app_pic.png";
import gomoku_pic from "../img/gomoku_pic.png";
import tts_pic from "../img/tts_pic.png";

// icons
import cs_icon from "../img/cs_icon.png";
import dotnet_icon from "../img/dotnet_icon.png";
import expressJS_icon from "../img/expressJS_icon.png";
import js_icon from "../img/javascript_icon.png";
import mongo_icon from "../img/mongodb_icon.png";
import nodeJS_icon from "../img/nodeJS_icon.png";
import reactJS_icon from "../img/reactJS_icon.png";
import electron_icon from "../img/electron_icon.png";
import typescript_icon from "../img/typescript_icon.png";
import firebase_icon from "../img/firebase_icon.png";
import unity_icon from "../img/unity_icon.png";
import docker_icon from "../img/docker_icon.png";
import github from "../img/github.png";
// import java_icon from "../img/java_icon.png";

const ProjectsPage = () => {
  const handleDefaultClick = (val) => {
    switch (val) {
      case "webarcade":
        window.open("https://github.com/insooeric/WebArcade#readme", "_blank");
        break;
      case "cacatua":
        window.open(
          "https://github.com/insooeric/Cacatua-Description#readme",
          "_blank"
        );
        break;
      case "profile":
        window.open(
          "https://github.com/insooeric/insooeric.github.io#readme",
          "_blank"
        );
        break;
      case "gomokuai":
        window.open("https://github.com/insooeric/Gomoku-AI#readme", "_blank");
        break;
      case "datingapp":
        window.open("https://github.com/insooeric/DatingApp#readme", "_blank");
        break;
      case "tts":
        window.open(
          "https://github.com/insooeric/TextToSpeech#readme",
          "_blank"
        );
        break;
      case "recorder":
        break;
      case "gridshot":
        window.open("https://github.com/insooeric/WackAFood#readme", "_blank");
        break;
    }

    window.open("https://github.com/insooeric/default-repo#readme", "_blank");
  };
  return (
    <>
      <div className="project-page">
        <div className="content">
          <div className="project-grid">
            <div className="box box-2w box-2h box-webarcade">
              <div className="project-title">Webarcade</div>

              <div
                className="project-preview"
                onClick={() => handleDefaultClick("webarcade")}
                style={{ cursor: "pointer" }}
              >
                <img src={webarcade_pic} alt="Webarcade" />
              </div>
              <div className="tech-stack">
                <img src={mongo_icon} alt="MongoDB" />
                <img src={expressJS_icon} alt="ExpressJS" />
                <img src={reactJS_icon} alt="ReactJS" />
                <img src={nodeJS_icon} alt="NodeJS" />
                <img src={js_icon} alt="JavaScript" />
              </div>
            </div>
            <div className="box box-2w box-2h box-cacatua">
              <div className="project-title">Cacatua</div>
              <div
                className="project-preview"
                onClick={() => handleDefaultClick("cacatua")}
                style={{ cursor: "pointer" }}
              >
                <img src={cacatua_pic} alt="Webarcade" />
              </div>

              <div className="tech-stack">
                <img src={electron_icon} alt="Electron" />
                <img src={typescript_icon} alt="Typescript" />
                <img src={cs_icon} alt="C#" />
                <img src={dotnet_icon} alt="dotnet" />
                <img src={firebase_icon} alt="Firebase" />
              </div>
            </div>
            <div className="box box-2w box-profile">
              <div className="project-title">Profile</div>
              <div
                className="project-preview"
                onClick={() => handleDefaultClick("profile")}
                style={{ cursor: "pointer" }}
              >
                <img src={profile_pic} alt="Profile" />
              </div>
              <div className="tech-stack">
                <img src={reactJS_icon} alt="ReactJS" />
                <img src={js_icon} alt="JavaScript" />
                <img src={github} alt="GitHub" />
              </div>
            </div>
            <div className="box box-2h box-gomoku-ai">
              <div className="project-title">Gomoku AI</div>
              <div
                className="project-preview"
                onClick={() => handleDefaultClick("gomokuai")}
                style={{ cursor: "pointer" }}
              >
                <img src={gomoku_pic} alt="Gomoku" />
              </div>
              <div className="tech-stack">
                <img src={cs_icon} alt="C#" />
                <img src={dotnet_icon} alt="dotnet" />
                <img src={docker_icon} alt="docker" />
              </div>
            </div>
            <div className="box box box-dating-app">
              <div className="project-title">Dating App</div>
              <div
                className="project-preview"
                onClick={() => handleDefaultClick("datingapp")}
                style={{ cursor: "pointer" }}
              >
                <img src={dating_app_pic} alt="Dating App" />
              </div>
              <div className="tech-stack">
                <img src={mongo_icon} alt="MongoDB" />
                <img src={expressJS_icon} alt="ExpressJS" />
                <img src={reactJS_icon} alt="ReactJS" />
                <img src={nodeJS_icon} alt="NodeJS" />
                <img src={js_icon} alt="JavaScript" />
              </div>
            </div>
            <div className="box box-tts">
              <div className="project-title">Text to speach</div>
              <div
                className="project-preview"
                onClick={() => handleDefaultClick("tts")}
                style={{ cursor: "pointer" }}
              >
                <img src={tts_pic} alt="TTS" />
              </div>
              <div className="tech-stack">
                <img src={cs_icon} alt="C#" />
                <img src={dotnet_icon} alt="dotnet" />
                <img src={firebase_icon} alt="Firebase" />
                <img src={docker_icon} alt="docker" />
              </div>
            </div>
            <div className="box box box-voice-record">
              <div className="project-title">Voice Record</div>
              <div
                className="project-preview"
                onClick={() => handleDefaultClick("recorder")}
                style={{ cursor: "pointer" }}
              >
                <img src={default_pic} alt="Default" />
              </div>
            </div>
            <div className="box box-grid-shot">
              <div className="project-title">Wack Food</div>
              <div
                className="project-preview"
                onClick={() => handleDefaultClick("gridshot")}
                style={{ cursor: "pointer" }}
              >
                <img src={wack_food_pic} alt="Wack Food" />
              </div>
              <div className="tech-stack">
                <img src={unity_icon} alt="Unity" />
                <img src={cs_icon} alt="C#" />
              </div>
            </div>
            {/* <div className="box box-fruit-ninja">
              <div className="project-title">Fruit Ninja Mock</div>
              <div className="project-preview">
                <img src={fruit_ninja_pic} alt="Fruit Ninja" />
              </div>
              <div className="tech-stack">
                <img src={unity_icon} alt="Unity" />
                <img src={cs_icon} alt="C#" />
              </div>
            </div> */}
            {/* <div className="box box-maze">
              <div className="project-title">2D Maze</div>
              <div className="project-preview">
                <img src={maze_pic} alt="Maze" />
              </div>
              <div className="tech-stack">
                <img src={java_icon} alt="Java" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
