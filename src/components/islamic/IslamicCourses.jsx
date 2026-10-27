import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Compass,
  HeartHandshake,
  Library,
  Flame,
  CheckCircle2,
  Clock,
  Star,
  Users,
  ArrowRight,
  Bookmark,
  Check
} from 'lucide-react';
import { ISLAMIC_COURSES } from '../../data/islamicData';

const iconMap = {
  BookOpen,
  Sparkles,
  Compass,
  HeartHandshake,
  Library,
  Flame
};

/**
 * Islamic Courses Catalog & Interactive Enroller
 * Renders the 6 specialized courses (Strictly excluding Hifz-ul-Quran)
 */
export default function IslamicCourses({ onSelectCourse, enrolledCourseIds = [], onEnrollToggle }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = ISLAMIC_COURSES.filter((c) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'featured' && c.featured) ||
      (activeFilter === 'foundational' && (c.id === 'quran-reading' || c.id === 'namaz')) ||
      (activeFilter === 'advanced' && (c.id === 'tajweed' || c.id === 'tafheem-ul-quran'));

    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.arabicTitle.includes(searchQuery);

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="islamic-courses" className="py-16 sm:py-24 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FF] text-[#6D28D9] text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4 text-[#F2C94C]" />
            <span>Structured Sacred Learning</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#241B35] tracking-tight mb-4">
            Specialized Islamic Courses & Curriculum
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E80]">
            From foundational Arabic reading to comprehensive Tajweed mastery and thematic Quranic understanding. Step-by-step syllabus curated for learners of all ages.
          </p>
        </div>

        {/* Filter Pills & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Courses (6)' },
              { id: 'featured', label: 'Most Popular' },
              { id: 'foundational', label: 'Beginners & Kids' },
              { id: 'advanced', label: 'Tajweed & Tafseer' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-[#6D28D9] text-white shadow-xs'
                    : 'bg-white text-[#6B5E80] hover:text-[#241B35] hover:bg-[#EDE5FF] border border-[#E6DCF5]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search courses or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] placeholder-[#6B5E80]/70 focus:outline-none focus:border-[#6D28D9] shadow-xs"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.map((course) => {
            const IconComponent = iconMap[course.icon] || BookOpen;
            const isEnrolled = enrolledCourseIds.includes(course.id);

            return (
              <div
                key={course.id}
                className="rounded-3xl bg-white border border-[#E6DCF5] hover:border-[#6D28D9]/40 hover:shadow-[0_12px_32px_rgba(109,40,217,0.12)] transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Course Card Top Header */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#EDE5FF] text-[#6D28D9] group-hover:bg-[#6D28D9] group-hover:text-white transition-all flex items-center justify-center shrink-0 shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFF4B8] text-[#241B35] border border-[#F2C94C]/40">
                        {course.tag}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-[#241B35] font-semibold mt-1.5">
                        <Star className="w-3.5 h-3.5 fill-[#F2C94C] text-[#F2C94C]" />
                        <span>{course.rating}</span>
                        <span className="text-[#6B5E80] text-[10px]">({course.enrolledCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Title & Arabic Subtitle */}
                  <h3 className="font-heading font-extrabold text-xl text-[#241B35] group-hover:text-[#6D28D9] transition-colors leading-snug mb-1">
                    {course.title}
                  </h3>
                  <p className="font-serif text-sm text-[#6D28D9] opacity-90 mb-3" dir="rtl">
                    {course.arabicTitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#6B5E80] leading-relaxed mb-5 flex-1">
                    {course.description}
                  </p>

                  {/* Meta Pills (Duration & Lessons) */}
                  <div className="pt-4 border-t border-[#E6DCF5] flex items-center justify-between text-xs text-[#6B5E80] font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>{course.lessonsCount} Modules</span>
                    </div>
                  </div>
                </div>

                {/* Course Card Action Bar */}
                <div className="p-4 sm:px-6 bg-[#FAF8FF] border-t border-[#E6DCF5] flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#6D28D9] hover:text-[#4C1D95] hover:bg-[#EDE5FF] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onEnrollToggle(course.id)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-xs ${
                      isEnrolled
                        ? 'bg-[#EDE5FF] text-[#6D28D9] border border-[#6D28D9]/40'
                        : 'bg-[#6D28D9] text-white hover:bg-[#4C1D95]'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#6D28D9]" />
                        <span>Enrolled</span>
                      </>
                    ) : (
                      <span>Enroll Free</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
