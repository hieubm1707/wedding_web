import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTheme, useLang } from "../contexts/AppContext";
import { motion } from "motion/react";
import { play as playMusic } from "../services/audioService";

export function InvitePage() {
  const { palette } = useTheme();
  const { t } = useLang();
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState("");
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("to");
    if (nameParam) {
      const decoded = decodeURIComponent(nameParam);
      const formattedName = decoded
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
      setGuestName(formattedName);
      localStorage.setItem("guestName", formattedName);
    }
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    playMusic().catch(() => {});
    setIsOpening(true);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{ backgroundColor: palette.bg1 }}
    >
      {/* Texture overlay for background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />

      {/* Overlay that fades in during open transition */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        style={{ backgroundColor: palette.bg }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={isOpening
          ? { opacity: 0, scale: 1.06, y: -24 }
          : { opacity: 1, scale: 1, y: 0 }
        }
        transition={isOpening
          ? { duration: 0.48, ease: [0.4, 0, 1, 1] }
          : { duration: 0.8, ease: "easeOut" }
        }
        onAnimationComplete={() => { if (isOpening) navigate("/"); }}
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-md shadow-2xl"
        style={{
          backgroundColor: palette.primary,
          border: `1px solid ${palette.primaryDim}`,
          boxShadow: `0 20px 40px ${palette.shadowPrimary}, 0 0 0 1px ${palette.primaryDim} inset`
        }}
      >
        {/* Subtle decorative corners or background inside card */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="absolute w-[150%] h-[150%] border-[1px] border-dashed rounded-full" style={{ borderColor: palette.light }} />
          <div className="absolute w-[140%] h-[140%] border-[1px] border-solid rounded-full" style={{ borderColor: palette.light }} />
        </div>

        <div className="relative z-20 px-8 py-12 flex flex-col items-center text-center">
          {/* Top Logo / Symbol */}
          <motion.div 
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
            style={{ 
              border: `1px solid ${palette.light}`,
              color: palette.light,
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
          >
            <span style={{ fontSize: "1.4rem", fontWeight: "bold", fontFamily: "serif" }}>囍</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mussica-font mb-6 leading-tight flex flex-col items-center gap-3 md:flex-row md:items-baseline md:gap-0"
            style={{ color: palette.light, letterSpacing: "0.05em" }}
          >
            <span style={{ fontSize: "clamp(1.8rem, 8vw, 2.2rem)" }}>Minh Hiếu</span>
            <span
              className="md:px-5"
              style={{ fontSize: "clamp(1rem, 4vw, 1.2rem)", fontStyle: "italic", opacity: 0.8 }}
            >
              &amp;
            </span>
            <span style={{ fontSize: "clamp(1.8rem, 8vw, 2.2rem)" }}>Thảo Tiên</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col items-center gap-3 w-full"
          >
            <div className="h-px w-24 mb-2" style={{ backgroundColor: palette.light, opacity: 0.5 }} />

            <p style={{ color: palette.light, fontSize: "0.9rem", fontFamily: "'Montserrat', sans-serif" }}>
              {t.invite.greeting}
            </p>

            <div
              className="px-6 py-3 rounded-md my-2 w-full max-w-[280px]"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: `1px solid rgba(255,255,255,0.15)`
              }}
            >
              <h2 className="playfair-font m-0" style={{ color: palette.light, fontSize: "1.6rem" }}>
                {guestName || t.invite.defaultGuest}
              </h2>
            </div>

            <p style={{ color: palette.light, fontSize: "0.85rem", opacity: 0.9, marginTop: "8px", fontFamily: "'Montserrat', sans-serif", maxWidth: "320px", lineHeight: "1.6" }}>
              {t.invite.subtitle}
            </p>

            <div className="my-1" />
         
            <p style={{ color: palette.light, fontSize: "0.9rem", letterSpacing: "0.1em", fontFamily: "'Montserrat', sans-serif" }}>
              {t.invite.date}
            </p>
            
         
            <p style={{ color: palette.light, fontSize: "0.9rem", letterSpacing: "0.1em", fontFamily: "'Montserrat', sans-serif" }}>
              {t.invite.restaurant}
            </p>
         
            <p style={{ color: palette.light, fontSize: "0.9rem", letterSpacing: "0.1em", fontFamily: "'Montserrat', sans-serif" }}>
              {t.invite.restaurantAddress}
            </p>


            <div className="relative mt-8 inline-flex">
              {isOpening && (
                <motion.span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  style={{ border: `2px solid ${palette.light}` }}
                />
              )}
              <motion.button
                onClick={handleOpen}
                whileTap={{ scale: 0.92 }}
                className="px-10 py-3 rounded-full"
                style={{
                  backgroundColor: palette.light,
                  color: palette.primary,
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  letterSpacing: "0.05em",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                  cursor: isOpening ? "default" : "pointer",
                }}
              >
                {t.invite.openCard}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
