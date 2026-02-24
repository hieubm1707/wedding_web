import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { MapPin, Clock, Calendar, Flower } from "lucide-react";
import { useTheme, useLang } from "../contexts/AppContext";

const WEDDING_DATE = new Date("2026-09-20T10:00:00");

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - new Date().getTime();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  const { palette } = useTheme();
  return (
    <div className="flex flex-col items-center">
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: palette.textLight, fontWeight: 400, lineHeight: 1 }}>
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", color: palette.textOnDark, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
}

function EventCard({ ev, index }: { ev: { icon: string; title: string; date: string; time: string; venue: string; address: string; note: string }; index: number }) {
  const { palette } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flex flex-col p-8 md:p-10"
      style={{ background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: "2px" }}
    >
      <div className="w-10 h-10 flex items-center justify-center mb-6 rounded-full" style={{ background: palette.bg1, color: palette.primary }}>
        {ev.icon === "flower" ? <Flower size={20} strokeWidth={1.5} /> : <Calendar size={20} strokeWidth={1.5} />}
      </div>
      <h3 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", color: palette.text, fontSize: "1.4rem", fontWeight: 400 }}>
        {ev.title}
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Calendar size={14} strokeWidth={1.5} style={{ color: palette.accent, marginTop: "2px", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6 }}>{ev.date}</span>
        </div>
        <div className="flex items-start gap-3">
          <Clock size={14} strokeWidth={1.5} style={{ color: palette.accent, marginTop: "2px", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.85rem", fontWeight: 300 }}>{ev.time}</span>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={14} strokeWidth={1.5} style={{ color: palette.accent, marginTop: "2px", flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.text, fontSize: "0.85rem", fontWeight: 500 }}>{ev.venue}</p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.6, marginTop: "2px" }}>{ev.address}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${palette.light}` }}>
        <p style={{ fontFamily: "'Playfair Display', serif", color: palette.accent, fontSize: "0.85rem", fontStyle: "italic" }}>{ev.note}</p>
      </div>
    </motion.div>
  );
}

export function EventDetails() {
  const { palette } = useTheme();
  const { t } = useLang();
  const countdown = useCountdown(WEDDING_DATE);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const countdownRef = useRef(null);
  const countdownInView = useInView(countdownRef, { once: true, margin: "-60px" });

  const sep = (
    <span style={{ fontFamily: "'Playfair Display', serif", color: palette.textOnDark, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1, alignSelf: "flex-start", paddingTop: "4px" }}>:</span>
  );

  return (
    <section id="event-details" className="py-24 md:py-36 px-6" style={{ background: palette.bg1 }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: palette.accent, fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 500 }}>
            {t.eventDetails.badge}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: palette.text, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
            {t.eventDetails.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-10" style={{ background: palette.medium }} />
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill={palette.accent} /></svg>
            <div className="h-px w-10" style={{ background: palette.medium }} />
          </div>
        </motion.div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 md:mb-20">
          {t.eventDetails.events.map((ev, i) => (
            <EventCard key={ev.title} ev={ev} index={i} />
          ))}
        </div>

        {/* Dress Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block px-8 py-5" style={{ border: `1px solid ${palette.border}`, borderRadius: "2px", background: "rgba(255,255,255,0.45)" }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.accent, fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 500, marginBottom: "8px" }}>
              {t.eventDetails.dressCodeLabel}
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", color: palette.text, fontSize: "1.1rem", fontWeight: 400 }}>
              {t.eventDetails.dressCode}
            </p>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          ref={countdownRef}
          initial={{ opacity: 0, y: 30 }}
          animate={countdownInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="rounded-sm p-10 md:p-14 text-center"
          style={{ background: palette.countdownBg }}
        >
          <p className="mb-8" style={{ fontFamily: "'Playfair Display', serif", color: palette.textOnDark, fontSize: "1rem", fontStyle: "italic", fontWeight: 400 }}>
            {t.eventDetails.countdownLabel}
          </p>
          <div className="flex justify-center items-start gap-4 md:gap-10">
            <CountdownBlock value={countdown.days} label={t.eventDetails.days} />
            {sep}
            <CountdownBlock value={countdown.hours} label={t.eventDetails.hours} />
            {sep}
            <CountdownBlock value={countdown.minutes} label={t.eventDetails.minutes} />
            {sep}
            <CountdownBlock value={countdown.seconds} label={t.eventDetails.seconds} />
          </div>
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="h-px w-8" style={{ background: `${palette.primaryDim}80` }} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textOnDark, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500 }}>
              {t.eventDetails.countdownSub}
            </p>
            <div className="h-px w-8" style={{ background: `${palette.primaryDim}80` }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
