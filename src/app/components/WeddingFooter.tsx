import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Mail, Phone, Heart } from "lucide-react";
import { useTheme, useLang, usePronoun } from "../contexts/AppContext";

const FloralDivider = ({ color }: { color: string }) => (
  <svg width="200" height="30" viewBox="0 0 200 30" fill="none" className="mx-auto">
    <path d="M0 15 H75" stroke={color} strokeWidth="0.8" />
    <circle cx="82" cy="15" r="3" fill="none" stroke={color} strokeWidth="0.8" />
    <path d="M89 15 C93 10, 97 10, 100 15 C103 20, 107 20, 111 15" stroke={color} strokeWidth="0.8" fill="none" />
    <circle cx="118" cy="15" r="3" fill="none" stroke={color} strokeWidth="0.8" />
    <path d="M125 15 H200" stroke={color} strokeWidth="0.8" />
    <circle cx="100" cy="9" r="1.5" fill={color} />
    <circle cx="100" cy="21" r="1.5" fill={color} />
  </svg>
);

export function WeddingFooter() {
  const { palette } = useTheme();
  const { t } = useLang();
  const { pronoun } = usePronoun();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const navLinks = [
    { label: t.nav.ourStory, href: "#our-story" },
    { label: t.nav.details, href: "#event-details" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.rsvp, href: "#rsvp" },
    { label: t.nav.location, href: "#location" },
  ];

  const dividerColor = `${palette.textLight}60`;
  const leafColor = palette.textOnDark;
  const mutedTextColor = `${palette.textLight}90`;

  return (
    <footer style={{ background: palette.footerBg }}>
      {/* Wave transition — path closes at y=65 (beyond viewBox 60) to prevent sub-pixel bg1 bleed */}
      <div style={{ background: palette.bg1, lineHeight: 0, fontSize: 0 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", marginBottom: "-2px" }}
          preserveAspectRatio="none"
        >
          <path d="M0 65 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 65 Z" fill={palette.footerBg} />
        </svg>
      </div>

      <div className="px-6 pt-16 pb-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Leaf icon */}
            {/* <svg width="24" height="28" viewBox="0 0 24 28" fill="none" className="mx-auto mb-6">
              <path d="M12 2 C12 2 4 8 4 16 C4 21 7.6 25 12 25 C16.4 25 20 21 20 16 C20 8 12 2 12 2Z" stroke={leafColor} strokeWidth="1.2" fill="none" />
              <path d="M12 25 L12 8" stroke={leafColor} strokeWidth="1.2" strokeLinecap="round" />
              <path d="M12 16 Q8 14 6 10" stroke={leafColor} strokeWidth="0.8" strokeLinecap="round" />
              <path d="M12 13 Q16 11 18 7" stroke={leafColor} strokeWidth="0.8" strokeLinecap="round" />
            </svg> */}

            {/* Names */}
            <h2 className="mt-4 mb-8 playfair-font" style={{ color: palette.textLight, fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.01em" }}>
              Hiếu &amp; Tiên
            </h2>

            <FloralDivider color={dividerColor} />

            {/* Thank you */}
            <div className="mt-8 mb-8 max-w-xl mx-auto">
              <p className="playfair-font" style={{ color: palette.textLight, fontSize: "clamp(1rem, 2.5vw, 1.25rem)", lineHeight: 1.9, fontStyle: "italic", fontWeight: 400, opacity: 0.92 }}>
                {t.footer.thankYou.replace(/\{\{our\}\}/g, pronoun.our).replace(/\{\{you\}\}/g, pronoun.you)}
              </p>
              {/* <p className="mt-6" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textOnDark, fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.8 }}>
                {t.footer.withLove}
              </p>
              <p className="mt-2 playfair-font" style={{ color: palette.textLight, fontSize: "1.2rem", fontStyle: "italic" }}>
                Hiếu &amp; Tiên
              </p> */}
            </div>

            <FloralDivider color={dividerColor} />

            {/* Nav */}
            {/* <nav className="flex flex-wrap justify-center gap-4 md:gap-8 mt-10">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href}
                  style={{ fontFamily: "'Montserrat', sans-serif", color: mutedTextColor, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = palette.textLight)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = mutedTextColor)}
                >
                  {link.label}
                </a>
              ))}
            </nav> */}

            {/* Contact */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
              <a href="mailto:hieubm1707@gmail.com" className="flex items-center justify-center gap-2"
                style={{ fontFamily: "'Montserrat', sans-serif", color: mutedTextColor, fontSize: "0.78rem", fontWeight: 300, textDecoration: "none" }}>
                <Mail size={14} strokeWidth={1.5} />
                hieubm1707@gmail.com
              </a>
              <a href="tel:+84901234567" className="flex items-center justify-center gap-2"
                style={{ fontFamily: "'Montserrat', sans-serif", color: mutedTextColor, fontSize: "0.78rem", fontWeight: 300, textDecoration: "none" }}>
                <Phone size={14} strokeWidth={1.5} />
                033 736 0984
              </a>
              <span className="playfair-font" style={{ color: mutedTextColor, fontSize: "0.78rem", fontWeight: 300, textDecoration: "none" }}>&amp;</span>
              <a href="mailto:tientt1304@gmail.com" className="flex items-center justify-center gap-2"
                style={{ fontFamily: "'Montserrat', sans-serif", color: mutedTextColor, fontSize: "0.78rem", fontWeight: 300, textDecoration: "none" }}>
                <Mail size={14} strokeWidth={1.5} />
                tientt1304@gmail.com
              </a>
              <a href="tel:+84901234567" className="flex items-center justify-center gap-2"
                style={{ fontFamily: "'Montserrat', sans-serif", color: mutedTextColor, fontSize: "0.78rem", fontWeight: 300, textDecoration: "none" }}>
                <Phone size={14} strokeWidth={1.5} />
                034 545 0642
              </a>
            </div>

            {/* Bottom */}
            <div className="mt-12 pt-6 flex items-center justify-center gap-2" style={{ borderTop: `1px solid ${palette.primaryDim}30` }}>
              <Heart size={11} strokeWidth={1.5} color={mutedTextColor} fill={mutedTextColor} />
              <p style={{ fontFamily: "'Montserrat', sans-serif", color: mutedTextColor, fontSize: "0.65rem", letterSpacing: "0.15em" }}>
                {t.footer.madeWith}
              </p>
              <Heart size={11} strokeWidth={1.5} color={mutedTextColor} fill={mutedTextColor} />
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
