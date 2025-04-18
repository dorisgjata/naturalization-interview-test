import { useRef, useState } from "react";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { IconButton } from "@mui/material";
import { useTextToSpeechMutation } from "./textToSpeechApi";

export default function TextToSpeech(props: { text: string; label: string }) {
  const { text, label } = props;
  const [, setAudioUrl] = useState("");
  const audioElement = useRef<HTMLAudioElement>(null);
  const [textToSpeech] = useTextToSpeechMutation();

  const generateSpeech = async (text: string) => {
    try {
      const audioUrl = await textToSpeech(text).unwrap();
      setAudioUrl(audioUrl);
      if (audioElement.current) {
        audioElement.current.src = audioUrl;
        audioElement.current.play();
      }
    } catch (error) {
      console.error("Error generating speech:", error);
    }
  };
  return (
    <>
      <IconButton
        style={{ color: "white" }}
        aria-label={label}
        onClick={() => generateSpeech(text)}
      >
        <PlayCircleOutlineIcon />
      </IconButton>
      <audio ref={audioElement} controls style={{ display: "none" }} />
    </>
  );
}
