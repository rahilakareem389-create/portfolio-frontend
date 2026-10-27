import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { ISLAMIC_PRICING_PLANS } from '../../data/islamicData';

export default function IslamicPricing({ onSelectPlan }) {
  const [selectedBilling, setSelectedBilling] = useState('monthly'); // 'monthly' | 'yearly'

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white/50 backdrop-blur-xs border-t border-[#E6DCF5] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FF] text-[#6D28D9] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-[#F2C94C]" />
            <span>Accessible Sacred Education</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#241B35] tracking-tight mb-4">
            Transparent Tuition Plans
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E80]">
            Affordable tuition designed for individuals and families worldwide. High-quality 1-on-1 Quran tutoring with certified teachers. No hidden charges.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {ISLAMIC_PRICING_PLANS.map((plan) => {
            const isHighlight = plan.highlight;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isHighlight
                    ? 'bg-gradient-to-b from-[#FAF8FF] to-white border-2 border-[#6D28D9] shadow-[0_20px_50px_rgba(109,40,217,0.18)] transform md:-translate-y-2'
                    : 'bg-[#FAF8FF] border border-[#E6DCF5] hover:border-[#6D28D9]/40'
                }`}
              >
                {/* Popular Pill */}
                {isHighlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-[#6D28D9] text-white shadow-md uppercase tracking-wider">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
                      {plan.name}
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="font-heading font-extrabold text-4xl sm:text-5xl text-[#241B35]">
                        {plan.price}
                      </span>
                      <span className="text-xs text-[#6B5E80] font-medium">{plan.billing}</span>
                    </div>
                    <p className="text-xs text-[#6B5E80] mt-2.5 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="pt-6 border-t border-[#E6DCF5] space-y-3 mb-8">
                    <span className="text-xs font-bold text-[#241B35] uppercase tracking-wider block">
                      Plan Inclusions:
                    </span>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#241B35]">
                        <Check className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                    isHighlight
                      ? 'bg-[#6D28D9] text-white hover:bg-[#4C1D95] shadow-[0_4px_16px_rgba(109,40,217,0.3)]'
                      : 'bg-white text-[#241B35] hover:bg-[#EDE5FF] hover:text-[#6D28D9] border border-[#E6DCF5]'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Financial Aid & Family Guarantee Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-[#EDE5FF]/60 border border-[#6D28D9]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#6D28D9] shrink-0 hidden sm:block" />
            <div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-[#241B35]">
                Needy Student Scholarship & Financial Aid Available
              </h4>
              <p className="text-xs text-[#6B5E80] mt-0.5">
                No student is turned away due to financial constraints. Contact our administration for sponsored Quran learning.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/923000000000?text=Assalam-o-Alaikum%2C%20I%20am%20interested%20in%20Islamic%20Learn%20Online%20Quran%20Education"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#6D28D9] text-white hover:bg-[#4C1D95] transition-all cursor-pointer shrink-0 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#F2C94C]" />
            <span>WhatsApp Admissions</span>
          </a>
        </div>

      </div>
    </section>
  );
}
