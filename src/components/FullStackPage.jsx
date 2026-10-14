import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Layers,
  Server,
  Database,
  Cpu,
  Terminal,
  Globe,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Lock,
  ShoppingCart,
  Wrench,
  UploadCloud,
  GitBranch,
  Search,
  Star,
  MessageSquare,
  FileText,
  Monitor,
  Layout,
  Smartphone,
  ChevronRight,
  Check,
  CheckCheck,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { personalInfo, projects } from '../data/portfolioData';
import fullstackProfileImg from '../assets/fullstack-profile.png';

// 9 Comprehensive Full Stack Development Services (from specification Section 6)
const fullStackServices = [
  {
    id: 'frontend-dev',
    number: '01',
    title: 'Frontend Development',
    icon: Layout,
    shortDesc: 'React.js, modern JavaScript (ES6+), and ultra-responsive user interfaces.',
    longDesc: 'Building interactive, component-driven client applications using React.js, Tailwind CSS, Bootstrap, and modern state management. Focused on accessible, mobile-first design and lightning-fast render speeds.',
    features: [
      'Component-based architecture & JSX templates',
      'React Router navigation & single-page app (SPA) performance',
      'Pixel-perfect mobile & desktop responsive layouts',
      'Interactive animations & micro-interactions'
    ],
    tech: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap', 'HTML5/CSS3']
  },
  {
    id: 'backend-dev',
    number: '02',
    title: 'Backend Development',
    icon: Server,
    shortDesc: 'Node.js, Express.js, and scalable server-side business logic.',
    longDesc: 'Designing high-throughput asynchronous servers, modular middlewares, RESTful endpoint architectures, and microservice backends that cleanly process enterprise data.',
    features: [
      'Asynchronous event-driven Node.js runtime',
      'Express.js server routes & modular controller setup',
      'Custom middleware for security, logging & rate-limiting',
      'Centralized error handling & robust server stability'
    ],
    tech: ['Node.js', 'Express.js', 'REST APIs', 'Middleware', 'CRUD Operations']
  },
  {
    id: 'fullstack-apps',
    number: '03',
    title: 'Full Stack Web Applications',
    icon: Zap,
    shortDesc: 'Frontend, backend, and database end-to-end integration.',
    longDesc: 'Engineering complete web applications from user interface to cloud database. Bridging dynamic React state with Node.js APIs and MongoDB schemas for unified digital products.',
    features: [
      'Full MERN Stack application engineering',
      'Seamless client-server HTTP & JSON data exchange',
      'Real-time state synchronization & optimistic UI updates',
      'End-to-end integration testing & performance tuning'
    ],
    tech: ['MERN Stack', 'React.js', 'Node.js', 'Express.js', 'MongoDB']
  },
  {
    id: 'rest-apis',
    number: '04',
    title: 'REST API Development',
    icon: Cpu,
    shortDesc: 'APIs create karna aur third-party services integrate karna.',
    longDesc: 'Developing standardized RESTful APIs with clean URI naming conventions, versioning, pagination, query filtering, and smooth external third-party API integrations.',
    features: [
      'Standardized CRUD endpoints (GET, POST, PUT, DELETE)',
      'Query filtering, sorting, search, and pagination',
      'Third-party API integration (Payment, Weather, Maps)',
      'Comprehensive API testing & Postman documentation'
    ],
    tech: ['RESTful APIs', 'Postman', 'JSON', 'CRUD', 'Express Router']
  },
  {
    id: 'database-integration',
    number: '05',
    title: 'Database Integration',
    icon: Database,
    shortDesc: 'MongoDB aur Mongoose ke saath structured data management.',
    longDesc: 'Designing high-efficiency NoSQL schemas, collections, indexes, validation rules, aggregation pipelines, and data relationships using MongoDB and Mongoose ODM.',
    features: [
      'Custom Mongoose schemas with strict data validation',
      'Indexed collections for ultra-fast query performance',
      'Complex aggregation pipelines & multi-collection joins',
      'Secure cloud hosting on MongoDB Atlas with automated backups'
    ],
    tech: ['MongoDB', 'Mongoose ODM', 'MongoDB Atlas', 'Schema Design', 'Data Modeling']
  },
  {
    id: 'auth-systems',
    number: '06',
    title: 'Authentication Systems',
    icon: Lock,
    shortDesc: 'Login, registration, password hashing aur protected routes.',
    longDesc: 'Implementing secure user identity management with encrypted password hashing (bcrypt), JSON Web Tokens (JWT), session cookies, and role-based access control (RBAC).',
    features: [
      'Secure user sign-up & login workflows',
      'JWT token generation, verification & refresh cycles',
      'Password hashing with salted bcrypt algorithms',
      'Role-based access control (Admin, User, Manager) & protected routes'
    ],
    tech: ['JWT (JSON Web Tokens)', 'bcrypt.js', 'Auth Middleware', 'Protected Routes']
  },
  {
    id: 'ecommerce-dev',
    number: '07',
    title: 'E-commerce Development',
    icon: ShoppingCart,
    shortDesc: 'Product listings, cart, checkout aur admin dashboard.',
    longDesc: 'Building custom online storefronts with rich product catalogs, filtering, shopping cart state management, checkout flows, and administrative management dashboards.',
    features: [
      'Dynamic product catalog with multi-variant filtering',
      'Persistent shopping cart & guest/user checkout flows',
      'Order tracking, receipt generation & customer accounts',
      'Admin dashboard for real-time inventory & sales management'
    ],
    tech: ['React.js', 'E-Commerce Logic', 'Cart State', 'Admin Dashboard', 'Stripe/PayPal']
  },
  {
    id: 'bug-fixing',
    number: '08',
    title: 'Bug Fixing & Optimization',
    icon: Wrench,
    shortDesc: 'Code debugging, performance aur responsive layout improvements.',
    longDesc: 'Diagnosing and resolving tricky JavaScript errors, React re-render bottlenecks, layout shifts, API latency issues, and optimizing bundle size for Google Core Web Vitals.',
    features: [
      'Deep debugging with Chrome DevTools & Node console inspector',
      'React component memoization & re-render minimization',
      'Vite bundle optimization & code-splitting',
      'Cross-browser layout fixes & mobile touch responsiveness'
    ],
    tech: ['Code Debugging', 'Core Web Vitals', 'Performance Tuning', 'Chrome DevTools']
  },
  {
    id: 'deployment-devops',
    number: '09',
    title: 'Website Deployment',
    icon: UploadCloud,
    shortDesc: 'GitHub, Vercel aur supported backend hosting platforms par deployment.',
    longDesc: 'Configuring modern CI/CD deployment pipelines on Vercel, Railway, Render, and GitHub, ensuring zero-downtime releases and properly configured environment variables.',
    features: [
      'Automated Git push-to-deploy workflows on Vercel & Railway',
      'Secure environment variable (.env) configuration on cloud hosts',
      'Custom domain DNS setup, SSL HTTPS certificates & CDN routing',
      'Production server monitoring & continuous uptime management'
    ],
    tech: ['Git & GitHub', 'Vercel', 'Railway', 'Render', 'DNS & SSL']
  }
];

// Complete Categorized Skills List (from specification Section 3)
const categorizedSkills = [
  {
    category: 'Frontend Development',
    icon: Layout,
    accent: '#D57C63',
    desc: 'Modern, component-driven client architecture, interactive state management, and mobile-first responsive design.',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'React.js',
      'React Router',
      'Tailwind CSS',
      'Bootstrap',
      'Responsive Web Design',
      'JSX',
      'UI Development',
      'Component-Based Architecture'
    ]
  },
  {
    category: 'Backend Development',
    icon: Server,
    accent: '#D57C63',
    desc: 'High-performance asynchronous server runtimes, RESTful microservices, and secure authentication pipelines.',
    skills: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'CRUD Operations',
      'Middleware',
      'Authentication',
      'Authorization',
      'JWT',
      'Password Hashing',
      'Server-Side Development'
    ]
  },
  {
    category: 'Database Management',
    icon: Database,
    accent: '#D57C63',
    desc: 'Scalable NoSQL schema modeling, data integrity, atomic queries, and cloud clustering on MongoDB Atlas.',
    skills: [
      'MongoDB',
      'Mongoose',
      'Database Design',
      'CRUD Queries',
      'Data Validation',
      'Schema Design',
      'Collections',
      'Relationships and Data Management'
    ]
  },
  {
    category: 'Tools & Deployment',
    icon: GitBranch,
    accent: '#D57C63',
    desc: 'Streamlined DevOps workflows, Git version control, cloud hosting, and rigorous API test suites.',
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'npm',
      'Vite',
      'Postman',
      'Chrome DevTools',
      'Vercel',
      'Railway',
      'MongoDB Atlas',
      'Environment Variables',
      'Debugging and Deployment'
    ]
  }
];

// 16 Animated Keywords (from specification Section 5)
const animatedKeywords = [
  'JavaScript',
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MERN Stack',
  'REST APIs',
  'Tailwind CSS',
  'Bootstrap',
  'Frontend Development',
  'Backend Development',
  'Responsive UI',
  'Git & GitHub',
  'Web Applications',
  'Database Design',
  'API Integration'
];

// Main SEO Keywords Matrix (from specification Section 4)
const primaryKeywords = [
  'Full Stack JavaScript Developer',
  'Full Stack Web Developer',
  'JavaScript Developer',
  'Web Application Developer',
  'Frontend Developer',
  'MERN Stack Development'
];

const secondaryKeywords = [
  'MERN Stack Developer',
  'React.js Developer',
  'Node.js Developer',
  'Express.js Developer',
  'Backend Developer',
  'REST API Development'
];

const longTailKeywords = [
  'Full Stack JavaScript Developer for Web Applications',
  'React.js and Node.js Developer',
  'MERN Stack Web Application Development',
  'Responsive Website Development Services',
  'Custom Web Application Developer',
  'Frontend and Backend Development',
  'MongoDB Database Integration',
  'REST API Development and Integration',
  'React.js Website Development',
  'JavaScript Web Development Services',
  'Remote Full Stack JavaScript Developer',
  'Freelance MERN Stack Developer'
];

// Full Stack Projects from Portfolio
const fullStackProjects = projects.filter(
  (p) => p.category === 'MERN' || p.category === 'React'
);

// Dynamic titles that cycle with a smooth down-to-up slide animation
const alternativeTitles = [
  '| MERN Stack Developer',
  '| React.js & Node.js Developer',
  '| Frontend & Backend Development',
  '| Building Modern Web Applications',
  '| REST APIs & MongoDB Architect'
];

// Full Stack Development Pricing Packages
const fullStackPricingPlans = [
  {
    id: 'fs-starter',
    name: 'Frontend & API Starter',
    price: '$180',
    delivery: '5-7 Days Delivery',
    tagline: 'Single Page Web App & REST API Integration',
    popular: false,
    badge: 'Starter Package',
    features: [
      'Interactive React.js SPA with modern JSX & Hooks',
      'Tailwind CSS mobile-first responsive layout',
      'REST API integration with Axios & error handling',
      'Contact form, lead capture & validation',
      'SEO meta setup & clean semantic markup',
      'Git repository handover & free Vercel deployment'
    ],
    buttonText: 'Choose Starter Plan'
  },
  {
    id: 'fs-mern-app',
    name: 'Full Stack MERN Application',
    price: '$350',
    delivery: '10-14 Days Delivery',
    tagline: 'Complete Production-Ready MERN Web App',
    popular: true,
    badge: 'Most Popular / Recommended',
    features: [
      'Complete React.js UI + Node.js/Express Backend',
      'MongoDB database schemas with Mongoose ODM',
      'Secure JWT authentication & bcrypt password hashing',
      'Protected routes & user role-based access control (RBAC)',
      'Full CRUD operations & interactive user dashboard',
      'Cloud database clustering on MongoDB Atlas',
      'Deployment on Railway / Render + Vercel with HTTPS',
      '30 Days post-launch technical bug-fix support'
    ],
    buttonText: 'Get Started with MERN'
  },
  {
    id: 'fs-enterprise',
    name: 'Custom SaaS & Web Platform',
    price: '$550+',
    delivery: '2-4 Weeks Delivery',
    tagline: 'Scalable Architecture for High-Demand Platforms',
    popular: false,
    badge: 'Enterprise Solution',
    features: [
      'High-throughput modular microservice server logic',
      'Complex business logic & multi-tier user dashboards',
      'Payment gateways (Stripe/PayPal) & webhook processing',
      'Cloud file uploads (Cloudinary / AWS S3 integration)',
      'Automated email notifications (Nodemailer / SendGrid)',
      'Advanced database indexing & query optimization',
      'CI/CD automated deployment & environment configs',
      '60 Days post-launch priority maintenance & support'
    ],
    buttonText: 'Build Custom Platform'
  }
];

// High-Converting Google Search FAQs for Full Stack JavaScript Developer (FAQ Schema Compliant)
const fullStackFaqs = [
  {
    id: 1,
    q: "What services does Rahila Kareem offer as a Full Stack JavaScript Developer?",
    a: "I provide comprehensive end-to-end full stack web application engineering using the modern MERN stack (MongoDB, Express.js, React.js, and Node.js). Services include mobile-first responsive frontend UI design, custom RESTful API architecture, secure JWT user authentication, MongoDB Atlas cloud database modeling, third-party API and payment gateway integrations, and production deployment with continuous maintenance."
  },
  {
    id: 2,
    q: "Why choose React.js and Node.js for modern web applications?",
    a: "React.js delivers ultra-fast, component-driven single-page application (SPA) experiences with zero page reloads, while Node.js and Express.js offer an event-driven, asynchronous backend capable of processing thousands of concurrent user requests with minimal latency. Combined with MongoDB, JavaScript is used consistently across the entire software stack, ensuring maximum performance, rapid development, and seamless scalability."
  },
  {
    id: 3,
    q: "How do you ensure application security and database protection?",
    a: "Every application is built following strict industry security standards: JSON Web Token (JWT) stateless authentication, bcrypt cryptographic password hashing, HTTP-only secure cookies, CORS origin controls, helmet HTTP headers, rate limiting to prevent DDoS attacks, environment variable secret isolation, and MongoDB injection sanitization."
  },
  {
    id: 4,
    q: "What are your full stack development packages and pricing?",
    a: "We offer transparent, fixed-price development tiers: Frontend & API Starter ($180, 5-7 days turnaround), Full Stack MERN Application ($350, 10-14 days turnaround - Most Popular), and Custom SaaS & Web Platform ($550+, 2-4 weeks). Each package includes complete Git source code handover, deployment on Vercel and Railway, and up to 60 days of post-launch technical support."
  },
  {
    id: 5,
    q: "Can you deploy and host my full stack application on cloud servers?",
    a: "Yes, I configure complete production hosting pipelines: deploying frontend React apps to Vercel or Netlify with global edge CDN distribution, server-side Node.js/Express APIs to Railway or Render with automated continuous integration (CI/CD) from GitHub, and clustering high-availability databases on MongoDB Atlas with automatic daily backups and SSL certificates."
  }
];

export default function FullStackPage({ setActiveTab, setSelectedPlan }) {
  const heroCardRef = useRef(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

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

    // Rotate subtitle with smooth down-to-up slide every 2.8 seconds
    const titleTimer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % alternativeTitles.length);
    }, 2800);

    // Scroll-triggered down-to-up reveal animation observer
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

    // Instant trigger for hero elements
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

  return (
    <div
      itemScope
      itemType="https://schema.org/ProfilePage"
      className="page-enter pt-24 sm:pt-32 pb-28 relative overflow-hidden"
    >
      {/* Schema.org Meta Tags for Search Engine Optimization */}
      <meta itemProp="name" content="Full Stack JavaScript Developer | MERN Stack Specialist - Rahila Kareem" />
      <meta
        itemProp="description"
        content="Professional Full Stack JavaScript Developer specializing in React.js, Node.js, Express.js, and MongoDB. Building responsive, secure, and scalable web applications, REST APIs, and database architectures."
      />
      <link itemProp="url" href="https://rahilakareem.com/#fullstack" />

      {/* Complete Google-Compliant JSON-LD Schema Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["WebPage", "ProfilePage"],
                "@id": "https://rahilakareem.com/#fullstack",
                "url": "https://rahilakareem.com/#fullstack",
                "name": "Full Stack JavaScript Developer | MERN Stack Specialist - Rahila Kareem",
                "headline": "Full Stack JavaScript Developer for High-Performance Web Applications & MERN Stack Development",
                "description": "Professional Full Stack JavaScript Developer specializing in React.js, Node.js, Express.js, and MongoDB. Building responsive, secure, and scalable web applications, REST APIs, and database architectures.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "@id": "https://rahilakareem.com/#website",
                  "name": "Rahila Kareem Portfolio",
                  "url": "https://rahilakareem.com"
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "@id": "https://rahilakareem.com/#fullstack-breadcrumb",
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
                      "name": "Full Stack JavaScript Developer",
                      "item": "https://rahilakareem.com/#fullstack"
                    }
                  ]
                },
                "mainEntity": {
                  "@id": "https://rahilakareem.com/#person"
                },
                "about": [
                  { "@type": "Thing", "name": "Full Stack Web Development" },
                  { "@type": "Thing", "name": "JavaScript" },
                  { "@type": "Thing", "name": "MERN Stack" },
                  { "@type": "Thing", "name": "React.js" },
                  { "@type": "Thing", "name": "Node.js" },
                  { "@type": "Thing", "name": "Express.js" },
                  { "@type": "Thing", "name": "MongoDB" },
                  { "@type": "Thing", "name": "RESTful API" }
                ]
              },
              {
                "@type": "Person",
                "@id": "https://rahilakareem.com/#person",
                "name": "Rahila Kareem",
                "givenName": "Rahila",
                "familyName": "Kareem",
                "jobTitle": [
                  "Full Stack JavaScript Developer",
                  "MERN Stack Developer",
                  "React.js Developer",
                  "Node.js Developer",
                  "REST API Architect"
                ],
                "url": "https://rahilakareem.com",
                "image": "https://rahilakareem.com/fullstack-profile.png",
                "description": "Full Stack JavaScript Developer with deep expertise in React.js, Node.js, Express.js, MongoDB Atlas, and building scalable modern web applications.",
                "telephone": "+923217812265",
                "email": "rahilakareem389@gmail.com",
                "sameAs": [
                  "https://linkedin.com/in/rahila-kareem06b76a31a",
                  "https://www.fiverr.com/s/LdGmqE7",
                  "https://facebook.com/share/1Ahyr7EepM"
                ],
                "knowsAbout": [
                  "Full Stack JavaScript Development",
                  "MERN Stack",
                  "React.js",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "MongoDB Atlas",
                  "REST APIs",
                  "Tailwind CSS",
                  "Bootstrap",
                  "JWT Authentication",
                  "NoSQL Database Design",
                  "Vercel Deployment",
                  "Railway Deployment",
                  "Git & GitHub Version Control"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Full Stack JavaScript Development Packages & Offerings",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "name": "Frontend & API Starter",
                      "price": "180",
                      "priceCurrency": "USD",
                      "availability": "https://schema.org/InStock",
                      "description": "React.js single-page application with Axios REST API integration, Tailwind CSS mobile design, and Vercel hosting setup.",
                      "url": "https://rahilakareem.com/#fullstack-pricing"
                    },
                    {
                      "@type": "Offer",
                      "name": "Full Stack MERN Application",
                      "price": "350",
                      "priceCurrency": "USD",
                      "availability": "https://schema.org/InStock",
                      "description": "Complete production-ready web application with React UI, Node/Express backend, MongoDB Atlas, and JWT authentication.",
                      "url": "https://rahilakareem.com/#fullstack-pricing"
                    },
                    {
                      "@type": "Offer",
                      "name": "Custom SaaS & Web Platform",
                      "price": "550",
                      "priceCurrency": "USD",
                      "availability": "https://schema.org/InStock",
                      "description": "Enterprise modular web platform with payment gateways (Stripe/PayPal), file uploads, and CI/CD pipelines.",
                      "url": "https://rahilakareem.com/#fullstack-pricing"
                    }
                  ]
                }
              },
              {
                "@type": "Service",
                "@id": "https://rahilakareem.com/#service-fullstack-dev",
                "serviceType": "Full Stack JavaScript & MERN Stack Development",
                "name": "Full Stack Web Application Development (React.js, Node.js, Express & MongoDB)",
                "description": "End-to-end full stack web application engineering including responsive frontend design, backend RESTful APIs, database schema modeling, and cloud deployment.",
                "provider": { "@id": "https://rahilakareem.com/#person" },
                "areaServed": "Worldwide"
              },
              {
                "@type": "FAQPage",
                "@id": "https://rahilakareem.com/#fullstack-faq",
                "mainEntity": fullStackFaqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              },
              {
                "@type": "ItemList",
                "@id": "https://rahilakareem.com/#fullstack-projects-list",
                "name": "Featured Full Stack JavaScript Projects",
                "itemListElement": fullStackProjects.map((proj, idx) => ({
                  "@type": "ListItem",
                  "position": idx + 1,
                  "item": {
                    "@type": "SoftwareApplication",
                    "name": proj.title,
                    "applicationCategory": "WebApplication",
                    "operatingSystem": "All modern web browsers",
                    "description": proj.description,
                    "url": proj.liveUrl
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[750px] h-[480px] bg-[#D57C63]/14 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-0 w-[550px] h-[450px] bg-[#D57C63]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[75%] left-0 w-[600px] h-[450px] bg-[#D57C63]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="reveal-up hero-reveal flex flex-wrap items-center justify-between gap-4 mb-10 sm:mb-14">
          <button
            type="button"
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="fs-btn-back inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all hover:-translate-x-1 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#D57C63]" />
            <span>Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold fs-subtext">
            <span
              onClick={() => setActiveTab('home')}
              className="hover:text-[#D57C63] cursor-pointer transition-colors"
            >
              Home
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#D57C63] font-bold">Full Stack JavaScript Developer</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. HERO SECTION: Heading, Bio, CTAs & 3D Tech Orbit */}
        {/* ======================================================== */}
        <section
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Person"
          className="mb-24 sm:mb-32 lg:mb-36"
        >
          <meta itemProp="name" content="Rahila Kareem" />
          <meta itemProp="url" content="https://rahilakareem.com/#fullstack" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading, Bio, Buttons with Down-to-Up Animations */}
            <div className="lg:col-span-7">
              
              {/* Badge */}
              <div className="anim-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full fs-badge text-xs sm:text-[13px] font-bold tracking-wide uppercase mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#D57C63]" />
                <span>MERN Stack • React.js &amp; Node.js Specialist</span>
              </div>

              {/* Main Heading (H1) with Down-to-Up float */}
              <h1 itemProp="jobTitle" className="anim-up-2 font-heading font-extrabold text-[32px] sm:text-[46px] lg:text-[52px] leading-[1.14] fs-heading mb-6">
                Full Stack JavaScript Developer{' '}
                <span className="block mt-2 text-[28px] sm:text-[40px] lg:text-[46px] min-h-[1.2em] overflow-hidden">
                  <span
                    key={titleIndex}
                    className="anim-title-slide inline-block text-[#D57C63]"
                  >
                    {alternativeTitles[titleIndex]}
                  </span>
                </span>
              </h1>

              {/* Alternative Heading Subline with Down-to-Up Animation */}
              <div className="anim-up-3 flex flex-wrap items-center gap-2.5 mb-7">
                <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold fs-pill shadow-xs hover:scale-105 transition-all cursor-default">
                  ⚡ Frontend &amp; Backend Development
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-bold fs-pill shadow-xs hover:scale-105 transition-all cursor-default">
                  🚀 Building Modern Web Applications
                </span>
              </div>

              {/* Main Bio Paragraph with Down-to-Up Animation */}
              <p itemProp="description" className="anim-up-4 fs-body text-[16px] sm:text-[18px] leading-[1.8] mb-9 max-w-2xl">
                I am a <strong>Full Stack JavaScript Developer</strong> specializing in modern, responsive, and user-friendly web applications. I work with <strong>React.js</strong>, <strong>JavaScript</strong>, <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong> to build interactive frontend interfaces and functional backend systems. My focus is on clean code, responsive UI design, REST API integration, database management, and performance optimization.
              </p>

              {/* Hero Action Buttons with Down-to-Up Animation */}
              <div className="anim-up-5 flex flex-wrap items-center gap-4">
                <a
                  href="#fullstack-projects"
                  className="px-7 py-3.5 rounded-full bg-[#D57C63] hover:bg-[#b85c43] text-white text-[15px] font-bold shadow-[0_8px_28px_rgba(213,124,99,0.48)] hover:-translate-y-1 transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <span>View My Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/rahila-kareem-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fs-btn-secondary px-6 py-3.5 rounded-full text-[15px] font-bold hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  title="View & Download Rahila Kareem CV"
                >
                  <FileText className="w-4 h-4 text-[#D57C63]" />
                  <span>Hire Me</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="fs-btn-tertiary px-6 py-3.5 rounded-full text-[15px] font-bold hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <span>Contact Me</span>
                </button>
              </div>

              {/* Key Quick Highlights Underneath Buttons with Down-to-Up Animation */}
              <div className="anim-up-6 grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-[var(--line)] max-w-lg">
                <div>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#D57C63]">1 Year</div>
                  <div className="text-xs sm:text-[13px] font-bold fs-subtext mt-1">Practical Experience</div>
                </div>
                <div>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#D57C63]">MERN</div>
                  <div className="text-xs sm:text-[13px] font-bold fs-subtext mt-1">Stack Architectures</div>
                </div>
                <div>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#D57C63]">100%</div>
                  <div className="text-xs sm:text-[13px] font-bold fs-subtext mt-1">Clean Modular Code</div>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Interactive Profile Stage with Dynamic Movement & Badges */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center">
              <div
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                className="reveal-up hero-reveal relative w-full max-w-[460px] cursor-pointer"
                style={{ perspective: '1100px' }}
              >
                {/* 3D Tilting Card Wrapper */}
                <div
                  ref={heroCardRef}
                  className="fs-profile-stage relative rounded-[32px] p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                >
                  {/* Glowing Radial Background Accents */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#D57C63]/25 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#D57C63]/18 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#D57C63]/18 rounded-full blur-2xl pointer-events-none" />

                  {/* Circular Rotating Dashed Orbit Ring Behind Photo */}
                  <div
                    className="absolute inset-5 rounded-full border border-dashed border-[#D57C63]/35 pointer-events-none animate-spin-slower"
                    style={{ transform: 'translateZ(-10px)' }}
                  />

                  {/* Floating Top-Left Badge: MERN Stack Specialist */}
                  <div
                    className="fs-float-badge fs-float-badge-1 absolute top-4 left-4 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D57C63] animate-ping" />
                    <span className="text-xs font-extrabold tracking-wide text-[#D57C63]">
                      ⚡ MERN Stack
                    </span>
                  </div>

                  {/* Floating Top-Right Badge: React.js & Node.js */}
                  <div
                    className="fs-float-badge fs-float-badge-2 absolute top-4 right-4 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <Code2 className="w-4 h-4 text-[#D57C63]" />
                    <span className="text-xs font-extrabold tracking-wide">
                      React &amp; Node.js
                    </span>
                  </div>

                  {/* Rahila Kareem Full Stack Portrait Image with Breathing Movement */}
                  <div
                    className="relative z-10 w-full flex items-center justify-center pt-8 pb-3"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <img
                      src={fullstackProfileImg}
                      alt="Rahila Kareem - Full Stack JavaScript Developer | MERN Stack Specialist"
                      className="fs-profile-img-breathe w-auto h-[340px] sm:h-[400px] lg:h-[430px] object-contain select-none pointer-events-none filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)]"
                      loading="eager"
                    />
                  </div>

                  {/* Floating Bottom-Left Badge: REST APIs & CRUD */}
                  <div
                    className="fs-float-badge fs-float-badge-3 absolute bottom-16 left-3 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <Cpu className="w-3.5 h-3.5 text-[#D57C63]" />
                    <span className="text-[11.5px] font-bold">
                      REST APIs &amp; CRUD
                    </span>
                  </div>

                  {/* Floating Bottom-Right Badge: MongoDB Atlas */}
                  <div
                    className="fs-float-badge fs-float-badge-4 absolute bottom-16 right-3 z-20 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <Database className="w-3.5 h-3.5 text-[#D57C63]" />
                    <span className="text-[11.5px] font-bold">
                      MongoDB Cloud
                    </span>
                  </div>

                  {/* Bottom Pedestal Tag */}
                  <div
                    className="relative z-20 mt-1 w-full py-2.5 px-4 rounded-2xl fs-pedestal-bar flex items-center justify-center gap-2 text-center"
                    style={{ transform: 'translateZ(38px)' }}
                  >
                    <Sparkles className="w-4 h-4 text-[#D57C63]" />
                    <span className="text-xs sm:text-[13px] font-extrabold tracking-wide fs-heading">
                      Rahila Kareem • Full Stack Engineer
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. ANIMATED KEYWORDS CLOUD (from Section 5) */}
        {/* ======================================================== */}
        <section className="reveal-up mb-24 sm:mb-32 lg:mb-36 py-10 px-6 sm:px-10 fs-card">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#D57C63] block mb-1">
              • Core Disciplines &amp; Proficiencies •
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl fs-heading">
              Keywords &amp; Specialized Technologies
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {animatedKeywords.map((kw, i) => (
              <span
                key={i}
                className="fs-pill px-4 py-2 rounded-full text-xs sm:text-[13.5px] font-bold hover:scale-105 transition-all shadow-sm cursor-default"
              >
                {kw}
              </span>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. COMPLETE SKILLS BREAKDOWN (4 Categories from Section 3) */}
        {/* ======================================================== */}
        <section className="mb-24 sm:mb-32 lg:mb-36">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full fs-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <Code2 className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Full Stack Skills Breakdown</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight fs-heading mb-4">
              Comprehensive JavaScript Skillset
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed fs-body">
              From responsive frontend component design to secure Node.js APIs and scalable MongoDB database architecture.
            </p>
          </div>

          {/* 4 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {categorizedSkills.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="reveal-up fs-card p-8 sm:p-10 flex flex-col justify-between"
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
                  <div>
                    {/* Header: Icon + Category Name */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-[#D57C63]/15 flex items-center justify-center text-[#D57C63] shadow-sm">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-heading font-extrabold text-2xl fs-heading">
                          {cat.category}
                        </h3>
                        <span className="text-xs font-bold text-[#D57C63]">
                          {cat.skills.length} Specialized Topics
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[15px] leading-relaxed fs-body mb-7">
                      {cat.desc}
                    </p>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-2.5 mb-8">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="fs-pill px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-bold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Verification Indicator */}
                  <div className="pt-5 border-t border-[var(--line)] flex items-center justify-between text-xs sm:text-sm font-bold fs-subtext">
                    <span className="flex items-center gap-2 text-[#D57C63]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Production Verified</span>
                    </span>
                    <span>Clean Architecture</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. 9 DEDICATED SERVICES (from Section 6) */}
        {/* ======================================================== */}
        <section className="mb-24 sm:mb-32 lg:mb-36">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full fs-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <Zap className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Full Stack Services</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight fs-heading mb-4">
              9 Specialized Full Stack Services
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed fs-body">
              End-to-end development offerings tailored for startups, e-commerce stores, and high-performance digital businesses.
            </p>
          </div>

          {/* 9 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fullStackServices.map((srv, idx) => {
              const ServiceIcon = srv.icon;
              return (
                <div
                  key={srv.id}
                  itemScope
                  itemType="https://schema.org/Service"
                  className="reveal-up fs-card p-7 sm:p-9 flex flex-col justify-between"
                  style={{ transitionDelay: `${(idx % 3) * 120}ms` }}
                >
                  {/* Top Bar: Number + Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-heading font-black text-3xl fs-number">
                        {srv.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-[#D57C63]/15 flex items-center justify-center text-[#D57C63]">
                        <ServiceIcon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 itemProp="name" className="font-heading font-extrabold text-2xl fs-heading mb-2.5">
                      {srv.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-[14px] font-bold text-[#D57C63] mb-3.5 leading-snug">
                      {srv.shortDesc}
                    </p>

                    {/* Long Description */}
                    <p itemProp="description" className="text-[14.5px] leading-relaxed fs-body mb-6">
                      {srv.longDesc}
                    </p>

                    {/* Bullet Features */}
                    <ul className="space-y-2.5 mb-7">
                      {srv.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-bold fs-bullet">
                          <Check className="w-4 h-4 text-[#D57C63] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Tech Pills + Action */}
                  <div className="pt-5 border-t border-[var(--line)]">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {srv.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="fs-pill px-2.5 py-1 rounded-md text-[11.5px] font-bold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={personalInfo.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl fs-btn-service font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. INTERACTIVE MERN DATA PIPELINE */}
        {/* ======================================================== */}
        <section className="reveal-up mb-24 sm:mb-32 lg:mb-36 p-8 sm:p-14 fs-card">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#D57C63] block mb-1">
              • Full Stack Data Architecture •
            </span>
            <h2 className="font-heading font-extrabold text-[28px] sm:text-[36px] fs-heading mt-1 mb-3.5">
              How the Full Stack Works Together
            </h2>
            <p className="text-[15.5px] sm:text-[17px] fs-body">
              Real-time visualization of client requests passing through the API gateway to the database.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 1: Client */}
            <div className="fs-node-card p-6 rounded-2xl text-center relative transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-[#D57C63]/15 mx-auto flex items-center justify-center text-[#D57C63] mb-4">
                <Layout className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold text-[#D57C63] uppercase tracking-wider">Step 1: Client</div>
              <h4 className="font-extrabold text-lg fs-heading mt-1.5 mb-2">React.js Frontend</h4>
              <p className="text-xs sm:text-[13px] fs-body leading-relaxed">
                User interacts with responsive UI, triggering state updates and HTTP requests.
              </p>
            </div>

            {/* Step 2: REST API */}
            <div className="fs-node-card p-6 rounded-2xl text-center relative transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-[#D57C63]/15 mx-auto flex items-center justify-center text-[#D57C63] mb-4">
                <Cpu className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold text-[#D57C63] uppercase tracking-wider">Step 2: API Gateway</div>
              <h4 className="font-extrabold text-lg fs-heading mt-1.5 mb-2">RESTful Endpoints</h4>
              <p className="text-xs sm:text-[13px] fs-body leading-relaxed">
                JSON payloads transmitted over HTTPS with JWT authentication headers.
              </p>
            </div>

            {/* Step 3: Node Server */}
            <div className="fs-node-card p-6 rounded-2xl text-center relative transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-[#D57C63]/15 mx-auto flex items-center justify-center text-[#D57C63] mb-4">
                <Server className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold text-[#D57C63] uppercase tracking-wider">Step 3: Server</div>
              <h4 className="font-extrabold text-lg fs-heading mt-1.5 mb-2">Node &amp; Express</h4>
              <p className="text-xs sm:text-[13px] fs-body leading-relaxed">
                Validates input, processes business logic, and manages controller rules.
              </p>
            </div>

            {/* Step 4: MongoDB */}
            <div className="fs-node-card p-6 rounded-2xl text-center relative transition-all hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-[#D57C63]/15 mx-auto flex items-center justify-center text-[#D57C63] mb-4">
                <Database className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold text-[#D57C63] uppercase tracking-wider">Step 4: Storage</div>
              <h4 className="font-extrabold text-lg fs-heading mt-1.5 mb-2">MongoDB Cluster</h4>
              <p className="text-xs sm:text-[13px] fs-body leading-relaxed">
                Persists collections, performs atomic CRUD queries, and returns records.
              </p>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. FULL STACK PROJECTS SHOWCASE */}
        {/* ======================================================== */}
        <section id="fullstack-projects" className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full fs-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <Monitor className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Full Stack Portfolio</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight fs-heading mb-4">
              Featured Web Applications
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed fs-body">
              Explore real live projects built with React.js, Node.js, Express, and MongoDB.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {fullStackProjects.map((proj, idx) => (
              <div
                key={proj.id}
                itemScope
                itemType="https://schema.org/SoftwareApplication"
                className="reveal-up fs-card p-8 sm:p-10 flex flex-col justify-between"
                style={{ transitionDelay: `${idx * 140}ms` }}
              >
                <meta itemProp="applicationCategory" content="WebApplication" />
                <meta itemProp="operatingSystem" content="All modern web browsers" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="fs-badge px-3.5 py-1.5 rounded-full text-xs font-bold">
                      {proj.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-bold fs-subtext">
                      {proj.client}
                    </span>
                  </div>

                  <h3 itemProp="name" className="font-heading font-extrabold text-2xl sm:text-3xl fs-heading mb-4">
                    {proj.title}
                  </h3>

                  <p itemProp="description" className="text-[15px] sm:text-[16px] leading-relaxed fs-body mb-7">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mb-7">
                    {proj.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="fs-pill px-3 py-1 rounded-lg text-xs font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[var(--line)] flex items-center justify-between">
                  <a
                    itemProp="url"
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#D57C63] hover:underline"
                  >
                    <span>View Live Application</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <span className="text-xs sm:text-sm font-bold fs-subtext">
                    Verified Deployment
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 7. FULL STACK PRICING PACKAGES */}
        {/* ======================================================== */}
        <section id="fullstack-pricing" className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full fs-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <Zap className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Full Stack JavaScript Packages</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight fs-heading mb-4">
              Full Stack Development Pricing Plans
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed fs-body">
              Production-grade engineering packages tailored for your web application. From single-page apps to full-scale MERN platforms.
            </p>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {fullStackPricingPlans.map((plan, idx) => (
              <div
                key={plan.id}
                itemScope
                itemType="https://schema.org/Offer"
                className={`reveal-up fs-card p-8 sm:p-9 relative flex flex-col justify-between ${
                  plan.popular
                    ? 'border-[#D57C63] shadow-[0_0_40px_rgba(213,124,99,0.3)]'
                    : ''
                }`}
                style={{ transitionDelay: `${idx * 130}ms` }}
              >
                {/* Schema Offer Meta */}
                <meta itemProp="priceCurrency" content="USD" />
                <meta itemProp="price" content={plan.price.replace('$', '').replace('+', '')} />
                <meta itemProp="availability" content="https://schema.org/InStock" />
                <link itemProp="url" href="https://rahilakareem.com/#fullstack-pricing" />

                {/* Popular / Recommended Badge */}
                {plan.popular && (
                  <span className="absolute -top-3.5 right-6 rtl:right-auto rtl:left-6 bg-gradient-to-r from-[#D57C63] to-[#e28e77] text-white font-bold text-xs px-4 py-1 rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="fs-badge px-3 py-1 rounded-full text-xs font-bold">
                      {plan.delivery}
                    </span>
                  </div>

                  <h3 itemProp="name" className="font-heading font-extrabold text-2xl fs-heading mb-2">
                    {plan.name}
                  </h3>

                  <div className="font-heading font-extrabold text-[40px] text-[#D57C63] my-2">
                    {plan.price}
                  </div>

                  <p itemProp="description" className="text-[14.5px] fs-subtext mb-6 leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Features List */}
                  <div className="pt-4 border-t border-[var(--line)] mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] fs-bullet leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#D57C63] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (setSelectedPlan) {
                      setSelectedPlan(`${plan.name} (${plan.price})`);
                    }
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full py-3.5 px-6 rounded-full text-sm sm:text-base font-bold transition-all cursor-pointer ${
                    plan.popular
                      ? 'glow-btn'
                      : 'fs-btn-secondary hover:border-[#D57C63]'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Banner Linking directly to SEO Specialist and Main Pricing */}
          <div className="reveal-up mt-14 p-8 sm:p-10 rounded-[28px] fs-node-card flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-[#D57C63]/30">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#D57C63] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Explore Other Services &amp; Packages</span>
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl fs-heading mb-2">
                Looking for SEO Rankings or Main Pricing?
              </h3>
              <p className="text-sm sm:text-[15px] fs-body max-w-2xl leading-relaxed">
                Looking for Google rankings, keyword research, and on-page technical audits? Explore our dedicated SEO Specialist page ($40, $60, $100) or check the main pricing page.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('seo');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="glow-btn px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>SEO Specialist Page</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('pricing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full border border-[#D57C63]/40 text-[#f7ede3] hover:border-[#D57C63] text-xs sm:text-sm font-bold cursor-pointer transition-all"
              >
                <span>Main Pricing</span>
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8. FREQUENTLY ASKED QUESTIONS (GOOGLE FAQ SCHEMA COMPLIANT) */}
        {/* ======================================================== */}
        <section
          id="fullstack-faq"
          itemScope
          itemType="https://schema.org/FAQPage"
          className="mb-24 sm:mb-32 lg:mb-36 scroll-mt-28"
        >
          <div className="reveal-up text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full fs-badge text-xs font-bold uppercase tracking-wider mb-3.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>Full Stack Development FAQs</span>
            </div>
            <h2 className="font-heading font-extrabold text-[30px] sm:text-[42px] leading-tight fs-heading mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed fs-body">
              Everything you need to know about our Full Stack JavaScript development, architecture, security, and project delivery.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {fullStackFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.id}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  className="reveal-up fs-card rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ transitionDelay: `${idx * 70}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-6 sm:p-7 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-[#D57C63]/5 transition-colors"
                  >
                    <span
                      itemProp="name"
                      className="font-heading font-extrabold text-base sm:text-lg fs-heading pr-2"
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
                        className="text-sm sm:text-[15px] fs-body leading-relaxed"
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
        {/* 9. CALL TO ACTION BANNER */}
        {/* ======================================================== */}
        <section className="reveal-up p-10 sm:p-16 rounded-[32px] bg-gradient-to-r from-[#D57C63] to-[#b85b42] text-white text-center relative overflow-hidden shadow-[0_24px_60px_rgba(213,124,99,0.42)]">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/12 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-[32px] sm:text-[44px] leading-tight mb-5 text-white">
              Have a Web Application Idea in Mind?
            </h2>
            <p className="text-white/95 text-base sm:text-lg mb-9 leading-relaxed font-medium">
              Let's engineer your next digital platform with React.js, Node.js, and MongoDB. Fast response, scalable code, and 100% satisfaction guaranteed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fs-cta-whatsapp-btn px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-base font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2.5 cursor-pointer"
                style={{ color: '#b85c43' }}
              >
                <MessageSquare className="w-5 h-5" style={{ color: '#b85c43' }} />
                <span style={{ color: '#b85c43' }}>Chat on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white/15 text-base font-bold transition-all cursor-pointer hover:-translate-y-1"
              >
                <span>Send Direct Inquiry</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* ======================================================== */}
      {/* High-Contrast CSS for Day & Night Modes + Down-to-Up Animations */}
      {/* ======================================================== */}
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

/* ==========================================================
   DOWN-TO-UP HERO TEXT ENTRANCE & ROTATING TITLE ANIMATIONS (SLOW & SILKY)
   ========================================================== */
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
.anim-up-6 {
  animation: heroTextRevealUp 1.65s cubic-bezier(0.16, 1, 0.3, 1) 1.25s both;
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
.fs-heading {
  color: #ffffff !important;
}

.fs-body {
  color: #dcd0c4 !important;
}

.fs-subtext {
  color: #c9b9ac !important;
}

.fs-bullet {
  color: #f0e6dc !important;
}

.fs-number {
  color: #7a6659 !important;
}

.fs-card {
  background: #18110e;
  border: 1.5px solid #3d2b20;
  border-bottom: 4px solid #D57C63;
  border-radius: 28px;
  box-shadow: 0 16px 45px -8px rgba(0, 0, 0, 0.7), 0 0 25px rgba(213, 124, 99, 0.16);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
}

.fs-card:hover {
  transform: translateY(-8px) scale(1.012);
  border-color: #D57C63;
  box-shadow: 0 24px 55px -10px rgba(213, 124, 99, 0.38);
}

.fs-card:hover .fs-heading {
  color: #D57C63 !important;
}

.fs-card:hover .fs-number {
  color: #D57C63 !important;
}

.fs-node-card {
  background: #130d0a;
  border: 1.5px solid #33241b;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.fs-node-card:hover {
  border-color: #D57C63;
}

.fs-pill {
  background: #231813;
  border: 1.2px solid #422d22;
  color: #f7ede3;
}

.fs-pill:hover {
  border-color: #D57C63;
  color: #D57C63;
}

.fs-badge {
  background: rgba(213, 124, 99, 0.15);
  border: 1.5px solid rgba(213, 124, 99, 0.45);
  color: #D57C63;
}

.fs-status-pill {
  background: rgba(213, 124, 99, 0.12);
  border: 1.5px solid rgba(213, 124, 99, 0.4);
}

.fs-profile-stage {
  background: linear-gradient(155deg, rgba(28, 19, 15, 0.95) 0%, rgba(18, 12, 9, 0.98) 100%);
  border: 2px solid rgba(213, 124, 99, 0.35);
  border-bottom: 5px solid #D57C63;
  border-radius: 32px;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(213, 124, 99, 0.22);
}

.fs-profile-stage:hover {
  border-color: #D57C63;
  box-shadow: 0 28px 75px -10px rgba(213, 124, 99, 0.45);
}

.fs-float-badge {
  background: rgba(24, 17, 14, 0.92);
  border: 1.5px solid rgba(213, 124, 99, 0.45);
  color: #f7ede3;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.fs-float-badge-1 {
  animation: floatSlow1 3.5s ease-in-out infinite alternate;
}

.fs-float-badge-2 {
  animation: floatSlow2 4.2s ease-in-out infinite alternate 0.4s;
}

.fs-float-badge-3 {
  animation: floatSlow3 3.8s ease-in-out infinite alternate 0.8s;
}

.fs-float-badge-4 {
  animation: floatSlow4 4.5s ease-in-out infinite alternate 1.2s;
}

.fs-pedestal-bar {
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

.fs-profile-img-breathe {
  animation: profileBreathe 4.5s ease-in-out infinite alternate;
}

@keyframes spinSlower {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slower {
  animation: spinSlower 32s linear infinite;
}

.fs-btn-back {
  background: #18110e;
  border: 1.5px solid #3d2b20;
  color: #f7ede3;
}

.fs-btn-back:hover {
  border-color: #D57C63;
  color: #D57C63;
}

.fs-btn-secondary {
  background: #18110e;
  border: 1.5px solid #3d2b20;
  color: #f7ede3;
}

.fs-btn-secondary:hover {
  border-color: #D57C63;
  color: #D57C63;
}

.fs-btn-tertiary {
  background: transparent;
  border: 1.5px solid #3d2b20;
  color: #f7ede3;
}

.fs-btn-tertiary:hover {
  background: #18110e;
  border-color: #D57C63;
}

.fs-btn-service {
  background: #130d0a;
  border: 1.5px solid #33241b;
  color: #f7ede3;
}

.fs-btn-service:hover {
  background: #D57C63;
  border-color: #D57C63;
  color: #ffffff;
}

.fs-cta-whatsapp-btn {
  background: #ffffff !important;
  color: #b85c43 !important;
}

.fs-cta-whatsapp-btn *,
.fs-cta-whatsapp-btn span,
.fs-cta-whatsapp-btn svg {
  color: #b85c43 !important;
  stroke: #b85c43 !important;
}

.fs-cta-whatsapp-btn:hover {
  background: #fdf5f2 !important;
}

.fs-cta-whatsapp-btn:hover *,
.fs-cta-whatsapp-btn:hover span,
.fs-cta-whatsapp-btn:hover svg {
  color: #8c3620 !important;
  stroke: #8c3620 !important;
}

:root[data-theme="light"] .fs-cta-whatsapp-btn,
:root[data-theme="light"] .fs-cta-whatsapp-btn *,
:root[data-theme="light"] .fs-cta-whatsapp-btn span,
:root[data-theme="light"] .fs-cta-whatsapp-btn svg {
  color: #a84105 !important;
  stroke: #a84105 !important;
}

/* ==========================================================
   DAY / LIGHT MODE HIGH CONTRAST OVERRIDES
   ========================================================== */
:root[data-theme="light"] .fs-heading {
  color: #0f0905 !important;
}

:root[data-theme="light"] .fs-body {
  color: #1f140c !important;
  font-weight: 500 !important;
}

:root[data-theme="light"] .fs-subtext {
  color: #3d2c20 !important;
  font-weight: 600 !important;
}

:root[data-theme="light"] .fs-bullet {
  color: #140d07 !important;
  font-weight: 600 !important;
}

:root[data-theme="light"] .fs-number {
  color: #b09e91 !important;
}

:root[data-theme="light"] .fs-card {
  background: #ffffff !important;
  border: 1.5px solid #decbb8 !important;
  border-bottom: 4px solid #cf5208 !important;
  border-radius: 28px !important;
  box-shadow: 0 12px 36px -6px rgba(0, 0, 0, 0.09), 0 4px 14px -2px rgba(207, 82, 8, 0.08) !important;
}

:root[data-theme="light"] .fs-card:hover {
  transform: translateY(-8px) scale(1.012) !important;
  border-color: #cf5208 !important;
  box-shadow: 0 24px 52px -8px rgba(207, 82, 8, 0.24) !important;
}

:root[data-theme="light"] .fs-card:hover .fs-heading {
  color: #cf5208 !important;
}

:root[data-theme="light"] .fs-card:hover .fs-number {
  color: #cf5208 !important;
}

:root[data-theme="light"] .fs-node-card {
  background: #faf4ee !important;
  border: 1.5px solid #e2d2c1 !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04) !important;
}

:root[data-theme="light"] .fs-node-card:hover {
  border-color: #cf5208 !important;
}

:root[data-theme="light"] .fs-pill {
  background: #f7eee4 !important;
  border: 1.5px solid #d8c3af !important;
  color: #180e07 !important;
  font-weight: 700 !important;
}

:root[data-theme="light"] .fs-pill:hover {
  border-color: #cf5208 !important;
  color: #cf5208 !important;
  background: #fdf5ef !important;
}

:root[data-theme="light"] .fs-badge {
  background: #fbeee5 !important;
  border: 1.5px solid #dcbfa8 !important;
  color: #9c3305 !important;
  font-weight: 700 !important;
}

:root[data-theme="light"] .fs-status-pill {
  background: #fbeef5 !important;
  border: 1.5px solid #dcbfa8 !important;
}

:root[data-theme="light"] .fs-profile-stage {
  background: linear-gradient(155deg, #ffffff 0%, #fff7f2 100%) !important;
  border: 2px solid #decbb8 !important;
  border-bottom: 5px solid #cf5208 !important;
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.12), 0 4px 20px rgba(207, 82, 8, 0.12) !important;
}

:root[data-theme="light"] .fs-profile-stage:hover {
  border-color: #cf5208 !important;
  box-shadow: 0 28px 65px -10px rgba(207, 82, 8, 0.28) !important;
}

:root[data-theme="light"] .fs-float-badge {
  background: rgba(255, 255, 255, 0.96) !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}

:root[data-theme="light"] .fs-pedestal-bar {
  background: #fdf2e9 !important;
  border: 1.5px solid #dcbfa8 !important;
  color: #140d07 !important;
}

:root[data-theme="light"] .fs-btn-back {
  background: #ffffff !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
}

:root[data-theme="light"] .fs-btn-back:hover {
  border-color: #cf5208 !important;
  color: #cf5208 !important;
}

:root[data-theme="light"] .fs-btn-secondary {
  background: #ffffff !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
}

:root[data-theme="light"] .fs-btn-secondary:hover {
  border-color: #cf5208 !important;
  color: #cf5208 !important;
}

:root[data-theme="light"] .fs-btn-tertiary {
  background: transparent !important;
  border: 1.5px solid #decbb8 !important;
  color: #140d07 !important;
}

:root[data-theme="light"] .fs-btn-tertiary:hover {
  background: #f7eee4 !important;
  border-color: #cf5208 !important;
}

:root[data-theme="light"] .fs-btn-service {
  background: #f8efe6 !important;
  border: 1.5px solid #dfcfbf !important;
  color: #140d07 !important;
  font-weight: 700 !important;
}

:root[data-theme="light"] .fs-btn-service:hover {
  background: #cf5208 !important;
  border-color: #cf5208 !important;
  color: #ffffff !important;
}
`;
