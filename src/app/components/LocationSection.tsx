import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import { useTheme, useLang } from "../contexts/AppContext";

export function LocationSection() {
  const { palette } = useTheme();
  const { t } = useLang();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const mapRef = useRef(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-60px" });

  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Hoi+An+Ancient+Town+Quang+Nam+Vietnam";
  const embedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30484.73720283887!2d108.31394!3d15.87969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142116949840599%3A0x485b8c96a8cd491f!2sHoi%20An%20Ancient%20Town!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s";

  const venueCards = [
    {
      label: t.location.ceremony,
      name: "The Garden of Serenity",
      address: "12 Hoa Viên Lane, Hội An Ancient Town,\nQuảng Nam, Vietnam",
    },
    {
      label: t.location.reception,
      name: "The Lantern Hall",
      address: "88 Nguyễn Thái Học, Hội An Ancient Town,\nQuảng Nam, Vietnam",
    },
  ];

  return (
    <section id="location" className="py-24 md:py-36 px-6" style={{ background: palette.bg }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.accent, fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 500 }}>
            {t.location.badge}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: palette.text, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
            {t.location.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-10" style={{ background: palette.medium }} />
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill={palette.accent} /></svg>
            <div className="h-px w-10" style={{ background: palette.medium }} />
          </div>
        </motion.div>

        {/* Venue cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
        >
          {venueCards.map((card) => (
            <div key={card.label} className="flex items-start gap-5 p-7" style={{ border: `1px solid ${palette.border}`, borderRadius: "2px", background: palette.bg1 }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: palette.bg2 }}>
                <MapPin size={18} strokeWidth={1.5} color={palette.primary} />
              </div>
              <div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.accent, fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500, marginBottom: "6px" }}>
                  {card.label}
                </p>
                <h4 style={{ fontFamily: "'Playfair Display', serif", color: palette.text, fontSize: "1.05rem", fontWeight: 400, marginBottom: "4px" }}>
                  {card.name}
                </h4>
                <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                  {card.address}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, y: 30 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
          style={{ border: `1px solid ${palette.border}`, borderRadius: "4px", boxShadow: `0 4px 30px ${palette.shadowAccent}` }}
        >
          <iframe
            title="Wedding Venue Map"
            src={embedSrc}
            width="100%"
            height="420"
            style={{ border: "none", display: "block", filter: "saturate(0.85) brightness(1.02)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5"
            style={{ background: `${palette.bg1}F5` }}
          >
            <div className="flex items-center gap-3">
              <MapPin size={16} strokeWidth={1.5} color={palette.primary} />
              <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.text, fontSize: "0.82rem", fontWeight: 400 }}>
                {t.location.venueAddress}
              </span>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 transition-all duration-300"
              style={{ background: palette.primary, color: palette.textLight, fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", borderRadius: "1px", flexShrink: 0 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Navigation size={13} strokeWidth={1.5} />
              {t.location.getDirections}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
