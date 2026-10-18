import React, { useState } from 'react';
import { 
  ArrowLeft, 
  X, 
  ExternalLink, 
  Eye, 
  MessageSquare, 
  FileText, 
  Globe, 
  Sparkles, 
  ArrowDown, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Layout,
  TrendingUp,
  Layers
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import fullstackProfileImg from '../assets/fullstack-profile.png';

const Portfolio = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [modalProject, setModalProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCardActive, setIsCardActive] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Filter projects by category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category?.toLowerCase().includes(selectedCategory.toLowerCase()) || p.badge?.toLowerCase().includes(selectedCategory.toLowerCase()));

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'mern', label: 'MERN Stack' },
    { id: 'react', label: 'React Apps' },
    { id: 'wordpress', label: 'WordPress' },
    { id: 'seo', label: 'SEO & Analytics' }
  ];

  return (
    <section className="pt-24 pb-24 page-enter">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Top Breadcrumb & Close Bar */}
        <div className="flex items-center justify-between pb-6 mb-10 border-b border-[#33271f]">
          <div className="flex items-center gap-2 text-sm text-[#bcab9e]">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-[#ff7a1a] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{t('portfolio.backOverview')}</span>
            </button>
            <span>/</span>
            <span className="text-[#ff7a1a] font-medium">{t('portfolio.title')}</span>
          </div>

          <button
            onClick={() => setActiveTab('home')}
            className="p-2 rounded-full bg-[#1b1411] border border-[#33271f] text-gray-300 hover:text-white hover:border-[#ff7a1a] transition-all flex items-center gap-1 text-xs cursor-pointer"
            title="Close page"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">{t('portfolio.close')}</span>
          </button>
        </div>

        {/* =========================================================================
            PORTFOLIO HERO SECTION (1st Section)
            Left: Folded Arms Portrait Card + Floating Badge (Direct / Scoped / Remote)
            Right: Modern High-Impact Introduction + Metrics + Action Buttons
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 pb-14 border-b border-[#33271f]/80">
          
          {/* Left Column: Folded-Arms Developer Portrait Card + Floating Badge */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div 
              className="relative w-full max-w-[340px] sm:max-w-[380px] cursor-pointer"
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
              onClick={() => setIsCardActive(prev => !prev)}
              title="Click to toggle glowing orange shadow"
            >
              
              {/* Dynamic Orange Background Glow (Subtle touch at rest, vibrant on hover/click) */}
              <div 
                className="absolute -inset-3 rounded-[32px] transition-all duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255, 122, 26, 0.75) 0%, rgba(255, 106, 0, 0.4) 45%, transparent 75%)',
                  filter: isCardActive ? 'blur(26px)' : isCardHovered ? 'blur(22px)' : 'blur(16px)',
                  opacity: isCardActive ? 0.95 : isCardHovered ? 0.65 : 0.22,
                  transform: isCardActive ? 'scale(1.05)' : isCardHovered ? 'scale(1.02)' : 'scale(0.97)'
                }}
              />

              {/* Main Dark Portrait Card with Guaranteed Orange Shadow */}
              <div 
                className="relative rounded-[26px] bg-gradient-to-b from-[#1c1511] via-[#140e0b] to-[#0d0907] p-4 sm:p-5 transition-all duration-300 overflow-visible select-none"
                style={{
                  borderWidth: '1.5px',
                  borderColor: isCardActive ? '#ff7a1a' : isCardHovered ? 'rgba(255, 122, 26, 0.7)' : 'rgba(255, 122, 26, 0.25)',
                  boxShadow: isCardActive 
                    ? '0 0 45px rgba(255, 122, 26, 0.75), 0 0 22px rgba(255, 106, 0, 0.5), 0 15px 40px rgba(0, 0, 0, 0.7)' 
                    : isCardHovered
                      ? '0 0 30px rgba(255, 122, 26, 0.45), 0 15px 35px rgba(0, 0, 0, 0.65)'
                      : '0 0 14px rgba(255, 122, 26, 0.16), 0 12px 30px rgba(0, 0, 0, 0.6)',
                  transform: isCardActive ? 'scale(1.015)' : 'scale(1)'
                }}
              >
                
                {/* Photo Frame Container */}
                <div className="relative rounded-[20px] overflow-hidden bg-gradient-to-b from-[#261b15] to-[#120d0a] flex items-end justify-center min-h-[380px] sm:min-h-[420px]">
                  
                  {/* Subtle Background Radial in photo frame */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(213,124,99,0.22),transparent_70%)] pointer-events-none" />

                  {/* Rahila Kareem Folded-Arms Portrait */}
                  <img
                    src={fullstackProfileImg}
                    alt="Rahila Kareem - Full Stack Developer & SEO Specialist"
                    className="w-full max-h-[420px] object-cover object-top select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="eager"
                  />
                </div>

                {/* Overlapping Floating Skills Card (Bottom Right - Logo Orange Accents) */}
                <div className="absolute -bottom-6 -right-3 sm:-right-6 z-20 bg-white text-gray-900 rounded-2xl p-4 sm:p-5 shadow-[0_20px_45px_rgba(0,0,0,0.45)] border border-orange-100 hover:shadow-[0_20px_45px_rgba(255,106,0,0.35)] hover:border-orange-200 min-w-[215px] space-y-3.5 select-none transition-all duration-300 hover:scale-105">
                  
                  {/* Skill 1: Full Stack / MERN & React.js */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/60 text-[#ff6a00] flex items-center justify-center shrink-0 shadow-sm">
                      <Code2 className="w-4 h-4 text-[#ff6a00]" />
                    </div>
                    <div>
                      <div className="font-extrabold text-[15px] text-gray-900 leading-tight">
                        Full Stack
                      </div>
                      <div className="text-[11.5px] text-gray-500 font-medium leading-tight">
                        MERN &amp; React.js
                      </div>
                    </div>
                  </div>

                  {/* Skill 2: WordPress / Elementor & WooCommerce */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/60 text-[#ff6a00] flex items-center justify-center shrink-0 shadow-sm">
                      <Layout className="w-4 h-4 text-[#ff6a00]" />
                    </div>
                    <div>
                      <div className="font-extrabold text-[15px] text-gray-900 leading-tight">
                        WordPress
                      </div>
                      <div className="text-[11.5px] text-gray-500 font-medium leading-tight">
                        WooCommerce &amp; Speed
                      </div>
                    </div>
                  </div>

                  {/* Skill 3: SEO Expert / Technical & Ranking */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/60 text-[#ff6a00] flex items-center justify-center shrink-0 shadow-sm">
                      <TrendingUp className="w-4 h-4 text-[#ff6a00]" />
                    </div>
                    <div>
                      <div className="font-extrabold text-[15px] text-gray-900 leading-tight">
                        SEO Expert
                      </div>
                      <div className="text-[11.5px] text-gray-500 font-medium leading-tight">
                        Technical &amp; On-Page
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Modern Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center pt-6 lg:pt-0">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff7a1a]/10 border border-[#ff7a1a]/30 text-[#ff7a1a] text-xs font-bold uppercase tracking-wider mb-5 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production Work &amp; Case Studies</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-white text-[clamp(32px,4vw,52px)] leading-[1.12] mb-4">
              Crafting High-Converting <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a1a] via-[#e5937d] to-[#ff6a00]">
                Digital Products &amp; Web Apps
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-[16px] sm:text-[17px] text-[#bcab9e] leading-[1.7] mb-8 max-w-xl">
              A curated showcase of Full Stack JavaScript (MERN) web applications, custom responsive WordPress &amp; WooCommerce platforms, and technical SEO growth architectures built for real-world impact.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects-catalog"
                className="glow-btn px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <button
                onClick={() => setActiveTab('contact')}
                className="px-6 py-3 rounded-full bg-[#1b1411] border border-[#33271f] text-gray-200 hover:text-white hover:border-[#ff7a1a] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Hire for Project</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

          </div>

        </div>

        {/* =========================================================================
            PROJECTS CATALOG HEADER & CATEGORY FILTERS
            ========================================================================= */}
        <div id="projects-catalog" className="reveal-up mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-2">
              Featured Case Studies
            </h2>
            <p className="text-sm text-[#bcab9e]">
              Filter projects by specialty or browse all live client deliverables.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#ff7a1a] text-black shadow-md font-bold'
                    : 'bg-[#1b1411] text-[#bcab9e] border border-[#33271f] hover:text-white hover:border-[#ff7a1a]/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            PROJECTS GRID
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="reveal-up glass-card p-6 flex flex-col justify-end min-h-[220px] bg-gradient-to-br from-[#ff6a00]/20 via-transparent to-transparent hover:border-[#ff7a1a] transition-all group"
            >
              <div className="mb-auto pb-4">
                <small className="text-[#eaa487] font-bold text-xs uppercase block mb-1">
                  {project.badge}
                </small>
                <h3 className="font-heading font-bold text-[21px] text-white mb-2 group-hover:text-[#ff7a1a] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[15.5px] text-[#bcab9e] leading-[1.65]">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#33271f] flex items-center justify-between gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff7a1a] hover:underline"
                >
                  <span>{t('portfolio.liveDemo')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setModalProject(project)}
                  className="inline-flex items-center gap-1 text-xs text-[#bcab9e] hover:text-white cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t('portfolio.viewDetails')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Details */}
        {modalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="glass-card modal-enter w-full max-w-xl p-8 rounded-[18px] border border-[#ff7a1a] relative shadow-2xl bg-[#1b1411]">
              
              <button
                onClick={() => setModalProject(null)}
                className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <small className="text-[#eaa487] font-bold text-xs uppercase block mb-1">
                {modalProject.badge}
              </small>

              <h2 className="font-heading font-extrabold text-2xl text-white mt-1 mb-2">
                {modalProject.title}
              </h2>

              <p className="text-sm text-[#bcab9e] leading-[1.65] my-4">
                {modalProject.description}
              </p>

              <div className="glass-card p-4 rounded-xl mb-6 border border-[#33271f]">
                <h4 className="text-xs uppercase text-[#ff7a1a] font-bold mb-1">Highlight</h4>
                <p className="text-sm text-gray-200">{modalProject.highlight}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#33271f]">
                <button
                  onClick={() => setModalProject(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#bcab9e] hover:text-white cursor-pointer"
                >
                  {t('portfolio.closeModal')}
                </button>
                <a
                  href={modalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-btn px-6 py-2.5 rounded-[40px] text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <span>{t('portfolio.liveDemo')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Portfolio;
