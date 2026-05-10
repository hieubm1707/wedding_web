import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { useTheme, useLang } from "../contexts/AppContext";

// Replace with the actual YouTube video ID (the part after ?v= in the URL)
const YOUTUBE_VIDEO_ID = "AWA0Si4Exxo";

export function OurStoryVideo() {
  const { palette } = useTheme();
  const { t } = useLang();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const videoRef = useRef(null);
  const videoInView = useInView(videoRef, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-12 px-6" style={{ background: palette.bg1 }}>
      <div className="mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p
            className="mb-4"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: palette.accent,
              fontSize: "0.72rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {t.storyVideo.badge}
          </p>
          <h2
            className="playfair-font"
            style={{ color: palette.text, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}
          >
            {t.storyVideo.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-10" style={{ background: palette.medium }} />
            <svg width="6" height="6" viewBox="0 0 6 6">
              <circle cx="3" cy="3" r="3" fill={palette.accent} />
            </svg>
            <div className="h-px w-10" style={{ background: palette.medium }} />
          </div>
        </motion.div>

        {/* Video */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, y: 24 }}
          animate={videoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-full overflow-hidden"
          style={{
            paddingBottom: "56.25%",
            borderRadius: "6px",
            border: `1px solid ${palette.border}`,
            boxShadow: `0 12px 40px ${palette.shadowPrimary}`,
          }}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
            title={t.storyVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ border: "none", borderRadius: "6px" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
