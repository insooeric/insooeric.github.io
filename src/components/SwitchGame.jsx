import { useEffect, useState } from "react";
import switch_on_icon from "../img/switch-game/switch_on_icon.svg";
import switch_off_icon from "../img/switch-game/switch_off_icon.svg";
import "../switch-game-style.scss";

const SwitchGame = () => {
  const [switchState, setSwitchState] = useState([]);
  useEffect(() => {
    const switches = [];
    for (let num = 0; num < 8; num++) {
      switches.push({ switchName: `switch${num}`, isOn: true });
    }
    setSwitchState(switches);
  }, []);

  useEffect(() => {
    console.log(switchState);
  }, [switchState]);

  const handleToggle = (switchName, newValue) => {
    setSwitchState((prevState) =>
      prevState.map((item) =>
        item.switchName === switchName ? { ...item, isOn: newValue } : item
      )
    );
  };

  return (
    <>
      <div className="game-canvas">
        SwitchGame
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
                type="checkbox"
                checked={switchItem.isOn}
                onChange={(e) =>
                  handleToggle(switchItem.switchName, e.target.checked)
                }
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
      </div>
    </>
  );
};

export default SwitchGame;
