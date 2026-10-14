import React, { useState, useEffect, useRef } from 'react';
import {
  Layout,
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Check,
  FileText,
  ShoppingCart,
  Smartphone,
  RefreshCw,
  Zap,
  Wrench,
  Settings,
  Layers,
  HelpCircle,
  Eye,
  CheckCheck,
  Star,
  MessageSquare,
  Award,
  Palette,
  HardDrive,
  ShieldCheck,
  Search
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import fullstackProfileImg from '../assets/fullstack-profile.png';

// Dynamic titles that cycle with a smooth down-to-up slide animation
const alternativeTitles = [
  '| WordPress Designer & Developer',
  '| Elementor Page Builder Specialist',
  '| WooCommerce E-Commerce Stores',
  '| Mobile-First Responsive Web Design',
  '| Speed Optimization & Website Revamps'
];

// Core Hero Keywords (from specification Section 1)
const heroKeywords = [
  'WordPress Website Design',
  'Elementor',
  'WooCommerce',
  'Responsive Design',
  'Website Redesign'
];

// 16 WordPress Skills & Technologies (from specification Section 5)
const wordPressSkills = [
  'WordPress',
  'Elementor',
  'WPBakery',
  'WooCommerce',
  'Theme Customization',
  'Plugin Configuration',
  'Responsive Design',
  'Landing Pages',
  'Business Websites',
  'E-commerce Websites',
  'Website Migration',
  'Domain & Hosting Setup',
  'cPanel',
  'WordPress SEO',
  'Speed Optimization',
  'Website Maintenance'
];

// 7 Complete WordPress Services (from specification Section 3)
const wordPressServices = [
  {
    id: 'wp-website-design',
    number: '01',
    title: 'WordPress Website Design',
    icon: Layout,
    shortDesc: 'Modern, high-converting websites for businesses & personal brands.',
    longDesc:
      'Create professional, modern websites for businesses, personal brands, agencies, and service providers with clean architecture and intuitive navigation.',
    keywords: ['WordPress Website Design', 'Business Website', 'Custom Website Layout', 'Professional Website'],
    features: [
      'Tailored brand typography, color palettes & layout design',
      'Pixel-perfect responsive display across mobile, tablet & desktop',
      'Clean semantic HTML5 structure & navigation flow',
      'Contact form integration, lead capture & WhatsApp link'
    ]
  },
  {
    id: 'elementor-design',
    number: '02',
    title: 'Elementor Website Design',
    icon: Palette,
    shortDesc: 'Dynamic drag-and-drop landing pages & custom templates.',
    longDesc:
      'Build and customize pages using Elementor, including high-converting landing pages, homepages, service pages, and contact pages that you can easily edit without coding.',
    keywords: ['Elementor Expert', 'Elementor Page Builder', 'Landing Page Design', 'WordPress Customization'],
    features: [
      'Bespoke Elementor Pro header, footer & archive templates',
      'Conversion-focused call-to-action sections & funnels',
      'Smooth micro-interactions, motion effects & counters',
      'Client-friendly visual backend for instant content updates'
    ]
  },
  {
    id: 'woocommerce-stores',
    number: '03',
    title: 'WooCommerce Store Development',
    icon: ShoppingCart,
    shortDesc: 'Complete online stores with shopping carts, checkout & catalog.',
    longDesc:
      'Set up online stores with product pages, categories, shopping carts, checkout, and basic store configuration for seamless selling.',
    keywords: ['WooCommerce Developer', 'WordPress E-commerce', 'Online Store', 'Product Pages', 'Shopping Cart'],
    features: [
      'Product catalog setup with simple & variable options',
      'Cart, checkout, customer accounts & order tracking',
      'Payment gateway configuration (Stripe, PayPal, local options)',
      'Automated email receipts, shipping rules & inventory management'
    ]
  },
  {
    id: 'responsive-design',
    number: '04',
    title: 'Responsive Website Design',
    icon: Smartphone,
    shortDesc: 'Mobile-first optimization for flawless screen performance.',
    longDesc:
      'Optimize layouts for desktop, tablet, and mobile devices to provide a consistent, user-friendly experience across all screen sizes.',
    keywords: ['Responsive WordPress Website', 'Mobile-Friendly Design', 'Website Usability'],
    features: [
      'Fluid media queries & dynamic viewport scaling',
      'Touch-friendly mobile navigation menus & buttons',
      'Cross-browser testing (Chrome, Safari, Firefox, Edge)',
      'Accessible typography & high-contrast readability'
    ]
  },
  {
    id: 'wp-redesign',
    number: '05',
    title: 'WordPress Redesign & Customization',
    icon: RefreshCw,
    shortDesc: 'Transform outdated layouts into modern, engaging experiences.',
    longDesc:
      'Refresh outdated websites, improve page layouts, customize themes, and update website content to better match a brand\'s modern identity.',
    keywords: ['WordPress Redesign', 'Theme Customization', 'Website Revamp', 'Elementor Customization'],
    features: [
      'Complete visual makeover aligned with current design standards',
      'Theme customization (Astra, Hello Elementor, GeneratePress)',
      'Navigation restructure & content flow refinement',
      'Preserving existing SEO rankings and URL structures'
    ]
  },
  {
    id: 'speed-performance',
    number: '06',
    title: 'WordPress Speed & Performance',
    icon: Zap,
    shortDesc: 'Faster load times, Core Web Vitals & lightweight asset tuning.',
    longDesc:
      'Review website performance, image sizes, caching, and other optimization opportunities to help pages load more efficiently and rank better.',
    keywords: ['WordPress Speed Optimization', 'Website Performance', 'Image Optimization', 'Core Web Vitals'],
    features: [
      'Advanced caching setup (WP Rocket, LiteSpeed, W3 Total Cache)',
      'Next-gen WebP image compression & lazy loading',
      'Minification of CSS, JavaScript & database cleaning',
      'Targeting 90+ Google PageSpeed & GTmetrix scores'
    ]
  },
  {
    id: 'migration-setup',
    number: '07',
    title: 'WordPress Migration & Setup',
    icon: HardDrive,
    shortDesc: 'Zero-downtime hosting transfer, cPanel setup & theme configuration.',
    longDesc:
      'Help configure WordPress, connect domains and hosting, install themes and plugins, and migrate websites when supported by the hosting environment.',
    keywords: ['WordPress Installation', 'Website Migration', 'Domain Setup', 'Hosting Configuration', 'cPanel'],
    features: [
      'WordPress CMS installation & database configuration',
      'Seamless host-to-host or domain migration with zero downtime',
      'DNS records mapping (A Records, CNAME, MX Records) & SSL setup',
      'Essential security hardening & automated backup plugins'
    ]
  }
];

// 3 WordPress Pricing Packages (from specification Section 4)
const wordPressPricingPlans = [
  {
    id: 'wp-basic',
    tier: 'BASIC',
    price: '$40',
    unit: '/ project',
    name: 'Starter Website',
    delivery: '3-Day Delivery',
    popular: false,
    tagline: 'Ideal for small businesses, personal portfolios & landing pages.',
    features: [
      'WordPress installation or existing-site setup',
      'Up to 3 pages (e.g. Home, About, Contact)',
      'Basic theme customization',
      'Responsive design across mobile & desktop',
      'Elementor page design',
      'Contact form setup',
      'Basic plugin configuration',
      '3 revisions'
    ],
    buttonText: 'Get Started'
  },
  {
    id: 'wp-standard',
    tier: 'STANDARD',
    price: '$60',
    unit: '/ project',
    name: 'Business Website',
    delivery: '5-Day Delivery',
    popular: true,
    badge: 'Most Popular',
    tagline: 'Complete custom business website with on-page SEO & social links.',
    features: [
      'Up to 5 pages (Home, About, Services, Blog, Contact)',
      'Custom Elementor page layouts',
      'Responsive design for all devices',
      'Contact form integration & lead capture',
      'Theme and plugin configuration',
      'Basic on-page SEO setup & meta tags',
      'Social media links & WhatsApp button',
      '5 revisions'
    ],
    buttonText: 'Choose Plan'
  },
  {
    id: 'wp-premium',
    tier: 'PREMIUM',
    price: '$100',
    unit: '/ project',
    name: 'WooCommerce or Advanced Website',
    delivery: '7–10 Days Delivery',
    popular: false,
    tagline: 'Feature-rich business website or fully functional online shopping store.',
    features: [
      'Up to 5 pages, plus agreed store templates',
      'WooCommerce setup for a small store',
      'Product and category setup',
      'Cart and checkout configuration',
      'Responsive design across all screens',
      'Payment gateway setup (Stripe, PayPal, if credentials provided)',
      'Basic on-page SEO setup',
      'Essential plugin configuration & security',
      '5 revisions'
    ],
    buttonText: 'Get Started'
  }
];

// 11 Tools I Work With (from specification Section 6)
const wordPressTools = [
  { name: 'WordPress CMS', desc: 'Core platform architecture & content management', category: 'Platform' },
  { name: 'Elementor Pro', desc: 'Visual drag-and-drop builder & custom theme layouts', category: 'Page Builder' },
  { name: 'WPBakery', desc: 'Enterprise visual page builder for corporate themes', category: 'Page Builder' },
  { name: 'WooCommerce', desc: 'E-commerce cart, checkout & catalog engine', category: 'E-Commerce' },
  { name: 'Astra & Themes', desc: 'Lightweight, ultra-fast customizable themes', category: 'Themes' },
  { name: 'Yoast & Rank Math', desc: 'On-page SEO, sitemaps & schema markup setup', category: 'SEO' },
  { name: 'PageSpeed Insights', desc: 'Core Web Vitals & performance diagnostic testing', category: 'Speed' },
  { name: 'Search Console', desc: 'Google indexing, sitemap verification & crawl health', category: 'Analytics' },
  { name: 'cPanel & Hosting', desc: 'Server dashboards, PHP versions & database setup', category: 'Hosting' },
  { name: 'Domain & DNS', desc: 'DNS propagation, A records, CNAME & SSL security', category: 'DNS' },
  { name: 'Backup & Migration', desc: 'All-in-One WP Migration, Duplicator & UpdraftPlus', category: 'Security' }
];

// 5 WordPress Projects (from specification Section 7)
const wordPressProjects = [
  {
    id: 'business-website',
    title: 'Business Website Design',
    category: 'Corporate',
    badge: 'Live Website',
    label: 'Client Project',
    description: 'A professional website featuring Home, About, Services, and Contact pages engineered for corporate branding.',
    deliverables: [
      'Custom Elementor modern layout',
      'Mobile-first responsive styling',
      'Interactive contact form & WhatsApp link',
      'Basic on-page SEO meta tags'
    ],
    metric: '100% Responsive'
  },
  {
    id: 'elementor-landing',
    title: 'Elementor Landing Page',
    category: 'Landing Page',
    badge: 'High Conversion',
    label: 'Lead Generation',
    description: 'A conversion-focused landing page with clear calls to action, social proof testimonials, and fast load times.',
    deliverables: [
      'High-impact hero section & offer banner',
      'Benefit highlight cards & feature grid',
      'Lead capture form with validation',
      'Custom thank-you page transition'
    ],
    metric: '+45% Conversion Rate'
  },
  {
    id: 'woocommerce-store',
    title: 'WooCommerce Store',
    category: 'E-Commerce',
    badge: 'Online Shop',
    label: 'Storefront',
    description: 'An online store with product listings, categories, cart, secure checkout, and payment gateway configuration.',
    deliverables: [
      'Complete product catalog with filters',
      'Shopping cart & streamlined checkout',
      'Stripe & PayPal gateway setup',
      'Order notification email templates'
    ],
    metric: 'Full Shopping Cart'
  },
  {
    id: 'wordpress-redesign',
    title: 'WordPress Redesign',
    category: 'Revamp',
    badge: 'Modern UI',
    label: 'Redesign Project',
    description: 'A refreshed layout with improved navigation, modern visual aesthetics, and responsive performance on all devices.',
    deliverables: [
      'Complete visual overhaul & new brand colors',
      'Refactored menu navigation & header',
      'Preserved existing blog content & URLs',
      'Enhanced mobile usability'
    ],
    metric: 'Modernized UX'
  },
  {
    id: 'speed-optimization',
    title: 'Website Speed Optimization',
    category: 'Performance',
    badge: 'Core Web Vitals',
    label: 'Speed Project',
    description: 'A performance review with practical recommendations and implemented caching, WebP images, and asset minification.',
    deliverables: [
      'Full speed audit & benchmark report',
      'WebP image compression & lazy loading',
      'WP Rocket / LiteSpeed cache configuration',
      'Minification of unused CSS and JS'
    ],
    metric: '90+ Google Score'
  }
];

// 6 WordPress FAQs (from specification Section 8)
const wordPressFaqs = [
  {
    id: 'faq-1',
    q: 'Can you design a WordPress website for my business?',
    a: 'Yes. I can create a business website with the pages and features agreed for your project, including custom branding, responsive layouts, contact forms, and easy client management.'
  },
  {
    id: 'faq-2',
    q: 'Will my WordPress website work on mobile?',
    a: 'Responsive design is included in the listed packages, with layouts adjusted for mobile, tablet, and desktop devices to ensure a smooth user experience across all screen sizes.'
  },
  {
    id: 'faq-3',
    q: 'Can you create an online store?',
    a: 'Yes. WooCommerce can be configured for products, categories, cart, and checkout. Payment gateway availability depends on the provider and account setup credentials provided.'
  },
  {
    id: 'faq-4',
    q: 'Can you redesign my existing WordPress website?',
    a: 'Yes. I can update layouts, customize supported themes, improve page structure, and refresh the website\'s appearance to better match your brand identity while protecting existing URLs.'
  },
  {
    id: 'faq-5',
    q: 'Do you provide WordPress SEO?',
    a: 'Basic on-page SEO setup is included in relevant packages (titles, meta descriptions, headings, image alt tags). A complete in-depth SEO audit or larger ongoing SEO campaign can be quoted separately.'
  },
  {
    id: 'faq-6',
    q: 'Are hosting and domain included?',
    a: 'No. Domain, hosting, and paid premium themes or plugins are separate unless specifically included in the project agreement. I can assist you in connecting your domain and hosting setup.'
  }
];

export default function WordPressPage({ setActiveTab, setSelectedPlan }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const heroCardRef = useRef(null);

  // Cycle alternative titles smoothly every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % alternativeTitles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // IntersectionObserver for down-to-up reveal animation
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 3D Tilting Mouse Interaction for Hero Card
  const handleHeroMouseMove = (e) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;
    heroCardRef.current.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleHeroMouseLeave = () => {
    if (!heroCardRef.current) return;
    heroCardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    heroCardRef.current.style.transition = 'transform 0.5s ease-out';
    setTimeout(() => {
      if (heroCardRef.current) heroCardRef.current.style.transition = '';
    }, 500);
  };

  return (
    <div className="w-full min-h-screen pt-28 pb-24 page-enter">
      
      {/* ======================================================== */}
      {/* GOOGLE SCHEMA MARKUP (JSON-LD @GRAPH COMPLIANT) */}
      {/* ======================================================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://rahilakareem.com/#wordpress",
                "url": "https://rahilakareem.com/#wordpress",
                "name": "WordPress Designer | Elementor & WooCommerce Websites",
                "description": "Get professional WordPress website design, Elementor customization, WooCommerce store setup, responsive design, and website redesign services.",
                "isPartOf": { "@id": "https://rahilakareem.com/#website" },
                "breadcrumb": { "@id": "https://rahilakareem.com/#wordpress-breadcrumbs" }
              },
              {
                "@type": "ProfilePage",
                "@id": "https://rahilakareem.com/#profile-wordpress",
                "url": "https://rahilakareem.com/#wordpress",
                "name": "Rahila Kareem - WordPress Designer Profile",
                "mainEntity": {
                  "@type": "Person",
                  "@id": "https://rahilakareem.com/#person",
                  "name": "Rahila Kareem",
                  "jobTitle": "WordPress Designer & WooCommerce Specialist",
                  "description": "WordPress Designer with experience creating modern, responsive, and user-friendly websites with Elementor, Gutenberg, and WooCommerce."
                }
              },
              {
                "@type": "Service",
                "@id": "https://rahilakareem.com/#service-wordpress-packages",
                "serviceType": "WordPress Website Design & Development",
                "name": "WordPress Website Design, Elementor & WooCommerce Services",
                "description": "Professional WordPress websites, custom Elementor layouts, WooCommerce stores, speed optimization, and responsive design.",
                "provider": { "@id": "https://rahilakareem.com/#person" },
                "areaServed": "Worldwide",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "WordPress Website Packages",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "name": "Basic Starter Website",
                      "price": "40",
                      "priceCurrency": "USD",
                      "availability": "https://schema.org/InStock",
                      "description": "WordPress installation or existing-site setup, up to 3 pages, Elementor design, responsive layout, contact form setup, 3 revisions."
                    },
                    {
                      "@type": "Offer",
                      "name": "Standard Business Website",
                      "price": "60",
                      "priceCurrency": "USD",
                      "availability": "https://schema.org/InStock",
                      "description": "Up to 5 pages, custom Elementor layouts, responsive design, contact form integration, basic on-page SEO setup, 5 revisions."
                    },
                    {
                      "@type": "Offer",
                      "name": "Premium WooCommerce or Advanced Website",
                      "price": "100",
                      "priceCurrency": "USD",
                      "availability": "https://schema.org/InStock",
                      "description": "Up to 5 pages plus agreed store templates, WooCommerce store setup, product and category setup, cart/checkout configuration, 5 revisions."
                    }
                  ]
                }
              },
              {
                "@type": "FAQPage",
                "@id": "https://rahilakareem.com/#wordpress-faq",
                "mainEntity": wordPressFaqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://rahilakareem.com/#wordpress-breadcrumbs",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rahilakareem.com/#home" },
                  { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://rahilakareem.com/#services" },
                  { "@type": "ListItem", "position": 3, "name": "WordPress Designer", "item": "https://rahilakareem.com/#wordpress" }
                ]
              }
            ]
          })
        }}
      />

      <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="reveal-up hero-reveal flex flex-wrap items-center justify-between gap-4 mb-10 sm:mb-14">
          <button
            type="button"
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="wp-btn-back inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all hover:-translate-x-1 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#D57C63]" />
            <span>Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold wp-subtext">
            <span
              onClick={() => setActiveTab('home')}
              className="hover:text-[#D57C63] cursor-pointer transition-colors"
            >
              Home
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#D57C63] font-bold">WordPress Designer &amp; Services</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. WORDPRESS HERO SECTION */}
        {/* ======================================================== */}
        <section
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Person"
          className="mb-24 sm:mb-32 lg:mb-36"
        >
          <meta itemProp="name" content="Rahila Kareem" />
          <meta itemProp="url" content="https://rahilakareem.com/#wordpress" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading, Bio, Buttons with Down-to-Up Animations */}
            <div className="lg:col-span-7">
              
              {/* Small Heading Badge */}
              <div className="anim-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full wp-badge text-xs sm:text-[13px] font-bold tracking-wide uppercase mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#D57C63]" />
                <span>WORDPRESS DESIGNER · ELEMENTOR · WOOCOMMERCE</span>
              </div>

              {/* Main Heading (H1) with Down-to-Up float */}
              <h1 itemProp="jobTitle" className="anim-up-2 font-heading font-extrabold text-[32px] sm:text-[46px] lg:text-[52px] leading-[1.14] wp-heading mb-6">
                Build a Professional WordPress Website for Your Business{' '}
                <span className="block mt-2 text-[26px] sm:text-[38px] lg:text-[44px] min-h-[1.2em] overflow-hidden">
                  <span
                    key={titleIndex}
                    className="anim-title-slide inline-block text-[#D57C63]"
                  >
                    {alternativeTitles[titleIndex]}
                  </span>
                </span>
              </h1>

              {/* Main Paragraph */}
              <p itemProp="description" className="anim-up-3 wp-body text-[16px] sm:text-[18px] leading-[1.8] mb-8 max-w-2xl">
                I design modern, responsive, and user-friendly WordPress websites that help businesses establish a strong online presence. From business websites and landing pages to WooCommerce stores, I focus on clean layouts, mobile responsiveness, and easy website management.
              </p>

              {/* Hero Buttons */}
              <div className="anim-up-4 flex flex-wrap items-center gap-4 mb-9">
                <a
                  href="#wordpress-pricing"
                  className="px-7 py-3.5 rounded-full bg-[#D57C63] hover:bg-[#b85c43] text-white text-[15px] font-bold shadow-[0_8px_28px_rgba(213,124,99,0.48)] hover:-translate-y-1 transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <Layout className="w-4 h-4 text-white" />
                  <span>Hire Me</span>
                </a>

                <a
                  href="#wordpress-projects"
                  className="wp-btn-secondary px-6 py-3.5 rounded-full text-[15px] font-bold hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>View WordPress Projects</span>
                  <ArrowRight className="w-4 h-4 text-[#D57C63]" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="wp-btn-tertiary px-6 py-3.5 rounded-full text-[15px] font-bold hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <span>Contact Me</span>
                </button>
              </div>

              {/* Hero Keywords (Section 1) */}
              <div className="anim-up-5 pt-6 border-t border-[var(--line)]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#D57C63] mb-3">
                  Core Expertise Keywords:
                </div>
                <div className="flex flex-wrap gap-2">
                  {heroKeywords.map((kw, kwIdx) => (
                    <span
                      key={kwIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold wp-pill shadow-xs hover:scale-105 transition-all cursor-default"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: 3D Tilting Stage with Portrait & WordPress Badges */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center">
              <div
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                className="reveal-up hero-reveal relative w-full max-w-[460px] cursor-pointer"
                style={{ perspective: '1100px' }}
              >
                <div
                  ref={heroCardRef}
                  className="wp-profile-stage relative rounded-[32px] p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden"
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                >
                  {/* Glowing Accents */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#D57C63]/25 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#ff7a1a]/18 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#b85c43]/18 rounded-full blur-2xl pointer-events-none" />

                  {/* Circular Rotating Orbit Ring */}
                  <div
                    className="absolute inset-5 rounded-full border border-dashed border-[#D57C63]/35 pointer-events-none animate-spin-slower"
                    style={{ transform: 'translateZ(-10px)' }}
                  />

                  {/* Floating Badge 1: Elementor Expert */}
                  <div
                    className="wp-float-badge wp-float-badge-1 absolute top-4 left-4 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D57C63] animate-ping" />
                    <span className="text-xs font-extrabold text-[#D57C63]">
                      ⚡ Elementor Pro Expert
                    </span>
                  </div>

                  {/* Floating Badge 2: WooCommerce Ready */}
                  <div
                    className="wp-float-badge wp-float-badge-2 absolute top-4 right-4 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <ShoppingCart className="w-4 h-4 text-[#D57C63]" />
                    <span className="text-xs font-extrabold">
                      WooCommerce Stores
                    </span>
                  </div>

                  {/* Rahila Kareem WordPress Designer Portrait */}
                  <div
                    className="relative z-10 w-full flex items-center justify-center pt-8 pb-3"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <img
                      itemProp="image"
                      src={fullstackProfileImg}
                      alt="Rahila Kareem - WordPress Designer | Elementor & WooCommerce"
                      className="wp-profile-img-breathe w-auto h-[340px] sm:h-[400px] lg:h-[430px] object-contain select-none pointer-events-none filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)]"
                      loading="eager"
                    />
                  </div>

                  {/* Floating Badge 3: 100% Responsive */}
                  <div
                    className="wp-float-badge wp-float-badge-3 absolute bottom-16 left-3 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#D57C63]" />
                    <span className="text-[11.5px] font-bold">
                      100% Mobile Responsive
                    </span>
                  </div>

                  {/* Floating Badge 4: Speed & SEO */}
                  <div
                    className="wp-float-badge wp-float-badge-4 absolute bottom-16 right-3 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D57C63]" />
                    <span className="text-[11.5px] font-bold">
                      Speed &amp; SEO Tuned
                    </span>
                  </div>

                  {/* Bottom Pedestal Tag */}
                  <div
                    className="wp-pedestal-bar mt-2 px-5 py-2 rounded-xl text-center z-10 backdrop-blur-md"
                    style={{ transform: 'translateZ(35px)' }}
                  >
                    <span className="font-heading font-black text-xs sm:text-sm tracking-wider uppercase text-[#D57C63]">
                      Rahila Kareem • WordPress Designer &amp; WooCommerce Specialist
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. ABOUT WORDPRESS SECTION */}
        {/* ======================================================== */}
        <section className="mb-24 sm:mb-32 lg:mb-36">
          <div className="reveal-up wp-card p-8 sm:p-14 rounded-[32px] relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full wp-badge text-xs font-bold uppercase tracking-wider mb-4">
                <Palette className="w-3.5 h-3.5 text-[#D57C63]" />
                <span>About My WordPress Approach</span>
              </div>
              <h2 className="font-heading font-extrabold text-[28px] sm:text-[40px] leading-tight wp-heading mb-6">
                WordPress Designer Creating Websites That Work for Your Business
              </h2>
              <p className="text-[16px] sm:text-[18px] leading-[1.8] wp-body mb-6">
                I specialize in designing and customizing WordPress websites for businesses, professionals, and online stores. My focus is on creating attractive layouts, smooth navigation, mobile-friendly experiences, and manageable websites tailored to each client's needs.
              </p>
              <p className="text-[16px] sm:text-[18px] leading-[1.8] wp-body">
                Whether you need a new business website, a landing page, an e-commerce store, or improvements to an existing website, I can help you build a professional online presence.
              </p>
            </div>

            {/* 4 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 pt-8 border-t border-[var(--line)]">
              <div className="p-5 rounded-2xl wp-node-card">
                <Layout className="w-6 h-6 text-[#D57C63] mb-2.5" />
                <h4 className="font-bold text-base wp-heading mb-1">Attractive Layouts</h4>
                <p className="text-xs wp-subtext leading-relaxed">
                  Bespoke, brand-tailored designs built with modern Elementor &amp; Gutenberg standards.
                </p>
              </div>

              <div className="p-5 rounded-2xl wp-node-card">
                <Smartphone className="w-6 h-6 text-[#D57C63] mb-2.5" />
                <h4 className="font-bold text-base wp-heading mb-1">Mobile Responsiveness</h4>
                <p className="text-xs wp-subtext leading-relaxed">
                  Smooth navigation and pixel-perfect scaling across phones, tablets, and desktops.
                </p>
              </div>

              <div className="p-5 rounded-2xl wp-node-card">
                <ShoppingCart className="w-6 h-6 text-[#D57C63] mb-2.5" />
                <h4 className="font-bold text-base wp-heading mb-1">E-Commerce Ready</h4>
                <p className="text-xs wp-subtext leading-relaxed">
                  WooCommerce stores with cart, checkout, payments, and product variations.
                </p>
              </div>

              <div className="p-5 rounded-2xl wp-node-card">
                <Settings className="w-6 h-6 text-[#D57C63] mb-2.5" />
                <h4 className="font-bold text-base wp-heading mb-1">Easy Client Editing</h4>
                <p className="text-xs wp-subtext leading-relaxed">
                  Zero coding required to add products, edit text, update photos, or publish blogs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. WORDPRESS SERVICES SECTION (7 SERVICES) */}
        {/* ======================================================== */}
        <section id="wordpress-services" className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full wp-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Full-Spectrum WordPress Solutions</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight wp-heading mb-4">
              WordPress Design &amp; Development Services
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed wp-body">
              Complete design, customization, WooCommerce setup, and performance services crafted to achieve real business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wordPressServices.map((srv, idx) => {
              const ServiceIcon = srv.icon;
              return (
                <div
                  key={srv.id}
                  itemScope
                  itemType="https://schema.org/Service"
                  className="reveal-up wp-card p-7 sm:p-9 flex flex-col justify-between"
                  style={{ transitionDelay: `${(idx % 3) * 110}ms` }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-heading font-black text-3xl wp-number">
                        {srv.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-[#D57C63]/15 flex items-center justify-center text-[#D57C63]">
                        <ServiceIcon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 itemProp="name" className="font-heading font-extrabold text-2xl wp-heading mb-2.5">
                      {srv.title}
                    </h3>

                    <p className="text-[14px] font-bold text-[#D57C63] mb-3.5 leading-snug">
                      {srv.shortDesc}
                    </p>

                    <p itemProp="description" className="text-[14.5px] leading-relaxed wp-body mb-6">
                      {srv.longDesc}
                    </p>

                    <ul className="space-y-2.5 mb-7">
                      {srv.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-bold wp-bullet">
                          <Check className="w-4 h-4 text-[#D57C63] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 border-t border-[var(--line)]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#8a776a] mb-2">
                      Keywords Covered:
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {srv.keywords.map((k, kIdx) => (
                        <span
                          key={kIdx}
                          className="wp-pill px-2.5 py-1 rounded-md text-[11px] font-bold"
                        >
                          {k}
                        </span>
                      ))}
                    </div>

                    <a
                      href={personalInfo.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl wp-btn-service font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
                    >
                      <span>Inquire for {srv.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. WORDPRESS PRICING PLANS */}
        {/* ======================================================== */}
        <section id="wordpress-pricing" className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full wp-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <Zap className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Affordable Website Packages</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight wp-heading mb-4">
              Affordable WordPress Website Packages
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed wp-body">
              Choose a package based on your website requirements.
            </p>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {wordPressPricingPlans.map((plan, idx) => (
              <div
                key={plan.id}
                itemScope
                itemType="https://schema.org/Offer"
                className={`reveal-up wp-card p-8 sm:p-9 relative flex flex-col justify-between ${
                  plan.popular
                    ? 'border-[#D57C63] shadow-[0_0_40px_rgba(213,124,99,0.35)]'
                    : ''
                }`}
                style={{ transitionDelay: `${idx * 130}ms` }}
              >
                <meta itemProp="priceCurrency" content="USD" />
                <meta itemProp="price" content={plan.price.replace('$', '')} />
                <meta itemProp="availability" content="https://schema.org/InStock" />
                <link itemProp="url" href="https://rahilakareem.com/#wordpress-pricing" />

                {plan.popular && (
                  <span className="absolute -top-3.5 right-6 rtl:right-auto rtl:left-6 bg-gradient-to-r from-[#D57C63] to-[#e89078] text-white font-extrabold text-xs px-4 py-1 rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="wp-badge px-3 py-1 rounded-full text-xs font-bold">
                      {plan.delivery}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D57C63]">
                      {plan.tier}
                    </span>
                  </div>

                  <h3 itemProp="name" className="font-heading font-extrabold text-2xl wp-heading mb-2">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="font-heading font-extrabold text-[42px] text-[#D57C63]">
                      {plan.price}
                    </span>
                    <span className="text-xs font-bold wp-subtext">{plan.unit}</span>
                  </div>

                  <p className="text-xs wp-subtext mb-5 leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="pt-4 border-t border-[var(--line)] mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] wp-bullet leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (setSelectedPlan) {
                      setSelectedPlan(`${plan.tier} - ${plan.name} (${plan.price})`);
                    }
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full py-3.5 px-6 rounded-full text-sm sm:text-base font-bold transition-all cursor-pointer ${
                    plan.popular
                      ? 'glow-btn'
                      : 'wp-btn-secondary hover:border-[#D57C63]'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Pricing Disclaimer Note (from specification Section 4) */}
          <div className="reveal-up mt-8 p-5 rounded-2xl bg-[#1b1410] border border-[#38261b] text-center max-w-3xl mx-auto">
            <p className="text-xs sm:text-[13px] wp-subtext leading-relaxed">
              <strong>Pricing note:</strong> Domain, hosting, premium themes/plugins, paid subscriptions, and extensive custom functionality are charged separately. Final scope and delivery time should be agreed before starting.
            </p>
          </div>

          {/* Bidirectional Linking Banner */}
          <div className="reveal-up mt-14 p-8 sm:p-10 rounded-[28px] wp-node-card flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-[#D57C63]/30">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Explore Other Service Offerings</span>
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl wp-heading mb-2">
                Need Full Stack JavaScript Apps or SEO Specialist Growth?
              </h3>
              <p className="text-sm sm:text-[15px] wp-body max-w-2xl leading-relaxed">
                Explore our dedicated MERN Stack web development page ($180, $350, $550+) or our dedicated SEO Specialist page ($40, $60, $100).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('fullstack');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="glow-btn px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Full Stack Page</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('seo');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="wp-btn-secondary px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer"
              >
                <span>SEO Page</span>
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. WORDPRESS TOOLS & PLATFORMS */}
        {/* ======================================================== */}
        <section className="reveal-up mb-24 sm:mb-32 lg:mb-36 p-8 sm:p-14 wp-card">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#D57C63] block mb-1">
              • Tools I Work With •
            </span>
            <h2 className="font-heading font-extrabold text-[28px] sm:text-[36px] wp-heading mt-1 mb-3.5">
              Tools I Work With
            </h2>
            <p className="text-[15.5px] sm:text-[17px] wp-body">
              Industry standard builders, plugins, and hosting platforms for robust WordPress delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wordPressTools.map((tool, idx) => (
              <div
                key={idx}
                className="wp-node-card p-5 rounded-2xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#D57C63] uppercase tracking-wider">
                    {tool.category}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#D57C63]" />
                </div>
                <h4 className="font-extrabold text-base wp-heading mb-1">{tool.name}</h4>
                <p className="text-xs wp-subtext leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. WORDPRESS SKILLS & TECHNOLOGIES MATRIX */}
        {/* ======================================================== */}
        <section className="reveal-up mb-24 sm:mb-32 lg:mb-36">
          <div className="wp-node-card p-8 sm:p-12 rounded-[28px] border-2 border-[#D57C63]/20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full wp-badge text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Core Competencies</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl wp-heading mb-4">
              My WordPress Skills
            </h2>
            <p className="text-sm sm:text-base wp-body max-w-2xl mx-auto mb-8">
              Practical capabilities applied across business websites, WooCommerce shops, and speed optimization.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
              {wordPressSkills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold wp-pill shadow-xs hover:scale-105 transition-all cursor-default"
                >
                  ⚡ {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 7. WORDPRESS PROJECTS SECTION */}
        {/* ======================================================== */}
        <section id="wordpress-projects" className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full wp-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <Layout className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Recent Client Work</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight wp-heading mb-4">
              Recent WordPress Website Projects
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed wp-body">
              Explore website designs, business websites, landing pages, online stores, and WordPress customization projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wordPressProjects.map((proj, idx) => (
              <div
                key={proj.id}
                itemScope
                itemType="https://schema.org/CreativeWork"
                className="reveal-up wp-card p-8 sm:p-9 flex flex-col justify-between"
                style={{ transitionDelay: `${idx * 110}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="wp-badge px-3 py-1 rounded-full text-xs font-bold">
                      {proj.badge}
                    </span>
                    <span className="text-xs font-bold text-[#D57C63]">
                      {proj.label}
                    </span>
                  </div>

                  <h3 itemProp="name" className="font-heading font-extrabold text-xl sm:text-2xl wp-heading mb-3">
                    {proj.title}
                  </h3>

                  <p itemProp="description" className="text-[14.5px] leading-relaxed wp-body mb-6">
                    {proj.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#8a776a]">
                      Key Deliverables:
                    </div>
                    {proj.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs font-semibold wp-bullet">
                        <Check className="w-3.5 h-3.5 text-[#D57C63] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="text-xs font-bold wp-subtext">{proj.metric}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (setSelectedPlan) setSelectedPlan(`WordPress Inquiry: ${proj.title}`);
                      setActiveTab('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#D57C63] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Similar Project</span> &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8. WORDPRESS FAQ SECTION (GOOGLE FAQ SCHEMA COMPLIANT) */}
        {/* ======================================================== */}
        <section
          id="wordpress-faq"
          itemScope
          itemType="https://schema.org/FAQPage"
          className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28"
        >
          <div className="reveal-up text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full wp-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>WordPress Design FAQs</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight wp-heading mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed wp-body">
              Everything you need to know about our WordPress website design, Elementor layouts, WooCommerce, and setup terms.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {wordPressFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.id}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  className="reveal-up wp-card rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ transitionDelay: `${idx * 70}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-6 sm:p-7 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-[#D57C63]/5 transition-colors"
                  >
                    <span
                      itemProp="name"
                      className="font-heading font-extrabold text-base sm:text-lg wp-heading pr-2"
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-[#D57C63]/15 flex items-center justify-center text-[#D57C63] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#D57C63] text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                      className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 border-t border-[var(--line)]"
                    >
                      <p
                        itemProp="text"
                        className="text-sm sm:text-[15px] wp-body leading-relaxed"
                      >
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 9. FINAL CALL TO ACTION BANNER */}
        {/* ======================================================== */}
        <section className="reveal-up p-10 sm:p-16 rounded-[32px] bg-gradient-to-r from-[#D57C63] to-[#b85b42] text-white text-center relative overflow-hidden shadow-[0_24px_60px_rgba(213,124,99,0.42)]">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/12 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-[32px] sm:text-[44px] leading-tight mb-5 text-white">
              Need a Professional WordPress Website?
            </h2>
            <p className="text-white/95 text-base sm:text-lg mb-9 leading-relaxed font-medium">
              Let's build a responsive, user-friendly WordPress website that fits your business goals and brand identity. I can help with new websites, Elementor design, WooCommerce stores, website redesigns, and WordPress customization.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#wordpress-pricing"
                className="px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-base font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2.5 cursor-pointer text-[#b85c43]"
              >
                <Layout className="w-5 h-5 text-[#b85c43]" />
                <span>Hire Me</span>
              </a>

              <a
                href="#wordpress-projects"
                className="px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white/15 text-base font-bold transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-1"
              >
                <span>View WordPress Projects</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full bg-black/30 hover:bg-black/50 border border-white/30 text-white text-base font-bold transition-all cursor-pointer hover:-translate-y-1"
              >
                <span>Contact Me</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* High-Contrast CSS for Day & Night Modes */}
      <style>{wpCss}</style>
    </div>
  );
}

const wpCss = `
/* ==========================================================
   DOWN-TO-UP REVEAL ANIMATIONS
   ========================================================== */
.reveal-up {
  opacity: 0;
  transform: translateY(55px);
  transition: opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.reveal-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes heroTextRevealUp {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.anim-up-1 {
  animation: heroTextRevealUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
.anim-up-2 {
  animation: heroTextRevealUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
}
.anim-up-3 {
  animation: heroTextRevealUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
}
.anim-up-4 {
  animation: heroTextRevealUp 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.75s both;
}
.anim-up-5 {
  animation: heroTextRevealUp 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1.0s both;
}

@keyframes slideUpTitle {
  0% {
    opacity: 0;
    transform: translateY(36px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.anim-title-slide {
  animation: slideUpTitle 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* ==========================================================
   NIGHT / MOON MODE (Default)
   ========================================================== */
.wp-heading {
  color: #ffffff !important;
}

.wp-body {
  color: #dcd0c4 !important;
}

.wp-subtext {
  color: #c9b9ac !important;
}

.wp-bullet {
  color: #f0e6dc !important;
}

.wp-number {
  color: #7a6659 !important;
}

.wp-card {
  background: #18110e;
  border: 1.5px solid #3d2b20;
  border-bottom: 4px solid #D57C63;
  border-radius: 28px;
  box-shadow: 0 16px 45px -8px rgba(0, 0, 0, 0.7), 0 0 25px rgba(213, 124, 99, 0.16);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
}

.wp-card:hover {
  transform: translateY(-8px) scale(1.012);
  border-color: #D57C63;
  box-shadow: 0 24px 55px -10px rgba(213, 124, 99, 0.38);
}

.wp-card:hover .wp-heading {
  color: #D57C63 !important;
}

.wp-card:hover .wp-number {
  color: #D57C63 !important;
}

.wp-node-card {
  background: #130d0a;
  border: 1.5px solid #33241b;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.wp-node-card:hover {
  border-color: #D57C63;
}

.wp-pill {
  background: #231813;
  border: 1.2px solid #422d22;
  color: #f7ede3;
}

.wp-pill:hover {
  border-color: #D57C63;
  color: #D57C63;
}

.wp-badge {
  background: rgba(213, 124, 99, 0.15);
  border: 1.5px solid rgba(213, 124, 99, 0.45);
  color: #D57C63;
}

.wp-profile-stage {
  background: linear-gradient(155deg, rgba(28, 19, 15, 0.95) 0%, rgba(18, 12, 9, 0.98) 100%);
  border: 2px solid rgba(213, 124, 99, 0.35);
  border-bottom: 5px solid #D57C63;
  border-radius: 32px;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(213, 124, 99, 0.22);
}

.wp-profile-stage:hover {
  border-color: #D57C63;
  box-shadow: 0 28px 75px -10px rgba(213, 124, 99, 0.45);
}

.wp-float-badge {
  background: rgba(24, 17, 14, 0.92);
  border: 1.5px solid rgba(213, 124, 99, 0.45);
  color: #f7ede3;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.wp-float-badge-1 {
  animation: floatSlow1 3.5s ease-in-out infinite alternate;
}
.wp-float-badge-2 {
  animation: floatSlow2 4.2s ease-in-out infinite alternate 0.4s;
}
.wp-float-badge-3 {
  animation: floatSlow3 3.8s ease-in-out infinite alternate 0.8s;
}
.wp-float-badge-4 {
  animation: floatSlow4 4.5s ease-in-out infinite alternate 1.2s;
}

.wp-pedestal-bar {
  background: rgba(213, 124, 99, 0.15);
  border: 1.5px solid rgba(213, 124, 99, 0.4);
}

@keyframes floatSlow1 {
  0% { transform: translateY(0px) translateZ(45px); }
  100% { transform: translateY(-10px) translateZ(45px); }
}

@keyframes floatSlow2 {
  0% { transform: translateY(0px) translateZ(45px); }
  100% { transform: translateY(-12px) translateZ(45px); }
}

@keyframes floatSlow3 {
  0% { transform: translateY(0px) translateZ(45px); }
  100% { transform: translateY(-9px) translateZ(45px); }
}

@keyframes floatSlow4 {
  0% { transform: translateY(0px) translateZ(45px); }
  100% { transform: translateY(-11px) translateZ(45px); }
}

@keyframes profileBreathe {
  0% { transform: translateY(0px) scale(1); }
  100% { transform: translateY(-6px) scale(1.015); }
}

.wp-profile-img-breathe {
  animation: profileBreathe 4.5s ease-in-out infinite alternate;
}

.animate-spin-slower {
  animation: spinSlower 32s linear infinite;
}

@keyframes spinSlower {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.wp-btn-back,
.wp-btn-secondary {
  background: #18110e;
  border: 1.5px solid #3d2b20;
  color: #f7ede3;
}

.wp-btn-back:hover,
.wp-btn-secondary:hover {
  border-color: #D57C63;
  color: #D57C63;
}

.wp-btn-tertiary {
  background: transparent;
  border: 1.5px solid #3d2b20;
  color: #f7ede3;
}

.wp-btn-tertiary:hover {
  background: #18110e;
  border-color: #D57C63;
}

.wp-btn-service {
  background: #130d0a;
  border: 1.5px solid #33241b;
  color: #f7ede3;
}

.wp-btn-service:hover {
  background: #D57C63;
  border-color: #D57C63;
  color: #ffffff;
}

/* ==========================================================
   DAY / LIGHT MODE HIGH CONTRAST OVERRIDES
   ========================================================== */
:root[data-theme="light"] .wp-heading {
  color: #0f0905 !important;
}

:root[data-theme="light"] .wp-body {
  color: #1f140c !important;
  font-weight: 500 !important;
}

:root[data-theme="light"] .wp-subtext {
  color: #3d2c20 !important;
  font-weight: 600 !important;
}

:root[data-theme="light"] .wp-bullet {
  color: #140d07 !important;
  font-weight: 600 !important;
}

:root[data-theme="light"] .wp-number {
  color: #b09e91 !important;
}

:root[data-theme="light"] .wp-card {
  background: #ffffff !important;
  border: 1.5px solid #decbb8 !important;
  border-bottom: 4px solid #cf5208 !important;
  border-radius: 28px !important;
  box-shadow: 0 12px 36px -6px rgba(0, 0, 0, 0.09), 0 4px 14px -2px rgba(207, 82, 8, 0.08) !important;
}

:root[data-theme="light"] .wp-card:hover {
  transform: translateY(-8px) scale(1.012) !important;
  border-color: #cf5208 !important;
  box-shadow: 0 24px 52px -8px rgba(207, 82, 8, 0.24) !important;
}

:root[data-theme="light"] .wp-card:hover .wp-heading,
:root[data-theme="light"] .wp-card:hover .wp-number {
  color: #cf5208 !important;
}

:root[data-theme="light"] .wp-node-card {
  background: #faf4ee !important;
  border: 1.5px solid #e2d2c1 !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04) !important;
}

:root[data-theme="light"] .wp-node-card:hover {
  border-color: #cf5208 !important;
}

:root[data-theme="light"] .wp-pill {
  background: #f7eee4 !important;
  border: 1.5px solid #d8c3af !important;
  color: #180e07 !important;
  font-weight: 700 !important;
}

:root[data-theme="light"] .wp-pill:hover {
  border-color: #cf5208 !important;
  color: #cf5208 !important;
  background: #fdf5ef !important;
}

:root[data-theme="light"] .wp-badge {
  background: #fbeee5 !important;
  border: 1.5px solid #dcbfa8 !important;
  color: #9c3305 !important;
  font-weight: 700 !important;
}

:root[data-theme="light"] .wp-profile-stage {
  background: linear-gradient(155deg, #ffffff 0%, #fff7f2 100%) !important;
  border: 2px solid #decbb8 !important;
  border-bottom: 5px solid #cf5208 !important;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.12), 0 4px 20px rgba(207, 82, 8, 0.12) !important;
}

:root[data-theme="light"] .wp-profile-stage:hover {
  border-color: #cf5208 !important;
  box-shadow: 0 28px 65px -10px rgba(207, 82, 8, 0.28) !important;
}

:root[data-theme="light"] .wp-float-badge {
  background: rgba(255, 255, 255, 0.96) !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}

:root[data-theme="light"] .wp-pedestal-bar {
  background: #fdf2e9 !important;
  border: 1.5px solid #dcbfa8 !important;
  color: #140d07 !important;
}

:root[data-theme="light"] .wp-btn-back,
:root[data-theme="light"] .wp-btn-secondary {
  background: #ffffff !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
}

:root[data-theme="light"] .wp-btn-back:hover,
:root[data-theme="light"] .wp-btn-secondary:hover {
  border-color: #cf5208 !important;
  color: #cf5208 !important;
}

:root[data-theme="light"] .wp-btn-tertiary {
  background: transparent !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
}

:root[data-theme="light"] .wp-btn-tertiary:hover {
  background: #faf4ee !important;
  border-color: #cf5208 !important;
}

:root[data-theme="light"] .wp-btn-service {
  background: #faf4ee !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
  font-weight: 700 !important;
}

:root[data-theme="light"] .wp-btn-service:hover {
  background: #cf5208 !important;
  border-color: #cf5208 !important;
  color: #ffffff !important;
}
`;
