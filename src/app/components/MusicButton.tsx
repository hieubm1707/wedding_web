import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useTheme } from "../contexts/AppContext";
import { play, pause, getAudio } from "../services/audioService";

export function MusicButton() {
  const { palette } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = getAudio();

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Try autoplay on mount
    play()
      .then(() => setIsPlaying(true))
      .catch(() => {});

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play().catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" style={{ width: 48, height: 48 }}>
      {/* Pulsing sound-wave rings — only when playing */}
      {isPlaying && (
        <AnimatePresence>
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
        </AnimatePresence>
      )}

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
