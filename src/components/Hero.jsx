import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  Star,
  Globe,
  TrendingUp,
  Code2,
  Zap,
  Layout,
  ShoppingBag,
  Palette,
  Sliders,
  Plug,
  Monitor,
  RefreshCw,
  Gauge,
  FileText,
  Link2,
  Target,
  Search,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  Layers,
  Server,
  Terminal,
  Database,
  Cpu,
  Smartphone,
  ChevronDown,
  Check,
  Share2,
  Award
} from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import { personalInfo } from '../data/portfolioData';

// 3 Core Topics (Full Stack first, SEO second, WordPress last as requested)
const topics = [
  {
    id: 'fullstack',
    title: 'Full Stack JavaScript',
    centerHeading: 'Full Stack Developer',
    experience: '1 Year',
    buttonIcon: Code2,
    description:
      'Full Stack JavaScript Developer with 1 year of experience building scalable, modern web applications with React.js, Node.js, Express.js, MongoDB, and high-performance REST APIs. Creating responsive user interfaces and robust backend architectures for startups and businesses.',
    points: [
      { text: 'JavaScript', icon: Code2 },
      { text: 'React.js', icon: Layers },
      { text: 'Node.js', icon: Server },
      { text: 'Express.js', icon: Terminal },
      { text: 'MongoDB', icon: Database },
      { text: 'REST APIs', icon: Cpu },
      { text: 'MERN Stack', icon: Zap },
      { text: 'Responsive UI', icon: Smartphone },
      { text: 'Frontend Dev', icon: Monitor },
      { text: 'Backend Dev', icon: Server },
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Guest Posting',
    centerHeading: 'SEO Specialist',
    experience: '1 Year',
    buttonIcon: TrendingUp,
    description:
      'I specialize in Guest Posting, Blogger Outreach, and Backlink Building with 1 year of experience. I help businesses and SEO agencies find niche-relevant websites for guest post placements, evaluate website quality, and manage backlink buying and selling opportunities. My focus is on relevant websites, quality content, contextual backlinks, and long-term SEO value, combined with technical SEO audits, schema markup, and on-page optimization.',
    points: [
      { text: 'Guest Posting Services', icon: FileText },
      { text: 'Guest Post Outreach', icon: Link2 },
      { text: 'Backlink Building', icon: TrendingUp },
      { text: 'Backlink Buying and Selling', icon: RefreshCw },
      { text: 'Blogger Outreach', icon: Share2 },
      { text: 'Link Building Specialist', icon: Award },
      { text: 'Niche Relevant Backlinks', icon: Target },
      { text: 'Guest Blogging Services', icon: FileText },
      { text: 'Off-Page SEO', icon: BarChart3 },
      { text: 'SEO Link Building', icon: ShieldCheck },
    ],
  },
  {
    id: 'wordpress',
    title: 'WordPress Design',
    centerHeading: 'WordPress Designer',
    experience: '2 Years',
    buttonIcon: Globe,
    description:
      'I am a WordPress Designer with 2 years of experience in designing, developing, and customizing responsive, user-friendly websites. I specialize in WordPress, Elementor, WPBakery, WooCommerce, website optimization, and SEO-friendly design to help businesses build a strong online presence.',
    points: [
      { text: 'WordPress', icon: Globe },
      { text: 'Elementor', icon: Zap },
      { text: 'WPBakery', icon: Layout },
      { text: 'WooCommerce', icon: ShoppingBag },
      { text: 'Website Design', icon: Palette },
      { text: 'Theme Customization', icon: Sliders },
      { text: 'Plugin Integration', icon: Plug },
      { text: 'Responsive Design', icon: Monitor },
      { text: 'Website Migration', icon: RefreshCw },
      { text: 'Speed Optimization', icon: Gauge },
    ],
  },
];

const Hero = ({ setActiveTab }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTopic = topics[activeIndex];

  // 3D tilt & rotation interaction for stage and main image
  const stageRef = useRef(null);
  const orbitRef = useRef(null);
  const mainImageRef = useRef(null);
  const innerImgRef = useRef(null);

  // Rotate main image when mouse moves near/over it (left to right / right to left)
  const handleMainImageMouseMove = (e) => {
    const targetEl = mainImageRef.current || stageRef.current;
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalized coordinates from center (-1.2 to +1.2)
    const normX = Math.max(-1.25, Math.min(1.25, (e.clientX - centerX) / (rect.width / 2)));
    const normY = Math.max(-1.25, Math.min(1.25, (e.clientY - centerY) / (rect.height / 2)));

    // Visible, responsive 3D rotation on main image
    const rotY = (normX * 26).toFixed(2); // Left to right rotate (-26° to +26°)
    const rotZ = (normX * 8).toFixed(2);  // Dynamic roll
    const rotX = (-normY * 16).toFixed(2); // Vertical tilt

    if (mainImageRef.current) {
      mainImageRef.current.style.transition = 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)';
      mainImageRef.current.style.transform = `perspective(850px) rotateY(${rotY}deg) rotateX(${rotX}deg) rotateZ(${rotZ}deg) scale(1.035)`;
    }

    if (innerImgRef.current) {
      innerImgRef.current.style.transition = 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)';
      innerImgRef.current.style.transform = `scale(1.09) translate3d(${(normX * 9).toFixed(1)}px, ${(normY * 9).toFixed(1)}px, 0)`;
    }

    // Subtle tilt on orbit track
    if (orbitRef.current) {
      orbitRef.current.style.transform = `rotateY(${(normX * 8).toFixed(1)}deg) rotateX(${(-normY * 5).toFixed(1)}deg)`;
    }
  };

  const handleMainImageMouseLeave = () => {
    if (mainImageRef.current) {
      mainImageRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      mainImageRef.current.style.transform = 'perspective(850px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1)';
    }
    if (innerImgRef.current) {
      innerImgRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      innerImgRef.current.style.transform = 'scale(1) translate3d(0, 0, 0)';
    }
    if (orbitRef.current) {
      orbitRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
  };

  return (
    <section
      itemScope
      itemType="https://schema.org/Person"
      className="relative pt-24 sm:pt-28 pb-16 overflow-hidden page-enter"
    >
      {/* Schema.org Meta Properties for Search Engine Crawlers */}
      <meta itemProp="url" content="https://rahilakareem.com" />
      <meta itemProp="image" content="https://rahilakareem.com/profile.jpg" />
      <meta itemProp="jobTitle" content={activeTopic.centerHeading} />

      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#D57C63]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Main 2-Column Row: Left = Text, Right = Image with Circling Points */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-130px)]">
          
          {/* Left Column: Text & Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
            
            {/* "Hello!" Pill Badge with 3 Radiating Orange Rays */}
            <div className="anim-up-1 flex items-center gap-3.5 mb-3">
              <span className="hero-hello-badge relative inline-flex items-center px-4 py-1.5 rounded-full border-[1.8px] border-[#D57C63] font-semibold text-[14px] sm:text-[15px] select-none transition-all">
                <span>Hello!</span>
                {/* 3 Radiating Orange Rays */}
                <svg
                  className="absolute -top-3 -right-3.5 w-6 h-6 text-[#D57C63] overflow-visible pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 15C5.2 10.5 7.8 6.5 11 3.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9.5 17C12 12.8 16 9 20.5 6.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.5 20C16.8 16.8 20.5 14 24.5 12.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>

            {/* "I'm RAHILA KAREEM" with Schema.org itemprop="name" */}
            <h1 className="anim-up-2 mb-2.5">
              <span className="hero-im-text text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight tracking-tight block">
                I'm
              </span>
              <span
                itemProp="name"
                className="hero-name-text text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-black uppercase tracking-tight block leading-[1.05]"
              >
                RAHILA KAREEM
              </span>
            </h1>

            {/* Main Headline with itemprop="description" */}
            <p itemProp="description" className="anim-up-3 hero-tagline-sub mb-5 max-w-[48ch]">
              Helping Startups, SaaS &amp; Businesses Grow with{' '}
              <strong className="hero-tagline-strong font-semibold">
                SEO, WordPress &amp; Full Stack JavaScript Development
              </strong>{' '}
              <span className="hero-tagline-brand font-bold whitespace-nowrap">| @ Unity Space</span>
            </p>

            {/* 3 Domain Topic Switcher Buttons */}
            <div className="anim-up-4 flex flex-wrap gap-2.5 mb-5">
              {topics.map((t, idx) => {
                const isSelected = activeIndex === idx;
                const Icon = t.buttonIcon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`topic-btn px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                      isSelected
                        ? 'topic-btn-active bg-[#D57C63] text-white border-[#D57C63] shadow-[0_4px_18px_rgba(213,124,99,0.4)] scale-[1.02]'
                        : 'topic-btn-inactive'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'topic-icon-inactive text-[#D57C63]'}`} />
                    <span>{t.title}</span>
                    <span
                      className={`topic-exp-badge text-[10.5px] px-2 py-0.5 rounded-full font-bold ${
                        isSelected ? 'topic-exp-active bg-white/20 text-white' : 'topic-exp-inactive'
                      }`}
                    >
                      {t.experience}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Topic Description Text Box */}
            <div className="anim-up-4 hero-desc-box glass-card p-5 sm:p-6 rounded-2xl mb-7 shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider text-[#D57C63] mb-2 flex items-center gap-1.5">
                <span>Active Domain:</span>
                <span className="hero-desc-heading font-extrabold">{activeTopic.centerHeading}</span>
              </div>
              <p className="hero-desc-text text-[14.5px] sm:text-[15.5px] leading-[1.75]">
                {activeTopic.description}
              </p>
            </div>

            {/* Call To Action Buttons */}
            <div className="anim-up-5 flex flex-wrap items-center gap-3.5">
              <a
                href="/rahila-kareem-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-primary px-7 py-3 rounded-full text-[15px] font-bold text-white shadow-[0_6px_25px_rgba(213,124,99,0.45)] hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                title="View & Download Rahila Kareem CV"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <button
                type="button"
                onClick={() => {
                  const target = document.getElementById('explore-work');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveTab('home');
                    setTimeout(() => {
                      document.getElementById('explore-work')?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }
                }}
                className="btn-hero-secondary px-6 py-3 rounded-full text-[15px] font-bold hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Explore My Work</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('contact')}
                className="btn-hero-tertiary px-6 py-3 rounded-full text-[15px] font-bold transition-all cursor-pointer"
              >
                <span>Contact Me</span>
              </button>
            </div>

          </div>

          {/* Right Column: Profile Image with Circling Points */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center order-1 lg:order-2">
            
            <div
              ref={stageRef}
              onMouseMove={handleMainImageMouseMove}
              onMouseLeave={handleMainImageMouseLeave}
              className="stage w-full max-w-[420px]"
            >
              <div ref={orbitRef} className="orbit">
                
                {/* 5-Star Dynamic Experience Badge */}
                <div 
                  key={activeTopic.id}
                  className="hero-exp-badge absolute -top-3 -left-2 sm:-top-4 sm:-left-5 z-30 px-4 py-2.5 rounded-[18px] text-left select-none pointer-events-auto transition-all duration-300 animate-fade-in"
                  style={{ transform: 'translateZ(45px)' }}
                >
                  <div className="flex items-center gap-1 mb-1 text-[#D57C63]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D57C63] text-[#D57C63]" />
                    ))}
                  </div>
                  <div className="hero-exp-value font-heading font-extrabold text-[15px] leading-tight">
                    {activeTopic.experience}
                  </div>
                  <div className="hero-exp-label text-[11px] font-medium leading-tight mt-0.5">
                    Experience
                  </div>
                </div>

                {/* Central Photo Ring Frame - Rotates with mouse left-to-right / right-to-left */}
                <div
                  ref={mainImageRef}
                  onMouseMove={handleMainImageMouseMove}
                  onMouseLeave={handleMainImageMouseLeave}
                  className="ring border-[3.5px] border-[#D57C63] shadow-[0_0_35px_rgba(213,124,99,0.65),inset_0_0_45px_rgba(213,124,99,0.3)] cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                >
                  <img
                    ref={innerImgRef}
                    itemProp="image"
                    src={profileImg}
                    alt="Rahila Kareem - Full Stack JavaScript Developer, SEO Specialist & WordPress Designer | @ Unity Space"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="eager"
                  />
                </div>

                {/* Rotating SVG Circle Text around the image */}
                <svg
                  className="absolute inset-[-22px] w-[calc(100%+44px)] h-[calc(100%+44px)] pointer-events-none animate-spin-slow z-20"
                  viewBox="0 0 320 320"
                >
                  <defs>
                    <path
                      id="cleanCircleTextPath"
                      d="M 160, 160 m -132, 0 a 132,132 0 1,1 264,0 a 132,132 0 1,1 -264,0"
                    />
                  </defs>
                  <circle
                    cx="160"
                    cy="160"
                    r="132"
                    fill="none"
                    stroke="#D57C63"
                    strokeWidth="1.2"
                    strokeDasharray="4 6"
                    opacity="0.45"
                  />
                  <text fill="#D57C63" fontSize="10" fontWeight="700" letterSpacing="3.5px">
                    <textPath href="#cleanCircleTextPath" startOffset="0%">
                      • {activeTopic.centerHeading.toUpperCase()} • UNITY SPACE •
                    </textPath>
                  </text>
                </svg>

                {/* Center Heading Badge Floating at Bottom Center of Photo */}
                <div
                  className="hero-center-role absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 px-5 py-2 rounded-full flex items-center gap-2 whitespace-nowrap select-none"
                  style={{ transform: 'translate(-50%, 0) translateZ(50px)' }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D57C63] animate-ping" />
                  <span className="hero-center-role-text font-extrabold text-[14px] sm:text-[15px] tracking-wide">
                    {activeTopic.centerHeading}
                  </span>
                </div>

                {/* Circling 3D Points around the image with Professional Vector Icons */}
                <div className="tags-orbit-wrap">
                  <div className="tags" aria-hidden="true" key={activeTopic.id}>
                    {activeTopic.points.map((pt, idx) => {
                      const PointIcon = pt.icon;
                      return (
                        <i
                          key={idx}
                          style={{ '--a': `${idx * 36}deg` }}
                          title={`Click to view ${pt.text} in Specialized Skills & Services`}
                          className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-110"
                          role="link"
                          onClick={(e) => {
                            e.stopPropagation();
                            const target = document.getElementById(`card-${activeTopic.id}`) || document.getElementById('explore-work');
                            if (target) {
                              target.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              setActiveTab('home');
                              setTimeout(() => {
                                const el = document.getElementById(`card-${activeTopic.id}`) || document.getElementById('explore-work');
                                el?.scrollIntoView({ behavior: 'smooth' });
                              }, 120);
                            }
                          }}
                        >
                          <span className="tag-sign text-[#D57C63] flex items-center justify-center">
                            <PointIcon className="w-3.5 h-3.5" />
                          </span>
                          <span itemProp="knowsAbout" className="tag-label font-semibold tracking-wide">
                            {pt.text}
                          </span>
                        </i>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile-Friendly Points List (Visible on smaller screens) */}
            <div className="mt-4 w-full max-w-[420px] block sm:hidden text-center">
              <div className="text-xs font-semibold text-[#bcab9e] mb-2">
                Circling Points:
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {activeTopic.points.map((p, idx) => {
                  const PointIcon = p.icon;
                  return (
                    <span
                      key={idx}
                      onClick={() => {
                        const target = document.getElementById(`card-${activeTopic.id}`) || document.getElementById('explore-work');
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          setActiveTab('home');
                          setTimeout(() => {
                            const el = document.getElementById(`card-${activeTopic.id}`) || document.getElementById('explore-work');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }, 120);
                        }
                      }}
                      className="mobile-point-pill px-2.5 py-1 rounded-full text-xs font-medium border border-[#D57C63]/40 flex items-center gap-1.5 transition-colors cursor-pointer hover:border-[#D57C63]"
                    >
                      <PointIcon className="w-3 h-3 text-[#D57C63]" />
                      <span itemProp="knowsAbout">{p.text}</span>
                    </span>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
