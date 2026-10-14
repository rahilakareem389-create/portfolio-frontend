import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Code2,
  TrendingUp,
  Layout,
  Zap,
  Server,
  Database,
  ShieldCheck,
  ExternalLink,
  Globe,
  Layers,
  Check,
  MessageSquare,
  HelpCircle,
  FileText,
  BarChart3,
  Award
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

// Specialized Service Sections Data (Full Stack, SEO, WordPress)
const serviceSections = [
  {
    id: 'fullstack',
    name: 'Full Stack JavaScript (MERN)',
    shortName: 'Full Stack JavaScript',
    icon: Code2,
    badge: 'MERN Specialist',
    accentColor: '#D57C63',
    priceStarting: '$180',
    tagline: 'Production-grade Web Applications & High-Performance REST APIs',
    description:
      'Architecting end-to-end full stack web platforms using React.js, Node.js, Express.js, and MongoDB. From responsive JSX single-page applications and secure JWT authentication to MongoDB Atlas clustering and cloud deployment on Vercel & Railway.',
    techStack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'REST APIs',
      'JWT Auth',
      'Mongoose',
      'Vercel / Railway'
    ],
    highlights: [
      {
        title: 'Interactive Frontend SPAs',
        desc: 'React.js component architecture with Tailwind CSS, state management, and instant route transitions.'
      },
      {
        title: 'Scalable RESTful Server Logic',
        desc: 'Node.js & Express async controllers, modular route middlewares, and error-handling pipelines.'
      },
      {
        title: 'Cloud Database Clustering',
        desc: 'MongoDB Atlas NoSQL schema modeling, atomic CRUD queries, and indexed data relationships.'
      },
      {
        title: 'Enterprise Security & Deployment',
        desc: 'JWT token authorization, bcrypt password hashing, CORS configuration, and HTTPS deployment.'
      }
    ],
    pricingPlans: [
      {
        id: 'fs-starter',
        name: 'Frontend & API Starter',
        price: '$180',
        delivery: '5-7 Days Delivery',
        tagline: 'Single Page Web App & REST API Integration',
        features: [
          'Interactive React.js SPA with modern JSX & Hooks',
          'Tailwind CSS mobile-first responsive layout',
          'REST API integration with Axios & error handling',
          'Contact form, lead capture & validation',
          'SEO meta setup & clean semantic markup',
          'Git repository handover & free Vercel deployment'
        ]
      },
      {
        id: 'fs-mern',
        name: 'Full Stack MERN Application',
        price: '$350',
        delivery: '10-14 Days Delivery',
        popular: true,
        tagline: 'Complete Production-Ready MERN Web App',
        features: [
          'Complete React.js UI + Node.js/Express Backend',
          'MongoDB database schemas with Mongoose ODM',
          'Secure JWT authentication & bcrypt password hashing',
          'Protected routes & user role-based access control (RBAC)',
          'Full CRUD operations & interactive user dashboard',
          'Cloud database clustering on MongoDB Atlas',
          'Deployment on Railway / Render + Vercel with HTTPS',
          '30 Days post-launch technical bug-fix support'
        ]
      },
      {
        id: 'fs-saas',
        name: 'Custom SaaS & Web Platform',
        price: '$550+',
        delivery: '2-4 Weeks Delivery',
        tagline: 'Scalable Architecture for High-Demand Platforms',
        features: [
          'High-throughput modular microservice server logic',
          'Complex business logic & multi-tier user dashboards',
          'Payment gateways (Stripe/PayPal) & webhook processing',
          'Cloud file uploads (Cloudinary / AWS S3 integration)',
          'Automated email notifications (Nodemailer / SendGrid)',
          'Advanced database indexing & query optimization',
          'CI/CD automated deployment & environment configs',
          '60 Days post-launch priority maintenance & support'
        ]
      }
    ],
    hasDedicatedPage: true,
    pageTab: 'fullstack'
  },
  {
    id: 'seo',
    name: 'SEO, Guest Posting & Off-Page Backlinks',
    shortName: 'SEO & Backlinks',
    icon: TrendingUp,
    badge: 'SEO & Off-Page Backlinks',
    accentColor: '#D57C63',
    priceStarting: '$40',
    tagline: 'Improve Your Google Rankings with Smart SEO & High DA Backlinks',
    description:
      'I help businesses improve website visibility, acquire high DA off-page backlinks, optimize content, and build a strong SEO foundation through keyword research, technical SEO, and GBOB blogger outreach.',
    techStack: [
      'Off-Page Backlinks',
      'High DA Guest Posting',
      'GBOB Outreach',
      'Keyword Research',
      'On-Page SEO',
      'Technical SEO',
      'Website Audit',
      'Schema Markup'
    ],
    highlights: [
      {
        title: 'High DA Off-Page Backlinks',
        desc: 'Acquire 100% natural, permanent DoFollow contextual backlinks on DA 40-80+ blogs via white-hat GBOB outreach.'
      },
      {
        title: 'Keyword Research & Search Intent',
        desc: 'Find relevant keywords based on search intent, competition, and business goals to guide content strategy.'
      },
      {
        title: 'On-Page SEO & Semantic Structure',
        desc: 'Optimize page titles, meta descriptions, headings, URLs, images, and internal links for search engine relevance.'
      },
      {
        title: 'Technical SEO & Website Audit',
        desc: 'Identify and resolve crawling, indexing, XML sitemap, robots.txt, and website performance issues.'
      }
    ],
    pricingPlans: [
      {
        id: 'seo-basic',
        name: 'Basic SEO Starter Plan',
        price: '$40',
        delivery: '3-Day Delivery',
        tagline: 'SEO Starter Plan · Essential Foundation',
        features: [
          'Website SEO audit',
          'Keyword research — up to 10 keywords',
          'On-page SEO — up to 3 pages',
          'Meta title and description optimization',
          'Image alt text optimization',
          'Heading structure review',
          'Basic off-page backlink profile check',
          '3 revisions'
        ]
      },
      {
        id: 'seo-standard',
        name: 'Standard Complete On-Page SEO',
        price: '$60',
        delivery: '5-Day Delivery',
        popular: true,
        tagline: 'Complete On-Page SEO · Deep Optimization',
        features: [
          'Website SEO audit',
          'Keyword research — up to 20 keywords',
          'On-page SEO — up to 5 pages',
          'Meta titles and descriptions',
          'URL and heading optimization',
          'Image SEO optimization',
          'Internal linking',
          'Basic schema markup',
          'Off-page backlinks strategy & competitor link audit',
          '5 revisions'
        ]
      },
      {
        id: 'seo-premium',
        name: 'Premium Advanced Website SEO',
        price: '$100',
        delivery: '7-Day Delivery',
        tagline: 'Advanced Website SEO · 360° Growth & Audit',
        features: [
          'Comprehensive website SEO audit',
          'Keyword research — up to 40 keywords',
          'On-page SEO — up to 10 pages',
          'Meta titles and descriptions',
          'Technical SEO checks',
          'Image and internal linking optimization',
          'Relevant schema markup',
          'XML sitemap and robots.txt review',
          'Google Search Console checks',
          'Competitor SEO analysis',
          'Off-page backlinks & high DA guest posting roadmap',
          'SEO report and recommendations',
          '5 revisions'
        ]
      }
    ],
    hasDedicatedPage: true,
    pageTab: 'seo'
  },
  {
    id: 'wordpress',
    name: 'WordPress & WooCommerce',
    shortName: 'WordPress Designer',
    icon: Layout,
    badge: 'WordPress & WooCommerce',
    accentColor: '#D57C63',
    priceStarting: '$40',
    tagline: 'Build a Professional WordPress Website for Your Business',
    description:
      'I design modern, responsive, and user-friendly WordPress websites that help businesses establish a strong online presence. From business websites and landing pages to WooCommerce stores, I focus on clean layouts, mobile responsiveness, and easy website management.',
    techStack: [
      'WordPress',
      'Elementor',
      'WooCommerce',
      'Responsive Design',
      'Website Redesign',
      'Speed & Performance',
      'Migration & Setup'
    ],
    highlights: [
      {
        title: 'WordPress Website Design',
        desc: 'Professional, modern websites for businesses, personal brands, agencies, and service providers.'
      },
      {
        title: 'Elementor Website Design',
        desc: 'Build and customize pages using Elementor, including landing pages, homepages, and service pages.'
      },
      {
        title: 'WooCommerce Store Development',
        desc: 'Set up online stores with product pages, categories, shopping carts, checkout, and store configuration.'
      },
      {
        title: 'WordPress Redesign & Speed',
        desc: 'Revamp existing layouts, improve page load performance, image sizes, caching, and mobile responsiveness.'
      }
    ],
    pricingPlans: [
      {
        id: 'wp-basic',
        name: 'BASIC Starter Website',
        price: '$40',
        delivery: '3-Day Delivery',
        tagline: 'Starter Website · 3-Day Delivery',
        features: [
          'WordPress installation or existing-site setup',
          'Up to 3 pages',
          'Basic theme customization',
          'Responsive design',
          'Elementor page design',
          'Contact form setup',
          'Basic plugin configuration',
          '3 revisions'
        ]
      },
      {
        id: 'wp-standard',
        name: 'STANDARD Business Website',
        price: '$60',
        delivery: '5-Day Delivery',
        popular: true,
        tagline: 'Business Website · 5-Day Delivery',
        features: [
          'Up to 5 pages',
          'Custom Elementor page layouts',
          'Responsive design',
          'Contact form integration',
          'Theme and plugin configuration',
          'Basic on-page SEO setup',
          'Social media links',
          '5 revisions'
        ]
      },
      {
        id: 'wp-premium',
        name: 'PREMIUM WooCommerce / Advanced',
        price: '$100',
        delivery: '7–10 Days Delivery',
        tagline: 'WooCommerce or Advanced Website · 7–10 Days',
        features: [
          'Up to 5 pages, plus agreed store templates',
          'WooCommerce setup for a small store',
          'Product and category setup',
          'Cart and checkout configuration',
          'Responsive design',
          'Payment gateway setup (if credentials provided)',
          'Basic on-page SEO setup',
          'Essential plugin configuration',
          '5 revisions'
        ]
      }
    ],
    hasDedicatedPage: true,
    pageTab: 'wordpress'
  }
];

const Pricing = ({ setActiveTab, setSelectedPlan }) => {
  const { t } = useLanguage();
  // Default to 'fullstack' so the Full Stack section is immediately on top as requested!
  const [selectedCategory, setSelectedCategory] = useState('fullstack');
  const [activeModal, setActiveModal] = useState(null);

  // Manage body scroll & Escape key listener for popup modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };

    if (activeModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  const handleSelectPlan = (planName) => {
    if (setSelectedPlan) {
      setSelectedPlan(planName);
    }
    setActiveModal(null);
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (sectionId) => {
    const section = serviceSections.find((s) => s.id === sectionId);
    if (section) {
      setActiveModal(section);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const fullStackSection = serviceSections.find((s) => s.id === 'fullstack');
  const seoSection = serviceSections.find((s) => s.id === 'seo');
  const wordpressSection = serviceSections.find((s) => s.id === 'wordpress');

  return (
    <section className="pt-24 pb-24 page-enter">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* ======================================================== */}
        {/* 1. TOP BREADCRUMB & CLOSE BAR */}
        {/* ======================================================== */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#33271f]">
          <div className="flex items-center gap-2 text-sm text-[#bcab9e] flex-wrap">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-[#ff7a1a] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{t('pricing.backOverview')}</span>
            </button>
            <span>/</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`hover:text-[#ff7a1a] transition-colors cursor-pointer ${
                selectedCategory === 'all' ? 'text-[#ff7a1a] font-bold' : ''
              }`}
            >
              {t('pricing.title')}
            </button>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-white font-bold capitalize">
                  {selectedCategory === 'fullstack'
                    ? 'Full Stack JavaScript'
                    : selectedCategory === 'seo'
                    ? 'SEO Specialist'
                    : 'WordPress & WooCommerce'}
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => setActiveTab('home')}
            className="p-2 px-3 rounded-full bg-[#1b1411] border border-[#33271f] text-gray-300 hover:text-white hover:border-[#ff7a1a] transition-all flex items-center gap-1.5 text-xs cursor-pointer"
            title="Close page"
          >
            <X className="w-4 h-4" />
            <span>{t('pricing.close')}</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* 2. TITLE HEADER */}
        {/* ======================================================== */}
        <div className="reveal-up mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff7a1a]/15 border border-[#ff7a1a]/30 text-xs font-bold text-[#ff7a1a] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pricing Plans</span>
          </div>
          <h1 className="font-heading font-extrabold text-white text-[clamp(32px,5vw,56px)] leading-[1.08] mb-4">
            Pricing Plans
          </h1>
          <p className="lead text-[#bcab9e] max-w-3xl">
            {t('pricing.subtitle')} Choose a package below tailored for your business goals, explore dedicated pages for Full Stack JavaScript and SEO, or contact me for a custom project quote.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 3. INTERACTIVE 3-SERVICE SELECTOR TABS */}
        {/* ======================================================== */}
        <div className="reveal-up mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-[#bcab9e] uppercase tracking-wider mb-3.5">
            <span>Choose Your Service Pricing Category:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setSelectedCategory('fullstack')}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center gap-2.5 ${
                selectedCategory === 'fullstack'
                  ? 'category-pill-active'
                  : 'bg-[#1b1411] border-[#33271f] text-[#bcab9e] hover:border-[#ff7a1a] hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4 text-[#D57C63]" />
              <span>Full Stack JavaScript (MERN)</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-black/40 font-semibold text-white">
                $180 - $550+
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('seo')}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center gap-2.5 ${
                selectedCategory === 'seo'
                  ? 'category-pill-active'
                  : 'bg-[#1b1411] border-[#33271f] text-[#bcab9e] hover:border-[#ff7a1a] hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#D57C63]" />
              <span>SEO Specialist &amp; Growth</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-black/40 font-semibold text-white">
                $40 - $100
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('wordpress')}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center gap-2.5 ${
                selectedCategory === 'wordpress'
                  ? 'category-pill-active'
                  : 'bg-[#1b1411] border-[#33271f] text-[#bcab9e] hover:border-[#ff7a1a] hover:text-white'
              }`}
            >
              <Layout className="w-4 h-4 text-[#D57C63]" />
              <span>WordPress &amp; WooCommerce</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-black/40 font-semibold text-white">
                $40 - $100
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                selectedCategory === 'all'
                  ? 'category-pill-active'
                  : 'bg-[#1b1411] border-[#33271f] text-[#bcab9e] hover:border-[#ff7a1a] hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>View All 3 Packages</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 1: FULL STACK JAVASCRIPT & MERN DEVELOPMENT */}
        {/* (Showcase UP -> Pricing Cards -> Quote Button) */}
        {/* ======================================================== */}
        {(selectedCategory === 'all' || selectedCategory === 'fullstack') && fullStackSection && (
          <div className="reveal-up mb-20">
            
            {/* 1. UP SHOWCASE BANNER */}
            <div className="pricing-fs-banner p-8 sm:p-12 rounded-[28px] relative overflow-hidden mb-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D57C63]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D57C63]/15 border border-[#D57C63]/40 text-xs font-bold text-[#D57C63] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Specialized Web Engineering</span>
                  </div>
                  <span className="text-xs font-semibold px-3.5 py-1 rounded-full pricing-badge-pill">
                    Full Stack JavaScript &amp; MERN Architecture
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <h2 className="font-heading font-extrabold text-[28px] sm:text-[38px] text-white leading-tight mb-4">
                      Need Custom Full Stack JavaScript &amp; MERN Development?
                    </h2>
                    <p className="text-[15.5px] text-[#bcab9e] leading-relaxed mb-6 desc-text">
                      Beyond standard websites, we engineer high-performance, database-backed web applications using <strong className="text-[#D57C63]">React.js, Node.js, Express.js, and MongoDB</strong>. From secure JWT authentication and RESTful APIs to custom database schemas and cloud deployment.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>React.js Dynamic Frontends &amp; SPAs</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>Node &amp; Express RESTful APIs</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>MongoDB Schema Design &amp; Atlas</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>JWT Auth, Security &amp; CI/CD Hosting</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('fullstack');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="glow-btn px-7 py-3.5 rounded-full text-sm sm:text-base font-bold flex items-center gap-2.5 shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                      >
                        <Code2 className="w-4 h-4" />
                        <span>Explore Full Stack Developer Page →</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectPlan('Custom Full Stack MERN Development')}
                        className="px-6 py-3.5 rounded-full border border-[#442c1f] hover:border-[#D57C63] text-white hover:bg-[#D57C63]/10 text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
                      >
                        <span>Inquire for MERN Development</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="p-6 rounded-2xl pricing-fs-preview-box shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#291a13]">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#D57C63] animate-pulse" />
                          <span className="text-xs font-mono text-[#D57C63] font-bold">MERN_STACK_PRODUCTION</span>
                        </div>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#D57C63]/20 text-[#D57C63] font-bold">LIVE READY</span>
                      </div>
                      <div className="font-mono text-xs text-[#c9b9ad] space-y-2">
                        <p><span className="text-[#D57C63] font-bold">Frontend:</span> React.js, Tailwind, JSX, SPA</p>
                        <p><span className="text-[#D57C63] font-bold">Backend:</span> Node.js, Express, Middleware</p>
                        <p><span className="text-[#D57C63] font-bold">Database:</span> MongoDB, Mongoose, Atlas</p>
                        <p><span className="text-[#D57C63] font-bold">Security:</span> JWT Auth, bcrypt, CORS</p>
                        <p><span className="text-[#D57C63] font-bold">Hosting:</span> Vercel, Railway, Render</p>
                      </div>
                      <div className="pt-3 border-t border-[#291a13] flex items-center justify-between text-xs">
                        <span className="text-[#8c796e]">Complete Showcase:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('fullstack');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-[#D57C63] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Full Stack Page</span> &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. FULL STACK PRICING CARDS */}
            <div className="mb-10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-2">
                <Zap className="w-4 h-4" />
                <span>Full Stack JavaScript Packages</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
                Full Stack Web Application Pricing
              </h3>
              <p className="text-sm text-[#bcab9e] max-w-2xl mb-8">
                Select a production-grade package engineered for scalability, clean RESTful architectures, and reliable cloud database clustering.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {fullStackSection.pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`reveal-up glass-card p-7 rounded-[20px] relative flex flex-col justify-between ${
                      plan.popular
                        ? 'border-[#D57C63] shadow-[0_0_40px_rgba(213,124,99,0.3)]'
                        : 'border-[#33271f]'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3.5 right-5 rtl:right-auto rtl:left-5 bg-gradient-to-r from-[#D57C63] to-[#e89078] text-white font-bold text-xs px-3.5 py-1 rounded-[20px] shadow-md">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-1">
                        {plan.delivery}
                      </div>
                      <h4 className="font-heading font-bold text-[21px] text-white">
                        {plan.name}
                      </h4>

                      <div className="font-heading font-extrabold text-[38px] text-[#D57C63] my-2">
                        {plan.price}
                      </div>

                      <p className="text-[14.5px] text-[#bcab9e] mb-4 leading-relaxed">
                        {plan.tagline}
                      </p>

                      <ul className="list-none p-0 m-0 mb-6 text-[14px] text-[#bcab9e] space-y-2.5 pt-3 border-t border-[#33271f]">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#D57C63] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectPlan(`${plan.name} (${plan.price})`)}
                      className={`w-full py-3.5 px-6 rounded-[40px] text-sm sm:text-base font-bold transition-all cursor-pointer ${
                        plan.popular
                          ? 'glow-btn'
                          : 'bg-transparent text-white border-[1.5px] border-[#3d271c] hover:border-[#D57C63] hover:bg-[#D57C63]/10'
                      }`}
                    >
                      Choose Plan ({plan.price})
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. SATH HI QUOTE KA BUTTON */}
            <div className="glass-card p-7 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#33271f]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enterprise &amp; Bespoke Architecture</span>
                </div>
                <h4 className="font-heading font-bold text-xl text-white mb-1">
                  Need a Custom Full Stack Architecture or Specialized APIs?
                </h4>
                <p className="text-xs sm:text-sm text-[#bcab9e] max-w-2xl leading-relaxed">
                  Have complex database relationships, multi-tenant SaaS requirements, microservices, or custom third-party integrations? Get in touch for a tailored scope and quotation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (setSelectedPlan) setSelectedPlan('Custom Full Stack Enterprise Architecture');
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="glow-btn px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer shrink-0 shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>Contact for Custom Quote</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION 2: SEO SPECIALIST & ORGANIC GROWTH */}
        {/* (Showcase UP -> Pricing Cards -> Quote Button) */}
        {/* ======================================================== */}
        {(selectedCategory === 'all' || selectedCategory === 'seo') && seoSection && (
          <div className="reveal-up mb-20">
            
            {/* 1. UP SHOWCASE BANNER */}
            <div className="pricing-fs-banner p-8 sm:p-12 rounded-[28px] relative overflow-hidden mb-10 shadow-2xl border-[#D57C63]/40">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D57C63]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D57C63]/15 border border-[#D57C63]/40 text-xs font-bold text-[#D57C63] uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Organic Search Growth</span>
                  </div>
                  <span className="text-xs font-semibold px-3.5 py-1 rounded-full pricing-badge-pill">
                    Google Rankings &amp; Technical SEO Audits
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <h2 className="font-heading font-extrabold text-[28px] sm:text-[38px] text-white leading-tight mb-4">
                      Improve Your Google Rankings with Smart SEO Strategies
                    </h2>
                    <p className="text-[15.5px] text-[#bcab9e] leading-relaxed mb-6 desc-text">
                      I help businesses improve their website visibility, optimize their content, and build a strong SEO foundation through keyword research, on-page optimization, technical SEO, and data-driven strategies.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>Keyword Research &amp; Intent Analysis</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>On-Page Semantic &amp; Meta Tuning</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>Technical SEO &amp; Indexing Audits</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>Schema Markup (JSON-LD) &amp; Rich Results</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('seo');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="glow-btn px-7 py-3.5 rounded-full text-sm sm:text-base font-bold flex items-center gap-2.5 shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>Explore SEO Specialist Page →</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectPlan('SEO Services Inquiry')}
                        className="px-6 py-3.5 rounded-full border border-[#33271f] hover:border-[#D57C63] text-white hover:bg-[#D57C63]/10 text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
                      >
                        <span>Get SEO Services</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="p-6 rounded-2xl pricing-fs-preview-box shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#291a13]">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#D57C63] animate-pulse" />
                          <span className="text-xs font-mono text-[#D57C63] font-bold">GOOGLE_SEARCH_CONSOLE</span>
                        </div>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#D57C63]/20 text-[#D57C63] font-bold">OPTIMIZED</span>
                      </div>
                      <div className="font-mono text-xs text-[#c9b9ad] space-y-2">
                        <p><span className="text-[#D57C63] font-bold">Focus:</span> High-Intent Keywords &amp; Search Volume</p>
                        <p><span className="text-[#D57C63] font-bold">Audit:</span> Crawlability, Core Web Vitals, Robots.txt</p>
                        <p><span className="text-[#D57C63] font-bold">Schema:</span> FAQ, Organization, Service, Breadcrumb</p>
                        <p><span className="text-[#D57C63] font-bold">On-Page:</span> Meta Titles, Descriptions, ALT Tags</p>
                        <p><span className="text-[#D57C63] font-bold">Outreach:</span> High DA Contextual Guest Posting</p>
                      </div>
                      <div className="pt-3 border-t border-[#291a13] flex items-center justify-between text-xs">
                        <span className="text-[#8c796e]">Complete Showcase:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('seo');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-[#D57C63] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open SEO Page</span> &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SEO PRICING CARDS */}
            <div className="mb-10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Affordable SEO Packages</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
                Affordable SEO Packages for Every Business
              </h3>
              <p className="text-sm text-[#bcab9e] max-w-2xl mb-8">
                Choose a package based on your website size and SEO requirements.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {seoSection.pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`reveal-up glass-card p-7 rounded-[20px] relative flex flex-col justify-between ${
                      plan.popular
                        ? 'border-[#D57C63] shadow-[0_0_35px_rgba(213,124,99,0.25)]'
                        : 'border-[#33271f]'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3.5 right-5 rtl:right-auto rtl:left-5 glow-btn text-white font-extrabold text-xs px-3.5 py-1 rounded-[20px] shadow-md">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-1">
                        {plan.delivery}
                      </div>
                      <h4 className="font-heading font-bold text-[21px] text-white">
                        {plan.name}
                      </h4>

                      <div className="font-heading font-extrabold text-[38px] text-[#D57C63] my-2">
                        {plan.price}
                      </div>

                      <p className="text-[14.5px] text-[#bcab9e] mb-4 leading-relaxed">
                        {plan.tagline}
                      </p>

                      <ul className="list-none p-0 m-0 mb-6 text-[14px] text-[#bcab9e] space-y-2.5 pt-3 border-t border-[#33271f]">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#D57C63] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectPlan(`${plan.name} (${plan.price})`)}
                      className={`w-full py-3.5 px-6 rounded-[40px] text-sm sm:text-base font-bold transition-all cursor-pointer ${
                        plan.popular
                          ? 'glow-btn'
                          : 'bg-transparent text-white border-[1.5px] border-[#33271f] hover:border-[#D57C63] hover:bg-[#D57C63]/10'
                      }`}
                    >
                      {plan.price === '$40' ? 'Get Started ($40)' : plan.price === '$60' ? 'Choose Plan ($60)' : 'Get Started ($100)'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. SATH HI QUOTE KA BUTTON */}
            <div className="glass-card p-7 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#33271f]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Growth Strategy</span>
                </div>
                <h4 className="font-heading font-bold text-xl text-white mb-1">
                  Need Multi-Site SEO, High DA Guest Posting, or Monthly Retainer?
                </h4>
                <p className="text-xs sm:text-sm text-[#bcab9e] max-w-2xl leading-relaxed">
                  Managing multiple web properties, large catalogs, or need continuous blogger outreach and link building? Get a tailored SEO proposal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (setSelectedPlan) setSelectedPlan('Custom SEO Retainer & Outreach');
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="glow-btn px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer shrink-0 shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>Contact for SEO Quote</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION 3: WORDPRESS & WOOCOMMERCE WEB DESIGN */}
        {/* (Showcase UP -> Pricing Cards -> Quote Button) */}
        {/* ======================================================== */}
        {(selectedCategory === 'all' || selectedCategory === 'wordpress') && wordpressSection && (
          <div className="reveal-up mb-20">
            
            {/* 1. UP SHOWCASE BANNER */}
            <div className="pricing-fs-banner p-8 sm:p-12 rounded-[28px] relative overflow-hidden mb-10 shadow-2xl border-[#D57C63]/40">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D57C63]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D57C63]/15 border border-[#D57C63]/40 text-xs font-bold text-[#D57C63] uppercase tracking-wider">
                    <Layout className="w-3.5 h-3.5" />
                    <span>WordPress &amp; WooCommerce</span>
                  </div>
                  <span className="text-xs font-semibold px-3.5 py-1 rounded-full pricing-badge-pill">
                    Elementor &amp; Responsive Web Design
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <h2 className="font-heading font-extrabold text-[28px] sm:text-[38px] text-white leading-tight mb-4">
                      Build a Professional WordPress Website for Your Business
                    </h2>
                    <p className="text-[15.5px] text-[#bcab9e] leading-relaxed mb-6 desc-text">
                      I design modern, responsive, and user-friendly WordPress websites that help businesses establish a strong online presence. From business websites and landing pages to WooCommerce stores, I focus on clean layouts, mobile responsiveness, and easy website management.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>Custom Elementor &amp; WooCommerce Layouts</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>Mobile-First Responsive Design</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>Ultra-Fast Performance &amp; Speed Tuning</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-[#e4d5ca] desc-text">
                        <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0" />
                        <span>Secure Hosting &amp; Domain Configuration</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('wordpress');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="glow-btn px-7 py-3.5 rounded-full text-sm sm:text-base font-bold flex items-center gap-2.5 shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                      >
                        <Layout className="w-4 h-4" />
                        <span>Explore WordPress Designer Page →</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectPlan('Custom WordPress Website Design')}
                        className="px-6 py-3.5 rounded-full border border-[#33271f] hover:border-[#D57C63] text-white hover:bg-[#D57C63]/10 text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
                      >
                        <span>Order WordPress Website</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="p-6 rounded-2xl pricing-fs-preview-box shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#291a13]">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#D57C63] animate-pulse" />
                          <span className="text-xs font-mono text-[#D57C63] font-bold">WORDPRESS_ECOSYSTEM</span>
                        </div>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#D57C63]/20 text-[#D57C63] font-bold">LIVE READY</span>
                      </div>
                      <div className="font-mono text-xs text-[#c9b9ad] space-y-2">
                        <p><span className="text-[#D57C63] font-bold">Builders:</span> Elementor, WPBakery, Theme Builder</p>
                        <p><span className="text-[#D57C63] font-bold">E-Commerce:</span> WooCommerce, Payment Gateways</p>
                        <p><span className="text-[#D57C63] font-bold">Performance:</span> Caching, WebP, Speed Tuning</p>
                        <p><span className="text-[#D57C63] font-bold">SEO:</span> On-Page SEO Setup, Schema, Sitemap</p>
                        <p><span className="text-[#D57C63] font-bold">Hosting:</span> Domain Setup, cPanel, SSL, Migration</p>
                      </div>
                      <div className="pt-3 border-t border-[#291a13] flex items-center justify-between text-xs">
                        <span className="text-[#8c796e]">Complete Showcase:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('wordpress');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-[#D57C63] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open WordPress Page</span> &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. WORDPRESS PRICING CARDS */}
            <div className="mb-10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-2">
                <Layout className="w-4 h-4" />
                <span>Affordable WordPress Packages</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
                Affordable WordPress Website Packages
              </h3>
              <p className="text-sm text-[#bcab9e] max-w-2xl mb-8">
                Choose a package based on your website requirements.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {wordpressSection.pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`reveal-up glass-card p-7 rounded-[20px] relative flex flex-col justify-between ${
                      plan.popular
                        ? 'border-[#D57C63] shadow-[0_0_35px_rgba(213,124,99,0.25)]'
                        : 'border-[#33271f]'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3.5 right-5 rtl:right-auto rtl:left-5 glow-btn text-white font-extrabold text-xs px-3.5 py-1 rounded-[20px] shadow-md">
                        {t('pricing.mostPopular')}
                      </span>
                    )}

                    <div>
                      <div className="text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-1">
                        {plan.delivery}
                      </div>
                      <h4 className="font-heading font-bold text-[21px] text-white">
                        {plan.name}
                      </h4>

                      <div className="font-heading font-extrabold text-[38px] text-[#D57C63] my-2">
                        {plan.price}
                      </div>

                      <p className="text-[14.5px] text-[#bcab9e] mb-4 leading-relaxed">
                        {plan.tagline}
                      </p>

                      <ul className="list-none p-0 m-0 mb-6 text-[14px] text-[#bcab9e] space-y-2.5 pt-3 border-t border-[#33271f]">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#D57C63] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectPlan(`${plan.name} (${plan.price})`)}
                      className={`w-full py-3.5 px-6 rounded-[40px] text-sm sm:text-base font-bold transition-all cursor-pointer ${
                        plan.popular
                          ? 'glow-btn'
                          : 'bg-transparent text-white border-[1.5px] border-[#33271f] hover:border-[#D57C63] hover:bg-[#D57C63]/10'
                      }`}
                    >
                      {plan.price === '$40' ? 'Get Started ($40)' : plan.price === '$60' ? 'Choose Plan ($60)' : 'Get Started ($100)'}
                    </button>
                  </div>
                ))}
              </div>

              {/* Scope Note */}
              <div className="mt-8 p-4 rounded-xl bg-[#1b1410] border border-[#38261b] text-center max-w-3xl mx-auto">
                <p className="text-xs text-[#a8988b] leading-relaxed">
                  <strong>Pricing note:</strong> Domain, hosting, premium themes/plugins, paid subscriptions, and extensive custom functionality are charged separately. Final scope and delivery time should be agreed before starting.
                </p>
              </div>
            </div>

            {/* 3. SATH HI QUOTE KA BUTTON */}
            <div className="glass-card p-7 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#33271f]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Project Solution</span>
                </div>
                <h4 className="font-heading font-bold text-xl text-white mb-1">
                  {t('pricing.customTitle')}
                </h4>
                <p className="text-xs sm:text-sm text-[#bcab9e] max-w-2xl leading-relaxed">
                  {t('pricing.customDesc')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (setSelectedPlan) setSelectedPlan('Custom WordPress Development');
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="glow-btn px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer shrink-0 shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>{t('pricing.customBtn')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* 4. COMPLETE PAGE-LIKE POPUP MODAL (UP-TO-DOWN SLIDE ANIMATION) */}
      {/* ======================================================== */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center overflow-y-auto p-3 sm:p-6 md:p-10"
          onClick={handleCloseModal}
        >
          {/* Modal Container with silky Up-to-Down slide animation */}
          <div
            className="w-full max-w-5xl rounded-[28px] pricing-modal-box my-4 sm:my-8 overflow-hidden shadow-2xl modal-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Modal Top Bar */}
            <div className="p-6 sm:p-8 border-b border-[#3d271c] flex items-center justify-between bg-[#1f1510]/80 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#ff7a1a]/20 border border-[#ff7a1a]/40 flex items-center justify-center text-[#ff7a1a]">
                  {React.createElement(activeModal.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff7a1a]">
                    Detailed Service Specifications
                  </span>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white modal-title">
                    {activeModal.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2.5 rounded-full bg-[#1b1411] border border-[#3d271c] text-gray-300 hover:text-white hover:border-[#ff7a1a] transition-all cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-10 space-y-10">
              
              {/* Overview & Description */}
              <div>
                <h4 className="font-heading font-bold text-lg sm:text-xl text-[#ff7a1a] mb-2">
                  {activeModal.tagline}
                </h4>
                <p className="text-sm sm:text-base modal-body text-[#c9b9ad] leading-relaxed">
                  {activeModal.description}
                </p>
              </div>

              {/* Key Capabilities Highlights */}
              <div>
                <h5 className="font-heading font-bold text-base text-white modal-title mb-4 uppercase tracking-wider text-xs">
                  What is Included &amp; Core Architecture
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeModal.highlights.map((hl, hlIdx) => (
                    <div
                      key={hlIdx}
                      className="p-4 sm:p-5 rounded-2xl modal-card bg-[#140d09] border border-[#2e1d13] space-y-1.5"
                    >
                      <div className="flex items-center gap-2 text-[#ff7a1a] font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{hl.title}</span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#a8988b] leading-relaxed">
                        {hl.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-[#8a776a] mb-3">
                  Technologies, Tools &amp; Frameworks
                </h5>
                <div className="flex flex-wrap gap-2">
                  {activeModal.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#221611] text-[#f7ede3] border border-[#3d271c]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Transparent Pricing Packages for this service */}
              <div className="pt-4 border-t border-[#33271f]">
                <div className="text-center max-w-xl mx-auto mb-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff7a1a]/10 text-xs font-bold text-[#ff7a1a] uppercase tracking-wider mb-2">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Service Pricing Packages</span>
                  </div>
                  <h4 className="font-heading font-extrabold text-2xl sm:text-3xl modal-title text-white">
                    Select Your {activeModal.shortName} Plan
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  {activeModal.pricingPlans.map((plan, pIdx) => (
                    <div
                      key={pIdx}
                      className={`p-6 sm:p-7 rounded-2xl modal-card bg-[#130d0a] border relative flex flex-col justify-between ${
                        plan.popular
                          ? 'border-[#ff7a1a] shadow-[0_0_35px_rgba(255,106,0,0.25)]'
                          : 'border-[#33271f]'
                      }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 right-5 rtl:right-auto rtl:left-5 bg-gradient-to-r from-[#ff6a00] to-[#ffb347] text-[#1a0c02] font-bold text-[11px] px-3 py-0.5 rounded-full shadow-md">
                          Most Popular
                        </span>
                      )}

                      <div>
                        <div className="text-[11px] font-bold text-[#ff7a1a] uppercase tracking-wider mb-1">
                          {plan.delivery}
                        </div>
                        <h5 className="font-heading font-extrabold text-lg modal-title text-white mb-2">
                          {plan.name}
                        </h5>
                        <div className="font-heading font-extrabold text-3xl text-[#ff7a1a] mb-3">
                          {plan.price}
                        </div>
                        <p className="text-xs text-[#a8988b] leading-relaxed mb-5">
                          {plan.tagline}
                        </p>

                        <ul className="space-y-2.5 text-xs text-[#c9b9ad] mb-6 pt-3 border-t border-[#26170e]">
                          {plan.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#ff7a1a] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectPlan(`${plan.name} (${plan.price})`)}
                        className={`w-full py-3 px-4 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          plan.popular
                            ? 'glow-btn'
                            : 'bg-transparent text-white border border-[#442c1f] hover:border-[#ff7a1a] hover:bg-[#ff7a1a]/10'
                        }`}
                      >
                        Choose Plan &amp; Inquire
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="p-6 sm:p-8 border-t border-[#3d271c] bg-[#1a110c] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-full border border-[#442c1f] text-gray-300 hover:text-white hover:border-[#ff7a1a] text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  Close Window
                </button>

                {activeModal.hasDedicatedPage && (
                  <button
                    type="button"
                    onClick={() => {
                      handleCloseModal();
                      setActiveTab(activeModal.pageTab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="glow-btn px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>
                      {activeModal.id === 'seo'
                        ? 'Open Complete Dedicated SEO Page'
                        : activeModal.id === 'fullstack'
                        ? 'Open Complete Dedicated Full Stack Page'
                        : 'Open Complete Portfolio Page'}
                    </span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                )}
              </div>

              <span className="text-xs text-[#8a776a]">
                Press <kbd className="px-2 py-0.5 bg-[#251710] rounded border border-[#3e271c] text-[#ff7a1a]">ESC</kbd> or click outside to close
              </span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default Pricing;
