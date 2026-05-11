import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useTheme, useLang } from "../contexts/AppContext";

interface HeroSectionProps {
  onScrollDown: () => void;
}

export function HeroSection({ onScrollDown }: HeroSectionProps) {
  const { palette } = useTheme();
  const { t } = useLang();

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('./images/hero_image_002.webp')",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: palette.heroGradient }} />
      <div className="absolute inset-0" style={{ background: "rgba(250,250,246,0.18)" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-4 md:gap-8 mb-20 border-none"
        >
          <div className="h-[1px] w-12 md:w-24 opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${palette.primary})` }} />

          <div className="flex flex-col items-center gap-1">
            {/* <span
              className="text-[0.65rem] md:text-[0.7rem] tracking-[0.35em] uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontWeight: 500 }}
            >
              {t.hero.badge}
            </span> */}
            <h2
              className="playfair-font"
              style={{ color: palette.primary, fontSize: "clamp(3rem, 7vw, 4.5rem)", lineHeight: 1.1, fontWeight: 400 }}
            >
              {t.hero.badgeTitle}
            </h2>
          </div>

          <div className="h-[1px] w-12 md:w-24 opacity-60" style={{ background: `linear-gradient(270deg, transparent, ${palette.primary})` }} />
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <h1
            style={{
              color: palette.text,
              fontSize: "clamp(3rem, 9vw, 7rem)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
            className="mussica-font"
          >
            Minh Hiếu
          </h1>
          <span
            style={{
              color: palette.text,
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontStyle: "italic",
              lineHeight: 1.2,
              fontWeight: 400,
            }}
            className="playfair-font mt-8 mb-4"
          >
            &amp;
          </span>
          <h1
            style={{
              color: palette.text,
              fontSize: "clamp(3rem, 9vw, 7rem)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
            className="mussica-font"
          >
            Thảo Tiên
          </h1>
        </motion.div>

        {/* Date */}
        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: palette.primary,
            fontSize: "clamp(0.7rem, 1.8vw, 0.9rem)",
            letterSpacing: "0.3em",
            fontWeight: 500,
          }}
          className="uppercase"
        >
          {t.hero.date}
        </motion.p> */}

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="max-w-md playfair-font mt-12"
          style={{
            color: palette.text,
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            fontStyle: "italic",
            lineHeight: 1.8,
            fontWeight: 400,
            whiteSpace: "pre-line",
          }}
        >
          {t.hero.quote}
        </motion.blockquote>

        {/* Divider dot */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-8" style={{ background: palette.medium }} />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="2" fill={palette.accent} />
            <circle cx="6" cy="6" r="5" stroke={palette.accent} strokeWidth="0.8" />
          </svg>
          <div className="h-px w-8" style={{ background: palette.medium }} />
        </motion.div> */}
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={onScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer border-none bg-transparent"
        style={{ fontFamily: "'Montserrat', sans-serif", color: palette.primary }}
      >
        {/* <span className="text-xs tracking-[0.2em] uppercase" style={{ fontSize: "0.63rem" }}>{t.hero.scroll}</span> */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}
