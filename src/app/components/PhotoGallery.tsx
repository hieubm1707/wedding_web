import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { X, ZoomIn } from "lucide-react";
import { useTheme, useLang } from "../contexts/AppContext";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1767986012138-4893f40932d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", alt: "Wedding ceremony" },
  { src: "https://images.unsplash.com/photo-1569842587396-f420b6279842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", alt: "Bridal bouquet" },
  { src: "https://images.unsplash.com/photo-1767050179711-a8401bd02be9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", alt: "Reception table" },
  { src: "https://images.unsplash.com/photo-1765871905755-416de3eba6be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", alt: "Garden arch" },
  { src: "https://images.unsplash.com/photo-1631883971900-fa9c798aee92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", alt: "Wedding rings" },
  { src: "https://images.unsplash.com/photo-1771305145464-01a595836294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", alt: "Wedding cake" },
  { src: "https://images.unsplash.com/photo-1634040616805-bfe7066251ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", alt: "First dance" },
  { src: "https://images.unsplash.com/photo-1766735328604-8a53df42203f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", alt: "Couple" },
];

function GalleryImage({ img, index, onOpen }: { img: typeof galleryImages[0]; index: number; onOpen: (src: string) => void }) {
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
      onClick={() => onOpen(img.src)}
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
      >
        <ZoomIn size={28} color={palette.textLight} strokeWidth={1.5} />
      </div>
    </motion.div>
  );
}

export function PhotoGallery() {
  const { palette } = useTheme();
  const { t } = useLang();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-36 px-6" style={{ background: palette.bg }}>
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
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: palette.text, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
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
              <GalleryImage key={img.src} img={img} index={i} onOpen={setLightbox} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(30,20,20,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", cursor: "pointer" }}
          >
            <X size={18} color="#fff" />
          </button>
          <img
            src={lightbox.replace("w=800", "w=1600")}
            alt="Gallery"
            className="max-w-full max-h-full object-contain"
            style={{ borderRadius: "6px", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
}
