import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useTheme, useLang } from "../contexts/AppContext";
import type { Wish } from "../services/wishApi";

const TRUNCATE_LENGTH = 130;
const INITIAL_BATCH = 24;
const BATCH_SIZE = 12;

const defaultWishes: Wish[] = [
  { id: "1", name: "Hương & Tuấn", message: "Wishing you both a lifetime filled with laughter, adventure, and an abundance of love. May every day bring you closer together. Congratulations!", attending: "yes", timestamp: "15 January 2026" },
  { id: "2", name: "Aunt Bích Ngọc", message: "Two kind souls, now one beautiful journey. May your home always be filled with warmth, joy, and the sweet scent of flowers. We love you both dearly.", attending: "yes", timestamp: "20 January 2026" },
  { id: "3", name: "Nhóm bạn đại học", message: "From the days of shared lunches and late-night study sessions, to watching you both find each other — we couldn't be prouder. Cheers to forever!", attending: "yes", timestamp: "1 February 2026" },
  { id: "4", name: "Chú Phương & Cô Lan", message: "A love like yours is rare and beautiful. We are so grateful to witness your story. May your marriage be as radiant as the both of you.", attending: "yes", timestamp: "10 February 2026" },
  { id: "5", name: "Minh Châu", message: "Linh, you deserve every happiness. Minh, take good care of her! Wishing you a lifetime of beautiful mornings and peaceful evenings together.", attending: "yes", timestamp: "14 February 2026" },
  { id: "6", name: "Cô Mai", message: "May your love story be as magical and charming as a fairy tale. Wishing you both endless happiness and a lifetime of unforgettable moments together.", attending: "yes", timestamp: "20 February 2026" },
  { id: "7", name: "Anh Khoa", message: "Linh, you are a wonderful person and I’m so happy you found someone as great as Minh. Wishing you both a lifetime of love, laughter, and happiness together!", attending: "yes", timestamp: "28 February 2026" },
  { id: "8", name: "Chị Hạnh", message: "Wishing you both a lifetime of love and happiness. May your marriage be filled with laughter, understanding, and endless support for each other. Congratulations!", attending: "yes", timestamp: "5 March 2026" },
  { id: "9", name: "Gia đình anh Hải", message: "To a beautiful couple, may your love grow stronger with each passing day. Wishing you a lifetime of happiness, laughter, and unforgettable memories together.", attending: "yes", timestamp: "12 March 2026" },
  { id: "10", name: "Bạn Trang", message: "Linh, seeing you so happy makes my heart full. Wishing you and Minh a marriage filled with love, laughter, and endless adventures together!", attending: "yes", timestamp: "18 March 2026" },
  { id: "11", name: "Anh Tuấn", message: "Wishing you both a lifetime of love and happiness. May your marriage be filled with laughter, understanding, and endless support for each other. Congratulations!", attending: "yes", timestamp: "25 March 2026" },
  { id: "12", name: "Cô Dung", message: "May your love story be as magical and charming as a fairy tale. Wishing you both endless happiness and a lifetime of unforgettable moments together.", attending: "yes", timestamp: "30 March 2026" },
  { id: "13", name: "Anh Huy", message: "Linh, you are a wonderful person and I’m so happy you found someone as great as Minh. Wishing you both a lifetime of love, laughter, and happiness together!", attending: "yes", timestamp: "5 April 2026" },
  { id: "14", name: "Chị Phương", message: "Two kind souls, now one beautiful journey. May your home always be filled with warmth, joy, and the sweet scent of flowers. We love you both dearly.", attending: "yes", timestamp: "12 April 2026" },
  { id: "15", name: "Bạn Hương", message: "From the days of shared lunches and late-night study sessions, to watching you both find each other — we couldn't be prouder. Cheers to forever!", attending: "yes", timestamp: "18 April 2026" },
];

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="15" viewBox="0 0 24 18" fill="none">
      <path d="M0 18V10.8C0 7.2 1.2 4.2 3.6 1.8L5.4 0C6.6 2.4 7.2 4.2 7.2 5.4C5.6 6.2 4.8 7.8 4.8 10.2V12H9.6V18H0ZM14.4 18V10.8C14.4 7.2 15.6 4.2 18 1.8L19.8 0C21 2.4 21.6 4.2 21.6 5.4C20 6.2 19.2 7.8 19.2 10.2V12H24V18H14.4Z" fill={color} />
    </svg>
  );
}

function WishModal({ wish, onClose }: { wish: Wish; onClose: () => void }) {
  const { palette } = useTheme();
  const { t } = useLang();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.52)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 16 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-md"
        style={{ background: palette.cardBg, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "40px 36px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "14px", right: "14px", background: "none", border: "none", cursor: "pointer", color: palette.textMuted, display: "flex", alignItems: "center" }}
        >
          <X size={17} strokeWidth={1.5} />
        </button>
        <div className="mb-5">
          <QuoteIcon color={palette.light} />
        </div>
        <p className="playfair-font mb-6" style={{ color: palette.text, fontSize: "0.95rem", lineHeight: 1.9, fontStyle: "italic", fontWeight: 400 }}>
          {wish.message}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.text, fontSize: "0.8rem", fontWeight: 500 }}>{wish.name}</p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.accent, fontSize: "0.68rem", letterSpacing: "0.1em", marginTop: "2px" }}>{wish.timestamp}</p>
          </div>
          {wish.attending === "yes" && (
            <span style={{ fontFamily: "'Montserrat', sans-serif", background: palette.bg1, color: palette.primary, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, padding: "4px 10px", borderRadius: "20px", border: `1px solid ${palette.border}` }}>
              {t.wishes.attendingBadge}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function WishCard({ wish, onExpand, index }: { wish: Wish; onExpand: () => void; index: number }) {
  const { palette } = useTheme();
  const { t } = useLang();
  const isTruncated = wish.message.length > TRUNCATE_LENGTH;
  const displayMessage = isTruncated
    ? wish.message.slice(0, TRUNCATE_LENGTH).trimEnd() + "…"
    : wish.message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07 }}
      style={{
        background: palette.cardBg,
        border: `1px solid ${palette.border}`,
        borderRadius: "4px",
        padding: "24px 26px",
      }}
    >
      <div className="mb-4">
        <QuoteIcon color={palette.light} />
      </div>
      <p className="playfair-font" style={{ color: palette.text, fontSize: "0.92rem", lineHeight: 1.85, fontStyle: "italic", fontWeight: 400, marginBottom: isTruncated ? "10px" : "14px" }}>
        {displayMessage}
      </p>
      {isTruncated && (
        <button
          onClick={onExpand}
          style={{ fontFamily: "'Montserrat', sans-serif", color: palette.primary, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline", textUnderlineOffset: "3px", marginBottom: "14px", display: "block" }}
        >
          {t.wishes.readMore}
        </button>
      )}
      <div className="flex items-center justify-between">
        <div>
          <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.text, fontSize: "0.78rem", fontWeight: 500 }}>{wish.name}</p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.accent, fontSize: "0.65rem", letterSpacing: "0.1em", marginTop: "2px" }}>{wish.timestamp}</p>
        </div>
        {wish.attending === "yes" && (
          <span style={{ fontFamily: "'Montserrat', sans-serif", background: palette.bg1, color: palette.primary, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, padding: "3px 9px", borderRadius: "20px", border: `1px solid ${palette.border}` }}>
            {t.wishes.attendingBadge}
          </span>
        )}
      </div>
    </motion.div>
  );
}

interface WishesSliderProps {
  wishes: Wish[];
  loading?: boolean;
}

export function WishesSlider({ wishes: extraWishes, loading = false }: WishesSliderProps) {
  const { palette } = useTheme();
  const { t } = useLang();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  const allWishes = [...defaultWishes, ...extraWishes];
  const [visibleCount, setVisibleCount] = useState(Math.min(INITIAL_BATCH, allWishes.length));
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const sentinelInView = useInView(sentinelRef, { margin: "300px 0px" });
  const hasMore = visibleCount < allWishes.length;

  // When API data arrives, immediately show up to INITIAL_BATCH wishes.
  useEffect(() => {
    setVisibleCount((prev) => Math.max(prev, Math.min(INITIAL_BATCH, allWishes.length)));
  }, [extraWishes.length]);

  // When sentinel scrolls into view (or API data arrives while sentinel is visible), load next batch.
  useEffect(() => {
    if (sentinelInView && hasMore) {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, allWishes.length));
    }
  }, [sentinelInView, allWishes.length]);

  const visibleWishes = allWishes.slice(0, visibleCount);

  if (allWishes.length === 0) return null;

  return (
    <section id="wishes" className="py-24 md:py-36 px-4" style={{ background: palette.bg1 }}>
      {/* Header — centered, constrained width */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 md:mb-16 max-w-xl mx-auto"
      >
        <p className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.primary, fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 500 }}>
          {t.wishes.badge}
        </p>
        <h2 className="playfair-font" style={{ color: palette.text, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
          {t.wishes.title}
        </h2>
        <div className="flex items-center justify-center gap-4 mt-5">
          <div className="h-px w-10" style={{ background: palette.medium }} />
          <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill={palette.primary} /></svg>
          <div className="h-px w-10" style={{ background: palette.medium }} />
        </div>
        {loading && (
          <div className="flex justify-center gap-1.5 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                style={{ width: "5px", height: "5px", borderRadius: "50%", background: palette.medium }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Masonry Grid — full width */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 580: 2, 900: 3, 1280: 4, 1600: 5 }}>
        <Masonry gutter="12px">
          {visibleWishes.map((wish, index) => (
            <WishCard
              key={wish.id}
              wish={wish}
              index={index}
              onExpand={() => setSelectedWish(wish)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {/* Always rendered so useInView can observe from mount */}
      <div ref={sentinelRef} className="flex justify-center pt-10">
        {hasMore && (
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                style={{ width: "5px", height: "5px", borderRadius: "50%", background: palette.medium }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedWish && (
          <WishModal
            key={selectedWish.id}
            wish={selectedWish}
            onClose={() => setSelectedWish(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
