import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useTheme, useLang, usePronoun } from "../contexts/AppContext";
import type { Wish, WishInput } from "../services/wishApi";

interface RSVPSectionProps {
  wishes: Wish[];
  onAddWish: (data: WishInput) => Promise<void>;
}

export function RSVPSection({ onAddWish }: RSVPSectionProps) {
  const { palette } = useTheme();
  const { t } = useLang();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  const { pronoun, setPronounFromName } = usePronoun();
  const [form, setForm] = useState({ name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("guestName");
    if (savedName && !form.name) {
      setForm((prev) => ({ ...prev, name: savedName }));
      setPronounFromName(savedName);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "name") setPronounFromName(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setLoading(true);
    try {
      await onAddWish({ name: form.name, message: form.message, attending: "yes" });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit wish:", err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${palette.border}`,
    borderRadius: 0,
    padding: "10px 0",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.88rem",
    color: palette.text,
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.3s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.65rem",
    color: palette.accent,
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
    fontWeight: 500,
    display: "block",
    marginBottom: "6px",
  };

  return (
    <section id="rsvp" className="py-24 md:py-36 px-6" style={{ background: palette.bg1 }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.accent, fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 500 }}>
            {t.rsvp.badge}
          </p>
          <h2 className="playfair-font" style={{ color: palette.text, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
            {t.rsvp.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 md:w-24" style={{ background: palette.primary, opacity: 0.5 }} />
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
              <path d="M8 2 L14 8 L8 14 L2 8 Z" stroke={palette.primary} strokeWidth="1.2" strokeOpacity="0.8"/>
              <path d="M16 2 L22 8 L16 14 L10 8 Z" stroke={palette.primary} strokeWidth="1.2" strokeOpacity="0.8"/>
              <path d="M24 2 L30 8 L24 14 L18 8 Z" stroke={palette.primary} strokeWidth="1.2" strokeOpacity="0.8"/>
              <path d="M16 6.5 L17.5 8 L16 9.5 L14.5 8 Z" fill={palette.primary} fillOpacity="0.8" />
            </svg>
            <div className="h-px w-16 md:w-24" style={{ background: palette.primary, opacity: 0.5 }} />
          </div>
          {/* <p className="mt-6" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.88rem", lineHeight: 1.9, fontWeight: 300, maxWidth: "480px", margin: "24px auto 0" }}>
            {t.rsvp.description}
          </p> */}
        </motion.div>

        {/* Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 30 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div>
                <label style={labelStyle}>{t.rsvp.name}</label>
                <input name="name" type="text" placeholder={t.rsvp.namePlaceholder} required value={form.name} onChange={handleChange} style={inputStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = palette.primary)}
                  onBlur={(e) => (e.target.style.borderBottomColor = palette.border)} />
              </div>
              <div>
                <label style={labelStyle}>{t.rsvp.message}</label>
                <textarea name="message" placeholder={t.rsvp.messagePlaceholder} required rows={4} value={form.message} onChange={handleChange}
                  style={{ ...inputStyle, borderBottom: "none", border: `1px solid ${palette.border}`, borderRadius: "2px", padding: "14px 16px", resize: "vertical", minHeight: "110px" }}
                  onFocus={(e) => (e.target.style.borderColor = palette.primary)}
                  onBlur={(e) => (e.target.style.borderColor = palette.border)} />
              </div>
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-12 py-4 transition-all duration-300"
                  style={{ background: loading ? palette.primaryDim : palette.primary, color: palette.textLight, fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 500, border: "none", borderRadius: "1px", cursor: loading ? "wait" : "pointer" }}
                >
                  {loading ? t.rsvp.submitting : t.rsvp.submit}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-14 px-8"
              style={{ border: `1px solid ${palette.border}`, borderRadius: "2px", background: "rgba(255,255,255,0.4)" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: palette.primary }}>
                <Check size={24} color={palette.textLight} strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 playfair-font" style={{ color: palette.text, fontSize: "1.5rem", fontWeight: 400 }}>
                {t.rsvp.successTitle(form.name)}
              </h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.88rem", lineHeight: 1.9, fontWeight: 300 }}>
                {t.rsvp.successText.replace(/\{\{our\}\}/g, pronoun.our).replace(/\{\{you\}\}/g, pronoun.you)}
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", message: "" }); setPronounFromName(""); }}
                className="mt-8"
                style={{ fontFamily: "'Montserrat', sans-serif", color: palette.primary, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "4px" }}
              >
                {t.rsvp.addAnother}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
