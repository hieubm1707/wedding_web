import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { useTheme, useLang } from "../contexts/AppContext";

const LeafIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2 C12 2 4 7 4 14 C4 18.4 7.6 22 12 22 C16.4 22 20 18.4 20 14 C20 7 12 2 12 2Z" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 22 L12 8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M12 14 Q8 12 6 9" stroke={color} strokeWidth="1" strokeLinecap="round" />
    <path d="M12 12 Q16 10 18 7" stroke={color} strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const storyImages = [
  "https://images.unsplash.com/photo-1766735328604-8a53df42203f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "https://images.unsplash.com/photo-1634040616805-bfe7066251ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "https://images.unsplash.com/photo-1631883971900-fa9c798aee92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  "https://images.unsplash.com/photo-1765871905755-416de3eba6be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
];

function StoryItem({
  item,
  image,
  index,
  align,
}: {
  item: { date: string; title: string; text: string };
  image: string;
  index: number;
  align: "left" | "right";
}) {
  const { palette } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = align === "left";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${!isLeft ? "md:flex-row-reverse" : ""}`}
    >
      {/* Image */}
      <div className="w-full md:w-5/12">
        <div
          className="overflow-hidden"
          style={{ borderRadius: "2px", boxShadow: `0 4px 30px ${palette.shadowAccent}` }}
        >
          <img
            src={image}
            alt={item.title}
            className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Timeline dot */}
      <div className="hidden md:flex flex-col items-center gap-3 flex-shrink-0">
        <div className="w-px h-12" style={{ background: palette.light }} />
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: palette.bg1, border: `1.5px solid ${palette.accent}` }}
        >
          <LeafIcon color={palette.accent} />
        </div>
        <div className="w-px h-12" style={{ background: palette.light }} />
      </div>

      {/* Text */}
      <div className={`w-full md:w-5/12 ${!isLeft ? "md:text-right" : ""}`}>
        <p
          className="mb-2"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: palette.accent,
            fontSize: "0.72rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {item.date}
        </p>
        <h3
          className="mb-4"
          style={{
            fontFamily: '"Mussica Swash", "Playfair Display", serif',
            color: palette.text,
            fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
            fontWeight: 400,
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: palette.textMuted,
            fontSize: "0.9rem",
            lineHeight: 1.9,
            fontWeight: 300,
          }}
        >
          {item.text}
        </p>
        <div className="md:hidden mt-4 flex items-center gap-2" style={{ justifyContent: isLeft ? "flex-start" : "flex-end" }}>
          <LeafIcon color={palette.accent} />
        </div>
      </div>
    </motion.div>
  );
}

export function OurStory() {
  const { palette } = useTheme();
  const { t } = useLang();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const aligns: ("left" | "right")[] = ["left", "right", "left", "right"];

  return (
    <section id="our-story" className="py-24 md:py-36 px-6" style={{ background: palette.bg1 }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-28"
        >
          {/* <p
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
            {t.ourStory.badge}
          </p> */}
          <h2
            style={{
              fontFamily: '"Mussica Swash", "Playfair Display", serif',
              color: palette.text,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {t.ourStory.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12" style={{ background: palette.light }} />
            <LeafIcon color={palette.accent} />
            <div className="h-px w-12" style={{ background: palette.light }} />
          </div>
        </motion.div>

        {/* Items */}
        <div className="flex flex-col gap-20 md:gap-24">
          {t.ourStory.items.map((item, i) => (
            <StoryItem key={item.date} item={item} image={storyImages[i]} index={i} align={aligns[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
