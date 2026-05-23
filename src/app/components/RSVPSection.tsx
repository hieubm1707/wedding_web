import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Check, ImagePlus, X } from "lucide-react";
import { useTheme, useLang, usePronoun } from "../contexts/AppContext";
import type { Wish } from "../services/wishApi";
import { addWish } from "../services/apiWrapper";

async function compressImage(file: File, maxSize = 1500, quality = 0.8): Promise<string> {
  const sourceUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to decode image"));
    image.src = sourceUrl;
  });

  let { width, height } = img;
  if (width > maxSize || height > maxSize) {
    if (width >= height) {
      height = Math.round((height * maxSize) / width);
      width = maxSize;
    } else {
      width = Math.round((width * maxSize) / height);
      height = maxSize;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL("image/webp", quality);
}

interface RSVPSectionProps {
  wishes: Wish[];
}

export function RSVPSection({ wishes }: RSVPSectionProps) {
  const { palette } = useTheme();
  const { t } = useLang();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  const { pronoun, setPronounFromName } = usePronoun();
  const successText = t.rsvp.successText
    .replace(/\{\{our\}\}/g, pronoun.our)
    .replace(/\{\{you\}\}/g, pronoun.you);
  const [form, setForm] = useState({ name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImagePreview(null);
      return;
    }
    try {
      const compressed = await compressImage(file, 1500, 0.8);
      setImagePreview(compressed);
    } catch (err) {
      console.error("Failed to compress image:", err);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
      await addWish({
        name: form.name,
        message: form.message,
        image_url: imagePreview ?? "",
      });
      localStorage.setItem("guestName", form.name);
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
    <section
      id="rsvp"
      className="min-h-screen flex items-start md:items-center justify-center px-0 md:px-6 py-0 md:py-16"
      style={{ background: palette.bg2 }}
    >
      <div
        className="w-full max-w-md mx-auto px-6 py-14 md:py-16 md:rounded-2xl md:shadow-xl min-h-screen md:min-h-0"
        style={{ background: palette.bg1 }}
      >
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="playfair-font" style={{ color: palette.text, fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 400 }}>
            Hãy chia sẽ cảm xúc của bạn ngay lúc này
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
                <input name="name" type="text" placeholder={t.rsvp.namePlaceholder} required value={form.name} onChange={handleChange}
                  style={{ ...inputStyle, border: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}`, borderRadius: "2px", padding: "10px 16px" }}
                  onFocus={(e) => (e.target.style.borderColor = palette.primary)}
                  onBlur={(e) => (e.target.style.borderColor = palette.border)} />
              </div>
              <div>
                <label style={labelStyle}>Lời yêu thương *</label>
                <textarea name="message" placeholder={t.rsvp.messagePlaceholder} required rows={4} value={form.message} onChange={handleChange}
                  style={{ ...inputStyle, border: `1px solid ${palette.border}`, borderRadius: "2px", padding: "14px 16px", resize: "vertical", minHeight: "110px" }}
                  onFocus={(e) => (e.target.style.borderColor = palette.primary)}
                  onBlur={(e) => (e.target.style.borderColor = palette.border)} />
              </div>
              <div>
                <label style={labelStyle}>Hình ảnh</label>
                {imagePreview ? (
                  <div className="relative w-full">
                    <img
                      src={imagePreview}
                      alt=""
                      className="w-full object-contain"
                      style={{
                        maxHeight: "260px",
                        border: `1px solid ${palette.border}`,
                        borderRadius: "2px",
                        background: palette.cardBg,
                      }}
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      aria-label="Remove image"
                      className="absolute top-2 right-2 rounded-full p-1.5"
                      style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label
                    className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                    style={{
                      border: `1px dashed ${palette.border}`,
                      borderRadius: "2px",
                      padding: "28px 16px",
                      color: palette.textMuted,
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 300,
                      transition: "border-color 0.3s, color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = palette.primary)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = palette.border)}
                  >
                    <ImagePlus size={26} strokeWidth={1.3} />
                    <span>Chọn ảnh để gửi kèm</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </label>
                )}
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
                {successText}
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", message: "" }); setPronounFromName(""); clearImage(); }}
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
