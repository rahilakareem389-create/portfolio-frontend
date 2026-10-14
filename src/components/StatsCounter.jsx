import React, { useEffect, useRef, useState } from "react";
import { Award, Users, CheckCircle2, Star, TrendingUp } from "lucide-react";

const stats = [
  {
    value: 2,
    suffix: "+",
    label: "Years Experience",
    sublabel: "WordPress & Full Stack",
    icon: Award,
  },
  {
    value: 10,
    suffix: "+",
    label: "Orders Completed",
    sublabel: "100% On-Time Delivery",
    icon: CheckCircle2,
  },
  {
    value: 90,
    suffix: "%",
    label: "Happy Clients",
    sublabel: "Global Startups & SaaS",
    icon: Users,
  },
  {
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    sublabel: "5-Star Rating Quality",
    icon: Star,
  },
];

function useCountUp(target, start, duration = 1500) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(target);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setN(Math.round(target * eased));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return n;
}

function StatCard({ value, suffix, label, sublabel, icon: Icon, start }) {
  const n = useCountUp(value, start);

  return (
    <div className="sc-card group transition-all duration-300 hover:-translate-y-1.5">
      <div className="sc-card-icon mb-3">
        <Icon className="w-5 h-5 text-[#D57C63] transition-transform duration-300 group-hover:scale-110" />
      </div>
      <strong className="sc-card-number font-extrabold tracking-tight">
        {n}
        <span className="sc-card-suffix">{suffix}</span>
      </strong>
      <span className="sc-card-label font-bold text-[15px] sm:text-[16px] mt-1.5">
        {label}
      </span>
      <span className="sc-card-sublabel text-xs mt-1">
        {sublabel}
      </span>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="sc-section py-12 sm:py-16 my-4 px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10" aria-label="Key Highlights and Achievements">
      <style>{css}</style>
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="reveal-up sc-panel rounded-3xl p-5 sm:p-8" ref={ref}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} start={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
:root {
  --sc-orange: #D57C63;
  --sc-orange-soft: rgba(213, 124, 99, 0.45);
  --sc-panel: #140e0b;
  --sc-card: #1c130f;
  --sc-border: #33271f;
  --sc-ink: #f7ede3;
  --sc-mute: #bcab9e;
  --sc-glow: rgba(213, 124, 99, 0.25);
}

:root[data-theme="light"] {
  --sc-orange: #cf5208;
  --sc-orange-soft: rgba(207, 82, 8, 0.3);
  --sc-panel: #ffffff;
  --sc-card: #ffffff;
  --sc-border: #e5d6c5;
  --sc-ink: #140d07;
  --sc-mute: #4a382c;
  --sc-glow: rgba(207, 82, 8, 0.12);
}

.sc-section {
  position: relative;
}

.sc-panel {
  background: var(--sc-panel);
  border: 1px solid var(--sc-border);
  border-bottom: 4px solid var(--sc-orange);
  box-shadow: 0 18px 45px -15px var(--sc-glow);
  backdrop-filter: blur(12px);
}

.sc-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 26px 18px;
  text-align: center;
  background: var(--sc-card);
  border-radius: 20px;
  border: 1px solid var(--sc-border);
  border-bottom: 3.5px solid var(--sc-orange);
  box-shadow: 0 8px 24px -10px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
}

.sc-card:hover {
  border-color: var(--sc-orange);
  box-shadow: 0 14px 32px -8px var(--sc-glow);
}

.sc-card-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(213, 124, 99, 0.12);
  border: 1px solid var(--sc-orange-soft);
  display: flex;
  align-items: center;
  justify-content: center;
}

:root[data-theme="light"] .sc-card-icon {
  background: #fdf2ea;
  border-color: rgba(207, 82, 8, 0.25);
}

.sc-card-number {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: clamp(2rem, 3.2vw, 2.75rem);
  line-height: 1.05;
  color: var(--sc-orange);
  font-variant-numeric: tabular-nums;
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.sc-card-suffix {
  font-size: 0.75em;
  font-weight: 800;
  color: var(--sc-orange);
}

.sc-card-label {
  color: var(--sc-ink);
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  letter-spacing: -0.01em;
}

.sc-card-sublabel {
  color: var(--sc-mute);
  font-family: 'Plus Jakarta Sans', sans-serif !important;
}
`;
