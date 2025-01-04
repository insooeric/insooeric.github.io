import { useState } from "react";
import "../tts.scss";
import PlayIcon from "../svgs/PlayIcon";
import PauseIcon from "../svgs/PauseIcon";
import DownloadIcon from "../svgs/DownloadIcon";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState("alloy");
  const [isLoading, setIsLoading] = useState(false);

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
  };

  const handlePlayAudio = async () => {
    if (!text || !selectedVoice) {
      alert("Please enter text and select a voice.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        "https://texttospeech-547b.onrender.com/api/TextParser/tts-ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Input: text,
            Voice: selectedVoice,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(
          errorData.message ||
            "An error occurred while processing your request."
        );
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);

      const newAudio = new Audio(audioUrl);

      setAudio(newAudio);
      setAudioUrl(audioUrl);

      setTimeout(() => {
        newAudio.play();
        setIsPlaying(true);

        newAudio.onended = () => {
          setIsPlaying(false);
        };
      }, 500);
    } catch (error) {
      alert(error.message);
      console.error("Error playing audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    } else if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "speech.mp3";
    link.click();
  };

  return (
    <div className="tts-container">
      <div className="tts-input">
        <textarea
          placeholder="Type your text here..."
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="tts-options">
        <div className="voice-control">
          <input
            id="voice-1"
            type="radio"
            name="radio1"
            value={"alloy"}
            onChange={handleVoiceChange}
          />
          <label htmlFor="voice-1" className="voice-control_1">
            Alloy
          </label>

          <input
            id="voice-2"
            type="radio"
            name="radio1"
            value={"echo"}
            onChange={handleVoiceChange}
          />
          <label htmlFor="voice-2" className="voice-control_2">
            Echo
          </label>

          <input
            id="voice-3"
            type="radio"
            name="radio1"
            value={"fable"}
            onChange={handleVoiceChange}
          />

          <label htmlFor="voice-3" className="voice-control_3">
            Fable
          </label>

          <input
            id="voice-4"
            type="radio"
            name="radio1"
            value={"onyx"}
            onChange={handleVoiceChange}
          />
          <label htmlFor="voice-4" className="voice-control_4">
            Onyx
          </label>

          <input
            id="voice-5"
            type="radio"
            name="radio1"
            value={"nova"}
            onChange={handleVoiceChange}
          />
          <label htmlFor="voice-5" className="voice-control_5">
            Nova
          </label>

          <input
            id="voice-6"
            type="radio"
            name="radio1"
            value={"shimmer"}
            onChange={handleVoiceChange}
          />
          <label htmlFor="voice-6" className="voice-control_6">
            Shimmer
          </label>

          <div className="voice-control_color"></div>
        </div>
      </div>
      <div className="tts-controls">
        <div
          className={`button ${isLoading ? "loading" : ""}`}
          onClick={
            isLoading ? null : isPlaying ? handleTogglePlay : handlePlayAudio
          }
        >
          {isLoading ? (
            <div className="spinner"></div> // Add spinner for loading
          ) : isPlaying ? (
            <PauseIcon />
          ) : (
            <PlayIcon />
          )}
        </div>
        <div
          className={`button download-button ${audioUrl ? "" : "disabled"}`}
          onClick={audioUrl ? handleDownload : null}
        >
          <DownloadIcon />
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
