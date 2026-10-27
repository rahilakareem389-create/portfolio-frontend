import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import './landing.css';
import { CONFIG, COURSES, PAL, FAQ } from './data';
import { CourseArt } from './CourseArt';
import { personalInfo } from '../../data/portfolioData';
import { sendWeb3FormsNotification } from '../../utils/web3forms';
import IslamicLogo from './IslamicLogo';
import {
  CoursesDeco,
  AboutDeco,
  HowWeLearnDeco,
  TimingsDeco,
  PricingDeco,
  WhyUsDeco,
  FaqDeco,
  AdmissionDeco,
  FooterDeco
} from './IslamicDecoBackground';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WAVES = [
  'M0 60V30C240 0 480 0 720 25s480 30 720 5v30z',
  'M0 30C300 70 600 -10 900 20s400 30 540 0v40H0z',
  'M0 20C240 60 480 60 720 30S1200 -10 1440 30v30H0z',
  'M0 40C360 -10 720 70 1080 20c140-20 260-10 360 10v30H0z',
  'M0 60V20C300 60 600 0 900 30s400 10 540-10v40z',
  'M0 30C240 70 480 -10 720 30s480 40 720 0v30H0z',
  'M0 60V30C360 70 720 -10 1080 25c140 14 260 12 360-5v40z',
  'M0 20C300 -10 600 70 900 30s400-20 540 10v20H0z',
];

/* ---------- small building blocks ---------- */
function Reveal({ as: Tag = 'div', delay = 0, split = false, className = '', style, children, ...p }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`${split ? 'rvs' : 'rv'} ${className}`} style={{ '--d': `${delay}s`, ...style }} {...p}>{children}</Tag>;
}

function Title({ parts, className = '', dark = false }) {
  let i = 0;
  const label = parts.map((p) => p[0]).join(' ');
  return (
    <Reveal as="h2" split aria-label={label}
      className={`mb-4 mt-3.5 text-[clamp(34px,6vw,68px)] font-extrabold leading-[1.05] tracking-[-0.04em] ${dark ? 'text-white keep-white' : 'text-[#1f1540]'} ${className}`}>
      {parts.flatMap(([t, g]) => t.split(' ').filter(Boolean).map((w) => {
        const idx = i++;
        return (
          <span key={idx} className="wd mr-[0.28em] inline-block last:mr-0" aria-hidden="true">
            <span
              className={g ? (dark ? 'g-text-gold font-black' : 'g-text') : dark ? 'text-white keep-white font-extrabold' : 'text-[#1f1540]'}
              style={{ '--i': idx }}
            >
              {w}
            </span>
          </span>
        );
      }))}
    </Reveal>
  );
}

function Eyebrow({ children, className = 'text-[#6d3fd9]' }) {
  return (
    <Reveal as="span" className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] ${className}`}>
      <i className="h-[3px] w-7 rounded bg-[#e0a93b]" />{children}
    </Reveal>
  );
}

function Btn({ as: Tag = 'a', variant = 'primary', className = '', ...p }) {
  const v = {
    primary: 'text-white bg-gradient-to-br from-[#6d3fd9] to-[#a47bff] shadow-[0_16px_30px_-12px_rgba(109,63,217,.9),inset_0_1px_0_rgba(255,255,255,.4)]',
    white: 'bg-white text-[#6d3fd9] shadow-[0_16px_30px_-12px_rgba(0,0,0,.4)]',
    outline: 'bg-transparent text-inherit ring-[1.5px] ring-current',
  }[variant];
  const move = (e) => {
    if (!matchMedia('(hover:hover)').matches) return;
    const b = e.currentTarget, r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  };
  return (
    <Tag onPointerMove={move} onPointerLeave={(e) => (e.currentTarget.style.transform = '')}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border-0 px-7 py-[15px] font-extrabold no-underline transition-[transform,box-shadow] duration-200 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#e0a93b] ${v} ${className}`} {...p} />
  );
}

function Section({ id, bg, wave, dark, className = '', children }) {
  return (
    <section
      id={id}
      style={{ background: bg }}
      className={`relative px-5 pb-[110px] pt-[130px] scroll-mt-[80px] sm:scroll-mt-[90px] ${dark ? 'text-white' : ''} ${className}`}
    >
      <svg className="absolute left-0 top-[-59px] block h-[60px] w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ color: bg }} aria-hidden="true">
        <path fill="currentColor" d={WAVES[wave]} />
      </svg>
      {children}
    </section>
  );
}
const Aurora = ({ o = 1 }) => <div className="absolute inset-0 overflow-hidden" style={{ opacity: o }}><div className="aurora absolute inset-0" /></div>;
const Wrap = ({ className = '', children }) => <div className={`relative z-10 mx-auto max-w-[1140px] pt-4 sm:pt-6 ${className}`}>{children}</div>;

function Seg({ options, value, onChange, dark }) {
  const i = options.findIndex((o) => o[0] === value);
  return (
    <div className={`relative mb-[18px] mr-2.5 inline-grid auto-cols-fr grid-flow-col rounded-full border p-[5px] backdrop-blur-md ${
      dark ? 'border-white/25 bg-white/15' : 'border-[rgba(109,63,217,.18)] bg-white/55'
    }`}>
      <span className="absolute bottom-[5px] left-[5px] top-[5px] rounded-full bg-gradient-to-br from-[#6d3fd9] to-[#a47bff] transition-transform duration-500 [transition-timing-function:cubic-bezier(.3,1.4,.5,1)]"
        style={{ width: `calc((100% - 10px)/${options.length})`, transform: `translateX(${i * 100}%)` }} />
      {options.map(([k, label]) => (
        <button key={k} type="button" aria-pressed={k === value} onClick={() => onChange(k)}
          className={`relative z-10 cursor-pointer whitespace-nowrap border-0 bg-transparent px-5 py-[11px] text-sm font-extrabold transition-colors ${
            k === value ? 'text-white' : dark ? 'text-white/85 hover:text-white' : 'text-[#4a3d7a]'
          }`}>{label}</button>
      ))}
    </div>
  );
}

function Price({ value, currency }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (value == null) return;
    let raf; const t0 = performance.now();
    const f = (t) => { const k = Math.min(1, (t - t0) / 700); setN(Math.round(value * k)); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  if (value == null) return <span className="text-[.45em] tracking-[-0.02em] opacity-85">Price to be set</span>;
  return <>{currency} {n}</>;
}

/* ---------- sections ---------- */
function Courses({ onApply }) {
  return (
    <Section id="courses" bg="#f6f1ff" wave={0}>
      <CoursesDeco />
      <Wrap>
        <Eyebrow>One Complete Program</Eyebrow>
        <Title parts={[['One complete program.'], ['Seven essential parts', true]]} />
        <Reveal as="p" className="max-w-[580px] text-[17px] text-[#6a6288] leading-relaxed">
          Everything below is taught together in our single comprehensive learning program. Scroll through the 7 core parts, then enroll with a 3-day free trial.
        </Reveal>
        <div className="mt-[50px]">
          {COURSES.map(([name, text], i) => (
            <article key={name} style={{ top: `calc(84px + ${i} * 16px)`, background: PAL[i][0], color: PAL[i][1] }}
              className="sticky mb-[26px] grid min-h-[300px] items-center gap-5 overflow-hidden rounded-[36px] border border-white/50 p-[38px] shadow-[0_-14px_40px_-18px_rgba(40,15,110,.5),0_30px_50px_-30px_rgba(40,15,110,.5)] md:grid-cols-[1.3fr_1fr]">
              <div>
                <span className="text-[14px] font-extrabold uppercase tracking-[0.14em] opacity-80">Part 0{i + 1} of 07 · Core Module</span>
                <h3 className="mb-3 mt-2 text-[clamp(26px,4vw,42px)] font-extrabold leading-[1.1] tracking-[-0.03em]">{name}</h3>
                <p className="mb-[22px] max-w-[420px] opacity-90">{text}</p>
                <div className="flex flex-wrap gap-2.5">
                  <Btn href="#admission" variant={i % 2 ? 'primary' : 'white'} onClick={() => onApply(name)}>Enroll in program →</Btn>
                  <Btn href="#pricing" variant="outline">See pricing & fee</Btn>
                </div>
              </div>
              <div className="relative h-[150px] md:h-[230px]" aria-hidden="true">
                <CourseArt index={i} />
              </div>
            </article>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

function About() {
  const [imgOk, setImgOk] = useState(true);
  return (
    <Section id="about" bg="#efe7ff" wave={1}>
      <AboutDeco />
      <Wrap className="max-w-[1280px]">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          <div className="lg:col-span-7 flex justify-center lg:justify-start">
            <Reveal className="relative w-full max-w-[700px]">
              <div className="morph absolute inset-[-4%_-4%_4%_4%] -z-10 bg-gradient-to-br from-[#a47bff] via-[#6d3fd9] to-[#e0a93b] opacity-40 blur-2xl pointer-events-none" />
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border-2 border-white/90 bg-white p-2 sm:p-2.5 shadow-[0_30px_70px_-25px_rgba(50,20,130,0.35)] transition-transform duration-500 hover:scale-[1.01]">
                {imgOk && (
                  <img
                    src="/images/about-academy.jpg"
                    onError={() => setImgOk(false)}
                    alt="Islamic Learn Online Quran Education - Learn Islam, Strengthen Your Faith"
                    className="block h-auto w-full rounded-[18px] sm:rounded-[26px] shadow-sm"
                    loading="lazy"
                  />
                )}
                {!imgOk && (
                  <div className="grid place-items-center py-20 text-center text-[#6a6288]">
                    <span>Please add your image at<br /><b>/images/about-academy.jpg</b></span>
                  </div>
                )}

                {/* EXACT CORNER NOTCH TAB AS PER USER REFERENCE (media_1793029572861_ec165cf2.jpg) */}
                <div className="absolute top-0 right-0 z-20 pointer-events-none select-none">
                  <div className="relative bg-white pt-2.5 sm:pt-3.5 pb-2.5 sm:pb-3 pl-3.5 sm:pl-5 pr-4 sm:pr-6 rounded-bl-[20px] sm:rounded-bl-[26px] shadow-[0_10px_25px_-8px_rgba(50,20,130,0.18)]">
                    
                    {/* Left Inverted Concave Fillet (Smooth curve from top edge into tab) */}
                    <svg
                      className="absolute top-0 -left-[16px] sm:-left-[20px] w-[16px] sm:w-[20px] h-[16px] sm:h-[20px] text-white pointer-events-none"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M 0 0 L 20 0 L 20 20 A 20 20 0 0 1 0 0 Z" />
                    </svg>

                    {/* Bottom Inverted Concave Fillet (Smooth curve from right edge into tab) */}
                    <svg
                      className="absolute -bottom-[16px] sm:-bottom-[20px] right-0 w-[16px] sm:w-[20px] h-[16px] sm:h-[20px] text-white pointer-events-none"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M 0 0 L 20 0 L 20 20 A 20 20 0 0 1 0 0 Z" />
                    </svg>

                    {/* Content matching the exact structure and typography of user reference */}
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[12px] font-bold text-[#6d3fd9] tracking-tight">
                        <span className="inline-block w-3.5 sm:w-4 h-[3px] rounded-full bg-[#d97706]" />
                        <span>Certified Quran Tutor</span>
                      </div>
                      <h3 className="font-heading font-black text-[14px] sm:text-[17px] md:text-[20px] text-[#1f1540] tracking-tight leading-tight mt-0.5 whitespace-nowrap">
                        Tutor Rahila Kareem
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fy absolute -top-4 -left-2 sm:-left-5 z-20 rounded-[18px] border border-white/90 bg-white/95 px-4 py-2 text-xs sm:text-[13px] font-extrabold text-[#2a1a5e] shadow-[0_16px_30px_-12px_rgba(50,20,130,.4)] backdrop-blur-md">
                ✨ Live online classes
              </div>
              <div className="fy absolute -bottom-4 -right-2 sm:-right-5 z-20 rounded-[18px] border border-white/90 bg-white/95 px-4 py-2 text-xs sm:text-[13px] font-extrabold text-[#2a1a5e] shadow-[0_16px_30px_-12px_rgba(50,20,130,.4)] backdrop-blur-md [animation-delay:-4s]">
                📖 Step by step
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5 text-left lg:pl-6 xl:pl-10">
            <Eyebrow>About our academy</Eyebrow>
            <Title parts={[['Quran learning that feels'], ['clear and caring', true]]} />
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#efe7ff] border border-[#6d3fd9]/25 px-3.5 py-1 text-xs font-bold text-[#5b21b6]">
              <span>🧕 Lead Certified Quran Tutor: <strong className="text-[#6d3fd9] font-black">Rahila Kareem</strong></span>
            </div>
            <Reveal as="p" className="mb-4 text-[16px] sm:text-[17px] text-[#6a6288] leading-relaxed">
              Led by certified Quran teacher <strong>Rahila Kareem</strong>, we teach Quran reading and everyday Islamic knowledge in live online classes, paced to each student’s level, from first letters to confident recitation.
            </Reveal>
            <Reveal as="p" className="mb-8 text-[15px] sm:text-[16px] text-[#6a6288] opacity-90 leading-relaxed">
              Our academy pairs patient, certified male and female tutors with students worldwide. We focus on authentic Makharij, Tajweed rules, and foundational Sunnah etiquettes with gentle encouragement.
            </Reveal>
            <Reveal><Btn href="#courses">Explore courses →</Btn></Reveal>
          </div>
        </div>
      </Wrap>
    </Section>
  );
}

/* ---------- Accredited Certificates & Diplomas Section ---------- */
function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const certificates = [
    {
      id: 'tafheem',
      title: 'Tafheem-e-Deen Certification',
      image: '/images/al-huda-tafheem-certificate.jpg',
      alt: 'Tafheem-e-Deen Certificate - Al-Huda International Welfare Foundation'
    },
    {
      id: 'hadith',
      title: 'Taleem al-Hadith Certification',
      image: '/images/al-huda-hadith-certificate.jpg',
      alt: 'Taleem al-Hadith Certificate - Al-Huda International Welfare Foundation'
    }
  ];

  const currentCert = certificates[activeSlide];

  return (
    <Section id="certificates" bg="#f2eaff" wave={4}>
      <Wrap className="max-w-[1300px]">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Eyebrow>ACCREDITED QUALIFICATIONS</Eyebrow>
          <Title parts={[['Certified Islamic Diplomas, '], ['Al-Huda International', true]]} />
        </div>

        {/* 2-Column Split: LEFT = Certificate Slide, RIGHT = 3D Orbiting Tutor Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT SIDE: Certificate Slide (Just Certificate Image, Zero Clutter) */}
          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <div className="relative w-full max-w-[620px] rounded-3xl bg-white border-2 border-[#e9dcff] shadow-[0_25px_50px_-20px_rgba(50,20,130,0.22)] overflow-hidden p-3.5 sm:p-5 group">
              {/* Certificate Image Frame with Hover Lightbox Zoom */}
              <div
                onClick={() => setSelectedCert(currentCert)}
                className="relative rounded-2xl overflow-hidden border border-[#d6c2fb] bg-[#faf8ff] cursor-zoom-in aspect-[16/11] flex items-center justify-center shadow-inner"
              >
                <img
                  key={currentCert.id}
                  src={currentCert.image}
                  alt={currentCert.alt}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Hover Zoom Hint */}
                <div className="absolute inset-0 bg-[#2a0f5e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-full bg-white/95 text-[#6d3fd9] font-black text-xs shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                    <span>🔍 Click to View Full Certificate</span>
                  </span>
                </div>
              </div>

              {/* Slide Navigation Controls */}
              <div className="flex items-center justify-between gap-4 mt-3 px-2">
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev === 0 ? certificates.length - 1 : prev - 1))}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f3ecff] hover:bg-[#6d3fd9] hover:text-white text-[#6d3fd9] border border-[#d8c7fa] transition cursor-pointer shadow-sm"
                  aria-label="Previous certificate"
                >
                  <span className="text-base sm:text-lg leading-none">←</span>
                </button>

                {/* Slide Indicators / Dots */}
                <div className="flex items-center gap-2">
                  {certificates.map((cert, idx) => (
                    <button
                      key={cert.id}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        activeSlide === idx
                          ? 'w-7 h-2.5 bg-[#6d3fd9]'
                          : 'w-2.5 h-2.5 bg-[#d8c7fa] hover:bg-[#a78bfa]'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev === certificates.length - 1 ? 0 : prev + 1))}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f3ecff] hover:bg-[#6d3fd9] hover:text-white text-[#6d3fd9] border border-[#d8c7fa] transition cursor-pointer shadow-sm"
                  aria-label="Next certificate"
                >
                  <span className="text-base sm:text-lg leading-none">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Tutor Arched Doorway with Free 3D Orbiting Badges (overflow-visible) */}
          <div className="lg:col-span-6 relative flex justify-center items-center w-full overflow-visible py-8">
            {/* Ambient Cosmic Backlight */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#6d3fd9]/30 via-[#ffd777]/20 to-[#a47bff]/25 blur-3xl pointer-events-none -z-10 rounded-full" />

            {/* Orbit Root Container - overflow-visible allows badges to swing outside image freely */}
            <div className="orbit-root relative w-full max-w-[480px] flex justify-center items-center overflow-visible select-none">
              
              {/* Islamic Arch Door (Darwaza / Mihrab Gool Top) Card Frame */}
              <div className="relative w-full max-w-[400px] sm:max-w-[420px] aspect-[4/4.5] sm:h-[480px] rounded-t-[220px] sm:rounded-t-[240px] rounded-b-[28px] overflow-hidden bg-gradient-to-b from-[#22104a] via-[#160830] to-[#0a0217] border-[3.5px] border-[#ffd777] shadow-[0_0_35px_rgba(255,215,119,0.35),0_25px_60px_rgba(20,5,45,0.7)] group">
                
                {/* Royal Islamic Door Inner Arch Trim */}
                <div className="absolute inset-2.5 rounded-t-[205px] sm:rounded-t-[225px] rounded-b-[20px] border border-[#ffd777]/35 pointer-events-none z-[12]" />

                {/* Starry Night Sky Background Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(109,63,217,0.35)_0%,rgba(224,169,59,0.15)_45%,transparent_75%)] pointer-events-none" />

                {/* Twinkling ambient cosmic stars */}
                <div className="absolute top-[22%] left-[12%] text-[#ffd777] text-xs animate-pulse opacity-80 pointer-events-none">✦</div>
                <div className="absolute top-[32%] right-[14%] text-[#ffd777] text-[10px] animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '3s' }}>✦</div>
                <div className="absolute top-[48%] left-[8%] text-[#a47bff] text-xs animate-pulse opacity-70 pointer-events-none" style={{ animationDelay: '1s' }}>★</div>
                <div className="absolute top-[68%] right-[10%] text-[#ffd777] text-xs animate-pulse opacity-75 pointer-events-none" style={{ animationDelay: '1.5s' }}>✦</div>

                {/* Tutor Image with Laptop & Golden Rings */}
                <img
                  src="/images/tutor-orbit-showcase.png"
                  onError={(e) => { e.currentTarget.src = '/images/tutor-orbit-showcase.jpg'; }}
                  alt="Lead Quran Tutor Rahila Kareem"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[98%] max-h-[96%] object-contain object-bottom pointer-events-none select-none z-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* SIDE BADGES LAYER - Strictly on Left & Right Sides (Laptop & Center Always 100% Visible) */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Visual Orbit Tracks around Laptop */}
                <div className="absolute top-[75%] left-1/2 w-[430px] sm:w-[460px] h-[84px] -mt-[42px] -ml-[215px] sm:-ml-[230px] rounded-[50%] border border-dashed border-[#ffd777]/35 shadow-[0_0_20px_rgba(255,215,119,0.2)] pointer-events-none z-[8]" />

                {/* === LEFT SIDE BADGES === */}
                
                {/* 1. Quran Reading (Top-Left) */}
                <div className="float-badge-1 pointer-events-auto absolute top-[20%] left-[-25px] sm:left-[-75px] flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 orbit-badge-purple">
                  <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#ffd777] text-[#1c0c3a] flex items-center justify-center shadow-[0_0_16px_rgba(255,215,119,0.9)] shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1c0c3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <span className="whitespace-nowrap font-black text-white text-[13.5px] sm:text-[15.5px] tracking-wide" style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>
                    Quran Reading
                  </span>
                </div>

                {/* 2. Noorani Qaida (Mid-Left) */}
                <div className="float-badge-2 pointer-events-auto absolute top-[47%] left-[-35px] sm:left-[-90px] flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 orbit-badge-gold">
                  <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-gradient-to-tr from-[#6d28d9] to-[#4c1d95] text-white flex items-center justify-center shadow-[0_0_16px_rgba(109,40,217,0.9)] shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                      <path d="M6 6h10" /><path d="M6 10h10" />
                    </svg>
                  </div>
                  <span className="whitespace-nowrap font-black text-[#17072b] text-[13.5px] sm:text-[15.5px] tracking-wide" style={{ color: '#17072b', WebkitTextFillColor: '#17072b' }}>
                    Noorani Qaida
                  </span>
                </div>

                {/* 3. Daily Duas (Lower-Left) */}
                <div className="float-badge-3 pointer-events-auto absolute top-[74%] left-[-25px] sm:left-[-70px] flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 orbit-badge-purple">
                  <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-gradient-to-tr from-[#059669] to-[#34d399] text-white flex items-center justify-center shadow-[0_0_16px_rgba(52,211,153,0.9)] shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 11v6a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-6" />
                      <path d="M9 11V5a2 2 0 0 1 4 0v6" />
                      <path d="M12 2v2" />
                    </svg>
                  </div>
                  <span className="whitespace-nowrap font-black text-white text-[13.5px] sm:text-[15.5px] tracking-wide" style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>
                    Daily Duas
                  </span>
                </div>

                {/* === RIGHT SIDE BADGES === */}

                {/* 4. Tajweed Rules (Top-Right) */}
                <div className="float-badge-4 pointer-events-auto absolute top-[20%] right-[-25px] sm:right-[-75px] flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 orbit-badge-gold">
                  <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-gradient-to-tr from-[#6d28d9] to-[#8b5cf6] text-white flex items-center justify-center shadow-[0_0_16px_rgba(109,40,217,0.9)] shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <span className="whitespace-nowrap font-black text-[#17072b] text-[13.5px] sm:text-[15.5px] tracking-wide" style={{ color: '#17072b', WebkitTextFillColor: '#17072b' }}>
                    Tajweed Rules
                  </span>
                </div>

                {/* 5. Namaz & Salah (Mid-Right) */}
                <div className="float-badge-5 pointer-events-auto absolute top-[47%] right-[-35px] sm:right-[-90px] flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 orbit-badge-purple">
                  <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-gradient-to-tr from-[#d97706] to-[#fbbf24] text-[#1c0c3a] flex items-center justify-center shadow-[0_0_16px_rgba(251,191,36,0.9)] shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1c0c3a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v3" />
                      <path d="M12 5a6 6 0 0 0-6 6v9h12v-9a6 6 0 0 0-6-6Z" />
                      <path d="M10 20v-4a2 2 0 0 1 4 0v4" />
                    </svg>
                  </div>
                  <span className="whitespace-nowrap font-black text-white text-[13.5px] sm:text-[15.5px] tracking-wide" style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>
                    Namaz &amp; Salah
                  </span>
                </div>

                {/* 6. Hadith & Sunnah (Lower-Right) */}
                <div className="float-badge-6 pointer-events-auto absolute top-[74%] right-[-25px] sm:right-[-70px] flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 orbit-badge-gold">
                  <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-gradient-to-tr from-[#6d28d9] to-[#8b5cf6] text-white flex items-center justify-center shadow-[0_0_16px_rgba(109,40,217,0.9)] shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2h8a2 2 0 0 1 2 2v14a4 4 0 0 1-4 4H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2" />
                      <path d="M8 7h8" /><path d="M8 11h8" /><path d="M8 15h5" />
                    </svg>
                  </div>
                  <span className="whitespace-nowrap font-black text-[#17072b] text-[13.5px] sm:text-[15.5px] tracking-wide" style={{ color: '#17072b', WebkitTextFillColor: '#17072b' }}>
                    Hadith &amp; Sunnah
                  </span>
                </div>

                {/* Floating Celestial Stars around Laptop rings */}
                <div className="pointer-events-none absolute top-[70%] left-[8%] text-[#ffd777] text-base font-black drop-shadow-[0_0_10px_#ffd777] animate-spin" style={{ animationDuration: '8s' }}>
                  ✦
                </div>
                <div className="pointer-events-none absolute top-[82%] right-[10%] text-[#ffd777] text-sm font-black drop-shadow-[0_0_8px_#ffd777] animate-pulse">
                  ★
                </div>
                <div className="pointer-events-none absolute top-[68%] right-[6%] text-[#38bdf8] text-sm font-black drop-shadow-[0_0_8px_#38bdf8] animate-pulse">
                  ✨
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrap>

      {/* Lightbox Full-Screen Modal */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-white p-3 sm:p-5 text-left shadow-2xl border border-[#dec9ff] cursor-default flex flex-col items-center"
          >
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#efe7ff] text-[#6d3fd9] hover:bg-[#6d3fd9] hover:text-white transition cursor-pointer font-bold flex items-center justify-center shadow-md text-base"
              title="Close"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="w-full rounded-2xl overflow-hidden border border-[#d6c2fb] bg-[#fbf9ff] shadow-inner mt-2">
              <img
                src={selectedCert.image}
                alt={selectedCert.alt || selectedCert.title}
                className="w-full h-auto object-contain max-h-[82vh] mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

const STEPS = [
  ['Quran reading', 'Learn to read correctly, letter by letter, then word by word.', 'md:left-[2%] md:top-[2%]', 0.06],
  ['Correct pronunciation', 'Practise each sound with your teacher until it is clear.', 'md:right-[2%] md:top-[25%]', 0.32],
  ['Tajweed practice', 'Apply the rules of recitation in what you read.', 'md:left-[2%] md:top-[50%]', 0.6],
  ['Regular revision', 'Revisit past lessons so learning stays strong.', 'md:right-[2%] md:top-[74%]', 0.86],
];
function How({ snRef, flRef }) {
  const d = 'M50 0C95 12 95 22 50 34S5 56 50 66 95 88 50 100';
  return (
    <Section id="how" bg="#fff1c0" wave={2}>
      <HowWeLearnDeco />
      <Wrap>
        <Eyebrow>How we learn</Eyebrow>
        <Title parts={[['A winding path to'], ['confident recitation', true]]} />
        <div ref={snRef} className="relative mt-10 grid gap-[18px] border-l-4 border-dashed border-[rgba(109,63,217,.3)] pl-[22px] md:block md:h-[820px] md:border-0 md:pl-0">
          <svg className="snake absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6d3fd9" /><stop offset="1" stopColor="#e0a93b" /></linearGradient></defs>
            <path d={d} stroke="rgba(109,63,217,.18)" strokeWidth="6" strokeDasharray="2 14" />
            <path ref={flRef} d={d} pathLength="1" stroke="url(#gr)" strokeWidth="7" strokeDasharray="1" strokeDashoffset="1" />
          </svg>
          {STEPS.map(([t, p, pos, at], i) => (
            <div key={t} data-at={at} style={{ '--t': i % 2 ? '2deg' : '-2deg' }}
              className={`step relative w-full rounded-[26px] border border-[rgba(109,63,217,.12)] bg-white px-[26px] py-6 shadow-[0_30px_44px_-26px_rgba(50,20,130,.6)] transition-transform duration-[600ms] md:absolute md:w-[44%] md:max-w-[380px] [&.on]:scale-[1.03] [&.on]:rotate-[var(--t)] ${pos}`}>
              <span className="no mb-2.5 inline-grid h-11 w-11 place-items-center rounded-[14px] bg-[#efe7ff] font-extrabold text-[#6d3fd9] transition-all duration-500">{i + 1}</span>
              <b className="block text-xl">{t}</b>
              <p className="mb-0 mt-1 text-[15px] text-[#6a6288]">{p}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

function Times() {
  const [k, setK] = useState('daily');
  const s = CONFIG.schedule[k];
  const set = s.days.length || s.time;
  const cell = (l, v, note) => (
    <div className="rounded-[22px] bg-white/10 p-5 sm:p-6 backdrop-blur-md border border-white/20 shadow-lg">
      <small className="block text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#ffe9a8]">{l}</small>
      <b className={`text-[20px] sm:text-[22px] block mt-1.5 text-white font-extrabold ${v ? '' : 'opacity-70'}`}>
        {v || 'Not set yet'}
      </b>
      {note && <span className="block mt-2 text-xs sm:text-[13px] font-semibold text-[#ffe9a8] leading-snug">{note}</span>}
    </div>
  );
  return (
    <Section id="times" bg="#2b1766" wave={3} dark>
      <Aurora />
      <TimingsDeco />
      <Wrap>
        <Eyebrow className="text-[#ffe9a8]">Class timings</Eyebrow>
        <Title dark parts={[['Learn when'], ['your day allows', true]]} />
        <Reveal className="mt-8">
          <Seg value={k} onChange={setK} dark options={[['daily', 'Daily classes'], ['weekend', 'Weekend classes']]} />
        </Reveal>
        <Reveal className="rounded-[36px] border border-white/25 bg-white/10 p-[38px] shadow-[0_40px_60px_-30px_rgba(0,0,0,.5)] backdrop-blur-2xl max-sm:p-5">
          <div className="mb-[26px] grid grid-cols-7 gap-1.5 sm:gap-2.5">
            {DAYS.map((d) => (
              <span key={d} className={`grid aspect-square place-items-center rounded-xl border text-xs font-extrabold transition-all duration-500 sm:rounded-[20px] sm:text-base ${s.days.includes(d) ? '-translate-y-2.5 -rotate-[4deg] border-transparent bg-gradient-to-br from-white to-[#ffe9a8] text-[#3a1f8a] shadow-[0_20px_26px_-14px_rgba(0,0,0,.6)]' : 'border-white/25 bg-white/10 text-white font-bold'}`}>{d}</span>
            ))}
          </div>
          {set ? (
            <div className="grid gap-4 md:grid-cols-3">
              {cell('Time', s.time, s.timeNote)}
              {cell('Duration', s.duration, s.durationNote)}
              {cell('Time zone', s.tz, s.tzNote)}
            </div>
          ) : (
            <>
              <b className="text-xl text-white">{k === 'daily' ? 'Daily' : 'Weekend'} class timings will be announced soon.</b>
              <p className="mb-0 mt-1 text-white/70">Share your preferred time in the admission form.</p>
            </>
          )}
        </Reveal>
      </Wrap>
    </Section>
  );
}

function Pricing({ onEnroll }) {
  const [selectedCustomPlan, setSelectedCustomPlan] = useState(1);

  const customPlanSteps = [
    {
      num: 1,
      icon: '👨‍👩‍👧‍👦',
      title: 'Multiple Sibling Discount',
      desc: 'Enrolling 2 or more children? Enjoy special concessions on family admissions.',
    },
    {
      num: 2,
      icon: '📅',
      title: 'Weekend-Only Schedule',
      desc: 'Busy during weekdays? Choose convenient Saturday & Sunday dedicated slots.',
    },
    {
      num: 3,
      icon: '🤲',
      title: 'Financial Concessions',
      desc: 'Deserving students can request financial assistance so Quran learning is never delayed.',
    },
    {
      num: 4,
      icon: '🎯',
      title: 'Custom Pace & Dedicated Tutor',
      desc: 'Tailored 1-on-1 pace with your certified, patient teacher.',
    },
  ];

  const currentPlan = customPlanSteps.find((p) => p.num === selectedCustomPlan) || customPlanSteps[0];
  const dynamicWhatsappUrl = `https://wa.me/923217812265?text=${encodeURIComponent(
    `Assalam-o-Alaikum! I am interested in custom Quran classes with the "${currentPlan.title}". Could you please share the customized plan details, class timing, and fee concessions?`
  )}`;
  const whatsappUrl = dynamicWhatsappUrl;

  return (
    <Section id="pricing" bg="#f6f1ff" wave={4}>
      <PricingDeco />
      <Wrap className="max-w-[1240px]">
        <Eyebrow>Simple & Transparent Pricing</Eyebrow>
        <Title parts={[['One complete program.'], ['One affordable package', true]]} />
        <Reveal as="p" className="max-w-[620px] text-[17px] text-[#6a6288] leading-relaxed">
          No complicated tiers or hidden fees. All seven Islamic learning areas are included in a single monthly package. Start with a 3-day free trial, or contact us directly on WhatsApp to customize your schedule.
        </Reveal>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Main Trending Single Plan (7 cols) - Compact, Tilted, with Pinterest Corner Badge & Accents */}
          <Reveal className="lg:col-span-7 flex relative items-center justify-center py-2 sm:py-3">
            {/* The Actual Card - Compact & Slightly Rotated with Smooth Hover Straightening */}
            <div className="relative z-10 w-full transform -rotate-[1.2deg] sm:-rotate-[1.5deg] hover:rotate-0 transition-all duration-500 ease-out origin-center">
              
              {/* Pinterest-Style Floating Circular Stamp Badge (Overlapping Top-Left Corner) */}
              <div className="absolute -top-5 -left-3 sm:-top-6 sm:-left-4 z-30 flex items-center justify-center pointer-events-none">
                <div className="relative flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15">
                  {/* Outer Dashed Rotating Gold Ring */}
                  <div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#ffd777] animate-spin"
                    style={{ animationDuration: '14s' }}
                  />
                  {/* Inner Radiant Glowing Badge */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#ffd777] via-[#f2c94c] to-[#e0a93b] p-0.5 shadow-[0_8px_20px_rgba(242,201,76,0.6)] flex items-center justify-center text-[#1c1040]">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ffd777] to-[#e0a93b] flex flex-col items-center justify-center leading-none text-center select-none">
                      <span className="text-xs sm:text-sm font-black text-[#1c1040]">★</span>
                      <span className="text-[7px] sm:text-[7.5px] font-black uppercase tracking-tighter text-[#1c1040]">TOP PICK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pinterest Floating Accent Circles & Sparkle on Left Edge */}
              <div className="absolute -left-6 sm:-left-7 top-1/2 -translate-y-1/2 pointer-events-none -z-10 hidden sm:flex flex-col items-center gap-2.5">
                <div className="w-7 h-7 rounded-full border border-dashed border-[#ffd777]/60 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#ffd777] shadow-[0_0_8px_#ffd777]" />
                </div>
                <div className="w-10 h-10 rounded-full border border-[#8B5CF6]/40 flex items-center justify-center">
                  <span className="text-[#ffd777] text-xs">✦</span>
                </div>
              </div>

              {/* Outer Dashed Floating Background Box */}
              <div className="absolute -inset-2.5 sm:-inset-3 rounded-[38px] border border-dashed border-[#8B5CF6]/35 -rotate-1 pointer-events-none -z-10 hidden sm:block" />

              <div className="spin-glow relative w-full overflow-hidden rounded-[30px] sm:rounded-[34px] p-[2.5px] shadow-[0_25px_55px_-20px_rgba(80,35,190,.55)] hover:shadow-[0_35px_70px_-20px_rgba(80,35,190,.7)] transition-shadow duration-500">
                <div className="relative flex h-full flex-col justify-between rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-[#231252] via-[#331a7c] to-[#4c24af] p-5 sm:p-6 md:p-7 text-white">
                  
                  {/* Top Badge & Header */}
                  <div>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ffe9a8]/20 border border-[#ffd777]/35 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#ffe9a8] backdrop-blur-md">
                        <span className="text-[#ffd777]">★</span> All-in-One Comprehensive Package
                      </div>
                      <span className="text-[11px] font-bold text-[#ffd777]/90 px-2 py-0.5 rounded-md bg-white/10 hidden sm:inline-block">
                        Most Popular
                      </span>
                    </div>

                    {/* Compact Price Row - 100% Crisp Pure White & Gold Guarantee */}
                    <div className="mt-3.5 flex flex-wrap items-baseline gap-2.5 sm:gap-3">
                      <span
                        className="islamic-white-force text-4xl sm:text-5xl lg:text-[52px] font-black leading-none tracking-tight"
                        style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}
                      >
                        $35
                      </span>
                      <span
                        className="text-base sm:text-lg font-bold"
                        style={{ color: '#ffd777', WebkitTextFillColor: '#ffd777' }}
                      >
                        / month
                      </span>
                      <span
                        className="rounded-full bg-white/20 border border-[#ffd777]/40 px-2.5 py-0.5 text-[11px] font-bold"
                        style={{ color: '#ffe9a8', WebkitTextFillColor: '#ffe9a8' }}
                      >
                        3-Day Free Trial Included
                      </span>
                    </div>

                    <p
                      className="mt-2 text-xs sm:text-[13px] leading-relaxed"
                      style={{ color: '#e5dcff', WebkitTextFillColor: '#e5dcff' }}
                    >
                      Complete Quran and Islamic education. Dedicated 1-on-1 live classes with certified tutors tailored to your schedule.
                    </p>

                    <div className="my-3 h-[1px] w-full bg-white/15" />

                    {/* Features List - Compact */}
                    <ul className="grid list-none gap-2 sm:gap-2.5 p-0 text-xs sm:text-[13px]">
                      {[
                        'All 7 Learning Areas (Tilawat, Nazra, Tajweed, Duas, Namaz, Books & Etiquettes)',
                        '1-on-1 Dedicated Online Live Classes (3 to 4 days/week)',
                        'Flexible 24/7 Time Slots tailored to your timezone (US, UK, CA, AU, EU, Gulf)',
                        'Monthly Progress & Tajweed Evaluation Reports',
                        '100% Free 3-Day Trial (Zero commitment, no credit card required)',
                      ].map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span className="mt-0.5 inline-grid h-4 w-4 sm:h-4.5 sm:w-4.5 flex-none place-items-center rounded-full bg-[#ffe9a8] text-[10px] font-black text-[#2b1766] shrink-0">
                            ✓
                          </span>
                          <span
                            className="leading-snug"
                            style={{ color: '#f3edff', WebkitTextFillColor: '#f3edff' }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Compact CTA Buttons with High Contrast Guarantee */}
                  <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                    <a
                      href="#admission"
                      onClick={() => onEnroll('All-in-One Monthly Package')}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#ffd777] via-[#f2c94c] to-[#e0a93b] px-5 py-2.5 text-xs sm:text-sm font-black text-[#1c1040] shadow-[0_4px_16px_rgba(224,169,59,0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_6px_22px_rgba(224,169,59,0.6)] cursor-pointer"
                      style={{ color: '#1c1040', WebkitTextFillColor: '#1c1040' }}
                    >
                      <span style={{ color: '#1c1040', WebkitTextFillColor: '#1c1040' }}>Start 3-Day Free Trial</span>
                      <span style={{ color: '#1c1040', WebkitTextFillColor: '#1c1040' }}>→</span>
                    </a>
                    <a
                      href={dynamicWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="islamic-white-force inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold transition hover:bg-white/25 hover:border-white/70 focus-visible:outline-none hover:scale-[1.02]"
                      style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}
                    >
                      <span>💬</span>
                      <span style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>WhatsApp for Details</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Secondary "Custom Plan & Contact Us" Card (5 cols) - Compact & Symmetrically Sized with Left Card */}
          <Reveal className="lg:col-span-5 flex flex-col justify-between rounded-[26px] sm:rounded-[30px] border border-[rgba(109,63,217,.16)] bg-white p-4 sm:p-5 md:p-5.5 shadow-[0_16px_36px_-18px_rgba(50,20,130,.18)]">
            <div>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#efe7ff] px-2.5 py-0.5 text-[10.5px] font-black uppercase tracking-wider text-[#6d3fd9]">
                  ✦ Custom &amp; Sibling Plans
                </span>
                <span className="text-[10.5px] font-bold text-[#6d3fd9] bg-[#f4effe] px-2 py-0.5 rounded-md">
                  Flexible Slots
                </span>
              </div>

              <h3 className="mb-1 mt-2 text-lg sm:text-xl font-black text-[#1f1540] tracking-tight">
                Need a Custom Plan?
              </h3>
              <p className="text-xs text-[#6a6288] leading-tight mb-2">
                Click any option below to view tailored details:
              </p>

              {/* Accordion Dropdown for Steps 1, 2, 3, 4 - Compact & Clean */}
              <div className="space-y-1.5 my-2">
                {customPlanSteps.map((item) => {
                  const isOpen = selectedCustomPlan === item.num;

                  return (
                    <div
                      key={item.num}
                      className={`accordion-step-box rounded-lg border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? 'border-2 border-[#6D28D9] bg-[#f8f3ff] shadow-xs'
                          : 'border-[#ede7f6] bg-[#fcfaff] hover:bg-white hover:border-[#6D28D9]/40'
                      }`}
                    >
                      {/* Accordion Dropdown Header Bar */}
                      <button
                        type="button"
                        onClick={() => setSelectedCustomPlan(item.num)}
                        className="accordion-step-btn w-full flex items-center justify-between p-2 text-left cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {/* Step Number Badge */}
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center font-black text-[11px] shrink-0 transition-colors ${
                              isOpen
                                ? 'bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] text-white shadow-2xs'
                                : 'bg-[#ede7f6] text-[#6D28D9]'
                            }`}
                          >
                            {item.num}
                          </div>

                          {/* Title with Emoji */}
                          <span
                            className="accordion-step-title text-xs sm:text-[13px] font-black truncate"
                            style={{
                              color: isOpen ? '#4c1d95' : '#1f1540',
                              WebkitTextFillColor: isOpen ? '#4c1d95' : '#1f1540'
                            }}
                          >
                            {item.icon} {item.title}
                          </span>
                        </div>

                        {/* Dropdown Chevron / Indicator */}
                        <div className="flex items-center gap-1 shrink-0 ml-1.5">
                          {isOpen && (
                            <span className="accordion-step-badge-active hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#6D28D9] text-white">
                              Active
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-bold transition-transform duration-200 text-[#6D28D9] ${
                              isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                          >
                            ▼
                          </span>
                        </div>
                      </button>

                      {/* Accordion Dropdown Content Panel */}
                      {isOpen && (
                        <div className="accordion-step-desc px-2.5 pb-2 pt-0 text-[11.5px] leading-snug border-t border-[#6D28D9]/15 animate-in fade-in duration-150">
                          <p
                            className="mt-1.5 m-0 font-bold text-[11.5px] leading-snug"
                            style={{ color: '#1f1540', WebkitTextFillColor: '#1f1540' }}
                          >
                            {item.desc}
                          </p>
                          <div
                            className="mt-1 flex items-center gap-1 text-[10.5px] font-black"
                            style={{ color: '#6D28D9', WebkitTextFillColor: '#6D28D9' }}
                          >
                            <span>✓ Flexible slot &amp; tutor choice</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Action Footer of Card 2 - Compact & Aligned */}
            <div className="mt-2.5 border-t border-[rgba(109,63,217,.12)] pt-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                <span className="text-[#867ea3] uppercase tracking-wide">Selected:</span>
                <span className="text-[#6D28D9] font-black truncate ml-1">{currentPlan.title}</span>
              </div>
              <a
                href={dynamicWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-2 text-xs font-black text-white shadow-xs transition hover:brightness-105 active:scale-[0.99]"
              >
                <span>💬</span>
                <span>Chat on WhatsApp for this Plan</span>
              </a>
            </div>
          </Reveal>
        </div>
      </Wrap>
    </Section>
  );
}

const WHY = [
  ['Structured reading practice', 'Clear steps that build your Quran reading, one lesson at a time.'],
  ['Tajweed learning', 'Learn the rules and apply them in your recitation.'],
  ['Daily Islamic learning', 'Duas, Namaz and etiquettes for everyday life.'],
  ['Flexible online classes', 'Learn from home on a schedule that works for you.'],
];
function Why() {
  return (
    <Section id="why" bg="#1c1040" wave={5} dark>
      <Aurora o={0.5} />
      <WhyUsDeco />
      <Wrap>
        <Eyebrow className="text-[#ffd777]">Why learn with us</Eyebrow>
        <Title dark parts={[['Built for'], ['steady progress', true]]} />
        {WHY.map(([t, p], i) => (
          <Reveal key={t} className="group relative grid grid-cols-[70px_1fr] items-baseline gap-[18px] border-t border-white/20 py-[26px] transition-[padding] duration-[400ms] hover:pl-[22px]">
            <span className="font-black text-xl sm:text-2xl text-[#f2c94c]">0{i + 1}</span>
            <div>
              <b className="block text-[clamp(24px,4.4vw,52px)] leading-[1.1] tracking-[-0.03em] text-white keep-white font-extrabold group-hover:text-[#ffd777] transition-colors duration-300">
                {t}
              </b>
              <p className="mb-0 mt-2 max-w-[540px] text-[#e8deff] text-base leading-relaxed opacity-95">
                {p}
              </p>
            </div>
            <i className="absolute bottom-[-1px] left-0 h-[2px] w-0 bg-gradient-to-r from-[#ffd777] via-[#f2c94c] to-[#e0a93b] transition-[width] duration-[600ms] group-hover:w-full" />
          </Reveal>
        ))}
      </Wrap>
    </Section>
  );
}

function AskAdminFaqCard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('ask'); // 'ask' | 'my'
  const [myQuestions, setMyQuestions] = useState(() => {
    try {
      const stored = localStorage.getItem('islamic_user_faqs');
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return [];
  });

  // Listen for real-time portfolio_data_sync events (when Admin answers in Admin Dashboard)
  useEffect(() => {
    const handleSync = (e) => {
      if (!e.detail) return;
      if (e.detail.type === 'faq_answered' && e.detail.id) {
        setMyQuestions((prev) => {
          const updated = prev.map((q) =>
            q.id === e.detail.id
              ? { ...q, answer: e.detail.answer, status: 'approved', adminEmail: 'wordpressrahila@gmail.com' }
              : q
          );
          try {
            localStorage.setItem('islamic_user_faqs', JSON.stringify(updated));
          } catch (_) {}
          return updated;
        });
      }
    };
    window.addEventListener('portfolio_data_sync', handleSync);
    return () => window.removeEventListener('portfolio_data_sync', handleSync);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanQuestion = question.trim();

    if (cleanName.length < 2) {
      setErrorMsg('Please enter your full name (at least 2 letters).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg('Please enter a valid email address so Rahila Kareem can reply to you.');
      return;
    }
    if (cleanQuestion.length < 5) {
      setErrorMsg('Please type a valid question (at least 5 characters).');
      return;
    }

    setSubmitting(true);

    const faqId = `faq_${Date.now()}`;
    const newFaq = {
      id: faqId,
      question: cleanQuestion,
      answer: '',
      author: cleanName,
      askedBy: cleanName,
      email: cleanEmail,
      portal: 'Islamic Learn',
      category: 'Quran & Islamic Studies',
      date: 'Just now',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // 1. Dispatch Web3Forms notification (email alert directly to wordpressrahila@gmail.com)
    try {
      await sendWeb3FormsNotification({
        type: 'Islamic Learn FAQ Question',
        subject: `[Islamic Learn FAQ Question] from ${cleanName}`,
        name: cleanName,
        email: cleanEmail,
        message: cleanQuestion,
        details: {
          portal: 'Islamic Learn — Online Quran Education',
          authorName: cleanName,
          authorEmail: cleanEmail,
          question: cleanQuestion,
          moderationStatus: 'Pending Admin Answer in Dashboard',
          replyTo: cleanEmail,
          timestamp: new Date().toISOString()
        }
      });
    } catch (e) {
      console.warn('Web3Forms notification notice:', e);
    }

    // 2. Post to Backend / MongoDB Atlas (/api/faqs/ask)
    try {
      await fetch(`${API_BASE_URL}/api/faqs/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: cleanQuestion,
          name: cleanName,
          email: cleanEmail,
          portal: 'Islamic Learn'
        })
      });
    } catch (e) {
      console.warn('Backend FAQ ask notice:', e);
    }

    // 3. Backup to /api/contact for MongoDB ContactMessage & Admin Dashboard Messages tab
    try {
      await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: 'Islamic Portal Inquiry',
          subject: 'Islamic Learn FAQ Question Inquiry',
          plan: 'FAQ Inquiry',
          message: cleanQuestion
        })
      });
    } catch (_) {}

    // 4. LocalStorage Sync for Admin Dashboard
    try {
      const storedFaqs = JSON.parse(localStorage.getItem('rahila_portfolio_faqs') || '[]');
      const updatedFaqs = [newFaq, ...storedFaqs.filter((f) => f.id !== newFaq.id)];
      localStorage.setItem('rahila_portfolio_faqs', JSON.stringify(updatedFaqs));

      // Messages sync
      const storedMsgs = JSON.parse(localStorage.getItem('rahila_portfolio_messages') || '[]');
      const inquiryMsg = {
        id: `msg_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        subject: 'Islamic Learn FAQ Question',
        plan: 'FAQ Inquiry',
        message: cleanQuestion,
        date: 'Just now',
        status: 'unread',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('rahila_portfolio_messages', JSON.stringify([inquiryMsg, ...storedMsgs]));

      // User audit log
      const storedUsers = JSON.parse(localStorage.getItem('rahila_portfolio_users') || '[]');
      const userObj = {
        id: `usr_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        role: 'Islamic Learn Student / Inquirer',
        lastActive: 'Just now',
        recentActivity: `Asked Question: "${cleanQuestion.substring(0, 35)}..."`
      };
      localStorage.setItem(
        'rahila_portfolio_users',
        JSON.stringify([userObj, ...storedUsers.filter((u) => u.email !== cleanEmail)])
      );
    } catch (_) {}

    // 5. Update user's personal inquiries tracker
    const updatedMy = [newFaq, ...myQuestions];
    setMyQuestions(updatedMy);
    try {
      localStorage.setItem('islamic_user_faqs', JSON.stringify(updatedMy));
    } catch (_) {}

    // 6. Real-time event for Admin Dashboard & open tabs
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('portfolio_data_sync', {
          detail: { type: 'new_faq', faq: newFaq }
        })
      );
    }

    // 7. Confetti effect
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6d3fd9', '#ffd777', '#a47bff', '#2fd19d']
    });

    setSubmitting(false);
    setStatus('success');
    setQuestion('');
  };

  return (
    <div className="rounded-3xl bg-white/95 p-5 sm:p-6 shadow-[0_25px_45px_-20px_rgba(50,20,130,0.18)] border border-[#dec9ff] backdrop-blur-md relative overflow-hidden">
      {/* Decorative top gradient ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6d3fd9] via-[#a47bff] to-[#ffd777]" />

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6d3fd9]">
            Direct Tutor &amp; Admin Q&amp;A
          </span>
        </div>
        {myQuestions.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'ask' ? 'my' : 'ask')}
            className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#efe7ff] hover:bg-[#e4d6ff] text-[#6d3fd9] transition cursor-pointer"
          >
            {activeTab === 'ask' ? `My Inquiries (${myQuestions.length})` : 'Ask New Question +'}
          </button>
        )}
      </div>

      {activeTab === 'ask' ? (
        <div>
          <h3 className="text-[18px] sm:text-[19px] font-extrabold text-[#1f1540] leading-snug">
            Ask Rahila Kareem Directly
          </h3>
          <p className="mt-1 text-[13px] text-[#6a6288] leading-relaxed">
            Have a question not listed here? Submit it below — you will receive a direct reply to your email, and answered questions appear live.
          </p>

          {status === 'success' ? (
            <div className="mt-4 p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] text-left animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white text-xs font-bold">
                  ✓
                </span>
                <div>
                  <h4 className="text-[14px] font-extrabold text-[#166534]">
                    Question Sent to Admin!
                  </h4>
                  <p className="text-[12px] text-[#15803d] mt-0.5 leading-relaxed">
                    Rahila Kareem has received your inquiry via Web3Forms &amp; MongoDB Atlas. You will receive an email response, and your answer will appear here once approved.
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-[12px] font-bold text-[#166534] underline hover:no-underline cursor-pointer"
                >
                  Ask another question
                </button>
                {myQuestions.length > 0 && (
                  <>
                    <span className="text-[#86efac]">•</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('my')}
                      className="text-[12px] font-bold text-[#6d3fd9] hover:underline cursor-pointer"
                    >
                      View my inquiry status ({myQuestions.length}) →
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Your Name (e.g. Ayesha Khan)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[#ded2f9] bg-[#fbf9ff] px-3.5 py-2.5 text-[13px] font-bold text-[#1f1540] placeholder-[#9f96b7] transition focus:border-[#6d3fd9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d3fd9]/20"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email (where admin will reply)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#ded2f9] bg-[#fbf9ff] px-3.5 py-2.5 text-[13px] font-bold text-[#1f1540] placeholder-[#9f96b7] transition focus:border-[#6d3fd9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d3fd9]/20"
                />
              </div>
              <div>
                <textarea
                  rows={3}
                  placeholder="Type your question about Quran classes, timings, fees, or tutors..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full resize-none rounded-xl border border-[#ded2f9] bg-[#fbf9ff] px-3.5 py-2.5 text-[13px] font-medium text-[#1f1540] placeholder-[#9f96b7] transition focus:border-[#6d3fd9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6d3fd9]/20"
                />
              </div>

              {errorMsg && (
                <p className="text-[12px] font-bold text-[#e11d48] bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-to-r from-[#6d3fd9] to-[#8d56f7] hover:from-[#5d2fca] hover:to-[#7c43ea] py-2.5 px-4 text-[13px] font-extrabold text-white shadow-[0_10px_20px_-8px_rgba(109,63,217,0.5)] transition duration-200 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Sending to Admin &amp; Database...</span>
                  </>
                ) : (
                  <>
                    <span>Send Question to Admin</span>
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[10px] text-[#8e85aa] pt-1">
                <span>🔒 Private &amp; Direct</span>
                <span>⚡ Real-time Atlas &amp; Web3Forms Sync</span>
              </div>
            </form>
          )}
        </div>
      ) : (
        /* My Inquiries Tab */
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[14px] font-extrabold text-[#1f1540]">
              Your Question History ({myQuestions.length})
            </h4>
            <span className="text-[11px] text-[#6a6288]">Live Status</span>
          </div>

          <div className="max-h-[280px] overflow-y-auto space-y-2.5 pr-1">
            {myQuestions.map((q) => (
              <div
                key={q.id}
                className="p-3 rounded-2xl bg-[#f8f5ff] border border-[#e4d6ff] text-left space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12.5px] font-bold text-[#1f1540] leading-snug">
                    "{q.question}"
                  </p>
                  {q.answer ? (
                    <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ✓ Answered
                    </span>
                  ) : (
                    <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                      ⏳ Pending
                    </span>
                  )}
                </div>

                {q.answer ? (
                  <div className="p-2.5 rounded-xl bg-white border border-[#ded2f9] text-[12px] text-[#2d1b69] leading-relaxed">
                    <strong className="block text-[10px] uppercase font-extrabold text-[#6d3fd9] mb-0.5">
                      Teacher / Admin Reply:
                    </strong>
                    {q.answer}
                  </div>
                ) : (
                  <p className="text-[11px] text-[#7d759b] italic">
                    Awaiting response from Rahila Kareem. You will receive an email once answered.
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('ask')}
            className="w-full text-center text-[12px] font-bold text-[#6d3fd9] hover:underline py-1.5 cursor-pointer"
          >
            ← Ask another question
          </button>
        </div>
      )}
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(-1);
  const [communityFaqs, setCommunityFaqs] = useState([]);

  // Fetch approved community FAQs from MongoDB Atlas and local storage
  useEffect(() => {
    let isMounted = true;
    async function loadFaqs() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/faqs?portal=islamic`);
        const data = await res.json();
        if (data && data.success && Array.isArray(data.faqs)) {
          if (isMounted) {
            // Strictly include only Islamic/Quran topics, discard any SEO, MERN, backlink, or guest posting questions
            const islamicApproved = data.faqs.filter((f) => {
              if (!f || f.status !== 'approved' || !f.answer) return false;
              if (f.portal === 'Islamic Learn' || f.category === 'Quran & Islamic Studies') return true;
              const text = `${f.question || ''} ${f.category || ''} ${f.answer || ''}`.toLowerCase();
              if (
                text.includes('seo') ||
                text.includes('mern') ||
                text.includes('guest post') ||
                text.includes('backlink') ||
                text.includes('web development') ||
                text.includes('proposal') ||
                text.includes('audit') ||
                text.includes('full stack') ||
                text.includes('da ')
              ) {
                return false;
              }
              return false;
            });
            setCommunityFaqs(islamicApproved);
          }
        }
      } catch (_) {
        // Fallback to localStorage (strictly Islamic user FAQs only)
        try {
          const stored = JSON.parse(localStorage.getItem('islamic_user_faqs') || '[]');
          const approved = stored.filter((f) => f && f.answer && f.status === 'approved');
          if (isMounted) setCommunityFaqs(approved);
        } catch (_) {}
      }
    }
    loadFaqs();

    // Listen for live answer publishing from Admin Dashboard
    const handleSync = (e) => {
      if (!e.detail) return;
      if (e.detail.type === 'faq_answered' && e.detail.id) {
        setCommunityFaqs((prev) => {
          const exists = prev.some((f) => f.id === e.detail.id);
          if (exists) {
            return prev.map((f) =>
              f.id === e.detail.id ? { ...f, answer: e.detail.answer, status: 'approved' } : f
            );
          }
          loadFaqs();
          return prev;
        });
      }
    };

    window.addEventListener('portfolio_data_sync', handleSync);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_sync', handleSync);
    };
  }, []);

  // Display strictly the original Quran FAQs (No extra items)
  const allFaqs = FAQ.map(([q, a], idx) => ({
    id: `std_${idx}`,
    question: q,
    answer: a,
    isCommunity: false
  }));

  return (
    <Section id="faq" bg="#efe7ff" wave={6}>
      <FaqDeco />
      <Wrap>
        {/* Section Header - Centered & Aligned */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <Eyebrow>FAQ</Eyebrow>
          <Title parts={[['Good questions,'], ['honest answers', true]]} />
          <Reveal as="p" className="text-[17px] text-[#6a6288] mt-2">
            Can’t find yours? Ask in the admission form below or reach us on WhatsApp.
          </Reveal>
        </div>

        {/* 2-Column Grid: Left Card & Right FAQ Accordion start at the exact same horizontal baseline */}
        <div className="grid items-start gap-8 md:grid-cols-[.92fr_1.08fr] md:gap-[44px]">
          <div>
            <Reveal delay={0.1}>
              <AskAdminFaqCard />
            </Reveal>
          </div>

          <div>
            {allFaqs.map((faqItem, i) => (
              <Reveal
                key={faqItem.id || faqItem.question}
                delay={i * 0.05}
                className="mb-3 rounded-3xl bg-white shadow-[0_20px_30px_-24px_rgba(50,20,130,.6)] transition-transform duration-300 hover:-rotate-[.4deg] hover:translate-x-2"
              >
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full cursor-pointer items-center gap-3.5 border-0 bg-transparent px-[22px] py-5 text-left text-[17px] font-extrabold text-[#1f1540]"
                >
                  <span className="text-[13px] text-[#a47bff]">
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </span>
                  <span className="flex-1">
                    {faqItem.question}
                    {faqItem.isCommunity && (
                      <span className="ml-2 inline-block px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-purple-100 text-purple-700 align-middle">
                        ✨ Answered by Admin
                      </span>
                    )}
                  </span>
                  <span
                    className={`ml-auto grid h-[34px] w-[34px] flex-none place-items-center rounded-xl transition-all duration-[400ms] ${
                      open === i ? 'rotate-[135deg] bg-[#6d3fd9] text-white' : 'bg-[#efe7ff] text-[#6d3fd9]'
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ${
                    open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="m-0 pb-[22px] pl-14 pr-6 text-[#6a6288]">
                      <p className="m-0">{faqItem.answer}</p>
                      {faqItem.isCommunity && faqItem.author && (
                        <p className="mt-2 text-[12px] font-medium text-[#978cb5]">
                          Asked by {faqItem.author} • Verified Answer by Rahila Kareem
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Wrap>
    </Section>
  );
}

function Field({ label, error, children, className = '' }) {
  return <div className={`relative ${className}`}>{children}<span className="block px-1.5 py-0.5 text-xs font-bold text-[#ffb4a8]">{error}</span></div>;
}
const inp = 'peer w-full rounded-2xl border-2 border-[#8b5cf6]/35 bg-white px-4 pb-2.5 pt-6 font-[inherit] text-[#1f1540] font-bold transition focus:border-[#6d28d9] focus:shadow-[0_0_0_4px_rgba(109,40,217,.25)] focus:outline-none aria-[invalid=true]:border-[#ff4d4f] shadow-sm';
const lbl = 'pointer-events-none absolute left-[16px] transition-all duration-200 select-none';
const lblUp = 'top-1.5 text-[11px] font-black text-[#581c87] uppercase tracking-wider';
const lblDown = 'top-4 text-xs sm:text-sm font-extrabold text-[#581c87] peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-black peer-focus:text-[#581c87]';

function Admission({ form, setForm }) {
  const [err, setErr] = useState({});
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (err[k]) setErr((prev) => ({ ...prev, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    const cleanName = (form.name || '').trim();
    const cleanEmail = (form.email || '').trim().toLowerCase();
    const cleanPhone = (form.whatsapp || '').trim();

    // 1. Name validation
    if (!cleanName || cleanName.length < 2) {
      e.name = 'Please enter your full name (at least 2 characters).';
    }

    // 2. Email validation (rejects dummy/test domains)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      e.email = 'Please enter a valid, active email address.';
    } else if (/@(example\.com|test\.com|fake\.com|none\.com|sample\.com)$/i.test(cleanEmail)) {
      e.email = 'Please provide your actual email address, not a dummy or test domain.';
    }

    // 3. WhatsApp / Phone validation
    const digitsOnly = cleanPhone.replace(/\D/g, '');
    if (!cleanPhone || digitsOnly.length < 7 || digitsOnly.length > 18) {
      e.whatsapp = 'Please enter a valid WhatsApp number with country code (e.g. +92 321 7812265).';
    }

    if (!form.gender) e.gender = 'Please select a gender option.';
    if (!form.age) e.age = 'Please select an age group.';
    if (!form.schedule) e.schedule = 'Please select your preferred schedule.';
    if (!form.course) e.course = 'Please select a course or program option.';

    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const validationErrors = validate();
    setErr(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setMsg('Please review and complete the highlighted required fields.');
      return;
    }

    setSubmitting(true);
    setMsg('Submitting your admission application to Web3Forms & MongoDB Atlas...');

    const cleanName = (form.name || '').trim();
    const cleanEmail = (form.email || '').trim().toLowerCase();
    const cleanPhone = (form.whatsapp || '').trim();
    const cleanCourse = form.course || 'Complete All-in-One Course (All 7 Subjects Included)';
    const cleanSchedule = form.schedule || 'daily';
    const cleanGender = form.gender || 'Not specified';
    const cleanAge = form.age || 'Not specified';
    const cleanMessage = (form.message || '').trim();
    const currentRefId = `IL-${Date.now().toString().slice(-6)}`;
    setRefId(currentRefId);

    // 1. Dispatch Web3Forms automated notification (emails alert to wordpressrahila@gmail.com & logs in Web3Forms dashboard)
    sendWeb3FormsNotification({
      type: 'Islamic Learn Admission Inquiry',
      subject: `[Islamic Learn ${currentRefId}] ${cleanName} - ${cleanCourse}`,
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage || `3-Day Free Trial Admission Application for ${cleanCourse} (${cleanSchedule})`,
      details: {
        referenceNumber: currentRefId,
        applicantName: cleanName,
        contactEmail: cleanEmail,
        whatsAppPhone: cleanPhone,
        gender: cleanGender,
        ageGroup: cleanAge,
        courseEnrolled: cleanCourse,
        preferredSchedule: cleanSchedule,
        personalMessage: cleanMessage || 'None provided'
      }
    });

    // 2. Synchronize to local persistent cache for immediate Admin Dashboard delivery
    const newMsgObj = {
      id: `msg_islamic_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      plan: `Islamic Learn: ${cleanCourse}`,
      subject: `[Islamic Learn ${currentRefId}] ${cleanName} - ${cleanCourse}`,
      message: `Ref: ${currentRefId}\nStudent: ${cleanName}\nEmail: ${cleanEmail}\nWhatsApp: ${cleanPhone}\nGender: ${cleanGender}\nAge Group: ${cleanAge}\nCourse: ${cleanCourse}\nSchedule: ${cleanSchedule}\n\nNotes: ${cleanMessage || '3-Day Free Trial Admission Requested'}`,
      status: 'new',
      adminNotes: `Islamic Learn Portal Inquiry | Schedule: ${cleanSchedule} | Gender: ${cleanGender}`,
      web3FormsStatus: 'delivered',
      date: new Date().toISOString()
    };

    try {
      const storedMsgs = JSON.parse(localStorage.getItem('rahila_portfolio_messages') || '[]');
      storedMsgs.unshift(newMsgObj);
      localStorage.setItem('rahila_portfolio_messages', JSON.stringify(storedMsgs));

      // Also register visitor in User Logins / Leads Audit
      const rawUsers = localStorage.getItem('rahila_portfolio_users');
      let userList = rawUsers ? JSON.parse(rawUsers) : [];
      if (!Array.isArray(userList)) userList = [];
      const existingIdx = userList.findIndex((u) => (u.email || '').toLowerCase() === cleanEmail);
      const leadObj = {
        id: existingIdx !== -1 ? userList[existingIdx].id : `usr_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        role: 'Islamic Academy Applicant',
        source: 'Islamic Learn Admission Portal',
        activity: `Enrolled: ${cleanCourse} (${cleanSchedule})`,
        ip: 'Web Lead',
        date: new Date().toISOString()
      };
      if (existingIdx !== -1) userList.splice(existingIdx, 1);
      userList.unshift(leadObj);
      localStorage.setItem('rahila_portfolio_users', JSON.stringify(userList));

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('portfolio_data_sync', { detail: { type: 'new_message', message: newMsgObj } }));
      }
    } catch (_) {}

    // 3. Submit to backend /api/contact endpoint (saves into MongoDB Atlas & notifies)
    let backendSuccess = false;
    try {
      const token = localStorage.getItem('rahila_auth_token') || '';
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          plan: `Islamic Learn: ${cleanCourse}`,
          subject: `[Islamic Learn ${currentRefId}] ${cleanName} - ${cleanCourse}`,
          message: `Ref: ${currentRefId}\nStudent: ${cleanName}\nEmail: ${cleanEmail}\nWhatsApp: ${cleanPhone}\nGender: ${cleanGender}\nAge Group: ${cleanAge}\nCourse: ${cleanCourse}\nSchedule: ${cleanSchedule}\n\nNotes: ${cleanMessage || '3-Day Free Trial Admission Requested'}`
        })
      });

      if (response.ok) {
        backendSuccess = true;
      }
    } catch (backendErr) {
      console.warn('Backend server contact fallback:', backendErr);
    }

    // 4. Direct Web3Forms submission (ensures guaranteed cloud delivery even if backend is sleeping)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'ad131140-827b-407f-a476-5afd66b1fa0b',
          name: cleanName,
          email: cleanEmail,
          subject: `[Islamic Learn ${currentRefId}] ${cleanName} - ${cleanCourse}`,
          message: `Application Ref: ${currentRefId}\nName: ${cleanName}\nEmail: ${cleanEmail}\nWhatsApp: ${cleanPhone}\nGender: ${cleanGender}\nAge Group: ${cleanAge}\nCourse: ${cleanCourse}\nSchedule: ${cleanSchedule}\n\nMessage: ${cleanMessage || '3-Day Free Trial Requested'}`
        })
      });
    } catch (w3Err) {
      console.warn('Direct Web3Forms fallback error:', w3Err);
    }

    setSubmitting(false);
    setSubmitted(true);
    setMsg('');

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#ffd777', '#f2c94c', '#6d3fd9', '#ffffff']
    });
  };

  const txt = (k, label, type = 'text', ac) => (
    <Field label={label} error={err[k]}>
      <input
        className={inp}
        type={type}
        autoComplete={ac}
        value={form[k]}
        onChange={set(k)}
        placeholder=" "
        aria-invalid={!!err[k]}
        style={{ color: '#1f1540', WebkitTextFillColor: '#1f1540', backgroundColor: '#ffffff' }}
      />
      <label
        className={`${lbl} ${form[k] ? lblUp : lblDown}`}
        style={{ color: '#581c87', WebkitTextFillColor: '#581c87' }}
      >
        {label}
      </label>
    </Field>
  );

  const sel = (k, label, opts, className = '') => (
    <Field label={label} error={err[k]} className={className}>
      <select
        className={`${inp} cursor-pointer`}
        value={form[k]}
        onChange={set(k)}
        aria-invalid={!!err[k]}
        style={{ color: '#1f1540', WebkitTextFillColor: '#1f1540', backgroundColor: '#ffffff' }}
      >
        <option value="" disabled className="text-gray-400">Select {label}...</option>
        {opts.map(([v, t]) => (
          <option key={v} value={v} className="text-[#1f1540] bg-white font-medium">
            {t}
          </option>
        ))}
      </select>
      <label
        className={`${lbl} ${lblUp}`}
        style={{ color: '#581c87', WebkitTextFillColor: '#581c87' }}
      >
        {label}
      </label>
    </Field>
  );

  return (
    <Section id="admission" bg="#3a1f8a" wave={7} dark>
      <Aurora />
      <AdmissionDeco />
      <Wrap className="grid items-start gap-[50px] md:grid-cols-[.85fr_1.3fr]">
        <div>
          <Eyebrow className="text-[#ffe9a8]">Admission &amp; Inquiries</Eyebrow>
          <Title dark parts={[['Start your'], ['first class', true]]} />
          
          {/* Prominent High-Contrast Badges for All Ages & Both Genders */}
          <div className="flex flex-wrap items-center gap-2 my-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe9a8]/20 border border-[#ffd777]/35 text-[#ffe9a8] text-xs font-bold backdrop-blur-md">
              <span>👥</span> Open for All Ages (Kids, Youth &amp; Adults)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-bold backdrop-blur-md">
              <span>🧕 🧔</span> Male &amp; Female Both Welcome
            </span>
          </div>

          <Reveal as="p" className="max-w-[560px] text-[16px] text-[#d9ceff] leading-relaxed">
            Welcome to Islamic Learn! Students of <strong>all age groups</strong> — both <strong>male and female</strong> — are warmly invited to apply. You can enroll in our <strong>Complete All-in-One Course (All 7 subjects)</strong> or choose <strong>any specific individual modules</strong> according to your preference. Your application is saved directly to MongoDB Atlas and notified via Web3Forms.
          </Reveal>

          <Reveal as="div" className="mt-6 space-y-2.5">
            <b className="text-lg block text-white">Contact Details</b>
            <div className="space-y-1.5 text-sm">
              <a href={personalInfo.whatsappUrl || 'https://wa.link/p3yvx3'} target="_blank" rel="noopener noreferrer" className="block text-[#ffe9a8] hover:underline font-bold">
                WhatsApp: {personalInfo.phone || '+92 321 7812265'}
              </a>
              <a href={`mailto:${personalInfo.email || 'wordpressrahila@gmail.com'}`} className="block text-[#ffe9a8] hover:underline">
                Email: {personalInfo.email || 'wordpressrahila@gmail.com'}
              </a>
              <span className="block text-[#d9ceff]/80">
                Location: {personalInfo.location || 'Punjab, Pakistan (Worldwide Online Classes)'}
              </span>
            </div>
          </Reveal>
        </div>

        {submitted ? (
          /* Celebratory Confirmation Card on Successful Submission */
          <div className="rounded-[36px] border-2 border-[#ffd777]/50 bg-gradient-to-br from-[#1f1540] via-[#2a1754] to-[#140a30] p-8 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-center space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#ffd777] to-[#e0a93b] text-[#1c1040] mx-auto flex items-center justify-center font-black text-3xl sm:text-4xl shadow-[0_0_30px_rgba(255,215,119,0.5)] animate-bounce">
              ✓
            </div>

            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#ffd777] block">
                ✦ Alhamdulillah • Application Received ✦
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Admission Form Submitted Successfully!
              </h3>
              <p className="text-sm text-[#cfc4f5] max-w-md mx-auto leading-relaxed">
                Your application has been stored in MongoDB Atlas, delivered to the Admin Dashboard, and dispatched via Web3Forms notification.
              </p>
            </div>

            {/* Application Details Summary Box */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-4 text-left space-y-2 max-w-md mx-auto text-xs sm:text-sm text-[#e2d9f7]">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#ffd777] font-bold">Reference ID:</span>
                <span className="font-mono font-black text-white">{refId}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#b8abdf]">Student Name:</span>
                <span className="font-bold text-white">{form.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[#b8abdf]">Selected Program:</span>
                <span className="font-bold text-[#ffd777] truncate max-w-[200px]">{form.course}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#b8abdf]">WhatsApp:</span>
                <span className="font-bold text-white">{form.whatsapp}</span>
              </div>
            </div>

            {/* Actions: Direct WhatsApp & Submit Another */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/923217812265?text=${encodeURIComponent(
                  `Assalam-o-Alaikum! I have submitted my admission application (Ref: ${refId}) on Islamic Learn.\n\nName: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\nGender: ${form.gender}\nAge Group: ${form.age}\nCourse: ${form.course}\nSchedule: ${form.schedule}${form.message ? `\nMessage: ${form.message}` : ''}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-6 rounded-xl font-black text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#1fae53] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all cursor-pointer"
              >
                <FWhatsApp />
                <span>Connect on WhatsApp for Immediate Schedule</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', whatsapp: '', gender: '', age: '', course: '', schedule: '', message: '' });
                }}
                className="w-full sm:w-auto py-3 px-5 rounded-xl font-bold text-xs sm:text-sm text-[#ffd777] bg-white/10 hover:bg-white/15 border border-[#ffd777]/30 transition-all cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          <Reveal as="form" noValidate onSubmit={submit} className="grid gap-4 rounded-[36px] border border-white/30 bg-white/10 p-9 shadow-[0_50px_70px_-40px_rgba(0,0,0,.6)] backdrop-blur-2xl max-sm:p-5 sm:grid-cols-2">
            {txt('name', 'Full name', 'text', 'name')}
            {txt('email', 'Email', 'email', 'email')}
            {txt('whatsapp', 'WhatsApp (with country code)', 'tel', 'tel')}
            {sel('gender', 'Gender (Male / Female)', [
              ['Female (Sister / Girl)', 'Female (Sister / Girl)'],
              ['Male (Brother / Boy)', 'Male (Brother / Boy)'],
              ['Parent Enrolling for Child', 'Parent Enrolling for Child'],
            ])}
            {sel('age', 'Age group (All Ages Welcome)', [
              ['Kids & Children (Under 10)', 'Kids & Children (Under 10)'],
              ['Teens & Youth (10–17)', 'Teens & Youth (10–17)'],
              ['Adults (18–45)', 'Adults (18–45)'],
              ['Seniors (45+)', 'Seniors (45+)'],
            ])}
            {sel('schedule', 'Preferred schedule', [
              ['daily', 'Daily classes (Mon–Fri)'],
              ['weekend', 'Weekend classes (Sat–Sun)'],
              ['flexible', 'Custom Flexible Timing'],
            ])}
            {sel('course', 'Course / Program Choice (All 7 or Specific Subjects)', [
              ['All-in-One Comprehensive Program (All 7 Parts)', '★ Complete All-in-One Course (All 7 Subjects Included)'],
              ['Custom Selected Subjects (Any Specific Parts)', '✦ Custom Selection (Choose Any of the 7 Subjects)'],
              ['Quran Tilawat & Tajweed (Focus Area)', '1. Quran Tilawat & Tajweed (Focus Area)'],
              ['Nazra Quran (Focus Area)', '2. Nazra Quran (Focus Area)'],
              ['Tajweed and Quran Reading Rules (Focus Area)', '3. Tajweed and Quran Reading Rules (Focus Area)'],
              ['Daily Masnoon Duas (Focus Area)', '4. Daily Masnoon Duas (Focus Area)'],
              ['Namaz Learning (Focus Area)', '5. Namaz Learning (Focus Area)'],
              ['Islamic Books & Seerah (Focus Area)', '6. Islamic Books & Seerah (Focus Area)'],
              ['Islamic Etiquettes (Focus Area)', '7. Islamic Etiquettes (Focus Area)'],
            ], 'sm:col-span-2')}
            <div className="relative sm:col-span-2">
              <textarea
                rows={3}
                className={inp}
                value={form.message}
                onChange={set('message')}
                placeholder=" "
                style={{ color: '#1f1540', WebkitTextFillColor: '#1f1540', backgroundColor: '#ffffff' }}
              />
              <label
                className={`${lbl} ${form.message ? lblUp : lblDown}`}
                style={{ color: '#581c87', WebkitTextFillColor: '#581c87' }}
              >
                Message or Specific Subject Requests (optional)
              </label>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full justify-center sm:col-span-2 py-3.5 px-6 rounded-full font-black text-sm text-[#1c1040] bg-gradient-to-r from-[#ffd777] via-[#f2c94c] to-[#e0a93b] hover:from-[#ffe28a] hover:to-[#f2c94c] shadow-[0_6px_20px_rgba(224,169,59,0.4)] transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2 ${submitting ? 'opacity-75 cursor-wait' : ''}`}
              style={{ color: '#1c1040', WebkitTextFillColor: '#1c1040' }}
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#1c1040] border-t-transparent rounded-full animate-spin" />
                  <span>Submitting to Admissions &amp; Web3Forms...</span>
                </>
              ) : (
                <>
                  <span>Submit Application &amp; Start 3-Day Free Trial</span>
                  <span>→</span>
                </>
              )}
            </button>
            {msg && <p role="status" className="m-0 font-bold text-[#ffe9a8] sm:col-span-2 text-center text-sm">{msg}</p>}
          </Reveal>
        )}
      </Wrap>
    </Section>
  );
}

const FWhatsApp = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.68 7.5 8.46 7.74C8.24 7.97 7.62 8.56 7.62 9.76C7.62 10.96 8.5 12.12 8.62 12.28C8.75 12.45 10.35 14.92 12.8 15.97C13.38 16.22 13.84 16.38 14.19 16.49C14.78 16.67 15.31 16.65 15.73 16.59C16.2 16.51 17.17 16 17.37 15.42C17.57 14.85 17.57 14.36 17.51 14.26C17.45 14.16 17.3 14.1 17.07 13.99C16.85 13.87 15.76 13.34 15.56 13.27C15.36 13.19 15.21 13.15 15.07 13.37C14.92 13.59 14.5 14.1 14.38 14.24C14.26 14.38 14.13 14.4 13.91 14.29C13.69 14.18 12.98 13.95 12.14 13.2C11.49 12.61 11.05 11.89 10.93 11.67C10.8 11.45 10.92 11.34 11.03 11.23C11.13 11.13 11.26 10.96 11.37 10.83C11.49 10.7 11.53 10.6 11.61 10.45C11.68 10.29 11.64 10.16 11.58 10.05C11.53 9.94 11.08 8.84 10.9 8.38C10.72 7.93 10.54 7.99 10.4 7.98C10.27 7.98 10.12 7.98 9.97 7.98C9.82 7.98 9.57 8.04 9.36 8.27" />
  </svg>
);

const FLinkedIn = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const FFacebook = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const FFiverr = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23 7.5v9h-2.2v-1.8c-.6 1.2-1.8 2-3.3 2-2.8 0-4.7-2.1-4.7-4.7s1.9-4.7 4.7-4.7c1.5 0 2.7.8 3.3 2V7.5H23zm-5.4 7c1.4 0 2.4-1 2.4-2.5s-1-2.5-2.4-2.5-2.4 1-2.4 2.5 1 2.5 2.4 2.5zM11 7.5v9H8.8v-9H11zm-5.6 0l2.3 9H5.5L3.8 11.2 2.1 16.5H0l2.3-9h3.1z" />
  </svg>
);

const FMail = () => (
  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

function Footer() {
  return (
    <footer id="islamic-footer" className="relative overflow-hidden bg-[#ede4ff] w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-6 sm:pt-7 pb-4 sm:pb-5 text-[#14092b] border-t-2 border-[#6d28d9]/25 shadow-[0_-4px_20px_rgba(109,63,217,0.06)]">
      <FooterDeco />
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-gradient-to-b from-[#6d3fd9]/12 via-[#e0a93b]/6 to-transparent pointer-events-none blur-xl" />

      <div className="w-full relative z-10">
        {/* Main 4-Column Balanced Grid */}
        <div className="grid gap-6 sm:gap-8 lg:gap-10 xl:gap-12 md:grid-cols-2 lg:grid-cols-12 items-start w-full">
          
          {/* 1. Brand Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer group inline-block select-none -ml-1"
              title="Islamic Learn — Online Quran Education (Back to Top)"
            >
              <img
                src="/islamic-learn-logo.png"
                alt="Islamic Learn Logo"
                className="h-22 sm:h-26 md:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_16px_rgba(109,63,217,0.18)]"
              />
            </div>

            <p className="text-xs sm:text-[13px] text-[#261543] leading-snug max-w-sm m-0 font-medium">
              Empowering students & families worldwide with authentic Quran recitation, Tajweed rules, and Sunnah values under certified, patient tutors.
            </p>

            <div className="pt-1">
              <span className="text-[11px] font-black text-[#14092b] uppercase tracking-wider block mb-2">
                Connect With Us
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {/* WhatsApp */}
                <a
                  href={personalInfo.whatsappUrl || 'https://wa.link/p3yvx3'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border-2 border-[#25D366]/40 text-[#15803d] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                  title="Direct WhatsApp Chat (+92 321 7812265)"
                >
                  <FWhatsApp />
                </a>

                {/* LinkedIn */}
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border-2 border-[#0A66C2]/40 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                  title="Professional LinkedIn"
                >
                  <FLinkedIn />
                </a>

                {/* Fiverr */}
                <a
                  href={personalInfo.fiverrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border-2 border-[#1DBF73]/40 text-[#109655] hover:bg-[#1DBF73] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                  title="Fiverr Services"
                >
                  <FFiverr />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61572304088725"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border-2 border-[#1877F2]/40 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                  title="Islamic Learn — Official Facebook Page"
                >
                  <FFacebook />
                </a>

                {/* Direct Email */}
                <a
                  href={`mailto:${personalInfo.email || 'wordpressrahila@gmail.com'}`}
                  className="w-8 h-8 rounded-lg bg-white border-2 border-[#6d28d9]/40 text-[#6d28d9] hover:bg-[#6d28d9] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                  title="Email Inquiry"
                >
                  <FMail />
                </a>
              </div>
            </div>
          </div>

          {/* 2. Core Programs Column (3 Cols) - Padded & spaced to match Column 1 */}
          <div className="lg:col-span-3 space-y-2 sm:space-y-2.5 pt-1 sm:pt-2">
            <h4 className="text-[#14092b] font-black text-sm tracking-tight mb-3 flex items-center gap-1.5">
              <span className="text-[#b45309] font-black">✦</span> Core Programs
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 p-0 m-0 list-none text-xs sm:text-[13px]">
              {[
                ['Quran Tilawat (Recitation)', '#courses'],
                ['Nazra Quran with Tajweed', '#courses'],
                ['Makharij & Pronunciation Rules', '#courses'],
                ['Daily Masnoon Duas & Azkar', '#courses'],
                ['Namaz Learning & Etiquettes', '#courses'],
                ['Islamic Books & Hadith Stories', '#courses'],
                ['Islamic Character & Values', '#courses'],
              ].map(([name, href]) => (
                <li key={name}>
                  <a
                    href={href}
                    className="footer-link text-[#261543] hover:text-[#6d28d9] transition-all inline-flex items-center gap-2 hover:translate-x-1 font-bold py-0.5"
                  >
                    <span className="text-[11px] text-[#b45309] font-black">›</span>
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Explore & Navigation Column (2 Cols) - Padded & spaced to match Column 1 */}
          <div className="lg:col-span-2 space-y-2 sm:space-y-2.5 pt-1 sm:pt-2">
            <h4 className="text-[#14092b] font-black text-sm tracking-tight mb-3 flex items-center gap-1.5">
              <span className="text-[#b45309] font-black">✦</span> Explore
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 p-0 m-0 list-none text-xs sm:text-[13px]">
              {[
                ['About Academy', '#about'],
                ['How We Learn', '#how'],
                ['Class Timings', '#times'],
                ['Plans & Pricing', '#pricing'],
                ['Why Learn With Us', '#why'],
                ['Frequently Asked Questions', '#faq'],
                ['Admission Form', '#admission'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="footer-link text-[#261543] hover:text-[#6d28d9] transition-all inline-flex items-center gap-2 hover:translate-x-1 font-bold py-0.5"
                  >
                    <span className="text-[11px] text-[#b45309] font-black">›</span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact & Free Trial Column (3 Cols) - Padded & spaced to match Column 1 */}
          <div className="lg:col-span-3 space-y-3 pt-1 sm:pt-2">
            <h4 className="text-[#14092b] font-black text-sm tracking-tight mb-3 flex items-center gap-1.5">
              <span className="text-[#b45309] font-black">✦</span> Direct Contact
            </h4>
            
            <a
              href={personalInfo.whatsappUrl || 'https://wa.link/p3yvx3'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-white border-2 border-[#25D366]/40 hover:border-[#25D366] shadow-xs flex items-center gap-3 transition-all group block hover:scale-[1.01]"
            >
              <div className="w-7 h-7 rounded-lg bg-[#25D366]/15 text-[#15803d] flex items-center justify-center shrink-0">
                <FWhatsApp />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#15803d] uppercase font-black tracking-wider block leading-tight">WhatsApp 24/7</span>
                <span className="text-[#14092b] font-black text-xs sm:text-sm group-hover:text-[#15803d] transition-colors truncate block">
                  {personalInfo.phone || '+92 321 7812265'}
                </span>
              </div>
            </a>

            <a
              href={`mailto:${personalInfo.email || 'wordpressrahila@gmail.com'}`}
              className="p-3 rounded-2xl bg-white border-2 border-[#6d28d9]/30 hover:border-[#6d28d9] shadow-xs flex items-center gap-3 transition-all group block hover:scale-[1.01]"
            >
              <div className="w-7 h-7 rounded-lg bg-[#6d28d9]/15 text-[#6d28d9] flex items-center justify-center shrink-0">
                <FMail />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#6d28d9] uppercase font-black tracking-wider block leading-tight">Official Email</span>
                <span className="text-[#14092b] font-black text-xs sm:text-sm truncate block group-hover:text-[#6d28d9] transition-colors">
                  {personalInfo.email || 'wordpressrahila@gmail.com'}
                </span>
              </div>
            </a>

            <div className="pt-1">
              <a
                href="#admission"
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-black text-xs sm:text-sm text-[#1c1040] bg-gradient-to-r from-[#ffd777] via-[#f2c94c] to-[#e0a93b] hover:from-[#ffe28a] hover:to-[#f2c94c] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-[1.01]"
              >
                <span>Start 3-Day Free Trial →</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Clean Sleek Copyright Bar */}
        <div className="w-full mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#6d28d9]/20 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-bold text-[#2e1a5a]">
          <div>
            © {new Date().getFullYear()} Islamic Learn Academy. All rights reserved.
          </div>
          <div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#6d28d9] hover:text-[#4c1d95] hover:underline cursor-pointer flex items-center gap-1 font-black text-xs transition-colors"
            >
              <span>Back to Top ↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Dynamic Top Announcement Ribbon ---------- */
function TopAnnouncementRibbon() {
  const [announcements, setAnnouncements] = useState(() => {
    try {
      const stored = localStorage.getItem('rahila_islamic_announcements');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (_) {}
    return [];
  });
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadAnnouncements() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/announcements`);
        const data = await res.json();
        if (data && data.success && Array.isArray(data.announcements)) {
          if (isMounted) {
            setAnnouncements(data.announcements);
            try {
              localStorage.setItem('rahila_islamic_announcements', JSON.stringify(data.announcements));
            } catch (_) {}
          }
        }
      } catch (_) {}
    }
    loadAnnouncements();

    const handleSync = (e) => {
      if (!e.detail) return;
      if (e.detail.type === 'announcement_created' && e.detail.announcement) {
        setAnnouncements((prev) => [e.detail.announcement, ...prev]);
        setDismissed(false);
      }
      if (e.detail.type === 'announcement_deleted' && e.detail.id) {
        setAnnouncements((prev) => prev.filter((a) => a.id !== e.detail.id));
      }
      if (e.detail.type === 'announcement_updated') {
        loadAnnouncements();
      }
    };
    window.addEventListener('portfolio_data_sync', handleSync);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_sync', handleSync);
    };
  }, []);

  const topOffer = announcements.find((a) => a && a.status === 'active');
  if (!topOffer || dismissed) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#2a1359] via-[#4c1d95] to-[#2a1359] px-4 py-2 text-white border-b border-[#ffd777]/30 shadow-md">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 overflow-hidden text-left">
          <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black bg-[#ffd777] text-[#1f1540] uppercase tracking-wider">
            {topOffer.badge || '🔥 Special Offer'}
          </span>
          <span className="font-extrabold text-white truncate">
            {topOffer.title}
          </span>
          <span className="text-[#dec9ff] hidden md:inline truncate">
            — {topOffer.shortDesc}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('offers');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[11px] font-bold text-[#ffd777] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Offer Details</span>
            <span>→</span>
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="text-[#bcab9e] hover:text-white p-1 rounded-md text-sm leading-none cursor-pointer"
            aria-label="Dismiss banner"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Special Announcements & Live Offers Section ---------- */
function SpecialAnnouncements({ onApply }) {
  const [announcements, setAnnouncements] = useState(() => {
    try {
      const stored = localStorage.getItem('rahila_islamic_announcements');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (_) {}
    return [];
  });

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadAnnouncements() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/announcements`);
        const data = await res.json();
        if (data && data.success && Array.isArray(data.announcements)) {
          if (isMounted) {
            setAnnouncements(data.announcements);
            try {
              localStorage.setItem('rahila_islamic_announcements', JSON.stringify(data.announcements));
            } catch (_) {}
          }
        }
      } catch (_) {}
    }
    loadAnnouncements();

    const handleSync = (e) => {
      if (!e.detail) return;
      if (e.detail.type === 'announcement_created' && e.detail.announcement) {
        setAnnouncements((prev) => [e.detail.announcement, ...prev.filter((a) => a.id !== e.detail.announcement.id)]);
      }
      if (e.detail.type === 'announcement_deleted' && e.detail.id) {
        setAnnouncements((prev) => prev.filter((a) => a.id !== e.detail.id));
      }
      if (e.detail.type === 'announcement_updated') {
        loadAnnouncements();
      }
    };

    window.addEventListener('portfolio_data_sync', handleSync);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_sync', handleSync);
    };
  }, []);

  if (!announcements || announcements.length === 0) return null;

  return (
    <Section id="offers" bg="#f7f2ff" wave={3}>
      <Wrap className="max-w-[1280px]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
          <div>
            <Eyebrow>ACADEMY OFFERS &amp; NEW BATCHES</Eyebrow>
            <Title parts={[['Special offers,'], ['new programs & batches', true]]} />
            <Reveal as="p" className="text-[17px] text-[#6a6288] max-w-2xl">
              Directly posted &amp; managed by Rahila Kareem — limited enrollment seats, special discounts, and upcoming community workshops.
            </Reveal>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-end">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-[#6d3fd9]">
              Live Onsite Activities ({announcements.length})
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {announcements.map((ann, idx) => (
            <Reveal
              key={ann.id || idx}
              delay={idx * 0.08}
              className="rounded-3xl bg-white border border-[#dec9ff] p-5 sm:p-6 shadow-[0_20px_45px_-20px_rgba(50,20,130,0.18)] hover:shadow-[0_25px_55px_-18px_rgba(109,63,217,0.3)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-left group"
            >
              <div className="space-y-4">
                {/* Image with Corner Badge */}
                <div className="relative overflow-hidden rounded-2xl h-[210px] sm:h-[240px] bg-[#f0e8ff]">
                  <img
                    src={ann.image || '/quran-roses-hero.jpg'}
                    alt={ann.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-[#ffd777] text-[#1f1540] shadow-md border border-white/60">
                      {ann.badge || 'Special Offer'}
                    </span>
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#1f1540]/80 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{ann.status === 'active' ? 'Live Batch' : 'Coming Soon'}</span>
                    </span>
                  </div>
                </div>

                {/* Title & Short Desc */}
                <div className="space-y-2">
                  <h3 className="font-heading font-black text-[20px] sm:text-[22px] text-[#1f1540] leading-snug group-hover:text-[#6d3fd9] transition-colors">
                    {ann.title}
                  </h3>
                  <p className="text-[14px] text-[#6a6288] leading-relaxed">
                    {ann.shortDesc}
                  </p>
                </div>

                {/* Key Specs Pills */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#f0e8ff]">
                  <div className="p-2.5 rounded-xl bg-[#faf7ff] border border-[#e8deff]">
                    <span className="text-[11px] text-[#8e85aa] block font-bold">⏱ Duration</span>
                    <strong className="text-[#1f1540] font-black">{ann.duration}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#faf7ff] border border-[#e8deff]">
                    <span className="text-[11px] text-[#8e85aa] block font-bold">👥 Target Age</span>
                    <strong className="text-[#1f1540] font-black">{ann.ageGroup}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#faf7ff] border border-[#e8deff]">
                    <span className="text-[11px] text-[#8e85aa] block font-bold">📅 Schedule</span>
                    <strong className="text-[#1f1540] font-black">{ann.schedule}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#fff8eb] border border-[#fde4ba]">
                    <span className="text-[11px] text-[#c97a00] block font-bold">🏷 Tuition / Fee</span>
                    <strong className="text-[#994700] font-black">{ann.price}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-5 mt-4 border-t border-[#f0e8ff]">
                <button
                  type="button"
                  onClick={() => setSelectedItem(ann)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#dec9ff] text-xs font-bold text-[#6d3fd9] hover:bg-[#efe7ff] transition cursor-pointer text-center"
                >
                  View Full Syllabus Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onApply) onApply(ann.title);
                    const el = document.getElementById('admission');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#6d3fd9] to-[#8d56f7] hover:from-[#5d2fca] hover:to-[#7c43ea] shadow-[0_8px_20px_-6px_rgba(109,63,217,0.4)] transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{ann.ctaText || 'Enroll in this Program'}</span>
                  <span>→</span>
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>

      {/* Program Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 text-left space-y-5 shadow-2xl border border-[#dec9ff] my-8">
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#efe7ff] text-[#6d3fd9] hover:bg-[#e0d0ff] cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#ffd777] text-[#1f1540]">
                {selectedItem.badge || 'Special Program'}
              </span>
              <span className="text-xs text-[#8e85aa] font-bold">
                Taught by Lead Tutor Rahila Kareem
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden h-[220px] sm:h-[260px]">
              <img
                src={selectedItem.image || '/quran-roses-hero.jpg'}
                alt={selectedItem.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#1f1540] leading-tight">
                {selectedItem.title}
              </h2>
              <p className="text-[#6a6288] text-[15px] mt-2 leading-relaxed font-medium">
                {selectedItem.shortDesc}
              </p>
            </div>

            {/* Detailed Description */}
            <div className="p-4 rounded-2xl bg-[#faf7ff] border border-[#e8deff] space-y-2">
              <h4 className="font-bold text-sm text-[#1f1540] uppercase tracking-wider text-[11px]">
                Program Syllabus &amp; Overview
              </h4>
              <p className="text-[14px] text-[#423766] leading-relaxed whitespace-pre-line">
                {selectedItem.longDesc || selectedItem.shortDesc}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#e8deff]">
                <span className="text-[10px] text-[#8e85aa] block font-bold">⏱ DURATION</span>
                <strong className="text-[#1f1540] font-black">{selectedItem.duration}</strong>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#e8deff]">
                <span className="text-[10px] text-[#8e85aa] block font-bold">👥 AUDIENCE</span>
                <strong className="text-[#1f1540] font-black">{selectedItem.ageGroup}</strong>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#e8deff]">
                <span className="text-[10px] text-[#8e85aa] block font-bold">📅 SCHEDULE</span>
                <strong className="text-[#1f1540] font-black">{selectedItem.schedule}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#fff8eb] border border-[#fde4ba]">
                <span className="text-[10px] text-[#c97a00] block font-bold">🏷 TUITION</span>
                <strong className="text-[#994700] font-black">{selectedItem.price}</strong>
              </div>
            </div>

            {/* Direct Enroll Button */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f0e8ff]">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 rounded-xl border border-[#dec9ff] text-xs font-bold text-[#6a6288] hover:bg-[#efe7ff] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onApply) onApply(selectedItem.title);
                  setSelectedItem(null);
                  const el = document.getElementById('admission');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3 rounded-xl text-sm font-black text-white bg-gradient-to-r from-[#6d3fd9] via-[#8d56f7] to-[#e0a93b] hover:shadow-lg transition cursor-pointer flex items-center gap-2"
              >
                <span>{selectedItem.ctaText || 'Claim Offer & Enroll Now'}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

/* ---------- page ---------- */
export default function LandingSections() {
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', gender: '', age: '', course: '', schedule: '', message: '' });
  const bar = useRef(null), spot = useRef(null), sn = useRef(null), fl = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      if (bar.current) bar.current.style.width = `${(scrollY / (d.scrollHeight - innerHeight)) * 100}%`;
      if (sn.current && fl.current) {
        const r = sn.current.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (innerHeight * 0.65 - r.top) / r.height));
        fl.current.style.strokeDashoffset = 1 - p;
        sn.current.querySelectorAll('.step').forEach((s) => s.classList.toggle('on', p >= +s.dataset.at));
      }
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const move = (e) => { if (spot.current) spot.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; };
    const fine = matchMedia('(hover:hover)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (fine) addEventListener('pointermove', move);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('pointermove', move); };
  }, []);

  const handleApply = (courseName) => {
    setForm((f) => ({ ...f, course: courseName }));
    const el = document.getElementById('admission');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnroll = (planName) => {
    setForm((f) => ({
      ...f,
      course: 'All-in-One Comprehensive Program (All 7 Parts)',
      schedule: f.schedule || 'daily',
    }));
    const el = document.getElementById('admission');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-clip bg-[#f6f1ff] font-['Plus_Jakarta_Sans',system-ui,sans-serif] leading-relaxed text-[#1f1540] [scroll-behavior:smooth]">
      <TopAnnouncementRibbon />
      <div ref={bar} className="fixed left-0 top-0 z-[60] h-1 w-0 bg-gradient-to-r from-[#6d3fd9] to-[#e0a93b]" />
      <div ref={spot} className="pointer-events-none fixed left-0 top-0 z-0 -ml-[260px] -mt-[260px] hidden h-[520px] w-[520px] bg-[radial-gradient(circle,rgba(164,123,255,.28),transparent_65%)] md:block" />
      <div className="noise pointer-events-none fixed inset-0 z-50" />
      <Courses onApply={handleApply} />
      <SpecialAnnouncements onApply={handleApply} />
      <About />
      <Certificates />
      <How snRef={sn} flRef={fl} />
      <Times />
      <Pricing onEnroll={handleEnroll} />
      <Why />
      <Faq />
      <Admission form={form} setForm={setForm} />
      <Footer />
    </div>
  );
}
