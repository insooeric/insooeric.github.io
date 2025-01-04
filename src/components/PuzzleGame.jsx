import { useRef, useEffect } from "react";
import "../puzzleGame.scss";
import completeGame from "./cool-game/index.html?raw";

const PuzzleGame = () => {
  const iframeRef = useRef();

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe && iframe.contentDocument) {
      const doc = iframe.contentDocument;

      // Write HTML content
      doc.open();
      doc.write(completeGame);
      doc.close();
    }
  }, []);

  return (
    <div className="puzzle-game">
      <iframe
        ref={iframeRef}
        title="Complete Puzzle Game"
        style={{ width: "100%", height: "100vh", border: "none" }}
      ></iframe>
    </div>
  );
};

export default PuzzleGame;
