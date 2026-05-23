import { useEffect, useState } from "react";
import { AnimatePresence, motion, type TargetAndTransition, type Transition } from "motion/react";
import { useTheme } from "../contexts/AppContext";
import type { Wish } from "../services/wishApi";

interface WishesSlideSectionProps {
  wishes?: Wish[];
  loading?: boolean;
  onRefetch?: () => void;
}

const COLLECTION_IMAGES = Array.from(
  { length: 33 },
  (_, i) => `./images/collection_${String(i + 1).padStart(3, "0")}.webp`,
);

const SLIDE_DURATION_MS = 6000;
const WISH_THRESHOLD = 12;

type SlideTransition = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  transition: Transition;
};

// 10 fixed transition effects, cycled through on each slide change.
const TRANSITIONS: SlideTransition[] = [
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  {
    initial: { opacity: 0, x: "-100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  {
    initial: { opacity: 0, y: "-100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "-100%" },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  {
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
    transition: { duration: 1.4, ease: "easeOut" },
  },
  {
    initial: { opacity: 0, scale: 1.3 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 },
    transition: { duration: 1.4, ease: "easeOut" },
  },
  {
    initial: { opacity: 0, rotate: -8, scale: 0.85 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 8, scale: 0.85 },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  {
    initial: { opacity: 0, filter: "blur(20px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(20px)" },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: -90 },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
];

export function WishesSlideSection({ wishes = [], loading, onRefetch }: WishesSlideSectionProps) {
  const { palette } = useTheme();
  const showWishes = wishes.length > WISH_THRESHOLD;

  const [imageIndex, setImageIndex] = useState(0);
  const [wishIndex, setWishIndex] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);

  // Single tick advances both image and wish together so the combined slide changes as one.
  useEffect(() => {
    if (showWishes) {
      setWishIndex((i) => (i < wishes.length ? i : 0));
    }
    const id = setInterval(() => {
      setImageIndex((i) => (i + 1) % COLLECTION_IMAGES.length);
      if (showWishes) {
        setWishIndex((i) => (i + 1) % wishes.length);
      }
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [showWishes, wishes.length]);

  // Refetch cadence: 60s when wishes <= 12, otherwise wishes.length * 5 seconds.
  useEffect(() => {
    if (!onRefetch || loading) return;
    const delayMs = showWishes ? wishes.length * 5 * 1000 : 60 * 1000;
    const id = setTimeout(() => onRefetch(), delayMs);
    return () => clearTimeout(id);
  }, [onRefetch, loading, showWishes, wishes.length]);

  const slideTransition = TRANSITIONS[imageIndex % TRANSITIONS.length];
  const currentImage = COLLECTION_IMAGES[imageIndex];
  const currentWish = showWishes ? wishes[wishIndex] : undefined;

  const imageVisual = (
    <>
      {/* Blurred full-bleed backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${currentImage}')`,
          filter: "blur(28px) brightness(0.85) saturate(1.05)",
          transform: "scale(1.15)",
        }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.28)" }} />

      {/* Sharp focal photo with white frame */}
      <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
        <div
          className="relative bg-white"
          style={{
            padding: "clamp(10px, 1.4vw, 18px)",
            maxWidth: isLandscape ? "min(92vw, 142vh)" : "min(78vw, 62vh)",
            maxHeight: "86vh",
            boxShadow:
              "0 30px 60px -20px rgba(0,0,0,0.55), 0 14px 32px -12px rgba(0,0,0,0.4)",
          }}
        >
          <img
            src={currentImage}
            alt=""
            className="block"
            onLoad={(e) => {
              const t = e.currentTarget;
              setIsLandscape(t.naturalWidth > t.naturalHeight);
            }}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "calc(86vh - 36px)",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </>
  );

  const wishVisual = currentWish ? (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      {/* Top half: image, centered */}
      <div className="flex-1 min-h-0 flex items-center justify-center px-8 pt-8 pb-4">
        {currentWish.image_url && (
          <div
            className="bg-white"
            style={{
              padding: "clamp(6px, 0.8vw, 12px)",
              maxWidth: "100%",
              // maxHeight: "calc(50vh - 40px)",
              maxHeight: "100%",
              boxShadow:
                "0 18px 36px -16px rgba(0,0,0,0.45), 0 8px 20px -10px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={currentWish.image_url}
              alt=""
              className="block"
              style={{
                maxWidth: "100%",
                maxHeight: "calc(50vh - 80px)",
                width: "auto",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </div>

      {/* Bottom half: name + message, horizontally centered, aligned to top */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-start text-center px-8 pb-8 pt-4 gap-4">
        <h3
          className="playfair-font"
          style={{
            color: palette.primary,
            fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
            lineHeight: 1.2,
            fontWeight: 500,
          }}
        >
          {currentWish.name}
        </h3>
        <blockquote
          className="playfair-font"
          style={{
            color: palette.text,
            fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
            fontStyle: "italic",
            lineHeight: 1.7,
            whiteSpace: "pre-line",
            maxWidth: 480,
          }}
        >
          “{currentWish.message}”
        </blockquote>
      </div>
    </div>
  ) : null;

  return (
    <section
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      style={{ background: palette.bg }}
    >
      <div className="absolute inset-0" style={{ perspective: 1500 }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={imageIndex}
            className="absolute inset-0"
            initial={slideTransition.initial}
            animate={slideTransition.animate}
            exit={slideTransition.exit}
            transition={slideTransition.transition}
            style={{ willChange: "transform, opacity, filter" }}
          >
            {showWishes ? (
              <div className="flex flex-col md:flex-row w-full h-full">
                <div className="relative w-full md:w-2/3 h-2/3 md:h-full overflow-hidden">
                  {imageVisual}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: palette.heroGradient, opacity: 0.35 }}
                  />
                </div>
                <div
                  className="relative w-full md:w-1/3 h-1/3 md:h-full overflow-hidden"
                  style={{ background: palette.cardBg }}
                >
                  {wishVisual}
                </div>
              </div>
            ) : (
              <>
                {imageVisual}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: palette.heroGradient, opacity: 0.3 }}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
