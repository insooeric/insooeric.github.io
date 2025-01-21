import GomokuGame from "../components/GomokuGame";
import TextToSpeach from "../components/TextToSpeech";
import OpenAIIcon from "../svgs/OpenAIIcon";
import TTSStatistic from "../components/TTSStatistic";
const PlaygroundPage = () => {
  const handleOpenAIClick = () => {
    window.open(
      "https://platform.openai.com/docs/guides/text-to-speech#voice-options",
      "_blank"
    );
  };
  return (
    <>
      <div className="playground-page">
        <div className="content">
          <div className="gomoku-game">
            <div className="title-wrapper">
              <span className="title">Gomoku AI</span>
            </div>
            <div className="component-container">
              <GomokuGame />
            </div>
          </div>
          <div className="text-to-speach">
            <div className="title-wrapper">
              <span className="title">Text To Speech</span>
              <div
                className="logo"
                onClick={handleOpenAIClick}
                style={{ cursor: "pointer" }}
              >
                <OpenAIIcon />
              </div>
            </div>
            <div className="component-container">
              <TextToSpeach />
            </div>
          </div>
          <div className="statistics">
            <div className="title-wrapper">
              <span className="title">Text To Speech Statistics</span>
            </div>
            <div className="component-container">
              <TTSStatistic />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaygroundPage;
