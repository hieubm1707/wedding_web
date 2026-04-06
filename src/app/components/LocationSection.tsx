import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { MapPin, Navigation, Phone, Mail, Facebook, QrCode, X, Gift, Copy, Check } from "lucide-react";
import { useTheme, useLang } from "../contexts/AppContext";

export function LocationSection() {
  const { palette } = useTheme();
  const { t } = useLang();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrTab, setQrTab] = useState<"groom" | "bride">("groom");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const accNumber = qrTab === "groom" ? "0123456789" : "9876543210";
    navigator.clipboard.writeText(accNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="location" className="py-24 md:py-36 px-6" style={{ background: palette.bg1 }}>
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
          <h2 className="playfair-font" style={{ color: palette.text, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
            {t.location.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-10" style={{ background: palette.medium }} />
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill={palette.accent} /></svg>
            <div className="h-px w-10" style={{ background: palette.medium }} />
          </div>
        </motion.div>

        {/* Contact & Gift Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 md:mt-24">
          {/* Contact Col */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col p-8 md:p-10 h-full"
            style={{ border: `1px solid ${palette.border}`, borderRadius: "4px", background: palette.bg }}
          >
            <h3 className="playfair-font mb-8" style={{ color: palette.text, fontSize: "1.7rem", fontWeight: 400 }}>
              {t.location.contactTitle}
            </h3>
            <div className="flex flex-col gap-6">
              {/* Groom */}
              <div>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", color: palette.primary, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: "16px" }}>
                  {t.location.groomTitle}
                </h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Phone size={14} style={{ color: palette.accent }} />
                    <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.85rem", fontWeight: 400 }}>+84 (0) 90 123 4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={14} style={{ color: palette.accent }} />
                    <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.85rem", fontWeight: 400 }}>minhhieu@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Facebook size={14} style={{ color: palette.accent }} />
                    <a href="#" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.85rem", fontWeight: 400, textDecoration: "underline", textUnderlineOffset: "3px" }}>fb.com/minhhieu</a>
                  </div>
                </div>
              </div>

              <div className="h-px w-full my-2" style={{ background: palette.border }} />

              {/* Bride */}
              <div>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", color: palette.primary, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: "16px" }}>
                  {t.location.brideTitle}
                </h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Phone size={14} style={{ color: palette.accent }} />
                    <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.85rem", fontWeight: 400 }}>+84 (0) 90 765 4321</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={14} style={{ color: palette.accent }} />
                    <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.85rem", fontWeight: 400 }}>thaotien@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Facebook size={14} style={{ color: palette.accent }} />
                    <a href="#" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.85rem", fontWeight: 400, textDecoration: "underline", textUnderlineOffset: "3px" }}>fb.com/thaotien</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gift Col */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col p-8 md:p-10 justify-center items-center text-center h-full"
            style={{ border: `1px solid ${palette.border}`, borderRadius: "4px", background: palette.bg }}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ background: palette.bg1, color: palette.primary }}>
              <Gift size={24} strokeWidth={1.5} />
            </div>
            <h3 className="playfair-font mb-4" style={{ color: palette.text, fontSize: "1.7rem", fontWeight: 400 }}>
              {t.location.giftTitle}
            </h3>
            <p className="mb-10" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8, maxWidth: "340px" }}>
              {t.location.giftDesc}
            </p>
            <button
              onClick={() => setQrModalOpen(true)}
              className="flex items-center gap-2 px-8 py-4 transition-all duration-300 hover:scale-105"
              style={{ background: palette.primary, color: palette.textLight, fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, borderRadius: "2px", border: "none", cursor: "pointer" }}
            >
              <QrCode size={16} />
              {t.location.qrBtn}
            </button>
          </motion.div>
        </div>

      </div>

      {/* QR Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-sm p-8 md:p-10 text-center"
            style={{ background: palette.bg, borderRadius: "4px", border: `1px solid ${palette.border}`, boxShadow: `0 10px 40px ${palette.shadowPrimary}` }}
          >
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 transition-colors duration-200 cursor-pointer"
              style={{ color: palette.textMuted, background: "transparent", border: "none" }}
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: palette.bg1, color: palette.primary }}>
              <Gift size={20} strokeWidth={1.5} />
            </div>
            <h2 className="playfair-font mb-2" style={{ color: palette.text, fontSize: "1.8rem", fontWeight: 400 }}>
              {t.location.qrModalTitle}
            </h2>
            <p className="mb-6" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.82rem", fontWeight: 300 }}>
              {t.location.qrModalDesc}
            </p>

            <div className="flex border-b mb-6" style={{ borderColor: palette.border }}>
              <button
                onClick={() => setQrTab("groom")}
                className="flex-1 py-3 transition-colors duration-200 cursor-pointer"
                style={{ background: "transparent", fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: qrTab === "groom" ? 600 : 400, color: qrTab === "groom" ? palette.primary : palette.textMuted, border: "none", borderBottom: qrTab === "groom" ? `2px solid ${palette.primary}` : "2px solid transparent" }}
              >
                {t.location.qrTabGroom}
              </button>
              <button
                onClick={() => setQrTab("bride")}
                className="flex-1 py-3 transition-colors duration-200 cursor-pointer"
                style={{ background: "transparent", fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: qrTab === "bride" ? 600 : 400, color: qrTab === "bride" ? palette.primary : palette.textMuted, border: "none", borderBottom: qrTab === "bride" ? `2px solid ${palette.primary}` : "2px solid transparent" }}
              >
                {t.location.qrTabBride}
              </button>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="w-80 h-80 bg-white p-3" style={{ border: `1px solid ${palette.border}`, borderRadius: "8px" }}>
                <img
                  src={qrTab === "groom" ? "./images/qr_groom.png" : "./images/qr_bride.png"}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-full p-4 text-left rounded" style={{ background: palette.bg1, border: `1px dashed ${palette.primaryDim}` }}>
                <div className="flex justify-between mb-2">
                  <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.75rem", fontWeight: 500 }}>{t.location.bankName}</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.text, fontSize: "0.75rem", fontWeight: 600 }}>{qrTab === "groom" ? "Vietcombank" : "Techcombank"}</span>
                </div>
                <div className="flex justify-between mb-2 items-center">
                  <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.75rem", fontWeight: 500 }}>{t.location.accNumber}</span>
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.text, fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em" }}>{qrTab === "groom" ? "0123456789" : "9876543210"}</span>
                    <button
                      onClick={handleCopy}
                      className="cursor-pointer bg-transparent border-none p-1 flex items-center justify-center transition-opacity hover:opacity-70"
                      title={t.location.copyAcc}
                      style={{ color: copied ? palette.primary : palette.textMuted }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.75rem", fontWeight: 500 }}>{t.location.accName}</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.text, fontSize: "0.75rem", fontWeight: 600 }}>{qrTab === "groom" ? "BUI MINH HIEU" : "TRUONG THAO TIEN"}</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      )}

    </section>
  );
}
