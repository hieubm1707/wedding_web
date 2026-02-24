import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTheme, useLang } from "../contexts/AppContext";

export function NavBar() {
  const { palette } = useTheme();
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.ourStory, href: "#our-story" },
    { label: t.nav.details, href: "#event-details" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.rsvp, href: "#rsvp" },
    { label: t.nav.wishes, href: "#wishes" },
    { label: t.nav.location, href: "#location" },
  ];

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled ? palette.navScrollBg : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${palette.border}60` : "none",
          padding: scrolled ? "12px 0" : "20px 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{
              fontFamily: "'Playfair Display', serif",
              color: scrolled ? palette.text : "#F8F8F4",
              fontSize: "1.1rem",
              fontWeight: 400,
              fontStyle: "italic",
              textDecoration: "none",
              textShadow: scrolled ? "none" : "0 1px 6px rgba(0,0,0,0.25)",
              transition: "color 0.4s",
            }}
          >
            L &amp; M
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: scrolled ? palette.textMuted : "rgba(255,255,255,0.92)",
                  fontSize: "0.63rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  textShadow: scrolled ? "none" : "0 1px 4px rgba(0,0,0,0.18)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = palette.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? palette.textMuted : "rgba(255,255,255,0.92)")}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => handleNav("#rsvp")}
            className="hidden md:block"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              background: palette.primary,
              color: palette.textLight,
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 500,
              padding: "10px 20px",
              border: "none",
              borderRadius: "1px",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {t.nav.rsvpNow}
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? palette.text : "#fff" }}
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8"
          style={{ background: `${palette.bg1}FA`, backdropFilter: "blur(16px)" }}
        >
          <p style={{ fontFamily: "'Playfair Display', serif", color: palette.accent, fontSize: "1.5rem", fontStyle: "italic" }}>
            Linh &amp; Minh
          </p>
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                color: palette.text,
                fontSize: "0.72rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#rsvp")}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              background: palette.primary,
              color: palette.textLight,
              fontSize: "0.68rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 500,
              padding: "14px 32px",
              border: "none",
              borderRadius: "1px",
              cursor: "pointer",
              marginTop: "8px",
            }}
          >
            {t.nav.rsvpNow}
          </button>
        </div>
      )}
    </>
  );
}
