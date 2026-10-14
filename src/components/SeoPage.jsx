import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  Search,
  Globe,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Check,
  FileText,
  BarChart3,
  LineChart,
  Target,
  Award,
  Star,
  MessageSquare,
  Wrench,
  Settings,
  Layers,
  HelpCircle,
  Eye,
  CheckCheck,
  Compass,
  X,
  ZoomIn
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import fullstackProfileImg from '../assets/fullstack-profile.png';

// Dynamic titles that cycle with a smooth down-to-up slide animation
const alternativeTitles = [
  '| SEO Specialist & Consultant',
  '| High DA Guest Posting & Backlinks',
  '| GBOB & Blogger Outreach Specialist',
  '| Off-Page High Authority Backlinks',
  '| On-Page & Technical SEO Specialist',
  '| Niche-Relevant Link Building (DA 40-80+)',
  '| Driving Organic Google Rankings'
];

// Core Hero Keywords (from specification Section 1 + High DA Guest Posting & GBOB)
const heroKeywords = [
  'SEO Specialist',
  'High DA Guest Posting',
  'GBOB Specialist',
  'Off-Page Backlinks',
  'Keyword Research',
  'On-Page SEO',
  'Technical SEO',
  'Website Audit',
  'Schema Markup',
  'Organic Traffic',
  'Search Engine Optimization'
];

// Core SEO Skills & Keywords Matrix (from specification Section 6)
const coreSeoSkills = [
  'Search Engine Optimization',
  'Keyword Research',
  'On-Page SEO',
  'Technical SEO',
  'Off-Page SEO',
  'SEO Audit',
  'Competitor Analysis',
  'Content Optimization',
  'Schema Markup',
  'Internal Linking',
  'Image SEO',
  'Google Search Console',
  'Local SEO',
  'Guest Posting',
  'Link Building',
  'GBOB'
];

// 7 Complete SEO Services (from specification Section 3)
const seoServices = [
  {
    id: 'keyword-research',
    number: '01',
    title: 'Keyword Research',
    icon: Search,
    shortDesc: 'Find high-intent keywords that connect with real prospective buyers.',
    longDesc:
      'Find relevant keywords based on search intent, competition, and business goals to help guide your website content strategy and target high-converting search queries.',
    keywords: ['Keyword Research', 'Long-Tail Keywords', 'Search Intent', 'Competitor Keywords'],
    features: [
      'Search intent mapping (Informational vs Commercial)',
      'Long-tail & low-competition keyword discovery',
      'Competitor keyword gap analysis',
      'Content strategy & topic cluster guidance'
    ]
  },
  {
    id: 'onpage-seo',
    number: '02',
    title: 'On-Page SEO',
    icon: FileText,
    shortDesc: 'Structure every page element to satisfy Google algorithms & users.',
    longDesc:
      'Optimize page titles, meta descriptions, headings, URLs, images, and internal links to improve page structure, search crawl relevance, and user engagement.',
    keywords: ['On-Page SEO', 'Meta Tags', 'Title Tags', 'Heading Optimization', 'Internal Linking'],
    features: [
      'Compelling title tags & click-optimized meta descriptions',
      'Semantic H1, H2, H3 heading structure hierarchy',
      'SEO-friendly, clean URL slug architecture',
      'Strategic internal linking & breadcrumb navigation'
    ]
  },
  {
    id: 'technical-seo',
    number: '03',
    title: 'Technical SEO',
    icon: Wrench,
    shortDesc: 'Eliminate crawl barriers and optimize Core Web Vitals speed.',
    longDesc:
      'Identify technical issues affecting crawling, indexing, site structure, mobile usability, and website performance to ensure search engines index your pages seamlessly.',
    keywords: ['Technical SEO', 'Crawlability', 'Indexing', 'XML Sitemap', 'Robots.txt', 'Core Web Vitals'],
    features: [
      'Crawlability & indexing error diagnostics',
      'XML sitemap validation & Robots.txt directives',
      'Core Web Vitals performance & speed auditing',
      'Canonical tags & duplicate content resolution'
    ]
  },
  {
    id: 'website-audit',
    number: '04',
    title: 'Website SEO Audit',
    icon: BarChart3,
    shortDesc: 'Uncover hidden technical issues and optimization growth levers.',
    longDesc:
      'Review website SEO health, find optimization opportunities, and provide actionable recommendations based on rigorous audit findings and competitor benchmarks.',
    keywords: ['SEO Audit', 'Website Analysis', 'SEO Errors', 'Competitor Analysis', 'SEO Reporting'],
    features: [
      '30+ Point comprehensive technical site audit',
      'Broken link & redirect chain detection',
      'Competitor backlink & on-page benchmarking',
      'Prioritized, actionable fix-it recommendations report'
    ]
  },
  {
    id: 'schema-markup',
    number: '05',
    title: 'Schema Markup',
    icon: Layers,
    shortDesc: 'Add structured JSON-LD data to unlock rich Google SERP snippets.',
    longDesc:
      'Add relevant structured data, where appropriate, to help search engines understand your website content and qualify for rich search snippets and knowledge graph cards.',
    keywords: ['Schema Markup', 'Structured Data', 'JSON-LD', 'FAQ Schema', 'Organization Schema', 'Product Schema'],
    features: [
      'JSON-LD structured data implementation',
      'Organization, Person, & WebSite schema modeling',
      'FAQPage schema for expandable Google accordions',
      'Google Rich Results validation & testing'
    ]
  },
  {
    id: 'image-seo',
    number: '06',
    title: 'Image SEO & Content Optimization',
    icon: Eye,
    shortDesc: 'Ensure every image and paragraph contributes to search ranking.',
    longDesc:
      'Optimize image alt text, filenames, image size, and content structure to support accessibility, usability, Google Image search discovery, and overall website SEO.',
    keywords: ['Image SEO', 'Alt Text', 'Content Optimization', 'SEO Content', 'Image Compression'],
    features: [
      'Descriptive, keyword-rich image ALT attributes',
      'File size compression & modern WebP formatting',
      'Content readability & keyword density balancing',
      'Search accessibility compliance & image sitemaps'
    ]
  },
  {
    id: 'guest-posting-gbob',
    number: '07',
    title: 'High DA Guest Posting & GBOB Outreach',
    icon: Globe,
    shortDesc: 'Build domain authority through authoritative blogger outreach.',
    longDesc:
      'Direct outreach on verified high Domain Authority (DA 40+ to 80+) publisher websites. Securing natural, permanent DoFollow contextual article backlinks that pass link equity and drive targeted referral traffic.',
    keywords: ['Guest Posting', 'GBOB', 'Blogger Outreach', 'High DA Sites', 'Editorial Backlinks', 'Contextual Links'],
    features: [
      'Manual outreach on niche-relevant DA 40+ to 80+ blogs',
      '100% natural DoFollow in-content placements',
      'Zero PBNs, zero link farms — only real organic traffic blogs',
      'High-quality niche-specific article creation & pitching'
    ]
  },
  {
    id: 'offpage-seo',
    number: '08',
    title: 'Off-Page SEO & High Authority Backlinks',
    icon: TrendingUp,
    shortDesc: 'Strengthen off-page signals and safeguard backlink profiles.',
    longDesc:
      'Support website authority through competitor backlink gap analysis, anchor text ratio diversification, high-authority backlink acquisition, and regular toxic link auditing to ensure Google algorithm compliance.',
    keywords: ['Off-Page SEO', 'Backlink Building', 'Contextual Backlinks', 'High DR Links', 'Anchor Text Strategy', 'Link Audit'],
    features: [
      'In-depth competitor backlink gap analysis',
      'Natural anchor text profile distribution (Penguin-safe)',
      'High Domain Rating (DR) & Trust Flow link building',
      'Toxic spam backlink detection & Google Disavow guidance'
    ]
  }
];

// Exact SEO Pricing Plans (from specification Section 4)
const seoPricingPlans = [
  {
    id: 'seo-basic',
    tier: 'BASIC',
    name: 'SEO Starter Plan',
    price: '$40',
    unit: '/ project',
    delivery: '3-Day Delivery',
    popular: false,
    badge: 'Starter Plan',
    features: [
      'Website SEO audit',
      'Keyword research — up to 10 keywords',
      'On-page SEO — up to 3 pages',
      'Meta title and description optimization',
      'Image alt text optimization',
      'Heading structure review',
      'Basic off-page backlink profile check',
      '3 revisions'
    ],
    buttonText: 'Get Started'
  },
  {
    id: 'seo-standard',
    tier: 'STANDARD',
    name: 'Complete On-Page SEO & Backlinks',
    price: '$60',
    unit: '/ project',
    delivery: '5-Day Delivery',
    popular: true,
    badge: 'Most Popular / Recommended',
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
    ],
    buttonText: 'Choose Plan'
  },
  {
    id: 'seo-premium',
    tier: 'PREMIUM',
    name: 'Advanced Website SEO & Authority Backlinks',
    price: '$100',
    unit: '/ project',
    delivery: '7-Day Delivery',
    popular: false,
    badge: 'Advanced Suite',
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
    ],
    buttonText: 'Get Started'
  }
];

// SEO Tools & Technologies (from specification Section 5)
const seoTools = [
  { name: 'Google Search Console', desc: 'Indexing, search queries & crawl tracking', category: 'Google Suite' },
  { name: 'Google Analytics 4', desc: 'Organic traffic, bounce rates & user journeys', category: 'Google Suite' },
  { name: 'Google PageSpeed Insights', desc: 'Core Web Vitals & performance metrics', category: 'Google Suite' },
  { name: 'Google Keyword Planner', desc: 'Search volumes & competitive bidding insight', category: 'Google Suite' },
  { name: 'Google Rich Results Test', desc: 'Structured data & rich snippet verification', category: 'Google Suite' },
  { name: 'Google Schema Markup Validator', desc: 'JSON-LD syntax & schema integrity checks', category: 'Google Suite' },
  { name: 'Screaming Frog SEO Spider', desc: 'Deep website crawling, broken links & redirects', category: 'Crawling' },
  { name: 'Ahrefs', desc: 'Backlink profiles, keyword research & organic reach', category: 'Intelligence' },
  { name: 'Semrush', desc: 'Competitive research & search volume metrics', category: 'Intelligence' },
  { name: 'Moz & SEOquake', desc: 'Domain Authority & on-page browser auditing', category: 'Auditing' },
  { name: 'Yoast SEO', desc: 'WordPress content analysis & XML sitemaps', category: 'CMS SEO' },
  { name: 'Rank Math', desc: 'Advanced WordPress SEO & Schema automation', category: 'CMS SEO' }
];

// 5 SEO Practice & Live Projects (from specification Section 7)
const seoProjects = [
  {
    id: 'proj-audit',
    title: 'Website SEO Audit & Action Plan',
    category: 'SEO Audit',
    badge: 'Comprehensive Audit',
    label: 'Practice & Live Project',
    description:
      'Identified critical technical SEO issues including broken links, missing meta tags, redirect chains, and XML sitemap errors. Provided prioritized step-by-step recommendations for immediate crawlability gains.',
    deliverables: ['30+ Checkpoint Technical Report', 'Error Prioritization Matrix', 'Sitemap Fixes']
  },
  {
    id: 'proj-kw-research',
    title: 'Keyword Research & Search Intent Matrix',
    category: 'Keyword Strategy',
    badge: 'Keyword Intelligence',
    label: 'Keyword Strategy Report',
    description:
      'Organized commercial, informational, and long-tail keywords by relevance, search volume, and competitor difficulty. Mapped keywords to specific landing pages to prevent cannibalization and target buyer intent.',
    deliverables: ['40+ Targeted Keywords', 'Search Intent Classification', 'Page-by-Page Keyword Map']
  },
  {
    id: 'proj-onpage',
    title: 'On-Page SEO & Content Optimization',
    category: 'On-Page SEO',
    badge: 'Content Optimization',
    label: 'On-Page Optimization',
    description:
      'Rewrote page titles and meta descriptions for high click-through rates. Restructured H1-H3 headings, optimized image alt tags, and created strategic internal links to establish clear topical authority.',
    deliverables: ['Click-Optimized Meta Titles', 'Semantic Heading Hierarchy', 'Internal Link Mesh']
  },
  {
    id: 'proj-schema',
    title: 'Schema Markup Implementation & Rich Snippets',
    category: 'Technical SEO',
    badge: 'Structured Data',
    label: 'Schema Implementation',
    description:
      'Engineered and deployed JSON-LD structured data for Organization, Person, WebPage, and FAQPage. Validated code through Google Rich Results Test to unlock rich snippet accordions in search engine results.',
    deliverables: ['Valid JSON-LD Syntax', 'FAQPage Rich Snippets', 'Knowledge Graph Entity']
  },
  {
    id: 'proj-pagespeed',
    title: 'PageSpeed & Core Web Vitals Optimization',
    category: 'Technical Speed',
    badge: 'Core Web Vitals',
    label: 'Performance Tuning',
    description:
      'Analyzed mobile and desktop loading performance with Google PageSpeed Insights. Identified render-blocking CSS/JS, implemented WebP image compression, and reduced Largest Contentful Paint (LCP) time.',
    deliverables: ['90+ PageSpeed Benchmark', 'Compressed Asset Pipeline', 'LCP & CLS Optimization']
  },
  {
    id: 'proj-guest-posting',
    title: 'High DA Guest Posting & Niche Outreach Campaign',
    category: 'Off-Page SEO & GBOB',
    badge: 'Guest Posting & GBOB',
    label: 'Live Outreach Project',
    description:
      'Acquired 15+ contextual DoFollow backlinks on verified DA 50+ to 75+ niche-relevant publications. Managed direct blogger outreach, pitch ideation, content creation, and live link verification with zero PBN exposure.',
    deliverables: ['DA 50+ Niche Placements', 'Contextual In-Content Links', 'Permanent DoFollow Backlinks']
  },
  {
    id: 'proj-backlink-audit',
    title: 'Off-Page High Backlinks & Anchor Text Diversification',
    category: 'Link Building & GBOB',
    badge: 'Authority Backlinks',
    label: 'Authority Building',
    description:
      'Conducted in-depth backlink profile audit, competitor link gap analysis, and deployed a diverse anchor text strategy across trusted editorial sites to safely increase Domain Rating (DR) and organic keyword velocity.',
    deliverables: ['Competitor Link Gap Analysis', 'Brand & Exact Anchor Balance', 'Disavow Audit & Toxic Cleanup']
  }
];

// Comprehensive SEO FAQs (including GBOB and Backlink Authority)
const seoFaqs = [
  {
    id: 1,
    q: 'What is SEO?',
    a: 'SEO stands for Search Engine Optimization. It helps improve a website’s visibility in unpaid (organic) search engine results so prospective clients can easily discover your business when searching for relevant products or services.'
  },
  {
    id: 2,
    q: 'How long does SEO take to show results?',
    a: 'SEO results vary by website condition, competition, content quality, and implementation. Meaningful improvements typically take weeks or months to build momentum, and rankings are not guaranteed as search algorithms continuously evolve.'
  },
  {
    id: 3,
    q: 'Do you provide technical SEO?',
    a: 'Yes, technical SEO checks can cover crawling, indexing, sitemap configuration, robots.txt, canonicalization, mobile usability, and website performance, depending on your selected package.'
  },
  {
    id: 4,
    q: 'Do you provide guest posting and link building?',
    a: 'Yes, outreach and guest-posting services can be discussed separately based on niche relevance, website quality, placement terms, Domain Authority (DA) metrics, and your overall marketing budget.'
  },
  {
    id: 5,
    q: 'Can you guarantee a first-page Google ranking?',
    a: 'No. Search rankings depend on many factors outside any SEO professional’s control, including algorithm updates and competitor activity. I focus on sound, ethical optimization practices and measurable improvements that build long-term value.'
  },
  {
    id: 6,
    q: 'What is GBOB (Guest Blogging Outreach Business) & how does it help?',
    a: 'GBOB stands for Guest Blogging Outreach Business. It is a proven, white-hat link acquisition model where I pitch relevant, high-quality content directly to verified blog owners and website editors in your industry. By placing genuine, contextual DoFollow backlinks within authoritative articles (DA 40+ to 80+), your website gains valuable link juice, domain trust, and direct referral traffic without risking Google spam penalties.'
  },
  {
    id: 7,
    q: 'Are your backlinks permanent, DoFollow, and safe from Google algorithm updates?',
    a: 'Yes, absolutely. Every guest post and backlink secured through my outreach is 100% natural, permanent, in-content, and DoFollow on authentic websites with verified Google organic traffic. I strictly prohibit private blog networks (PBNs), automated link software, and spam directories, ensuring complete compliance with Google Search Essentials and Penguin/SpamBrain guidelines.'
  }
];

export default function SeoPage({ setActiveTab, setSelectedPlan }) {
  const heroCardRef = useRef(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedProofImg, setSelectedProofImg] = useState(null);

  const handleHeroMouseMove = (e) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotY = ((x - centerX) / centerX) * 16;
    const rotX = -((y - centerY) / centerY) * 12;

    heroCardRef.current.style.transition = 'transform 0.08s ease-out';
    heroCardRef.current.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  };

  const handleHeroMouseLeave = () => {
    if (!heroCardRef.current) return;
    heroCardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    heroCardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const titleTimer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % alternativeTitles.length);
    }, 2800);

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

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => observer.observe(el));

    const heroElements = document.querySelectorAll('.hero-reveal');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-visible');
      }, index * 90);
    });

    return () => {
      clearInterval(titleTimer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProofImg(null);
      }
    };
    if (selectedProofImg) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProofImg]);

  return (
    <div
      itemScope
      itemType="https://schema.org/ProfilePage"
      className="page-enter pt-24 sm:pt-32 pb-28 relative overflow-hidden"
    >
      {/* Schema.org Meta Tags for Search Engine Optimization */}
      <meta itemProp="name" content="SEO Specialist | Keyword Research, On-Page & Technical SEO - Rahila Kareem" />
      <meta
        itemProp="description"
        content="Explore SEO services including keyword research, on-page SEO, technical audits, schema markup, website optimization, and guest posting."
      />
      <link itemProp="url" href="https://rahilakareem.com/#seo" />

      {/* Complete Google-Compliant JSON-LD Schema Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["WebPage", "ProfilePage"],
                "@id": "https://rahilakareem.com/#seo",
                "url": "https://rahilakareem.com/#seo",
                "name": "SEO Specialist | Keyword Research, On-Page & Technical SEO - Rahila Kareem",
                "headline": "Improve Your Google Rankings with Smart SEO Strategies",
                "description":
                  "Explore SEO services including keyword research, on-page SEO, technical audits, schema markup, website optimization, and guest posting.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "@id": "https://rahilakareem.com/#website",
                  "name": "Rahila Kareem Portfolio",
                  "url": "https://rahilakareem.com"
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "@id": "https://rahilakareem.com/#seo-breadcrumb",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://rahilakareem.com/#home"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "SEO Specialist & Services",
                      "item": "https://rahilakareem.com/#seo"
                    }
                  ]
                },
                "mainEntity": {
                  "@id": "https://rahilakareem.com/#person"
                },
                "about": [
                  { "@type": "Thing", "name": "Search Engine Optimization" },
                  { "@type": "Thing", "name": "On-Page SEO" },
                  { "@type": "Thing", "name": "Technical SEO" },
                  { "@type": "Thing", "name": "Keyword Research" },
                  { "@type": "Thing", "name": "Schema Markup" },
                  { "@type": "Thing", "name": "Link Building" },
                  { "@type": "Thing", "name": "Guest Posting" }
                ]
              },
              {
                "@type": "Person",
                "@id": "https://rahilakareem.com/#person",
                "name": "Rahila Kareem",
                "givenName": "Rahila",
                "familyName": "Kareem",
                "jobTitle": [
                  "SEO Specialist",
                  "On-Page SEO Expert",
                  "Technical SEO Consultant",
                  "Link Building Specialist",
                  "Guest Posting Strategist"
                ],
                "url": "https://rahilakareem.com",
                "image": "https://rahilakareem.com/fullstack-profile.png",
                "description":
                  "SEO Specialist helping businesses improve website visibility, optimize content, and build a strong organic foundation through keyword research, technical SEO, and data-driven optimization.",
                "telephone": "+923217812265",
                "email": "rahilakareem389@gmail.com",
                "sameAs": [
                  "https://linkedin.com/in/rahila-kareem06b76a31a",
                  "https://www.fiverr.com/s/LdGmqE7",
                  "https://facebook.com/share/1Ahyr7EepM"
                ],
                "knowsAbout": coreSeoSkills,
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "SEO Service Packages & Pricing",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "name": "BASIC - SEO Starter Plan",
                      "price": "40",
                      "priceCurrency": "USD",
                      "availability": "https://schema.org/InStock",
                      "description": "Website SEO audit, keyword research up to 10 keywords, on-page SEO for up to 3 pages, meta titles, image alt text, and 3 revisions.",
                      "url": "https://rahilakareem.com/#seo-pricing"
                    },
                    {
                      "@type": "Offer",
                      "name": "STANDARD - Complete On-Page SEO",
                      "price": "60",
                      "priceCurrency": "USD",
                      "availability": "https://schema.org/InStock",
                      "description": "Website SEO audit, keyword research up to 20 keywords, on-page SEO for up to 5 pages, internal linking, basic schema markup, and 5 revisions.",
                      "url": "https://rahilakareem.com/#seo-pricing"
                    },
                    {
                      "@type": "Offer",
                      "name": "PREMIUM - Advanced Website SEO",
                      "price": "100",
                      "priceCurrency": "USD",
                      "availability": "https://schema.org/InStock",
                      "description": "Comprehensive website SEO audit, keyword research up to 40 keywords, on-page SEO for up to 10 pages, technical SEO checks, XML sitemap/robots.txt, and competitor analysis.",
                      "url": "https://rahilakareem.com/#seo-pricing"
                    }
                  ]
                }
              },
              {
                "@type": "Service",
                "@id": "https://rahilakareem.com/#service-seo-suite",
                "serviceType": "Search Engine Optimization Services",
                "name": "Complete SEO Services for Your Website",
                "description":
                  "Holistic SEO services covering keyword research, on-page SEO, technical audits, schema markup, image optimization, and off-page guest posting outreach.",
                "provider": { "@id": "https://rahilakareem.com/#person" },
                "areaServed": "Worldwide"
              },
              {
                "@type": "FAQPage",
                "@id": "https://rahilakareem.com/#seo-faq-schema",
                "mainEntity": seoFaqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[750px] h-[480px] bg-[#D57C63]/12 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-0 w-[550px] h-[450px] bg-[#D57C63]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[75%] left-0 w-[600px] h-[450px] bg-[#ff7a1a]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="reveal-up hero-reveal flex flex-wrap items-center justify-between gap-4 mb-10 sm:mb-14">
          <button
            type="button"
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="seo-btn-back inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all hover:-translate-x-1 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#D57C63]" />
            <span>Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold seo-subtext">
            <span
              onClick={() => setActiveTab('home')}
              className="hover:text-[#D57C63] cursor-pointer transition-colors"
            >
              Home
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#D57C63] font-bold">SEO Specialist &amp; Services</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. SEO HERO SECTION */}
        {/* ======================================================== */}
        <section
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Person"
          className="mb-24 sm:mb-32 lg:mb-36"
        >
          <meta itemProp="name" content="Rahila Kareem" />
          <meta itemProp="url" content="https://rahilakareem.com/#seo" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading, Bio, Buttons with Down-to-Up Animations */}
            <div className="lg:col-span-7">
              
              {/* Small Heading Badge */}
              <div className="anim-up-1 inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-full seo-badge text-xs sm:text-[13px] font-bold tracking-wide uppercase mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#D57C63]" />
                <span>SEO Specialist | On-Page &amp; Technical SEO | Off-Page Backlinks | High DA Guest Posting &amp; GBOB</span>
              </div>

              {/* Main Heading (H1) with Down-to-Up float */}
              <h1 itemProp="jobTitle" className="anim-up-2 font-heading font-extrabold text-[32px] sm:text-[46px] lg:text-[52px] leading-[1.14] seo-heading mb-6">
                Improve Your Google Rankings with Smart SEO Strategies{' '}
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
              <p itemProp="description" className="anim-up-3 seo-body text-[16px] sm:text-[18px] leading-[1.8] mb-8 max-w-2xl">
                I help businesses improve their website visibility, optimize their content, acquire high DA contextual backlinks, and build an unshakable SEO foundation through keyword research, on-page optimization, technical SEO, GBOB outreach, and data-driven link building.
              </p>

              {/* Hero Buttons */}
              <div className="anim-up-4 flex flex-wrap items-center gap-4 mb-9">
                <a
                  href="#seo-pricing"
                  className="px-7 py-3.5 rounded-full bg-[#D57C63] hover:bg-[#b85c43] text-white text-[15px] font-bold shadow-[0_8px_28px_rgba(213,124,99,0.48)] hover:-translate-y-1 transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span>Get SEO Services</span>
                </a>

                <a
                  href="#seo-projects"
                  className="seo-btn-secondary px-6 py-3.5 rounded-full text-[15px] font-bold hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>View SEO Projects</span>
                  <ArrowRight className="w-4 h-4 text-[#D57C63]" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="seo-btn-tertiary px-6 py-3.5 rounded-full text-[15px] font-bold hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <span>Contact Me</span>
                </button>
              </div>

              {/* Hero Keywords (Section 1) */}
              <div className="anim-up-5 pt-6 border-t border-[var(--line)]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#D57C63] mb-3">
                  Core Focus Keywords:
                </div>
                <div className="flex flex-wrap gap-2">
                  {heroKeywords.map((kw, kwIdx) => (
                    <span
                      key={kwIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold seo-pill shadow-xs hover:scale-105 transition-all cursor-default"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: 3D Tilting Stage with Portrait & Google Ranking Badges */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center">
              <div
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                className="reveal-up hero-reveal relative w-full max-w-[460px] cursor-pointer"
                style={{ perspective: '1100px' }}
              >
                <div
                  ref={heroCardRef}
                  className="seo-profile-stage relative rounded-[32px] p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden"
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                >
                  {/* Glowing Accents */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#D57C63]/25 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#D57C63]/18 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#D57C63]/18 rounded-full blur-2xl pointer-events-none" />

                  {/* Circular Rotating Orbit Ring */}
                  <div
                    className="absolute inset-5 rounded-full border border-dashed border-[#D57C63]/35 pointer-events-none animate-spin-slower"
                    style={{ transform: 'translateZ(-10px)' }}
                  />

                  {/* Floating Badge 1: Top Google Rankings */}
                  <div
                    className="seo-float-badge seo-float-badge-1 absolute top-4 left-4 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D57C63] animate-ping" />
                    <span className="text-xs font-extrabold text-[#D57C63]">
                      ⚡ Google Rank #1
                    </span>
                  </div>

                  {/* Floating Badge 2: On-Page & Technical */}
                  <div
                    className="seo-float-badge seo-float-badge-2 absolute top-4 right-4 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <Search className="w-4 h-4 text-[#D57C63]" />
                    <span className="text-xs font-extrabold">
                      On-Page &amp; Technical
                    </span>
                  </div>

                  {/* Rahila Kareem SEO Specialist Portrait */}
                  <div
                    className="relative z-10 w-full flex items-center justify-center pt-8 pb-3"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <img
                      itemProp="image"
                      src={fullstackProfileImg}
                      alt="Rahila Kareem - SEO Specialist | On-Page & Technical SEO"
                      className="seo-profile-img-breathe w-auto h-[340px] sm:h-[400px] lg:h-[430px] object-contain select-none pointer-events-none filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)]"
                      loading="eager"
                    />
                  </div>

                  {/* Floating Badge 3: 100% Organic Growth */}
                  <div
                    className="seo-float-badge seo-float-badge-3 absolute bottom-16 left-3 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <LineChart className="w-3.5 h-3.5 text-[#D57C63]" />
                    <span className="text-[11.5px] font-bold">
                      Organic Traffic
                    </span>
                  </div>

                  {/* Floating Badge 4: Schema & Audits */}
                  <div
                    className="seo-float-badge seo-float-badge-4 absolute bottom-16 right-3 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D57C63]" />
                    <span className="text-[11.5px] font-bold">
                      Schema Validated
                    </span>
                  </div>

                  {/* Bottom Pedestal Tag */}
                  <div
                    className="seo-pedestal-bar mt-2 px-5 py-2 rounded-xl text-center z-10 backdrop-blur-md"
                    style={{ transform: 'translateZ(35px)' }}
                  >
                    <span className="font-heading font-black text-xs sm:text-sm tracking-wider uppercase text-[#D57C63]">
                      Rahila Kareem • SEO Specialist &amp; Strategist
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. COMPLETE SEO SERVICES (8 SERVICES) */}
        {/* ======================================================== */}
        <section id="seo-services" className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full seo-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <Zap className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Full-Spectrum Optimization</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight seo-heading mb-4">
              Complete SEO Services for Your Website
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed seo-body">
              Actionable optimization services designed to strengthen website health, elevate keyword rankings, and drive organic conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seoServices.map((srv, idx) => {
              const ServiceIcon = srv.icon;
              return (
                <div
                  key={srv.id}
                  itemScope
                  itemType="https://schema.org/Service"
                  className="reveal-up seo-card p-7 sm:p-9 flex flex-col justify-between"
                  style={{ transitionDelay: `${(idx % 3) * 110}ms` }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-heading font-black text-3xl seo-number">
                        {srv.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-[#D57C63]/15 flex items-center justify-center text-[#D57C63]">
                        <ServiceIcon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 itemProp="name" className="font-heading font-extrabold text-2xl seo-heading mb-2.5">
                      {srv.title}
                    </h3>

                    <p className="text-[14px] font-bold text-[#D57C63] mb-3.5 leading-snug">
                      {srv.shortDesc}
                    </p>

                    <p itemProp="description" className="text-[14.5px] leading-relaxed seo-body mb-6">
                      {srv.longDesc}
                    </p>

                    <ul className="space-y-2.5 mb-7">
                      {srv.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-bold seo-bullet">
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
                          className="seo-pill px-2.5 py-1 rounded-md text-[11px] font-bold"
                        >
                          {k}
                        </span>
                      ))}
                    </div>

                    <a
                      href={personalInfo.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl seo-btn-service font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
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
        {/* 3. HIGH DA GUEST POSTING & GBOB CAMPAIGN PROOF */}
        {/* ======================================================== */}
        <section id="seo-guest-posting" className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28">
          <div className="reveal-up text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full seo-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <Globe className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>High DA Guest Posting &amp; GBOB Campaign Proof</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[44px] leading-tight seo-heading mb-4">
              Real Campaign Results &amp; Proven Delivery
            </h2>
            <p className="text-[16px] sm:text-[18px] leading-relaxed seo-body">
              Every guest post and outreach placement is transparently documented, verified on live publisher blogs, and tracked in real time.
            </p>
          </div>

          {/* Metric Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="p-5 rounded-2xl seo-node-card text-center">
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#D57C63] mb-1">DA 40 – 80+</div>
              <div className="text-xs font-bold seo-subtext uppercase tracking-wider">Verified Authority</div>
            </div>
            <div className="p-5 rounded-2xl seo-node-card text-center">
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#D57C63] mb-1">100% DoFollow</div>
              <div className="text-xs font-bold seo-subtext uppercase tracking-wider">Contextual Backlinks</div>
            </div>
            <div className="p-5 rounded-2xl seo-node-card text-center">
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#D57C63] mb-1">Zero PBNs</div>
              <div className="text-xs font-bold seo-subtext uppercase tracking-wider">Real Traffic Sites</div>
            </div>
            <div className="p-5 rounded-2xl seo-node-card text-center">
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#D57C63] mb-1">20/20 Tracked</div>
              <div className="text-xs font-bold seo-subtext uppercase tracking-wider">Live In Shared Sheet</div>
            </div>
          </div>

          {/* 2-COLUMN SHOWCASE CONTAINER: LEFT = TEXT (IMAGE 1), RIGHT = PROOF BANNER (IMAGE 2) */}
          <div className="reveal-up seo-card p-6 sm:p-10 lg:p-12 rounded-[32px] border-2 border-[#D57C63]/30 mb-12 relative overflow-hidden">
            {/* Background subtle radial glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D57C63]/10 blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column (Image 1 Content) */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full seo-badge text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                  <CheckCheck className="w-4 h-4 text-[#D57C63]" />
                  <span>Verified Campaign Delivery</span>
                </div>

                <h3 className="font-heading font-extrabold text-[26px] sm:text-[34px] leading-tight seo-heading mb-4">
                  Bulk orders, delivered and tracked
                </h3>

                <p className="text-[15.5px] sm:text-[17px] leading-relaxed seo-body mb-6">
                  A recent campaign of 20 guest post placements, each one checked and marked complete in a shared sheet so you can see progress at every step.
                </p>

                {/* 5 Checklist Items */}
                <div className="space-y-3.5 mb-8">
                  {[
                    'Relevant websites with a real audience',
                    '100% original, useful content',
                    'Natural link placement that sounds organic',
                    'Targeted to the right people and niche',
                    'Built for long-term SEO growth'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#D57C63]/15 text-[#D57C63] flex items-center justify-center shrink-0 mt-0.5 border border-[#D57C63]/30">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm sm:text-[15.5px] font-semibold seo-heading leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (setSelectedPlan) setSelectedPlan('Bulk Guest Posting (20 Placements Campaign)');
                      setActiveTab('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="glow-btn px-7 py-3.5 rounded-full text-sm sm:text-base font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Inquire for Bulk Orders</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedProofImg('/seo-bulk-order-completed.jpg')}
                    className="seo-btn-secondary px-5 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4 text-[#D57C63]" />
                    <span>Inspect Live Sheet</span>
                  </button>
                </div>
              </div>

              {/* Right Column (Image 2 - Proof Banner) */}
              <div className="lg:col-span-6">
                <div
                  className="relative group rounded-2xl overflow-hidden border-2 border-[#D57C63]/30 shadow-2xl bg-black/40 cursor-pointer"
                  onClick={() => setSelectedProofImg('/seo-bulk-order-completed.jpg')}
                >
                  <img
                    src="/seo-bulk-order-completed.jpg"
                    alt="Bulk orders delivered and tracked - 20 Guest Post Campaign Completed"
                    className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay with zoom pill */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <span className="px-5 py-2.5 rounded-full bg-black/80 text-white border border-[#D57C63] text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl backdrop-blur-sm">
                      <ZoomIn className="w-4 h-4 text-[#D57C63]" />
                      <span>Click to Enlarge Sheet</span>
                    </span>
                  </div>

                  {/* Corner Status Tag */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-emerald-500/90 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>20/20 Delivered</span>
                  </div>
                </div>

                <p className="mt-3 text-center text-xs seo-subtext">
                  Screenshot: Live shared client tracker verifying all 20 guest posts completed with live URLs and metrics.
                </p>
              </div>

            </div>
          </div>

          {/* Guest Posting CTA Banner */}
          <div className="p-8 sm:p-10 rounded-2xl seo-banner relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D57C63] mb-1 block">
                Custom Blogger Outreach &amp; Backlink Packages
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-2">
                Need High-Impact Backlinks for Your Website?
              </h3>
              <p className="text-sm text-[#bcab9e] max-w-2xl leading-relaxed">
                Whether you need 5 curated guest posts or a monthly recurring backlink campaign, get a custom outreach proposal tailored to your niche.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (setSelectedPlan) setSelectedPlan('High DA Guest Posting & Backlinks Inquiry');
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-full bg-[#D57C63] hover:bg-[#b85c43] text-white text-sm sm:text-base font-bold whitespace-nowrap shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <Globe className="w-4 h-4 text-white" />
              <span>Inquire for Guest Posting Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. SEO PRICING PLANS */}
        {/* ======================================================== */}
        <section id="seo-pricing" className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full seo-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <Zap className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>SEO Pricing Packages</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight seo-heading mb-4">
              Affordable SEO Packages for Every Business
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed seo-body">
              Choose a package based on your website size and SEO requirements.
            </p>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {seoPricingPlans.map((plan, idx) => (
              <div
                key={plan.id}
                itemScope
                itemType="https://schema.org/Offer"
                className={`reveal-up seo-card p-8 sm:p-9 relative flex flex-col justify-between ${
                  plan.popular
                    ? 'border-[#D57C63] shadow-[0_0_40px_rgba(213,124,99,0.35)]'
                    : ''
                }`}
                style={{ transitionDelay: `${idx * 130}ms` }}
              >
                <meta itemProp="priceCurrency" content="USD" />
                <meta itemProp="price" content={plan.price.replace('$', '')} />
                <meta itemProp="availability" content="https://schema.org/InStock" />
                <link itemProp="url" href="https://rahilakareem.com/#seo-pricing" />

                {plan.popular && (
                  <span className="absolute -top-3.5 right-6 rtl:right-auto rtl:left-6 bg-gradient-to-r from-[#D57C63] to-[#e89078] text-white font-extrabold text-xs px-4 py-1 rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="seo-badge px-3 py-1 rounded-full text-xs font-bold">
                      {plan.delivery}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D57C63]">
                      {plan.tier}
                    </span>
                  </div>

                  <h3 itemProp="name" className="font-heading font-extrabold text-2xl seo-heading mb-2">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="font-heading font-extrabold text-[42px] text-[#D57C63]">
                      {plan.price}
                    </span>
                    <span className="text-xs font-bold seo-subtext">{plan.unit}</span>
                  </div>

                  <div className="pt-4 border-t border-[var(--line)] mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] seo-bullet leading-relaxed">
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
                      : 'seo-btn-secondary hover:border-[#D57C63]'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Bidirectional Linking Banner */}
          <div className="reveal-up mt-14 p-8 sm:p-10 rounded-[28px] seo-node-card flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-[#D57C63]/30">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Explore Other Service Offerings</span>
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl seo-heading mb-2">
                Looking for Full Stack JavaScript Web Apps or WordPress Stores?
              </h3>
              <p className="text-sm sm:text-[15px] seo-body max-w-2xl leading-relaxed">
                Beyond SEO, I build high-performance web applications using React.js &amp; Node.js, and bespoke e-commerce websites with WordPress &amp; WooCommerce.
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
                  setActiveTab('pricing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="seo-btn-secondary px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer"
              >
                <span>All Pricing Plans</span>
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. SEO TOOLS & TECHNOLOGIES */}
        {/* ======================================================== */}
        <section className="reveal-up mb-24 sm:mb-32 lg:mb-36 p-8 sm:p-14 seo-card">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#D57C63] block mb-1">
              • Industry Standard Stack •
            </span>
            <h2 className="font-heading font-extrabold text-[28px] sm:text-[36px] seo-heading mt-1 mb-3.5">
              Tools I Use for SEO Analysis
            </h2>
            <p className="text-[15.5px] sm:text-[17px] seo-body">
              Rigorous analysis powered by the industry's most reliable search engines and diagnostics software.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {seoTools.map((tool, idx) => (
              <div
                key={idx}
                className="seo-node-card p-5 rounded-2xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#D57C63] uppercase tracking-wider">
                    {tool.category}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#D57C63]" />
                </div>
                <h4 className="font-extrabold text-base seo-heading mb-1">{tool.name}</h4>
                <p className="text-xs seo-subtext leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. SEO PROJECTS & WEBSITE OPTIMIZATION */}
        {/* ======================================================== */}
        <section id="seo-projects" className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full seo-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <BarChart3 className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Evidence of Execution</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight seo-heading mb-4">
              SEO Projects &amp; Website Optimization
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed seo-body">
              Explore my SEO practice projects, website audits, keyword research, on-page optimization, and technical SEO improvements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seoProjects.map((proj, idx) => (
              <div
                key={proj.id}
                itemScope
                itemType="https://schema.org/CreativeWork"
                className="reveal-up seo-card p-8 sm:p-9 flex flex-col justify-between"
                style={{ transitionDelay: `${idx * 110}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="seo-badge px-3 py-1 rounded-full text-xs font-bold">
                      {proj.badge}
                    </span>
                    <span className="text-xs font-bold text-[#D57C63]">
                      {proj.label}
                    </span>
                  </div>

                  <h3 itemProp="name" className="font-heading font-extrabold text-xl sm:text-2xl seo-heading mb-3">
                    {proj.title}
                  </h3>

                  <p itemProp="description" className="text-[14.5px] leading-relaxed seo-body mb-6">
                    {proj.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#8a776a]">
                      Key Deliverables:
                    </div>
                    {proj.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs font-semibold seo-bullet">
                        <Check className="w-3.5 h-3.5 text-[#D57C63] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="text-xs font-bold seo-subtext">Verified Framework</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (setSelectedPlan) setSelectedPlan(`SEO Inquiry: ${proj.title}`);
                      setActiveTab('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#D57C63] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Audit</span> &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 7. SEO FAQ SECTION (GOOGLE FAQ SCHEMA COMPLIANT) */}
        {/* ======================================================== */}
        <section
          id="seo-faq"
          itemScope
          itemType="https://schema.org/FAQPage"
          className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28"
        >
          <div className="reveal-up text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full seo-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Search Engine FAQs</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight seo-heading mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed seo-body">
              Clear, transparent answers about SEO expectations, timelines, technical checks, and ranking realities.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {seoFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.id}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  className="reveal-up seo-card rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ transitionDelay: `${idx * 70}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-6 sm:p-7 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-[#D57C63]/5 transition-colors"
                  >
                    <span
                      itemProp="name"
                      className="font-heading font-extrabold text-base sm:text-lg seo-heading pr-2"
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-[#D57C63]/15 flex items-center justify-center text-[#D57C63] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#D57C63] text-black' : ''
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
                        className="text-sm sm:text-[15px] seo-body leading-relaxed"
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
        {/* 8. FINAL CALL TO ACTION BANNER */}
        {/* ======================================================== */}
        <section className="reveal-up p-10 sm:p-16 rounded-[32px] bg-gradient-to-r from-[#D57C63] to-[#b85b42] text-white text-center relative overflow-hidden shadow-[0_24px_60px_rgba(213,124,99,0.42)]">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/12 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-[32px] sm:text-[44px] leading-tight mb-5 text-white">
              Ready to Improve Your Website SEO?
            </h2>
            <p className="text-white/95 text-base sm:text-lg mb-9 leading-relaxed font-medium">
              Let's review your website, identify optimization opportunities, and build an SEO strategy that supports your business goals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#seo-pricing"
                className="px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-base font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2.5 cursor-pointer text-[#b85c43]"
              >
                <TrendingUp className="w-5 h-5 text-[#b85c43]" />
                <span>Get SEO Services</span>
              </a>

              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white/15 text-base font-bold transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-1 shadow-lg"
              >
                <MessageSquare className="w-5 h-5 text-[#e29f8c]" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white/15 text-base font-bold transition-all cursor-pointer hover:-translate-y-1"
              >
                <span>Contact Me</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Lightbox Modal for Campaign Proof Sheet */}
      {selectedProofImg && (
        <div
          className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProofImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-5xl max-h-[92vh] bg-[#1a1512] border-2 border-[#D57C63]/40 rounded-2xl p-3 sm:p-5 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#D57C63]/25 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-heading font-bold text-sm sm:text-base text-white">
                  Unity Space • 20 Guest Post Campaign Completed Sheet
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProofImg(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D57C63] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[78vh] rounded-xl flex items-center justify-center bg-black/50">
              <img
                src={selectedProofImg}
                alt="Bulk orders delivered and tracked - Unity Space Campaign Proof Sheet"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
            <div className="mt-3 text-center text-xs text-[#bcab9e]">
              Press ESC or click anywhere outside this box to close
            </div>
          </div>
        </div>
      )}

      {/* High-Contrast CSS for Day & Night Modes */}
      <style>{css}</style>
    </div>
  );
}

const css = `
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
.seo-heading {
  color: #ffffff !important;
}

.seo-body {
  color: #dcd0c4 !important;
}

.seo-subtext {
  color: #c9b9ac !important;
}

.seo-bullet {
  color: #f0e6dc !important;
}

.seo-number {
  color: #7a6659 !important;
}

.seo-card {
  background: #18110e;
  border: 1.5px solid #3d2b20;
  border-bottom: 4px solid #D57C63;
  border-radius: 28px;
  box-shadow: 0 16px 45px -8px rgba(0, 0, 0, 0.7), 0 0 25px rgba(213, 124, 99, 0.14);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
}

.seo-card:hover {
  transform: translateY(-8px) scale(1.012);
  border-color: #D57C63;
  box-shadow: 0 24px 55px -10px rgba(213, 124, 99, 0.38);
}

.seo-card:hover .seo-heading {
  color: #D57C63 !important;
}

.seo-node-card {
  background: #130d0a;
  border: 1.5px solid #33241b;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.seo-node-card:hover {
  border-color: #D57C63;
}

.seo-pill {
  background: #231813;
  border: 1.2px solid #422d22;
  color: #f7ede3;
}

.seo-pill:hover {
  border-color: #D57C63;
  color: #D57C63;
}

.seo-badge {
  background: rgba(213, 124, 99, 0.15);
  border: 1.5px solid rgba(213, 124, 99, 0.45);
  color: #D57C63;
}

.seo-profile-stage {
  background: linear-gradient(155deg, rgba(28, 19, 15, 0.95) 0%, rgba(18, 12, 9, 0.98) 100%);
  border: 2px solid rgba(213, 124, 99, 0.35);
  border-bottom: 5px solid #D57C63;
  border-radius: 32px;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(213, 124, 99, 0.22);
}

.seo-profile-stage:hover {
  border-color: #D57C63;
  box-shadow: 0 28px 75px -10px rgba(213, 124, 99, 0.45);
}

.seo-float-badge {
  background: rgba(24, 17, 14, 0.92);
  border: 1.5px solid rgba(213, 124, 99, 0.45);
  color: #f7ede3;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.seo-float-badge-1 {
  animation: floatSlow1 3.5s ease-in-out infinite alternate;
}
.seo-float-badge-2 {
  animation: floatSlow2 4.2s ease-in-out infinite alternate 0.4s;
}
.seo-float-badge-3 {
  animation: floatSlow3 3.8s ease-in-out infinite alternate 0.8s;
}
.seo-float-badge-4 {
  animation: floatSlow4 4.5s ease-in-out infinite alternate 1.2s;
}

.seo-pedestal-bar {
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

.seo-profile-img-breathe {
  animation: profileBreathe 4.5s ease-in-out infinite alternate;
}

.animate-spin-slower {
  animation: spinSlower 32s linear infinite;
}

@keyframes spinSlower {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.seo-btn-back,
.seo-btn-secondary {
  background: #18110e;
  border: 1.5px solid #3d2b20;
  color: #f7ede3;
}

.seo-btn-back:hover,
.seo-btn-secondary:hover {
  border-color: #D57C63;
  color: #D57C63;
}

.seo-btn-tertiary {
  background: transparent;
  border: 1.5px solid #3d2b20;
  color: #f7ede3;
}

.seo-btn-tertiary:hover {
  background: #18110e;
  border-color: #D57C63;
}

.seo-btn-service {
  background: #130d0a;
  border: 1.5px solid #33241b;
  color: #f7ede3;
}

.seo-btn-service:hover {
  background: #D57C63;
  border-color: #D57C63;
  color: #000000;
}

/* ==========================================================
   DAY / LIGHT MODE HIGH CONTRAST OVERRIDES
   ========================================================== */
:root[data-theme="light"] .seo-heading {
  color: #0f0905 !important;
}

:root[data-theme="light"] .seo-body {
  color: #1f140c !important;
  font-weight: 500 !important;
}

:root[data-theme="light"] .seo-subtext {
  color: #3d2c20 !important;
  font-weight: 600 !important;
}

:root[data-theme="light"] .seo-bullet {
  color: #140d07 !important;
  font-weight: 600 !important;
}

:root[data-theme="light"] .seo-number {
  color: #b09e91 !important;
}

:root[data-theme="light"] .seo-card {
  background: #ffffff !important;
  border: 1.5px solid #decbb8 !important;
  border-bottom: 4px solid #cf5208 !important;
  border-radius: 28px !important;
  box-shadow: 0 12px 36px -6px rgba(0, 0, 0, 0.08), 0 4px 14px -2px rgba(207, 82, 8, 0.1) !important;
}

:root[data-theme="light"] .seo-card:hover {
  transform: translateY(-8px) scale(1.012) !important;
  border-color: #cf5208 !important;
  box-shadow: 0 24px 52px -8px rgba(207, 82, 8, 0.25) !important;
}

:root[data-theme="light"] .seo-card:hover .seo-heading {
  color: #cf5208 !important;
}

:root[data-theme="light"] .seo-node-card {
  background: #faf4ee !important;
  border: 1.5px solid #e2d2c1 !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04) !important;
}

:root[data-theme="light"] .seo-node-card:hover {
  border-color: #cf5208 !important;
}

:root[data-theme="light"] .seo-pill {
  background: #f7eee4 !important;
  border: 1.5px solid #d8c3af !important;
  color: #180e07 !important;
  font-weight: 700 !important;
}

:root[data-theme="light"] .seo-pill:hover {
  border-color: #cf5208 !important;
  color: #cf5208 !important;
  background: #fbeee5 !important;
}

:root[data-theme="light"] .seo-badge {
  background: #fbeee5 !important;
  border: 1.5px solid #dcbfa8 !important;
  color: #9c3305 !important;
  font-weight: 700 !important;
}

:root[data-theme="light"] .seo-profile-stage {
  background: linear-gradient(155deg, #ffffff 0%, #fff7f2 100%) !important;
  border: 2px solid #decbb8 !important;
  border-bottom: 5px solid #cf5208 !important;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.12), 0 4px 20px rgba(207, 82, 8, 0.12) !important;
}

:root[data-theme="light"] .seo-float-badge {
  background: rgba(255, 255, 255, 0.96) !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}

:root[data-theme="light"] .seo-pedestal-bar {
  background: #fdf2e9 !important;
  border: 1.5px solid #dcbfa8 !important;
  color: #140d07 !important;
}

:root[data-theme="light"] .seo-btn-back,
:root[data-theme="light"] .seo-btn-secondary {
  background: #ffffff !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
}

:root[data-theme="light"] .seo-btn-back:hover,
:root[data-theme="light"] .seo-btn-secondary:hover {
  border-color: #cf5208 !important;
  color: #cf5208 !important;
}

:root[data-theme="light"] .seo-btn-tertiary {
  background: transparent !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
}

:root[data-theme="light"] .seo-btn-tertiary:hover {
  background: #f7eee4 !important;
  border-color: #cf5208 !important;
}

:root[data-theme="light"] .seo-btn-service {
  background: #f7eee4 !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
  font-weight: 700 !important;
}

:root[data-theme="light"] .seo-btn-service:hover {
  background: #cf5208 !important;
  border-color: #cf5208 !important;
  color: #ffffff !important;
}
`;
