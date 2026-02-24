import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, X, Palette, Languages } from "lucide-react";
import { useTheme, useLang, palettes } from "../contexts/AppContext";

export function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const { palette, setPaletteId } = useTheme();
  const { lang, setLang } = useLang();

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: palette.primary,
          border: `1.5px solid ${palette.primaryDim}`,
          cursor: "pointer",
        }}
        title="Settings"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={18} color={palette.textLight} strokeWidth={1.5} />
            </motion.span>
          ) : (
            <motion.span
              key="settings"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Settings size={18} color={palette.textLight} strokeWidth={1.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 30, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-20 right-6 z-50 w-72 rounded-sm overflow-hidden"
            style={{
              background: palette.cardBg,
              border: `1px solid ${palette.border}`,
              boxShadow: `0 8px 40px ${palette.shadowPrimary}`,
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-2"
              style={{ borderBottom: `1px solid ${palette.border}` }}
            >
              <Settings size={14} strokeWidth={1.5} style={{ color: palette.accent }} />
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: palette.text,
                }}
              >
                Customise
              </span>
            </div>

            <div className="p-5 flex flex-col gap-6">
              {/* ── Color Palette ── */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Palette size={13} strokeWidth={1.5} style={{ color: palette.accent }} />
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: palette.textMuted,
                    }}
                  >
                    Color Palette
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {palettes.map((p) => {
                    const active = p.id === palette.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPaletteId(p.id)}
                        className="flex items-center gap-3 w-full text-left transition-all duration-200 px-3 py-2.5 rounded-sm"
                        style={{
                          background: active ? palette.bg1 : "transparent",
                          border: active ? `1.5px solid ${palette.accent}` : `1px solid ${palette.border}`,
                          cursor: "pointer",
                        }}
                      >
                        {/* Swatches */}
                        <div className="flex gap-1 flex-shrink-0">
                          {p.swatches.map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full"
                              style={{ background: color, border: "1px solid rgba(0,0,0,0.08)" }}
                            />
                          ))}
                        </div>
                        {/* Name */}
                        <span
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: "0.73rem",
                            fontWeight: active ? 500 : 400,
                            color: active ? palette.primary : palette.textMuted,
                          }}
                        >
                          {p.name}
                        </span>
                        {/* Active dot */}
                        {active && (
                          <div
                            className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: palette.primary }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Language ── */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Languages size={13} strokeWidth={1.5} style={{ color: palette.accent }} />
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: palette.textMuted,
                    }}
                  >
                    Language
                  </span>
                </div>
                <div className="flex gap-2">
                  {(["en", "vi"] as const).map((l) => {
                    const active = lang === l;
                    return (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className="flex-1 py-2.5 rounded-sm transition-all duration-200"
                        style={{
                          background: active ? palette.primary : "transparent",
                          border: active ? `1.5px solid ${palette.primary}` : `1px solid ${palette.border}`,
                          color: active ? palette.textLight : palette.textMuted,
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "0.72rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          fontWeight: active ? 600 : 400,
                          cursor: "pointer",
                        }}
                      >
                        {l === "en" ? "🇬🇧 EN" : "🇻🇳 VI"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div
              className="px-5 py-3"
              style={{ borderTop: `1px solid ${palette.border}` }}
            >
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  color: palette.textMuted,
                  letterSpacing: "0.05em",
                  opacity: 0.7,
                  textAlign: "center",
                }}
              >
                Changes apply instantly ✨
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
