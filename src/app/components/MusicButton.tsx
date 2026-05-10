import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useTheme } from "../contexts/AppContext";

// Place the audio file at public/music/background.mp3
const MUSIC_SRC = "/music/background.mp3";
const VOLUME = 0.35;

export function MusicButton() {
  const { palette } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = VOLUME;
    audioRef.current = audio;

    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Autoplay blocked by browser — user must click to start
      });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" style={{ width: 48, height: 48 }}>
      {/* Pulsing sound-wave rings — only when playing */}
      <AnimatePresence>
        {isPlaying && (
          <>
            {[0, 0.55, 1.1].map((delay) => (
              <motion.span
                key={delay}
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.9, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, delay, ease: "easeOut" }}
                style={{ border: `1.5px solid ${palette.primary}` }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: palette.primary,
          border: `1.5px solid ${palette.primaryDim}`,
          cursor: "pointer",
          position: "relative",
        }}
        title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.span
              key="on"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Volume2 size={18} color={palette.textLight} strokeWidth={1.5} />
            </motion.span>
          ) : (
            <motion.span
              key="off"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <VolumeX size={18} color={palette.textLight} strokeWidth={1.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
