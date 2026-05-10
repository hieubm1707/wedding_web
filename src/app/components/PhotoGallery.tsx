import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme, useLang } from "../contexts/AppContext";

const galleryImages = [
  // { src: "./images/collection_001.webp", alt: "Couple" },
  { src: "./images/collection_006.webp", alt: "Couple" },
  { src: "./images/collection_011.webp", alt: "Couple" },
  { src: "./images/collection_004.webp", alt: "Couple" },
  { src: "./images/collection_010.webp", alt: "Couple" },
  { src: "./images/collection_013.webp", alt: "Couple" },
  // { src: "./images/collection_007.webp", alt: "Couple" },
  { src: "./images/collection_012.webp", alt: "Couple" },
  { src: "./images/collection_014.webp", alt: "Couple" },
  { src: "./images/collection_009.webp", alt: "Couple" },
  { src: "./images/collection_008.webp", alt: "Couple" },
  { src: "./images/collection_015.webp", alt: "Couple" },
  { src: "./images/collection_016.webp", alt: "Couple" },
  { src: "./images/collection_017.webp", alt: "Couple" },
  { src: "./images/collection_018.webp", alt: "Couple" },
  { src: "./images/collection_019.webp", alt: "Couple" },
  { src: "./images/collection_020.webp", alt: "Couple" },
  { src: "./images/collection_021.webp", alt: "Couple" },
  { src: "./images/collection_022.webp", alt: "Couple" },
  { src: "./images/collection_023.webp", alt: "Couple" },
  { src: "./images/collection_024.webp", alt: "Couple" },
  { src: "./images/collection_025.webp", alt: "Couple" },
  { src: "./images/collection_026.webp", alt: "Couple" },
  { src: "./images/collection_027.webp", alt: "Couple" },
  { src: "./images/collection_028.webp", alt: "Couple" },
  { src: "./images/collection_029.webp", alt: "Couple" },
  { src: "./images/collection_030.webp", alt: "Couple" },
  { src: "./images/collection_031.webp", alt: "Couple" },
  { src: "./images/collection_032.webp", alt: "Couple" },
  { src: "./images/collection_033.webp", alt: "Couple" },
];

function GalleryImage({ img, index, onOpen }: { img: typeof galleryImages[0]; index: number; onOpen: (index: number) => void }) {
  const { palette } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className="relative overflow-hidden cursor-pointer"
      style={{ borderRadius: "6px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(index)}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full block object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ background: `${palette.primary}3A`, opacity: hovered ? 1 : 0, borderRadius: "6px" }}
      />
    </motion.div>
  );
}

const NAV_BTN = {
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.25)",
  cursor: "pointer",
} as const;

export function PhotoGallery() {
  const { palette } = useTheme();
  const { t } = useLang();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const navDir = useRef<"left" | "right">("right");

  const goTo = (i: number, dir: "left" | "right") => {
    navDir.current = dir;
    setLightboxIndex((i + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(lightboxIndex + 1, "right");
      else if (e.key === "ArrowLeft") goTo(lightboxIndex - 1, "left");
      else if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="py-8 md:py-12 px-6" style={{ background: palette.bg1 }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.accent, fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 500 }}>
            {t.gallery.badge}
          </p>
          <h2 className="playfair-font" style={{ color: palette.text, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
            {t.gallery.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-10" style={{ background: palette.medium }} />
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill={palette.accent} /></svg>
            <div className="h-px w-10" style={{ background: palette.medium }} />
          </div>
        </motion.div>

        {/* Masonry */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3 }}>
          <Masonry gutter="16px">
            {galleryImages.map((img, i) => (
              <GalleryImage key={img.src} img={img} index={i} onOpen={setLightboxIndex} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-16"
          style={{ background: "rgba(30,20,20,0.92)" }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full"
            style={NAV_BTN}
          >
            <X size={18} color="#fff" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goTo(lightboxIndex - 1, "left"); }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full"
            style={NAV_BTN}
          >
            <ChevronLeft size={20} color="#fff" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goTo(lightboxIndex + 1, "right"); }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full"
            style={NAV_BTN}
          >
            <ChevronRight size={20} color="#fff" />
          </button>

          {/* Image with slide animation */}
          <motion.img
            key={lightboxIndex}
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            initial={{ opacity: 0, x: navDir.current === "right" ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="max-w-full max-h-full object-contain"
            style={{ borderRadius: "6px", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <p
            className="absolute bottom-5"
            style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)" }}
          >
            {lightboxIndex + 1} / {galleryImages.length}
          </p>
        </motion.div>
      )}
    </section>
  );
}
