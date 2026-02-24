import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme, useLang } from "../contexts/AppContext";

interface Wish {
  id: string;
  name: string;
  message: string;
  attending: string;
  timestamp: string;
}

const defaultWishes: Wish[] = [
  { id: "1", name: "Hương & Tuấn", message: "Wishing you both a lifetime filled with laughter, adventure, and an abundance of love. May every day bring you closer together. Congratulations!", attending: "yes", timestamp: "15 January 2026" },
  { id: "2", name: "Aunt Bích Ngọc", message: "Two kind souls, now one beautiful journey. May your home always be filled with warmth, joy, and the sweet scent of flowers. We love you both dearly.", attending: "yes", timestamp: "20 January 2026" },
  { id: "3", name: "Nhóm bạn đại học", message: "From the days of shared lunches and late-night study sessions, to watching you both find each other — we couldn't be prouder. Cheers to forever!", attending: "yes", timestamp: "1 February 2026" },
  { id: "4", name: "Chú Phương & Cô Lan", message: "A love like yours is rare and beautiful. We are so grateful to witness your story. May your marriage be as radiant as the both of you.", attending: "yes", timestamp: "10 February 2026" },
  { id: "5", name: "Minh Châu", message: "Linh, you deserve every happiness. Minh, take good care of her! Wishing you a lifetime of beautiful mornings and peaceful evenings together.", attending: "yes", timestamp: "14 February 2026" },
];

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="16" viewBox="0 0 24 18" fill="none">
      <path d="M0 18V10.8C0 7.2 1.2 4.2 3.6 1.8L5.4 0C6.6 2.4 7.2 4.2 7.2 5.4C5.6 6.2 4.8 7.8 4.8 10.2V12H9.6V18H0ZM14.4 18V10.8C14.4 7.2 15.6 4.2 18 1.8L19.8 0C21 2.4 21.6 4.2 21.6 5.4C20 6.2 19.2 7.8 19.2 10.2V12H24V18H14.4Z" fill={color}/>
    </svg>
  );
}

function WishCard({ wish, featured = false }: { wish: Wish; featured?: boolean }) {
  const { palette } = useTheme();
  const { t } = useLang();

  return (
    <div
      className="flex flex-col p-7 md:p-9"
      style={{ background: palette.cardBg, borderRadius: "4px", boxShadow: featured ? `0 8px 40px ${palette.shadowPrimary}` : "none", border: `1px solid ${palette.border}`, minHeight: "220px" }}
    >
      <div className="mb-5">
        <QuoteIcon color={palette.light} />
      </div>
      <p className="flex-1 mb-6" style={{ fontFamily: "'Playfair Display', serif", color: palette.text, fontSize: "0.95rem", lineHeight: 1.9, fontStyle: "italic", fontWeight: 400 }}>
        {wish.message}
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.text, fontSize: "0.8rem", fontWeight: 500 }}>{wish.name}</p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.accent, fontSize: "0.68rem", letterSpacing: "0.1em", fontWeight: 400, marginTop: "2px" }}>{wish.timestamp}</p>
        </div>
        {wish.attending === "yes" && (
          <span style={{ fontFamily: "'Montserrat', sans-serif", background: palette.bg1, color: palette.primary, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, padding: "4px 10px", borderRadius: "20px", border: `1px solid ${palette.border}` }}>
            {t.wishes.attendingBadge}
          </span>
        )}
      </div>
    </div>
  );
}

interface WishesSliderProps {
  wishes: Wish[];
}

export function WishesSlider({ wishes: extraWishes }: WishesSliderProps) {
  const { palette } = useTheme();
  const { t } = useLang();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const allWishes = [...defaultWishes, ...extraWishes];
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? allWishes.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === allWishes.length - 1 ? 0 : c + 1));
  const getIndex = (offset: number) => (current + offset + allWishes.length) % allWishes.length;

  return (
    <section id="wishes" className="py-24 md:py-36 px-6 overflow-hidden" style={{ background: palette.bg2 }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 md:mb-18"
        >
          <p className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.primary, fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 500 }}>
            {t.wishes.badge}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: palette.text, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
            {t.wishes.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-10" style={{ background: palette.medium }} />
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill={palette.primary} /></svg>
            <div className="h-px w-10" style={{ background: palette.medium }} />
          </div>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {/* Left ghost */}
            <div className="hidden md:block flex-shrink-0 w-64 opacity-30 scale-95 cursor-pointer" onClick={prev}>
              <WishCard wish={allWishes[getIndex(-1)]} />
            </div>
            {/* Main */}
            <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex-shrink-0 w-full md:w-[480px]">
              <WishCard wish={allWishes[current]} featured />
            </motion.div>
            {/* Right ghost */}
            <div className="hidden md:block flex-shrink-0 w-64 opacity-30 scale-95 cursor-pointer" onClick={next}>
              <WishCard wish={allWishes[getIndex(1)]} />
            </div>
          </div>

          {/* Nav */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: `1px solid ${palette.medium}`, background: "transparent", color: palette.primary, cursor: "pointer" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = palette.primary; (e.currentTarget as HTMLElement).style.color = palette.textLight; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = palette.primary; }}
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <div className="flex gap-2">
              {allWishes.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className="transition-all duration-300 rounded-full border-none"
                  style={{ width: i === current ? "20px" : "6px", height: "6px", background: i === current ? palette.primary : palette.medium, padding: 0, cursor: "pointer" }} />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: `1px solid ${palette.medium}`, background: "transparent", color: palette.primary, cursor: "pointer" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = palette.primary; (e.currentTarget as HTMLElement).style.color = palette.textLight; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = palette.primary; }}
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
          <p className="text-center mt-5" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.primaryDim, fontSize: "0.7rem", letterSpacing: "0.2em" }}>
            {current + 1} / {allWishes.length}
          </p>
        </div>
      </div>
    </section>
  );
}
