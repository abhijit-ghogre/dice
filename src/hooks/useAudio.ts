import { useEffect, useState } from "react";

export const useAudio = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

  useEffect(() => {
    if (!audio) {
      return;
    }
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  useEffect(() => {
    if (!audio) {
      return;
    }
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};
