/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import switch_on_icon from "../img/switch-game/switch_on_icon.svg";
import switch_off_icon from "../img/switch-game/switch_off_icon.svg";
import "../switch-game-style.scss";
import solve from "./switch-game-mcts";

// dummy comment
const SwitchGame = () => {
  const [switchState, setSwitchState] = useState([]);
  // solved, mixing, mixed, solving
  const [gameState, setGameState] = useState("solved");
  const [isMixing, setIsMixing] = useState(false);
  // const [isMixed, setIsMixed] = useState(false);
  useEffect(() => {
    const switches = [];
    for (let num = 0; num < 8; num++) {
      switches.push({ switchName: `switch${num}`, isOn: true });
    }
    setSwitchState(switches);
  }, []);

  useEffect(() => {
    const anyOff = switchState.some((switchItem) => !switchItem.isOn);
    if (anyOff && !isMixing) {
      setGameState("mixed");
    } else if (!anyOff) {
      setGameState("solved");
    }
  }, [switchState]);

  // useEffect(() => {
  //   if (isMixed) {
  //     console.log("Is mixed");
  //   } else {
  //     console.log("Not mixed");
  //   }
  // }, [isMixed]);

  // useEffect(() => {
  //   let asdf = solve();
  //   console.log(asdf);
  // }, []);

  // useEffect(() => {
  //   console.log(switchState);
  // }, [switchState]);

  // const handleToggle = (switchName, newValue) => {
  //   setSwitchState((prevState) =>
  //     prevState.map((item) =>
  //       item.switchName === switchName ? { ...item, isOn: newValue } : item
  //     )
  //   );
  // };

  const handleMix = () => {
    setGameState("mixing");
    setIsMixing(true);
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * 8);
        const randomSwitch = `switch${randomIndex}`;
        console.log(randomSwitch);
        gameLogic(randomSwitch);

        if (i === 9) {
          setGameState("mixed");
          setIsMixing(false);
        }
      }, i * 600);
    }
  };

  const handleSolve = () => {
    console.log("solve checkpoint");
    let sequence = solve(switchState);
    // let delayGap = 0;
    // sequence.forEach((switchName) => {
    //   delayGap++;
    //   setTimeout(() => {
    //     gameLogic(switchName);
    //   }, delayGap * 800);
    // });
    for (let i = 0; i < sequence.length; i++) {
      setTimeout(() => {
        const selectedSwitch = sequence[i];
        console.log(selectedSwitch);
        gameLogic(selectedSwitch);
      }, i * 600);
    }
    //console.log(sequence);
  };

  const gameLogic = (switchName) => {
    //const switchIndex = parseInt(switchName.replace("switch", ""));
    // console.log(`You clicked switch ${switchIndex}`);
    switch (switchName) {
      case "switch0":
        setSwitchState((prevState) =>
          prevState.map((item) =>
            item.switchName === "switch1" || item.switchName === "switch0"
              ? { ...item, isOn: !item.isOn }
              : item
          )
        );
        break;
      case "switch1":
        setSwitchState((prevState) =>
          prevState.map((item) =>
            item.switchName === "switch0" ||
            item.switchName === "switch1" ||
            item.switchName === "switch2"
              ? { ...item, isOn: !item.isOn }
              : item
          )
        );
        break;
      case "switch2":
        setSwitchState((prevState) =>
          prevState.map((item) =>
            item.switchName === "switch1" ||
            item.switchName === "switch2" ||
            item.switchName === "switch3"
              ? { ...item, isOn: !item.isOn }
              : item
          )
        );
        break;
      case "switch3":
        setSwitchState((prevState) =>
          prevState.map((item) =>
            item.switchName === "switch2" ||
            item.switchName === "switch3" ||
            item.switchName === "switch4"
              ? { ...item, isOn: !item.isOn }
              : item
          )
        );
        break;
      case "switch4":
        setSwitchState((prevState) =>
          prevState.map((item) =>
            item.switchName === "switch3" ||
            item.switchName === "switch4" ||
            item.switchName === "switch5"
              ? { ...item, isOn: !item.isOn }
              : item
          )
        );
        break;
      case "switch5":
        setSwitchState((prevState) =>
          prevState.map((item) =>
            item.switchName === "switch4" ||
            item.switchName === "switch5" ||
            item.switchName === "switch6"
              ? { ...item, isOn: !item.isOn }
              : item
          )
        );
        break;
      case "switch6":
        setSwitchState((prevState) =>
          prevState.map((item) =>
            item.switchName === "switch5" ||
            item.switchName === "switch6" ||
            item.switchName === "switch7"
              ? { ...item, isOn: !item.isOn }
              : item
          )
        );
        break;
      case "switch7":
        setSwitchState((prevState) =>
          prevState.map((item) =>
            item.switchName === "switch6" || item.switchName === "switch7"
              ? { ...item, isOn: !item.isOn }
              : item
          )
        );
        break;
    }
  };

  return (
    <>
      <div className="game-canvas">
        <p>
          Introducing SWITCH GAME!!
          <br />
          Each time you toggle one of buttons, it will invert left, right, and
          itself. <br />
          Once mixed, clicking "Solve" button will solve the puzzle using AI
          algorithm called Monte Carlo Tree Search. [
          <a
            href="https://en.wikipedia.org/wiki/Monte_Carlo_tree_search"
            target="_blank"
          >
            Learn More
          </a>
          ]
          <br />
          Try turning on all the lights!
          <br />
          <div className="game-state">
            {(() => {
              switch (gameState) {
                case "solved":
                  return 'Press "Mix it" button to mix buttons.';
                case "mixing":
                  return "Mixing the puzzle...";
                case "mixed":
                  return (
                    <>
                      Click buttons to turn all lights on <br />
                      or click "Solve" to solve the puzzle with AI
                    </>
                  );
                case "solving":
                  return "Solving the puzzle with AI...";
                default:
                  return "";
              }
            })()}
          </div>
        </p>

        <div className="container">
          {switchState.map((switchItem) => (
            <label
              className="toggle"
              htmlFor={`${switchItem.switchName}`}
              key={switchItem.switchName}
            >
              <input
                id={`${switchItem.switchName}`}
                className="input"
                disabled={gameState === "mixing" || gameState === "solving"}
                type="checkbox"
                checked={switchItem.isOn}
                onChange={() => {
                  // handleToggle(switchItem.switchName, e.target.checked);
                  gameLogic(switchItem.switchName);
                }}
              />
              <div className="icon icon--moon">
                <img src={switch_off_icon} alt="" />
              </div>

              <div className="icon icon--sun">
                <img src={switch_on_icon} alt="" />
              </div>
            </label>
          ))}
        </div>
        <br />
        <div className="btn-pannel">
          <button
            className="mix-btn"
            disabled={gameState === "mixing" || gameState === "solving"}
            onClick={() => {
              if (gameState === "solved") {
                setGameState("mixing");
                handleMix();
              }
              if (gameState === "mixed") {
                handleSolve();
              }
            }}
          >
            {(() => {
              //console.log(gameState);
              switch (gameState) {
                case "solved":
                  return "Mix it";
                case "mixing":
                  return "Mixing...";
                case "mixed":
                  return "Solve";
                case "solving":
                  return "Solving...";
                default:
                  return "";
              }
            })()}
          </button>
        </div>
      </div>
    </>
  );
};

export default SwitchGame;
