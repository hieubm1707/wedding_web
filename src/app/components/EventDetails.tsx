import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { MapPin, Clock, Calendar, Flower, Church, PartyPopper, Heart } from "lucide-react";
import { useTheme, useLang } from "../contexts/AppContext";

const WEDDING_EVENTS = [
  new Date("2026-04-25T07:30:00+07:00"), // Lễ Vu Quy
  new Date("2026-05-02T09:00:00+07:00"), // Lễ Thành Hôn
  new Date("2026-05-30T18:00:00+07:00"), // Tiệc báo hỷ
];

function useMultiCountdown(eventDates: Date[]) {
  const getNextEvent = () => {
    const now = new Date().getTime();
    let nextIdx = eventDates.findIndex((d) => d.getTime() > now);
    if (nextIdx === -1) nextIdx = eventDates.length - 1;
    return nextIdx;
  };

  const [state, setState] = useState({
    timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    targetIndex: 0
  });

  useEffect(() => {
    const calc = () => {
      const now = new Date().getTime();
      const idx = getNextEvent();
      const diff = eventDates[idx].getTime() - now;

      if (diff <= 0) {
        setState({ timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 }, targetIndex: idx });
        return;
      }

      setState({
        timeLeft: {
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        },
        targetIndex: idx
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [eventDates]);

  return state;
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  const { palette } = useTheme();
  return (
    <div className="flex flex-col items-center">
      <span className="playfair-font" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", color: palette.textLight, fontWeight: 400, lineHeight: 1 }}>
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", color: palette.textOnDark, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
}

function EventCard({ ev, index, isNext, isPast }: { ev: { icon: string; title: string; date: string; items: { time: string; title: string; venue: string; address: string }[]; note?: string }; index: number; isNext: boolean; isPast: boolean }) {
  const { palette } = useTheme();
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const getIcon = () => {
    if (ev.icon === "flower") return <Flower size={20} strokeWidth={1.5} />;
    if (ev.icon === "church") return <Church size={20} strokeWidth={1.5} />;
    if (ev.icon === "party") return <PartyPopper size={20} strokeWidth={1.5} />;
    if (ev.icon === "heart-home") return <Heart size={20} strokeWidth={1.5} />;
    return <Calendar size={20} strokeWidth={1.5} />;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flex flex-col p-8 md:p-10 h-full"
      style={{
        background: palette.bg,
        border: isNext ? `2px solid ${palette.primary}` : `1px solid ${palette.border}`,
        borderRadius: "2px",
        opacity: isPast ? 0.55 : 1,
        boxShadow: isNext ? `0 6px 28px ${palette.shadowPrimary}` : undefined,
      }}
    >
      <div className="w-10 h-10 flex items-center justify-center mb-6 rounded-full" style={{ background: isNext ? palette.primary : palette.bg1, color: isNext ? palette.textOnDark : palette.primary }}>
        {getIcon()}
      </div>
      <h3 className="mb-3 playfair-font" style={{ color: palette.text, fontSize: "1.4rem", fontWeight: 400 }}>
        {ev.title}
      </h3>
      <div className="flex items-center gap-2 mb-8" style={{ borderBottom: `1px solid ${palette.border}`, paddingBottom: "1.2rem" }}>
        <Calendar size={14} strokeWidth={1.5} style={{ color: palette.accent }} />
        <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.05em" }}>{ev.date}</span>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        {ev.items.map((item, i) => (
          <div key={i} className="flex flex-col gap-4 relative pl-7" style={{ borderLeft: `1.5px dashed ${palette.border} ` }}>
            <div className="absolute w-2.5 h-2.5 rounded-full -left-[5.5px] top-1" style={{ background: palette.bg, border: `1.5px solid ${palette.primary}` }} />

            <div className="flex flex-col">
              <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.primary, fontSize: "0.95rem", fontWeight: 600 }}>{item.title}</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <Clock size={13} strokeWidth={1.5} style={{ color: palette.textMuted, marginTop: "2px", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Montserrat', sans-serif", color: palette.text, fontSize: "0.85rem", fontWeight: 400 }}>{item.time}</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={13} strokeWidth={1.5} style={{ color: palette.textMuted, marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.text, fontSize: "0.85rem", fontWeight: 500 }}>{item.venue}</p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textMuted, fontSize: "0.8rem", fontWeight: 400, marginTop: "2px", lineHeight: 1.5 }}>{item.address}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {ev.note && (
        <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${palette.light}` }}>
          <p className="playfair-font" style={{ color: palette.accent, fontSize: "0.85rem", fontStyle: "italic" }}>{ev.note}</p>
        </div>
      )}
      {isNext && (
        <div className="flex items-center gap-2 mt-6 md:mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: palette.primary }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: palette.primary }} />
          </span>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: palette.primary,
            }}
          >
            {t.eventDetails.upcomingBadge}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export function EventDetails() {
  const { palette } = useTheme();
  const { t } = useLang();
  const { timeLeft: countdown, targetIndex } = useMultiCountdown(WEDDING_EVENTS);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const countdownRef = useRef(null);
  const countdownInView = useInView(countdownRef, { once: true, margin: "-60px" });

  const sep = (
    <span className="playfair-font" style={{ color: palette.textOnDark, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1, alignSelf: "flex-start", paddingTop: "4px" }}>:</span>
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
          <h2 className="playfair-font" style={{ color: palette.text, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
            {t.eventDetails.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-10" style={{ background: palette.medium }} />
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill={palette.accent} /></svg>
            <div className="h-px w-10" style={{ background: palette.medium }} />
          </div>
        </motion.div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-20">
          {t.eventDetails.events.map((ev, i) => (
            <EventCard key={ev.title} ev={ev} index={i} isNext={i === targetIndex} isPast={i < targetIndex} />
          ))}
        </div>

        {/* Countdown */}
        <motion.div
          ref={countdownRef}
          initial={{ opacity: 0, y: 30 }}
          animate={countdownInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="rounded-sm p-10 md:p-14 text-center"
          style={{ background: palette.countdownBg }}
        >
          <p className="mb-8 playfair-font" style={{ color: palette.textOnDark, fontSize: "1rem", fontStyle: "italic", fontWeight: 400 }}>
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
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: palette.textOnDark, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>
              {t.eventDetails.events[targetIndex]?.title} · {t.eventDetails.events[targetIndex]?.date}
            </p>
            <div className="h-px w-8" style={{ background: `${palette.primaryDim}80` }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
