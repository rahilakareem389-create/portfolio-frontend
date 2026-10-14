import React, { useState } from 'react';
import { ArrowLeft, X, ExternalLink, Eye } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

const Portfolio = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [modalProject, setModalProject] = useState(null);

  return (
    <section className="pt-24 pb-24 page-enter">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Top Breadcrumb & Close Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#33271f]">
          <div className="flex items-center gap-2 text-sm text-[#bcab9e]">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-[#ff7a1a] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{t('portfolio.backOverview')}</span>
            </button>
            <span>/</span>
            <span className="text-[#ff7a1a]">{t('portfolio.title')}</span>
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

        {/* Title Header */}
        <div className="reveal-up mb-10">
          <h1 className="font-heading font-extrabold text-white text-[clamp(34px,5vw,60px)] leading-[1.08] mb-4">
            {t('portfolio.title')}
          </h1>
          <p className="lead">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="reveal-up glass-card p-6 flex flex-col justify-end min-h-[220px] bg-gradient-to-br from-[#ff6a00]/20 via-transparent to-transparent hover:border-[#ff7a1a] transition-all"
            >
              <div className="mb-auto pb-4">
                <small className="text-[#eaa487] font-bold text-xs uppercase block mb-1">
                  {project.badge}
                </small>
                <h3 className="font-heading font-bold text-[21px] text-white mb-2">
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
