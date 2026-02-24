import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useTheme, useLang } from "../contexts/AppContext";

const BotanicalLeft = ({ accent, medium }: { accent: string; medium: string }) => (
  <svg
    viewBox="0 0 200 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-0 bottom-0 w-40 md:w-64 opacity-60 pointer-events-none"
  >
    <path d="M20 380 Q40 320 80 280 Q120 240 100 180 Q80 120 60 80" stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M60 280 Q30 260 10 230" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M80 250 Q50 240 30 210" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M90 220 Q70 200 55 170" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M95 190 Q120 170 130 140" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M85 160 Q110 150 125 120" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    <ellipse cx="30" cy="230" rx="18" ry="10" transform="rotate(-30 30 230)" stroke={accent} strokeWidth="0.8" fill="none"/>
    <ellipse cx="40" cy="200" rx="15" ry="9" transform="rotate(-45 40 200)" stroke={accent} strokeWidth="0.8" fill="none"/>
    <ellipse cx="55" cy="165" rx="16" ry="9" transform="rotate(-20 55 165)" stroke={accent} strokeWidth="0.8" fill="none"/>
    <ellipse cx="128" cy="138" rx="14" ry="8" transform="rotate(25 128 138)" stroke={accent} strokeWidth="0.8" fill="none"/>
    <ellipse cx="122" cy="118" rx="13" ry="7" transform="rotate(10 122 118)" stroke={accent} strokeWidth="0.8" fill="none"/>
    <path d="M40 320 Q10 310 5 280" stroke={medium} strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    <ellipse cx="8" cy="282" rx="12" ry="7" transform="rotate(-50 8 282)" stroke={medium} strokeWidth="0.7" fill="none"/>
    <path d="M15 350 Q-10 340 -15 310" stroke={medium} strokeWidth="0.8" fill="none" strokeLinecap="round"/>
  </svg>
);

const BotanicalRight = ({ accent, medium }: { accent: string; medium: string }) => (
  <svg
    viewBox="0 0 200 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute right-0 top-0 w-40 md:w-64 opacity-60 pointer-events-none"
  >
    <path d="M180 20 Q160 80 120 120 Q80 160 100 220 Q120 280 140 320" stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M140 120 Q170 140 190 170" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M120 150 Q150 160 170 190" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M110 180 Q130 200 145 230" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M105 210 Q80 230 70 260" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M115 240 Q90 250 75 280" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round"/>
    <ellipse cx="170" cy="170" rx="18" ry="10" transform="rotate(30 170 170)" stroke={accent} strokeWidth="0.8" fill="none"/>
    <ellipse cx="160" cy="195" rx="15" ry="9" transform="rotate(45 160 195)" stroke={accent} strokeWidth="0.8" fill="none"/>
    <ellipse cx="145" cy="228" rx="16" ry="9" transform="rotate(20 145 228)" stroke={accent} strokeWidth="0.8" fill="none"/>
    <ellipse cx="72" cy="262" rx="14" ry="8" transform="rotate(-25 72 262)" stroke={accent} strokeWidth="0.8" fill="none"/>
    <ellipse cx="78" cy="282" rx="13" ry="7" transform="rotate(-10 78 282)" stroke={accent} strokeWidth="0.8" fill="none"/>
    <path d="M160 80 Q190 90 195 120" stroke={medium} strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    <ellipse cx="192" cy="118" rx="12" ry="7" transform="rotate(50 192 118)" stroke={medium} strokeWidth="0.7" fill="none"/>
  </svg>
);

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
          backgroundImage:
            "url('https://images.unsplash.com/photo-1765292783377-e2b769632228?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920')",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: palette.heroGradient }} />
      <div className="absolute inset-0" style={{ background: "rgba(250,250,246,0.18)" }} />

      {/* Botanical decorations */}
      <BotanicalLeft accent={palette.accent} medium={palette.medium} />
      <BotanicalRight accent={palette.accent} medium={palette.medium} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-6">
        {/* Badge */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-16 md:w-24" style={{ background: palette.accent }} />
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{ fontFamily: "'Montserrat', sans-serif", color: palette.primary, fontWeight: 500 }}
          >
            {t.hero.badge}
          </span>
          <div className="h-px w-16 md:w-24" style={{ background: palette.accent }} />
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
              fontFamily: "'Playfair Display', serif",
              color: palette.text,
              fontSize: "clamp(3rem, 9vw, 7rem)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            Linh
          </h1>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              color: palette.accent,
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontStyle: "italic",
              lineHeight: 1.2,
              fontWeight: 400,
            }}
          >
            &amp;
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              color: palette.text,
              fontSize: "clamp(3rem, 9vw, 7rem)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            Minh
          </h1>
        </motion.div>

        {/* Date */}
        <motion.p
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
        </motion.p>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="max-w-md"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: palette.textMuted,
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
        <motion.div
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
        </motion.div>
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
        <span className="text-xs tracking-[0.2em] uppercase" style={{ fontSize: "0.63rem" }}>{t.hero.scroll}</span>
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
