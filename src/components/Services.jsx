import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  X,
  ArrowRight,
  Globe,
  Layout,
  ShoppingBag,
  RefreshCw,
  Gauge,
  Wrench,
  Search,
  FileCheck,
  Cpu,
  ShieldCheck,
  Code2,
  Link2,
  Terminal,
  Layers,
  Server,
  Database,
  Bug,
  Sparkles,
  Zap,
  TrendingUp,
  ExternalLink,
  Smartphone,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  Check,
  Clock,
  Send,
  Eye,
  FileCode,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { personalInfo } from '../data/portfolioData';

// 1. WordPress Services (6 Cards)
const wordpressServicesData = [
  {
    id: 'wp-1',
    title: 'WordPress Website Design',
    description:
      'Create professional, responsive WordPress websites for businesses, agencies, and personal brands.',
    buttonText: 'Learn More',
    actionType: 'wordpress',
    image:
      'https://images.openai.com/static-rsc-4/b1hJFWJ4kSrKqHbeeOjDY1crYZiumbXZgDcVvAEoZPN3aqOFYA7gaeVD4ezC9PP9aZzyTrJ2kzt8gddBpP9tDRwoLQX8beTGFwBdHL1YhCckhBuIBtHka8Aip-HElpj1TqW_Xn2aSEmu2H9KeYNalj_vqcI5Ii5GYom-hg5gX0Y?purpose=inline',
    icon: Globe,
    badge: 'WordPress',
  },
  {
    id: 'wp-2',
    title: 'Elementor & WPBakery Design',
    description:
      'Design attractive landing pages and customize WordPress layouts to match your brand identity.',
    buttonText: 'Learn More',
    actionType: 'wordpress',
    image:
      'https://images.openai.com/static-rsc-4/HiRg5NV6UwpJva07NLTiVRszakBasJ8kp3hJyDM-TMKY-cLMhSugI-sR85PhCa-ZMFoArmdlfzrzzPVeY4XlmwzoluVY2CWcQBdSsJPjx39YYcbRX2iUgUrb0gK3rlzK7J5ry2QN1eu6EJqjI3qRDCB9zQZBcAnlCreQFqM4-v8?purpose=inline',
    icon: Layout,
    badge: 'Elementor',
  },
  {
    id: 'wp-3',
    title: 'WooCommerce Store Development',
    description:
      'Set up online stores with product pages, categories, shopping carts, and checkout functionality.',
    buttonText: 'Get Service',
    actionType: 'contact',
    image:
      'https://images.openai.com/static-rsc-4/IZTAAlhsC4-1tCdnKU_qd0AT-gdWy7aAaLVnMT-53lNgqMTSYz_BqYPWEHSMxoXMBV4EiOSVfH2nW4peiCI4tja_yjz6W-YqApOTqSuBps3I-4oj-m1PfF0yH_kdCaD3FgmJgsmBi3l1uQX6dUAgLxilkG1Ec8mOiSerazB18yE?purpose=inline',
    icon: ShoppingBag,
    badge: 'WooCommerce',
  },
  {
    id: 'wp-4',
    title: 'Website Redesign & Customization',
    description:
      'Refresh outdated websites with modern layouts, improved navigation, and responsive design.',
    buttonText: 'Get Service',
    actionType: 'contact',
    image:
      'https://images.openai.com/static-rsc-4/sa_fNyzF2Wl6yRPtiySXK6QsSuTuU008HRDhzTjujdYbozwlVtpJ6LhLq6PoiFvWgJR4RGSs_DgcfQL0-FJ0hsumkYkNzkfSoDuUaG1KSPxV6s0Z2BYhPWfe3pKpqSiApMjt4qDsNUeLy1dDRTIpfZdnJkcyGhQd1KlejRsx6oM?purpose=inline',
    icon: RefreshCw,
    badge: 'Redesign',
  },
  {
    id: 'wp-5',
    title: 'WordPress Speed Optimization',
    description:
      'Identify performance issues and optimize images, caching, and other website elements to improve loading speed.',
    buttonText: 'Get Service',
    actionType: 'contact',
    image:
      'https://images.openai.com/static-rsc-4/QQT1V4AL7K0tlaICFQJt2q-bAEKwRsFtwkG2Jnl5ffxBzbPDNoSdFhWB971I_zmVj6ICbal2XiEysrbcMfmNNwTCGVcfzwh8K67xDug-DFfKd0UTu6NYWNaCJ4dPIn3mYFnPVliKFYmXg1cgmuEcXy1uIJVv2ALNDJ9eGv9C4SU?purpose=inline',
    icon: Gauge,
    badge: 'Speed Boost',
  },
  {
    id: 'wp-6',
    title: 'WordPress Maintenance & Migration',
    description:
      'Help with WordPress updates, backups, hosting setup, and website migration.',
    buttonText: 'Get Service',
    actionType: 'contact',
    image:
      'https://images.openai.com/static-rsc-4/igmNLf54uEq5By9dWVF49menxzKm9JRT_rUSPI6nnJqa12xnxr_5WM2yJyDZEzv-lamR1fxqOVxrYBvNsjkkJGua5B8ldXufenqDZu7DQzulfX-fvL_OyaFsLekqp02xMju884pKbQzvOApp_DhCea3NAwyuYSZOmwEQnL8YWjM?purpose=inline',
    icon: Wrench,
    badge: 'Maintenance',
  },
];

// 2. SEO Services (6 Cards)
const seoServicesData = [
  {
    id: 'seo-1',
    title: 'Keyword Research',
    description:
      'Discover relevant keywords based on search intent, competition, and your business goals.',
    buttonText: 'Learn More',
    actionType: 'seo',
    image:
      'https://images.openai.com/static-rsc-4/-xBRi-lT69dWt1uFhJH05PajC7QBqDMY-9zqEN4vq7bcz0q470DoOI0NTKmgljlbIjuPiGw_VtqWLgcaORYjwhd1yO7xXFoW73xU21KosfoDYL27pyz8uMuFdjx-v0bviH_4quP02t4oPf8nu5euk2_n-JyDDU587Vq_epMwHBk?purpose=inline',
    icon: Search,
    badge: 'Keyword Intent',
  },
  {
    id: 'seo-2',
    title: 'On-Page SEO',
    description:
      'Optimize page titles, meta descriptions, headings, URLs, images, and internal links.',
    buttonText: 'Get SEO Services',
    actionType: 'contact',
    image:
      'https://images.openai.com/static-rsc-4/qf1gd-su5rgnkoSqbGmDAehJ1yWkwhL5R-JJ1DxfqOG6aBpzvQrU5HMCb2AleJTClnAG0Gb-LsoSNnS9qZH22o0yk33NWsZqs9pmgaRY8o4nLkUvANZ3hftlwmjvbuskrQWGC0XOfVyvISfDPJAKWR2wUwvNWUM_11ROQIvoA2A?purpose=inline',
    icon: FileCheck,
    badge: 'On-Page',
  },
  {
    id: 'seo-3',
    title: 'Technical SEO',
    description:
      'Review crawling, indexing, sitemaps, robots.txt, mobile usability, and website performance.',
    buttonText: 'Learn More',
    actionType: 'seo',
    image:
      'https://images.openai.com/static-rsc-4/ujUj-roRYyqLM9Ze2rOU2G25FmAJtKr3RdGc9F7XlqeFnRdXyFzAIDDd9qRibwLmDSnxiZB9CWVDdYvkc7f9BJnW1y9H7wk3AjsdXvqr1rkcN8xLsJJdMaFNk1rgVGmui2c0ySmmhE4zyoawotqeXKVrmdkTInrjNvTHsBv7FWs?purpose=inline',
    icon: Cpu,
    badge: 'Technical',
  },
  {
    id: 'seo-4',
    title: 'Website SEO Audit',
    description:
      'Identify SEO issues and provide actionable recommendations to improve website optimization.',
    buttonText: 'Get SEO Audit',
    actionType: 'contact',
    image:
      'https://images.openai.com/static-rsc-4/ZCzbycaWDtoSXMnCb3yYPoIJRBn_7qEeSeId4CaZMv9ATMc17jM_jLeqNXY7jJAjwlPfVoIMzxDSfbPmG7evubv7o1mMIwloL-sih-7qexOXa7ePb64EmiszBfQfh0XdyJY-I7v-03RAaAOjA5eQDgd3e277MGkL4_UhccR_7Xo?purpose=inline',
    icon: ShieldCheck,
    badge: 'Full Audit',
  },
  {
    id: 'seo-5',
    title: 'Schema Markup',
    description:
      'Implement relevant structured data to help search engines understand your website content.',
    buttonText: 'Learn More',
    actionType: 'seo',
    image:
      'https://images.openai.com/static-rsc-4/8Xn4OBPL9rdzcw_KvA2q7ch_yV-LZWaYczj0kYHUZRjXSqJuvRZbQzMolDvijKolgCD6HmDC_lcUo-Yb8BPHzv0VKAC3CH4a8q0wsxzarQ3Xkij1A8bNxSQ9hhCwKXD_gSF-bdmvCIH5Yfls1bSwSKNIhTmAKfX0DjZ-Mzp2-GI?purpose=inline',
    icon: Code2,
    badge: 'JSON-LD',
  },
  {
    id: 'seo-6',
    title: 'Off-Page SEO & Guest Posting',
    description:
      'Research relevant outreach opportunities and support link-building strategies through niche-relevant placements.',
    buttonText: 'Get SEO Services',
    actionType: 'contact',
    image:
      'https://images.openai.com/static-rsc-4/OsU3txtRF0nzzCdAioYErww-ISWCserEUzgWtsItRg0yOK0H7EN_L4w6qFPiHPutmAW1vDeEH9A9EhKh1LbTSrV39S4f5WEomMWm0XTqb7yKq7b0GwzZ96TPufYIxU4DUzQgrzOmjBTcU8iDZZ1PWeHlTWmrgR6g8s0wjEzM3Og?purpose=inline',
    icon: Link2,
    badge: 'GBOB & Links',
  },
];

// 3. Full Stack JavaScript Services (6 Cards)
const fullstackServicesData = [
  {
    id: 'fs-1',
    title: 'Frontend Development',
    description:
      'Build responsive and interactive website interfaces using HTML, CSS, JavaScript, and React.js.',
    buttonText: 'View Projects',
    actionType: 'portfolio',
    image:
      'https://images.openai.com/static-rsc-4/0I5lXil72Eg8k0drdcpx63JZSNhbv67dpZYRnohbS1shwWX7MqAV_qDVaBf3g2u1bDi_-cQrLuMciuvIICNkFHh2ZuX8Un31ujRCWAS-UapC4aEOwiVPY3BxNqfNXHADEUWbcykvyNO-pojsEphnt8qGPYzr47OxjXS7otz8-hE?purpose=inline',
    icon: Layout,
    badge: 'Frontend UI',
  },
  {
    id: 'fs-2',
    title: 'React.js Web Development',
    description:
      'Create reusable components, dynamic pages, navigation, and interactive user interfaces with React.js.',
    buttonText: 'View Projects',
    actionType: 'portfolio',
    image:
      'https://images.openai.com/static-rsc-4/UuP_Nho7QABIWfJBtOvgzuutyOAdmW7aLxDTxb5YW8uHpiAWDJtSMPAaYhB-txRyP4P89NLw1giXtSDBaLWxxr0IXDj745qKOraJKx2BnieSLBaTRY_r3500WLsf7DxfyNgKYFY59-ta_8n822CNJ3FCB-16xw5QlMBV8Fh_kVA?purpose=inline',
    icon: Layers,
    badge: 'React.js',
  },
  {
    id: 'fs-3',
    title: 'Backend Development',
    description:
      'Develop server-side functionality and REST APIs using Node.js and Express.js.',
    buttonText: 'Learn More',
    actionType: 'fullstack',
    image:
      'https://images.openai.com/static-rsc-4/0Oi0k1bmn7nTYvt7FwMobxgMf4ujPvFf3cwkc1-MQDc3qvEUYTNX6jxW89DxskA-BGVwukYw1pXVFSnmEyd4pMAsJOD9P4I0kRiakjLRG0E8o7xKeOpWWRKdtD3J_2fQ-sAYP1_Ubdq-4KqM54sZ43TB2EgMwNmk6SkaQEfMEXU?purpose=inline',
    icon: Server,
    badge: 'Node / Express',
  },
  {
    id: 'fs-4',
    title: 'Database Integration',
    description:
      'Connect web applications with MongoDB to store, retrieve, update, and manage data.',
    buttonText: 'Learn More',
    actionType: 'fullstack',
    image:
      'https://images.openai.com/static-rsc-4/idfqdUHeMRY3vvqkEQugnjfRs76aEuAqYKsqE_HEnNFY036m53kW40hMzjlkZmZmE6PGKGfZ6a1EfjqsDo6Di7qV-k1Bjn1BlLTMEYNdwWUNqXfNXexcKFGajXqSn8-k1AClyC3oJ40DGzevqzDBahZaG-LCZCTlQOtOYTDPBjM?purpose=inline',
    icon: Database,
    badge: 'MongoDB',
  },
  {
    id: 'fs-5',
    title: 'Full Stack Web Applications',
    description:
      'Develop small web applications with frontend, backend, database integration, and CRUD functionality.',
    buttonText: 'View Projects',
    actionType: 'portfolio',
    image:
      'https://images.openai.com/static-rsc-4/gCzGjIZtJesZLiaX64zHTYmCzeRynCsWMUX5CCTEE2Vc3XAy6GCyL2VAal0OCoG-DeYlYVDXWThWOBrtZR7kHpQiKTMg-fGrbErWDiA7_94gNaYM5wBr7KUteBQxKgRxXeJFcIRZ8TbujOeJV9epzR0jQtJvIDUUGYqIuK8P3Y8?purpose=inline',
    icon: Terminal,
    badge: 'MERN Stack',
  },
  {
    id: 'fs-6',
    title: 'API Integration & Bug Fixing',
    description:
      'Integrate APIs, troubleshoot frontend and backend issues, and improve existing web application functionality.',
    buttonText: 'Get Started',
    actionType: 'contact',
    image:
      'https://images.openai.com/static-rsc-4/Tv2uRpQPWo9OhQoEprUo8lFfzRnT9NBDGD9AyibDnQVdqNDxUg7pYjklIWCUjH5dQ7JB7tyQbBKqJ4IpLNR7LIlavXm5YfXW-Rs-3sC43Fdt01Id9XT_a-yn3RgiZtNSQ51w5ZtWwlC_XlnO11QGwtUkPp6LFmQpNVbUE1h7zFg?purpose=inline',
    icon: Bug,
    badge: 'Debugging',
  },
];

// 3. Why Choose My Services Data
const whyChooseData = [
  {
    id: 'wc-1',
    title: 'Responsive Design',
    description: 'Websites designed to work smoothly on mobile, tablet, and desktop.',
    icon: Smartphone,
    badge: 'Cross-Device',
  },
  {
    id: 'wc-2',
    title: 'SEO-Friendly Approach',
    description: 'Clean website structure and SEO best practices to support search visibility.',
    icon: TrendingUp,
    badge: 'Search Visibility',
  },
  {
    id: 'wc-3',
    title: 'Clean & Maintainable Code',
    description: 'Organized code and practical solutions based on project requirements.',
    icon: Code2,
    badge: 'Clean Architecture',
  },
  {
    id: 'wc-4',
    title: 'Clear Communication',
    description: 'Clear project requirements, regular updates, and agreed deliverables.',
    icon: MessageSquare,
    badge: 'Transparency',
  },
];

// 4. My Work Process (4 Steps)
const workProcessSteps = [
  {
    step: '01',
    title: 'Discovery',
    subtitle: 'Understanding Requirements',
    description: 'Understanding client requirements, business goals, target audience, and project scope.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Planning',
    subtitle: 'Solution Blueprint',
    description: 'Planning page structure, wireframe layout, technology stack, and SEO keyword mapping.',
    icon: Layout,
  },
  {
    step: '03',
    title: 'Development & Optimization',
    subtitle: 'Building with Quality',
    description: 'Building custom website layouts, writing clean code, or executing on-page/technical SEO.',
    icon: Terminal,
  },
  {
    step: '04',
    title: 'Testing & Delivery',
    subtitle: 'Bug Fixing & Launch',
    description: 'Comprehensive cross-device testing, performance audits, bug fixing, and final delivery.',
    icon: CheckCircle2,
  },
];

// 5. Pricing Plans Data
const pricingPackages = {
  wordpress: [
    {
      name: 'Basic WordPress',
      price: '$40',
      period: 'single project',
      description: 'Perfect for single landing pages or quick website setups.',
      features: [
        '1-3 Responsive Pages',
        'Elementor / Gutenberg Layout',
        'Mobile & Tablet Optimization',
        'Contact Form Integration',
        'Basic Speed Optimization',
        '3 Days Delivery',
      ],
      popular: false,
    },
    {
      name: 'Standard Business',
      price: '$60',
      period: 'complete website',
      description: 'Ideal for small businesses and personal portfolio brands.',
      features: [
        'Up to 5 Custom Pages',
        'Theme Customization & Styling',
        'WooCommerce Setup (up to 10 products)',
        'Basic On-Page SEO Setup',
        'Social Media & WhatsApp Integration',
        '5 Days Delivery',
      ],
      popular: true,
    },
    {
      name: 'Premium E-Commerce',
      price: '$100',
      period: 'turnkey store',
      description: 'Full-featured online store or corporate business website.',
      features: [
        'Up to 10 Pages + Full Store',
        'WooCommerce + Payment Gateways',
        'Speed Tuning (90+ Score)',
        'Advanced On-Page SEO & Schema',
        'Hosting & Domain Setup Support',
        '7 Days Delivery + 14 Days Support',
      ],
      popular: false,
    },
  ],
  seo: [
    {
      name: 'Basic SEO Starter',
      price: '$40',
      period: 'one-time setup',
      description: 'Essential SEO audit and baseline keyword optimization.',
      features: [
        'Full Website SEO Audit',
        '10 Target Keywords Researched',
        '3 Pages On-Page SEO (Meta/H1)',
        'Image Alt Tag Optimization',
        'Actionable Recommendation Report',
        '3 Days Delivery',
      ],
      popular: false,
    },
    {
      name: 'Standard Complete SEO',
      price: '$60',
      period: 'in-depth campaign',
      description: 'Comprehensive optimization for growing websites and blogs.',
      features: [
        'Everything in Basic Plan',
        '20 Keywords + Search Intent',
        '5 Pages Complete On-Page SEO',
        'Technical SEO & Sitemap/Robots.txt',
        'Basic Schema Markup (JSON-LD)',
        '5 Days Delivery',
      ],
      popular: true,
    },
    {
      name: 'Premium SEO & Backlinks',
      price: '$100',
      period: 'maximum authority',
      description: 'Deep technical audits combined with off-page link outreach.',
      features: [
        'Everything in Standard Plan',
        '40 High-Value Keywords',
        '10 Pages On-Page Optimization',
        'High DA Guest Posting Outreach (GBOB)',
        'Competitor Benchmark Analysis',
        'Full Ranking & Audit Report',
      ],
      popular: false,
    },
  ],
  fullstack: [
    {
      name: 'Frontend & API Starter',
      price: '$180',
      period: 'SPA application',
      description: 'Fast, responsive React.js frontend connected to REST APIs.',
      features: [
        'Modern React.js Application',
        'Tailwind CSS Responsive UI',
        'RESTful API Endpoints Integration',
        'Interactive State Management',
        'Clean Modular Codebase',
        '7 Days Delivery',
      ],
      popular: false,
    },
    {
      name: 'Full Stack MERN Platform',
      price: '$350',
      period: 'complete web app',
      description: 'Production-ready web application with Node, Express & MongoDB.',
      features: [
        'React.js Frontend + Express Backend',
        'MongoDB Atlas Database Architecture',
        'JWT User Authentication & Auth Guards',
        'CRUD Operations & Custom APIs',
        'Deployment on Vercel / Render',
        '12 Days Delivery',
      ],
      popular: true,
    },
    {
      name: 'Enterprise Custom SaaS',
      price: '$550',
      period: 'advanced system',
      description: 'Full-scale web platform with payment gateways and dashboards.',
      features: [
        'Enterprise MERN Web Platform',
        'Admin Dashboard & Role Management',
        'Payment Gateway Integration (Stripe)',
        'Cloud Database Clustering & Indexing',
        'API Security, Rate Limiting & Logs',
        '20 Days Delivery + Priority Support',
      ],
      popular: false,
    },
  ],
};

// 6. Portfolio / Recent Projects Data
const recentProjectsData = [
  {
    id: 'proj-1',
    title: 'Sketches Creative Agency, Dubai',
    category: 'WordPress Website',
    badge: 'WordPress • Elementor Pro',
    image:
      'https://images.openai.com/static-rsc-4/b1hJFWJ4kSrKqHbeeOjDY1crYZiumbXZgDcVvAEoZPN3aqOFYA7gaeVD4ezC9PP9aZzyTrJ2kzt8gddBpP9tDRwoLQX8beTGFwBdHL1YhCckhBuIBtHka8Aip-HElpj1TqW_Xn2aSEmu2H9KeYNalj_vqcI5Ii5GYom-hg5gX0Y?purpose=inline',
    role: 'WordPress Designer & Developer',
    description: 'Corporate agency portal with sleek portfolio showcases, custom typography, and responsive mobile layouts.',
    technologies: ['WordPress', 'Elementor Pro', 'Custom CSS', 'Speed Tuning'],
    verifiedResult: 'Live client agency website in UAE with sub-2s load time.',
    link: 'https://www.sketches.ae/',
  },
  {
    id: 'proj-2',
    title: 'TechSaaS Organic Search Audit',
    category: 'SEO Case Study',
    badge: 'SEO • Technical Audit',
    image:
      'https://images.openai.com/static-rsc-4/ZCzbycaWDtoSXMnCb3yYPoIJRBn_7qEeSeId4CaZMv9ATMc17jM_jLeqNXY7jJAjwlPfVoIMzxDSfbPmG7evubv7o1mMIwloL-sih-7qexOXa7ePb64EmiszBfQfh0XdyJY-I7v-03RAaAOjA5eQDgd3e277MGkL4_UhccR_7Xo?purpose=inline',
    role: 'SEO & Link Building Specialist',
    description: 'Full-scale technical crawl audit, on-page schema implementation, and high-DA backlink outreach strategy.',
    technologies: ['Ahrefs', 'Google Search Console', 'JSON-LD Schema', 'GBOB'],
    verifiedResult: 'Fixed 40+ crawl errors and boosted organic impressions.',
    link: '#',
  },
  {
    id: 'proj-3',
    title: 'University Transit & Bus Tracker',
    category: 'React.js Application',
    badge: 'React.js • Interactive UI',
    image:
      'https://images.openai.com/static-rsc-4/UuP_Nho7QABIWfJBtOvgzuutyOAdmW7aLxDTxb5YW8uHpiAWDJtSMPAaYhB-txRyP4P89NLw1giXtSDBaLWxxr0IXDj745qKOraJKx2BnieSLBaTRY_r3500WLsf7DxfyNgKYFY59-ta_8n822CNJ3FCB-16xw5QlMBV8Fh_kVA?purpose=inline',
    role: 'Frontend React Developer',
    description: 'Interactive real-time campus transit locator with dynamic map routes, search filters, and schedule alerts.',
    technologies: ['React.js', 'Tailwind CSS', 'OpenStreetMap', 'Vite'],
    verifiedResult: 'Production web app deployed with instant mobile responsiveness.',
    link: 'https://bustrak.vercel.app',
  },
  {
    id: 'proj-4',
    title: 'Travel Agency Booking Platform',
    category: 'Full Stack MERN Platform',
    badge: 'Full Stack • MongoDB',
    image:
      'https://images.openai.com/static-rsc-4/gCzGjIZtJesZLiaX64zHTYmCzeRynCsWMUX5CCTEE2Vc3XAy6GCyL2VAal0OCoG-DeYlYVDXWThWOBrtZR7kHpQiKTMg-fGrbErWDiA7_94gNaYM5wBr7KUteBQxKgRxXeJFcIRZ8TbujOeJV9epzR0jQtJvIDUUGYqIuK8P3Y8?purpose=inline',
    role: 'Full Stack JavaScript Developer',
    description: 'Complete tour booking portal featuring tour package catalogs, customer authentication, and MongoDB storage.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas'],
    verifiedResult: 'Full CRUD operations with secure REST API infrastructure.',
    link: 'https://saasecommerce.vercel.app',
  },
];

// 7. Frequently Asked Questions (7 Questions Requested by User)
const servicesFaqs = [
  {
    id: 'faq-1',
    question: 'What services do you offer?',
    answer:
      'I specialize in three core areas: (1) WordPress Website Design, Elementor landing pages, WooCommerce e-commerce stores, and speed optimization; (2) SEO Services including keyword research, on-page optimization, technical audits, schema markup, and off-page backlink outreach; and (3) Full Stack JavaScript Development with React.js, Node.js, Express.js, MongoDB, and REST API integration.',
  },
  {
    id: 'faq-2',
    question: 'How much does a website cost?',
    answer:
      'Pricing depends on the scope and features your project requires. For WordPress and SEO, affordable packages start from $40 (Basic), $60 (Standard), and $100 (Premium). For custom Full Stack web applications, packages range from $180 to $550+. We can also provide a transparent, customized quote for unique specifications.',
  },
  {
    id: 'faq-3',
    question: 'How long does a project take?',
    answer:
      'A standard WordPress landing page or basic website takes 3 to 5 business days. A multi-page corporate website or comprehensive SEO optimization takes 5 to 7 days, while custom Full Stack web applications take 7 to 15 days depending on backend complexity and database models.',
  },
  {
    id: 'faq-4',
    question: 'Do you provide website maintenance?',
    answer:
      'Yes! I provide continuous website maintenance including theme and plugin updates, automated security backups, hosting server configuration, performance speed reviews, bug fixing, and content updates to ensure smooth operation.',
  },
  {
    id: 'faq-5',
    question: 'Do you offer SEO audits?',
    answer:
      'Yes, absolutely. My SEO audits include comprehensive crawlability checks, indexing diagnostics, broken link detection, meta tags and heading analysis, schema markup validation, Core Web Vitals performance review, and competitor benchmarking with an actionable step-by-step roadmap.',
  },
  {
    id: 'faq-6',
    question: 'Can you fix bugs in an existing website?',
    answer:
      'Yes. Whether you are dealing with broken Elementor layouts, slow page loading, responsive display glitches, API integration errors, database query issues, or SEO indexing problems, I can troubleshoot and resolve them cleanly.',
  },
  {
    id: 'faq-7',
    question: 'How can I start a project?',
    answer:
      'Starting is very straightforward! Simply click the "Contact Me" button on this page or reach out via WhatsApp (+92 321 7812265) or email (rahilakareem389@gmail.com). We will discuss your goals, agree on timeline and deliverables, and commence work immediately.',
  },
];

// Reusable Compact 3D Service Card Component with Glare & Depth
const Service3DCard = ({ item, onAction, shadowClass = '' }) => {
  const [imgError, setImgError] = useState(false);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });
  const cardRef = useRef(null);
  const Icon = item.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.025, 1.025, 1.025)`
    );

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      opacity: 1,
      x: glareX,
      y: glareY,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
      className={`service-3d-card ${shadowClass} flex flex-col justify-between group cursor-pointer relative`}
    >
      {/* 3D Specular Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-[18px] transition-opacity duration-300"
        style={{
          opacity: glareStyle.opacity,
          background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.16), transparent 60%)`,
        }}
      />

      <div>
        {/* Compact Banner Image */}
        <div
          className="relative h-28 sm:h-32 w-full overflow-hidden bg-[#1f1510] border-b border-[var(--line)]"
          style={{ transform: 'translateZ(15px)' }}
        >
          {!imgError ? (
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#241510] to-[#140b07] text-[#D57C63]">
              <Icon className="w-8 h-8 mb-1 opacity-85" />
              <span className="text-[11px] font-semibold tracking-wide text-[var(--mute)]">
                {item.badge}
              </span>
            </div>
          )}

          {/* Floating 3D Badge on Top */}
          <div
            className="absolute top-2.5 left-2.5 z-10"
            style={{ transform: 'translateZ(30px)' }}
          >
            <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#140e0b]/85 backdrop-blur-md text-[#D57C63] border border-[#D57C63]/30 flex items-center gap-1 shadow-md">
              <Icon className="w-3 h-3 text-[#D57C63]" />
              <span>{item.badge}</span>
            </span>
          </div>
        </div>

        {/* Compact Centered Body Content */}
        <div className="p-4 sm:p-4.5 text-center flex flex-col items-center relative z-10">
          <h3
            className="font-heading font-bold text-[15px] sm:text-[16px] service-card-title mb-1.5 leading-snug transition-colors"
            style={{ transform: 'translateZ(24px)' }}
          >
            {item.title}
          </h3>
          <p
            className="text-[12.5px] sm:text-[13px] service-card-desc leading-relaxed line-clamp-2 transition-colors"
            style={{ transform: 'translateZ(16px)' }}
          >
            {item.description}
          </p>
        </div>
      </div>

      {/* Centered Compact Action Button */}
      <div className="px-4 pb-4 pt-1 relative z-10" style={{ transform: 'translateZ(28px)' }}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAction(item);
          }}
          className="service-card-btn w-full py-2 px-3 rounded-xl text-xs sm:text-[13px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <span>{item.buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// Reusable 3D Domain Hero Card Component
// Reusable 3D Domain Hero Card Component with Left-to-Right Orange Hover & Slow Orange Page Click
const DomainHero3DCard = ({ icon: Icon, badge, price, title, description, linkText, shadowClass = '', shadowName = '', onClick }) => {
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });
  const [isWiping, setIsWiping] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isWiping) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`
    );

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      opacity: 1,
      x: glareX,
      y: glareY,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0, x: 50, y: 50 });
  };

  const handleClick = (e) => {
    if (isWiping) return;
    setIsWiping(true);

    // Subtle audio click feedback
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.13);
      }
    } catch {}

    // Slow cinematic orange page opens left to right over 720ms
    setTimeout(() => {
      if (onClick) onClick(e);
      setTimeout(() => {
        setIsWiping(false);
      }, 350);
    }, 720);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ transform: transformStyle }}
      className={`service-domain-card ${shadowClass} p-6 sm:p-7 rounded-2xl cursor-pointer group flex flex-col justify-between relative min-h-[220px] select-none`}
    >
      {/* 1. Down-to-Up Hover Orange Backdrop is handled via CSS ::before */}

      {/* 2. Slow New Orange Page Wipe: Down to Up on Click with Pure White Text */}
      <div
        className={`pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-2xl transition-opacity duration-200 ${
          isWiping ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#c2410c]/85 via-[#ea580c]/85 to-[#f97316]/80 backdrop-blur-md flex flex-col justify-center items-center px-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_-6px_35px_rgba(0,0,0,0.5)] border-t-3 border-white/80"
          style={{
            height: isWiping ? '100%' : '0%',
          }}
        >
          <div className="flex items-center gap-2.5 text-white font-extrabold text-base tracking-wide uppercase drop-shadow-md">
            <Icon className="w-5 h-5 text-white animate-spin" />
            <span>Opening {title}...</span>
          </div>
          <p className="text-white/95 text-xs font-bold mt-1 drop-shadow-sm">
            {price} • 6 Deliverables
          </p>
          <div className="mt-2 text-[10px] uppercase tracking-widest font-extrabold px-3 py-0.5 rounded-full bg-white text-[#c2410c] shadow-md">
            Loading Catalog &darr;
          </div>
        </div>
      </div>

      {/* 3. Subtle 3D Glare */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glareStyle.opacity,
          background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.22), transparent 60%)`,
        }}
      />

      {/* 4. Card Content (Positioned above hover orange backdrop) */}
      <div className="relative z-10" style={{ transform: 'translateZ(18px)' }}>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="service-badge-pill px-3 py-1 rounded-full text-xs font-bold bg-[#D57C63]/15 text-[#D57C63] border border-[#D57C63]/30 flex items-center gap-1.5 shadow-sm transition-colors duration-300">
            <Icon className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </span>
          <span className="service-price-text text-xs text-[var(--mute)] font-semibold transition-colors duration-300">
            {price}
          </span>
        </div>
        <h3 className="service-card-title font-heading font-bold text-xl sm:text-2xl text-[var(--ink)] transition-colors duration-300 mb-2 text-left">
          {title}
        </h3>
        <p className="service-card-desc text-xs sm:text-[13.5px] text-[var(--mute)] leading-relaxed mb-4 text-left transition-colors duration-300">
          {description}
        </p>
      </div>

      <div
        className="service-link-row relative z-10 text-xs sm:text-sm font-bold text-[#D57C63] flex items-center justify-between pt-3 border-t border-[var(--line)] transition-colors duration-300"
        style={{ transform: 'translateZ(24px)' }}
      >
        <span className="flex items-center gap-2">
          <span>{linkText}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1.5 transition-transform" />
        </span>
        {shadowName && (
          <span className="text-[10px] font-semibold opacity-75 uppercase tracking-wider">
            {shadowName}
          </span>
        )}
      </div>
    </div>
  );
};

const Services = ({ setActiveTab, setSelectedPlan }) => {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [pricingCategory, setPricingCategory] = useState('wordpress');
  const [openFaq, setOpenFaq] = useState(0);
  const [activeSection, setActiveSection] = useState('services-hero');

  useEffect(() => {
    const sectionIds = [
      'services-hero',
      'main-services',
      'why-choose',
      'work-process',
      'pricing-plans',
      'recent-projects',
      'services-faq',
      'final-cta',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skillHeadings = [
    {
      id: 'all',
      sectionId: 'main-services',
      label: 'All Services (18)',
      icon: Sparkles,
      count: '18 Deliverables',
      badge: 'Full Suite',
    },
    {
      id: 'wordpress',
      sectionId: 'wordpress-services',
      label: 'WordPress Development',
      icon: Globe,
      count: '6 Services',
      badge: 'Plans from $40',
    },
    {
      id: 'seo',
      sectionId: 'seo-services',
      label: 'SEO Services',
      icon: TrendingUp,
      count: '6 Services',
      badge: 'Plans from $40',
    },
    {
      id: 'fullstack',
      sectionId: 'fullstack-services',
      label: 'Full Stack JavaScript',
      icon: Terminal,
      count: '6 Services',
      badge: 'Plans from $180',
    },
  ];

  const pageSectionLinks = [
    { id: 'services-hero', label: 'Hero Overview', icon: Sparkles },
    { id: 'main-services', label: 'Services Catalog', icon: Layers },
    { id: 'why-choose', label: 'Why Choose Me', icon: ShieldCheck },
    { id: 'work-process', label: 'Work Process', icon: Clock },
    { id: 'pricing-plans', label: 'Pricing Plans', icon: Zap },
    { id: 'recent-projects', label: 'Recent Projects', icon: Eye },
    { id: 'services-faq', label: 'FAQs & Answers', icon: HelpCircle },
    { id: 'final-cta', label: 'Get in Touch', icon: Send },
  ];

  const handleSkillSelect = (skillId, sectionId) => {
    setSelectedFilter(skillId);
    setTimeout(() => {
      const targetId = skillId === 'all' ? 'main-services' : sectionId;
      const el = document.getElementById(targetId);
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 60);
  };

  const handleSectionScroll = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleAction = (item) => {
    if (item.actionType === 'wordpress') {
      setActiveTab('wordpress');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.actionType === 'seo') {
      setActiveTab('seo');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.actionType === 'fullstack') {
      setActiveTab('fullstack');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.actionType === 'portfolio') {
      setActiveTab('portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.actionType === 'contact') {
      if (setSelectedPlan) {
        setSelectedPlan(`Service: ${item.title}`);
      }
      setActiveTab('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectPricingPlan = (planName, price) => {
    if (setSelectedPlan) {
      setSelectedPlan(`${planName} (${price})`);
    }
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filterButtons = [
    { id: 'all', label: 'All Services (18)', icon: Sparkles },
    { id: 'wordpress', label: 'WordPress Development (6)', icon: Globe },
    { id: 'seo', label: 'SEO Services (6)', icon: TrendingUp },
    { id: 'fullstack', label: 'Full Stack Development (6)', icon: Terminal },
  ];

  return (
    <section className="pt-24 pb-28 page-enter">
      {/* ======================================================== */}
      {/* GOOGLE SCHEMA MARKUP (JSON-LD) FOR 18 SERVICES & IMAGES */}
      {/* ======================================================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ItemList",
                "@id": "https://rahilakareem.com/#services-page-list",
                "name": "Comprehensive Portfolio Services & Offerings",
                "description":
                  "WordPress Design, SEO Specialist, and Full Stack JavaScript Development services by Rahila Kareem at Unity Space.",
                "numberOfItems": 18,
                "itemListElement": [
                  ...wordpressServicesData.map((item, idx) => ({
                    "@type": "ListItem",
                    "position": idx + 1,
                    "item": {
                      "@type": "Service",
                      "@id": `https://rahilakareem.com/#${item.id}`,
                      "name": item.title,
                      "serviceType": "WordPress Services",
                      "description": item.description,
                      "image": item.image,
                      "provider": {
                        "@type": "Person",
                        "name": "Rahila Kareem",
                        "url": "https://rahilakareem.com",
                      },
                      "url": "https://rahilakareem.com/#services",
                    },
                  })),
                  ...seoServicesData.map((item, idx) => ({
                    "@type": "ListItem",
                    "position": idx + 7,
                    "item": {
                      "@type": "Service",
                      "@id": `https://rahilakareem.com/#${item.id}`,
                      "name": item.title,
                      "serviceType": "SEO Services",
                      "description": item.description,
                      "image": item.image,
                      "provider": {
                        "@type": "Person",
                        "name": "Rahila Kareem",
                        "url": "https://rahilakareem.com",
                      },
                      "url": "https://rahilakareem.com/#services",
                    },
                  })),
                  ...fullstackServicesData.map((item, idx) => ({
                    "@type": "ListItem",
                    "position": idx + 13,
                    "item": {
                      "@type": "Service",
                      "@id": `https://rahilakareem.com/#${item.id}`,
                      "name": item.title,
                      "serviceType": "Full Stack JavaScript Services",
                      "description": item.description,
                      "image": item.image,
                      "provider": {
                        "@type": "Person",
                        "name": "Rahila Kareem",
                        "url": "https://rahilakareem.com",
                      },
                      "url": "https://rahilakareem.com/#services",
                    },
                  })),
                ],
              },
            ],
          }),
        }}
      />

      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        
        {/* Top Breadcrumb & Close Bar */}
        <div className="flex items-center justify-between pb-5 mb-8 border-b border-[var(--line)]">
          <div className="flex items-center gap-2 text-sm text-[var(--mute)]">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-[var(--org)] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{t('services.backOverview')}</span>
            </button>
            <span>/</span>
            <span className="text-[var(--org)] font-semibold">{t('services.title')}</span>
          </div>

          <button
            onClick={() => setActiveTab('home')}
            className="p-2 rounded-full bg-[var(--panel)] border border-[var(--line)] text-[var(--ink)] hover:border-[var(--org)] transition-all flex items-center gap-1 text-xs cursor-pointer"
            title="Close page"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">{t('services.close')}</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* PAGE-WIDE RESPONSIVE 2-COLUMN LAYOUT                     */}
        {/* Sticky Sidebar (Left) + All 8 Page Sections (Right)      */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-10 w-full relative">

          {/* ====================================================== */}
          {/* STICKY SERVICES SIDEBAR (STARTS ABOVE HERO SECTION)    */}
          {/* Clean skill headings as requested by the user          */}
          {/* ====================================================== */}
          <aside className="w-full lg:w-[310px] xl:w-[340px] shrink-0 lg:sticky lg:top-24 self-start space-y-4 z-20 lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto lg:overflow-x-hidden pr-1 lg:pr-2 sidebar-scroll">
            
            {/* 1. Skill Headings Card */}
            <div className="service-section-wrap rounded-3xl p-5 border border-[var(--line)] shadow-xl">
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[var(--line)]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--org)] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Services Navigation</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--org)]/15 text-[var(--org)] font-bold">
                  3 Disciplines
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {skillHeadings.map((skill) => {
                  const SkillIcon = skill.icon;
                  const isSelected = selectedFilter === skill.id;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => handleSkillSelect(skill.id, skill.sectionId)}
                      className={`w-full p-3 rounded-2xl text-left border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group ${
                        isSelected
                          ? 'bg-[var(--org)]/15 border-[var(--org)] text-[var(--org)] ring-2 ring-[var(--org)]/40 shadow-md font-bold'
                          : 'bg-[var(--panel)] border-[var(--line)] text-[var(--ink)] hover:border-[var(--org)]/60 hover:bg-[var(--panel-hover)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                            isSelected
                              ? 'bg-[var(--org)] text-white shadow-sm'
                              : 'bg-[var(--org)]/10 text-[var(--org)]'
                          }`}
                        >
                          <SkillIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-xs font-bold truncate ${isSelected ? 'text-[var(--org)]' : 'text-[var(--ink)]'}`}>
                            {skill.label}
                          </p>
                          <p className="text-[10.5px] text-[var(--mute)] truncate">
                            {skill.count}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                            isSelected
                              ? 'bg-[var(--org)] text-white'
                              : 'bg-[var(--panel)] border border-[var(--line)] text-[var(--mute)]'
                          }`}
                        >
                          {skill.badge}
                        </span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 rtl:rotate-180 transition-transform ${
                            isSelected
                              ? 'text-[var(--org)] translate-x-0.5'
                              : 'text-[var(--mute)] group-hover:text-[var(--org)] group-hover:translate-x-0.5'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Quick Page Section Jump Links */}
            <div className="service-section-wrap rounded-3xl p-5 border border-[var(--line)] shadow-lg hidden sm:block">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--line)]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--mute)] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--org)]" />
                  <span>On This Page</span>
                </span>
                <span className="text-[10px] text-[var(--mute)] font-medium">8 Sections</span>
              </div>

              <div className="space-y-1">
                {pageSectionLinks.map((sec) => {
                  const SecIcon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleSectionScroll(sec.id)}
                      className={`w-full px-3 py-2 rounded-xl text-left text-xs transition-all flex items-center justify-between group cursor-pointer ${
                        isActive
                          ? 'bg-[var(--org)]/15 text-[var(--org)] font-bold border border-[var(--org)]/35 shadow-sm'
                          : 'text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--panel)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <SecIcon className={`w-3.5 h-3.5 transition-colors shrink-0 ${isActive ? 'text-[var(--org)]' : 'text-[var(--org)]/70 group-hover:text-[var(--org)]'}`} />
                        <span className={`transition-transform truncate ${isActive ? 'font-bold' : 'group-hover:translate-x-0.5 font-medium'}`}>
                          {sec.label}
                        </span>
                      </div>
                      <ArrowRight className={`w-3 h-3 rtl:rotate-180 transition-all shrink-0 ${isActive ? 'text-[var(--org)] translate-x-0.5' : 'text-[var(--line)] group-hover:text-[var(--org)]'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Sidebar Consultation Helper Box */}
            <div className="service-section-wrap rounded-3xl p-5 border border-[var(--line)] text-center shadow-lg">
              <div className="w-10 h-10 rounded-2xl bg-[#D57C63]/15 text-[#D57C63] flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-sm text-[var(--ink)] mb-1">
                Need a Custom Package?
              </h4>
              <p className="text-xs text-[var(--mute)] leading-relaxed mb-3.5">
                Combine WordPress, SEO, and Full Stack into a tailored solution with fixed pricing.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-3 rounded-xl glow-btn text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Discuss With Rahila</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </aside>

          {/* ====================================================== */}
          {/* RIGHT MAIN CONTENT AREA: All 8 Page Sections           */}
          {/* ====================================================== */}
          <div className="flex-1 min-w-0 w-full space-y-16 sm:space-y-20">

            {/* ======================================================== */}
            {/* 1. HERO SECTION (As Requested)                           */}
            {/* ======================================================== */}
            <section id="services-hero" className="reveal-up text-center w-full max-w-[1600px] mx-auto px-2 sm:px-4">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--org)]/40 bg-[var(--org)]/10 text-xs font-bold text-[var(--org)] uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--org)]" />
                  <span>Digital Solutions &amp; Growth</span>
                </div>

                <h1 className="font-heading font-extrabold text-[var(--ink)] text-[clamp(32px,5vw,56px)] leading-[1.12] mb-4 text-center">
                  Services That Help Your Business Grow
                </h1>

                <p className="text-[var(--mute)] text-base sm:text-lg leading-relaxed text-center max-w-2xl mx-auto mb-8">
                  I provide WordPress website design, SEO optimization, and Full Stack JavaScript development services to help businesses build a strong online presence and improve their digital performance.
                </p>

                {/* Hero Buttons: Explore Services | Contact Me */}
                <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-12">
                  <button
                    type="button"
                    onClick={() => scrollToSection('main-services')}
                    className="glow-btn px-7 py-3 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-7 py-3 rounded-full bg-[var(--panel)] hover:bg-[var(--panel-hover)] border border-[var(--org)]/50 text-[var(--ink)] text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Contact Me</span>
                    <Send className="w-4 h-4 text-[var(--org)]" />
                  </button>
                </div>
              </div>

              {/* 3 Specialized Dedicated View Cards (3D Interactive - Direct Filter + Scroll) */}
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
                <DomainHero3DCard
                  icon={Globe}
                  badge="WordPress Designer"
                  price="Plans from $40"
                  title="WordPress Development"
                  description="Website Design, Elementor, WooCommerce, and Website Redesign."
                  linkText="View Services (6 Deliverables)"
                  shadowClass="shadow-type-1"
                  shadowName="Cyber Neon Glow"
                  onClick={() => handleSkillSelect('wordpress', 'wordpress-services')}
                />

                <DomainHero3DCard
                  icon={TrendingUp}
                  badge="SEO Specialist"
                  price="Plans from $40"
                  title="SEO Services"
                  description="Keyword Research, On-Page SEO, Technical SEO, and Website Audits."
                  linkText="View Services (6 Deliverables)"
                  shadowClass="shadow-type-2"
                  shadowName="3D Deep Elevation"
                  onClick={() => handleSkillSelect('seo', 'seo-services')}
                />

                <DomainHero3DCard
                  icon={Terminal}
                  badge="Full Stack Developer"
                  price="Plans from $180"
                  title="Full Stack Development"
                  description="React.js, Node.js, Express.js, MongoDB, and API Integration."
                  linkText="View Services (6 Deliverables)"
                  shadowClass="shadow-type-3"
                  shadowName="Dual-Tone Aurora"
                  onClick={() => handleSkillSelect('fullstack', 'fullstack-services')}
                />
              </div>
            </section>

            {/* ======================================================== */}
            {/* 2. MAIN SERVICES SECTION (Clean Full Width Grid)         */}
            {/* ======================================================== */}
            <section id="main-services" className="scroll-mt-24 w-full max-w-[1600px] mx-auto">
              {/* Centered Main Section Header */}
              <div className="reveal-up mb-10 text-center max-w-3xl mx-auto px-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--org)]/40 bg-[var(--org)]/10 text-xs font-bold text-[var(--org)] uppercase tracking-wider mb-3.5">
                  <Zap className="w-3.5 h-3.5 text-[var(--org)]" />
                  <span>Full Service Catalog</span>
                </div>
                <h2 className="font-heading font-extrabold text-[var(--ink)] text-[clamp(28px,4vw,42px)] leading-[1.18] mb-3 text-center">
                  Explore Our Core Service Categories
                </h2>
                <p className="text-[var(--mute)] text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto">
                  Choose from specialized categories or browse all services below. Each service is built with precision, speed, and clean code.
                </p>
              </div>



              {/* Category Filter Pills (Centered above catalog) */}
              <div className="reveal-up flex flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-8">
                {filterButtons.map((btn) => {
                  const Icon = btn.icon;
                  const isSelected = selectedFilter === btn.id;
                  return (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setSelectedFilter(btn.id)}
                      className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'category-pill-active scale-105'
                          : 'bg-[var(--panel)] text-[var(--mute)] hover:text-[var(--ink)] border border-[var(--line)] hover:border-[var(--org)]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{btn.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 1. WordPress Services Section Block */}
              {(selectedFilter === 'all' || selectedFilter === 'wordpress') && (
                <div id="wordpress-services" className="service-section-wrap rounded-3xl p-6 sm:p-8 lg:p-10 mb-10 w-full scroll-mt-28">
                  <div className="reveal-up text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D57C63]/15 text-xs font-bold text-[#D57C63] border border-[#D57C63]/30 mb-2.5">
                      <Globe className="w-3.5 h-3.5" />
                      <span>WordPress Development</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--ink)] mb-2 text-center">
                      WordPress Website Design &amp; WooCommerce
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed text-center">
                      Website Design, Elementor, WooCommerce, Redesign, Speed Optimization, and Maintenance tailored for high conversions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
                    {wordpressServicesData.map((item, idx) => (
                      <Service3DCard
                        key={item.id}
                        item={item}
                        onAction={handleAction}
                        shadowClass={['shadow-type-1', 'shadow-type-2', 'shadow-type-3'][idx % 3]}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 2. SEO Services Section Block */}
              {(selectedFilter === 'all' || selectedFilter === 'seo') && (
                <div id="seo-services" className="service-section-wrap rounded-3xl p-6 sm:p-8 lg:p-10 mb-10 w-full scroll-mt-28">
                  <div className="reveal-up text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D57C63]/15 text-xs font-bold text-[#D57C63] border border-[#D57C63]/30 mb-2.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>SEO Services</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--ink)] mb-2 text-center">
                      Search Engine Optimization &amp; Backlinks
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed text-center">
                      Keyword Research, On-Page SEO, Technical SEO, Website Audits, Schema Markup, and High-DA Guest Posting.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
                    {seoServicesData.map((item, idx) => (
                      <Service3DCard
                        key={item.id}
                        item={item}
                        onAction={handleAction}
                        shadowClass={['shadow-type-2', 'shadow-type-3', 'shadow-type-1'][idx % 3]}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Full Stack JavaScript Section Block */}
              {(selectedFilter === 'all' || selectedFilter === 'fullstack') && (
                <div id="fullstack-services" className="service-section-wrap rounded-3xl p-6 sm:p-8 lg:p-10 mb-10 w-full scroll-mt-28">
                  <div className="reveal-up text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D57C63]/15 text-xs font-bold text-[#D57C63] border border-[#D57C63]/30 mb-2.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Full Stack Development</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--ink)] mb-2 text-center">
                      Full Stack JavaScript &amp; MERN Web Applications
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed text-center">
                      React.js, Node.js, Express.js, MongoDB database schemas, and RESTful API Integration engineered for high scalability.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
                    {fullstackServicesData.map((item, idx) => (
                      <Service3DCard
                        key={item.id}
                        item={item}
                        onAction={handleAction}
                        shadowClass={['shadow-type-3', 'shadow-type-1', 'shadow-type-2'][idx % 3]}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>

        {/* ======================================================== */}
        {/* 3. WHY CHOOSE MY SERVICES? (As Requested)                */}
        {/* ======================================================== */}
        <section id="why-choose" className="mb-24 scroll-mt-24 w-full max-w-[1600px] mx-auto">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-12 px-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D57C63]/15 text-xs font-bold text-[#D57C63] border border-[#D57C63]/30 mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Core Value Proposition</span>
            </div>
            <h2 className="font-heading font-extrabold text-[var(--ink)] text-[clamp(26px,3.8vw,38px)] leading-tight mb-3 text-center">
              Why Choose My Services?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed text-center">
              Focused on delivering measurable impact, reliable code quality, and exceptional user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {whyChooseData.map((item, idx) => {
              const Icon = item.icon;
              const shadowClass = ['shadow-type-1', 'shadow-type-2', 'shadow-type-3', 'shadow-type-1'][idx % 4];
              return (
                <div
                  key={item.id}
                  className={`service-3d-card ${shadowClass} p-6 flex flex-col justify-between text-center items-center group cursor-pointer`}
                >
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#D57C63]/15 border border-[#D57C63]/30 flex items-center justify-center text-[#D57C63] mb-4 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#D57C63] group-hover:text-white tracking-wide mb-1.5 uppercase transition-colors">
                      {item.badge}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[var(--ink)] mb-2 service-card-title group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[var(--mute)] service-card-desc leading-relaxed group-hover:text-white transition-colors">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-8 h-1 rounded-full bg-[#D57C63]/40 mt-5 group-hover:w-16 group-hover:bg-white transition-all relative z-10" />
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. MY WORK PROCESS (4 Steps As Requested)                */}
        {/* ======================================================== */}
        <section id="work-process" className="mb-24 scroll-mt-24 w-full max-w-[1600px] mx-auto">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-12 px-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D57C63]/15 text-xs font-bold text-[#D57C63] border border-[#D57C63]/30 mb-2.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Step-by-Step Methodology</span>
            </div>
            <h2 className="font-heading font-extrabold text-[var(--ink)] text-[clamp(26px,3.8vw,38px)] leading-tight mb-3 text-center">
              My Work Process
            </h2>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed text-center">
              A transparent, 4-step workflow to ensure seamless communication, precision development, and guaranteed quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {workProcessSteps.map((step, idx) => {
              const Icon = step.icon;
              const shadowClass = ['shadow-type-1', 'shadow-type-2', 'shadow-type-3', 'shadow-type-1'][idx % 4];
              return (
                <div
                  key={step.step}
                  className={`service-3d-card ${shadowClass} rounded-2xl p-6 text-center flex flex-col justify-between relative group cursor-pointer transition-all duration-300`}
                >
                  {/* Step Number Top Pill */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="w-8 h-8 rounded-full bg-[#D57C63] group-hover:bg-white group-hover:text-[#ea580c] text-white text-xs font-black flex items-center justify-center shadow-md transition-colors">
                      {step.step}
                    </span>
                    <Icon className="w-5 h-5 text-[#D57C63] group-hover:text-white opacity-80 group-hover:scale-110 transition-transform" />
                  </div>

                  <div className="relative z-10">
                    <span className="text-[11px] font-semibold text-[var(--mute)] group-hover:text-white/90 uppercase tracking-wider block mb-1 transition-colors">
                      {step.subtitle}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[var(--ink)] mb-2.5 service-card-title group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[var(--mute)] service-card-desc leading-relaxed group-hover:text-white transition-colors">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--line)] group-hover:border-white/30 flex items-center justify-center text-[11px] font-bold text-[#D57C63] group-hover:text-white relative z-10 transition-colors">
                    <span>Phase {step.step}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. PRICING PLANS (Basic $40, Standard $60, Premium $100) */}
        {/* ======================================================== */}
        <section id="pricing-plans" className="mb-24 scroll-mt-24 w-full max-w-[1600px] mx-auto">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-10 px-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D57C63]/15 text-xs font-bold text-[#D57C63] border border-[#D57C63]/30 mb-2.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Transparent Pricing Packages</span>
            </div>
            <h2 className="font-heading font-extrabold text-[var(--ink)] text-[clamp(26px,3.8vw,38px)] leading-tight mb-3 text-center">
              Affordable Pricing Packages
            </h2>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed text-center">
              Clear scope, honest deliverables, and zero hidden costs. Basic $40, Standard $60, and Premium $100 packages.
            </p>

            {/* Pricing Category Toggle */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setPricingCategory('wordpress')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  pricingCategory === 'wordpress'
                    ? 'bg-[#D57C63] text-white shadow-md'
                    : 'bg-[var(--panel)] text-[var(--mute)] border border-[var(--line)]'
                }`}
              >
                WordPress Packages ($40 - $100)
              </button>
              <button
                type="button"
                onClick={() => setPricingCategory('seo')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  pricingCategory === 'seo'
                    ? 'bg-[#D57C63] text-white shadow-md'
                    : 'bg-[var(--panel)] text-[var(--mute)] border border-[var(--line)]'
                }`}
              >
                SEO Packages ($40 - $100)
              </button>
              <button
                type="button"
                onClick={() => setPricingCategory('fullstack')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  pricingCategory === 'fullstack'
                    ? 'bg-[#D57C63] text-white shadow-md'
                    : 'bg-[var(--panel)] text-[var(--mute)] border border-[var(--line)]'
                }`}
              >
                Full Stack Packages ($180 - $550)
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl mx-auto">
            {pricingPackages[pricingCategory].map((plan, idx) => {
              const shadowClass = ['shadow-type-1', 'shadow-type-2', 'shadow-type-3'][idx % 3];
              return (
                <div
                  key={plan.name}
                  className={`service-3d-card ${shadowClass} p-6 sm:p-7 flex flex-col justify-between relative rounded-2xl cursor-pointer ${
                    plan.popular ? 'border-[#D57C63] ring-1 ring-[#D57C63]/50' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#D57C63] text-white text-[10.5px] font-bold uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="text-center pb-4 mb-4 border-b border-[var(--line)] group-hover:border-white/30">
                      <h3 className="font-heading font-bold text-lg text-[var(--ink)] mb-1 service-card-title group-hover:text-white transition-colors">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center gap-1 my-2">
                        <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#D57C63] group-hover:text-white transition-colors">
                          {plan.price}
                        </span>
                        <span className="text-xs text-[var(--mute)] group-hover:text-white/90 transition-colors">/{plan.period}</span>
                      </div>
                      <p className="text-xs text-[var(--mute)] service-card-desc leading-relaxed group-hover:text-white transition-colors">
                        {plan.description}
                      </p>
                    </div>

                    <div className="space-y-2.5 mb-6 text-left">
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[var(--ink)] group-hover:text-white transition-colors">
                          <Check className="w-3.5 h-3.5 text-[#D57C63] group-hover:text-white shrink-0 mt-0.5 transition-colors" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <button
                      type="button"
                      onClick={() => handleSelectPricingPlan(plan.name, plan.price)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        plan.popular
                          ? 'glow-btn text-white'
                          : 'service-card-btn'
                      }`}
                    >
                      <span>Select {plan.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. PORTFOLIO / RECENT PROJECTS (As Requested)            */}
        {/* ======================================================== */}
        <section id="recent-projects" className="mb-24 scroll-mt-24 w-full max-w-[1600px] mx-auto">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-12 px-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D57C63]/15 text-xs font-bold text-[#D57C63] border border-[#D57C63]/30 mb-2.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Verified Track Record</span>
            </div>
            <h2 className="font-heading font-extrabold text-[var(--ink)] text-[clamp(26px,3.8vw,38px)] leading-tight mb-3 text-center">
              Recent Projects &amp; Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed text-center">
              Real client deliverables spanning WordPress business websites, SEO audits, React applications, and Full Stack platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6 w-full max-w-5xl mx-auto">
            {recentProjectsData.map((proj) => (
              <div
                key={proj.id}
                className="recent-project-card group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Compact Screenshot Banner (h-36 sm:h-40 md:h-44) */}
                  <div className="relative h-36 sm:h-40 md:h-44 w-full overflow-hidden bg-[#1f1510] border-b border-[var(--line)]">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#140e0b]/85 backdrop-blur-md text-[#D57C63] border border-[#D57C63]/30 shadow-sm">
                        {proj.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 text-left">
                    <span className="text-[10px] font-bold text-[#D57C63] uppercase tracking-wider block mb-1">
                      Role: {proj.role}
                    </span>
                    <h3 className="font-heading font-bold text-[15px] sm:text-base text-[var(--ink)] mb-1.5 group-hover:text-[#D57C63] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-[var(--mute)] leading-relaxed mb-3 line-clamp-2">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[10.5px] bg-[var(--panel)] text-[var(--ink)] border border-[var(--line)] font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="p-2 rounded-lg bg-[#D57C63]/10 border border-[#D57C63]/20 text-[11px] text-[var(--ink)] flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D57C63] shrink-0" />
                      <span className="line-clamp-1">{proj.verifiedResult}</span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-0 sm:px-5 sm:pb-5 text-left border-t border-[var(--line)]/60 pt-3">
                  {proj.link !== '#' ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D57C63] hover:underline"
                    >
                      <span>Visit Live Project</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveTab('portfolio');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D57C63] hover:underline cursor-pointer"
                    >
                      <span>View in Portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 7. FREQUENTLY ASKED QUESTIONS (7 FAQs As Requested)      */}
        {/* ======================================================== */}
        <section id="services-faq" className="mb-24 scroll-mt-24 w-full max-w-4xl mx-auto">
          <div className="reveal-up text-center max-w-2xl mx-auto mb-12 px-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D57C63]/15 text-xs font-bold text-[#D57C63] border border-[#D57C63]/30 mb-2.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions &amp; Clarity</span>
            </div>
            <h2 className="font-heading font-extrabold text-[var(--ink)] text-[clamp(26px,3.8vw,38px)] leading-tight mb-3 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed text-center">
              Clear answers to the most common questions regarding services, pricing, turnarounds, and maintenance.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {servicesFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.id}
                  className="service-section-wrap rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-[var(--ink)]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D57C63] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-[13.5px] text-[var(--mute)] leading-relaxed border-t border-[var(--line)]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8. FINAL CALL TO ACTION (CTA) (As Requested)             */}
        {/* ======================================================== */}
        <section id="final-cta" className="reveal-up scroll-mt-24 w-full max-w-6xl mx-auto">
          <div className="service-domain-card shadow-type-2 p-8 sm:p-14 lg:p-16 rounded-3xl text-center w-full relative group">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D57C63]/15 text-xs font-bold text-[#D57C63] group-hover:text-white group-hover:bg-white/20 border border-[#D57C63]/30 mb-4 transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Let's Build Something Great</span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--ink)] mb-3 text-center service-card-title group-hover:text-white transition-colors">
                Have a Project in Mind?
              </h2>

              <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed text-center max-w-xl mx-auto mb-8 service-card-desc group-hover:text-white transition-colors">
                Let’s discuss your requirements and find the right solution for your business. From custom websites to complete SEO overhauls.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="glow-btn px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Contact Me</span>
                  <Send className="w-4 h-4" />
                </button>

                <a
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-[var(--panel)] hover:bg-[var(--panel-hover)] border border-[var(--org)]/50 text-[var(--ink)] text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <span>Discuss Your Project</span>
                  <MessageSquare className="w-4 h-4 text-[#D57C63]" />
                </a>
              </div>
            </div>
          </div>
        </section>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;