import React, { useState, useEffect } from 'react';
import IslamicGlobalMoveableBackground from './IslamicGlobalMoveableBackground';
import IslamicNavbar from './IslamicNavbar';
import IslamicHero from './IslamicHero';
import IslamicCourses from './IslamicCourses';
import IslamicCourseDetailModal from './IslamicCourseDetailModal';
import IslamicPrayerFloatingWidget from './IslamicPrayerFloatingWidget';
import IslamicNamazGuide from './IslamicNamazGuide';
import IslamicDailyDuas from './IslamicDailyDuas';
import IslamicBooksLibrary from './IslamicBooksLibrary';
import IslamicTafheem from './IslamicTafheem';
import IslamicPricing from './IslamicPricing';
import IslamicStudentDashboard from './IslamicStudentDashboard';
import IslamicContactFAQ from './IslamicContactFAQ';
import IslamicFooter from './IslamicFooter';
import { ISLAMIC_COURSES } from '../../data/islamicData';

/**
 * Islamic Learn — Online Quran Education
 * Master Container Component
 * Brand Colors:
 * Royal Purple #6D28D9, Deep Purple #4C1D95, Lavender #EDE5FF,
 * Soft Light Yellow #FFF4B8, Golden Yellow #F2C94C, Background #FAF8FF, Text #241B35
 */
export default function IslamicLearnApp({ onBackToPortfolio }) {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

  // Real Persistent Enrollment & Completion State
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(() => {
    try {
      const saved = localStorage.getItem('islamic_enrolled_courses');
      return saved ? JSON.parse(saved) : ['quran-reading', 'namaz'];
    } catch (_) {
      return ['quran-reading', 'namaz'];
    }
  });

  const [completedLessonIds, setCompletedLessonIds] = useState(() => {
    try {
      const saved = localStorage.getItem('islamic_completed_lessons');
      return saved ? JSON.parse(saved) : ['quran-reading_1', 'quran-reading_2', 'namaz_1'];
    } catch (_) {
      return ['quran-reading_1', 'quran-reading_2', 'namaz_1'];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('islamic_enrolled_courses', JSON.stringify(enrolledCourseIds));
    } catch (_) {}
  }, [enrolledCourseIds]);

  useEffect(() => {
    try {
      localStorage.setItem('islamic_completed_lessons', JSON.stringify(completedLessonIds));
    } catch (_) {}
  }, [completedLessonIds]);

  // Enrollment Handler
  const handleEnrollToggle = (courseId) => {
    setEnrolledCourseIds((prev) => {
      if (prev.includes(courseId)) {
        return prev.filter((id) => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  // Lesson Completion Toggle
  const handleToggleLessonCompletion = (lessonKey) => {
    setCompletedLessonIds((prev) => {
      if (prev.includes(lessonKey)) {
        return prev.filter((k) => k !== lessonKey);
      } else {
        return [...prev, lessonKey];
      }
    });
  };

  const handleNavigate = (sectionId) => {
    if (sectionId === 'prayer-times') {
      setIsPrayerModalOpen(true);
      return;
    }

    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(
      sectionId === 'courses' ? 'islamic-courses' :
      sectionId === 'namaz' ? 'namaz-guide' :
      sectionId === 'duas' ? 'daily-duas' :
      sectionId === 'books' ? 'islamic-books' :
      sectionId === 'tafheem' ? 'tafheem' :
      sectionId === 'pricing' ? 'pricing' :
      sectionId === 'contact' ? 'contact-faq' : sectionId
    );

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-[#241B35] font-sans flex flex-col selection:bg-[#F2C94C] selection:text-[#241B35] relative overflow-x-clip">
      {/* Global Moveable Background: Floating Islamic 8-Point Stars, Crescent Moon, Lanterns & Particles */}
      <IslamicGlobalMoveableBackground />

      {/* Islamic Navigation Bar */}
      <IslamicNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onBackToPortfolio={onBackToPortfolio}
        enrolledCount={enrolledCourseIds.length}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {/* Hero Section with 3D Constellation & Headline */}
        <IslamicHero onNavigate={handleNavigate} />

        {/* Courses & Curriculum (No Hifz Course) */}
        <IslamicCourses
          onSelectCourse={(course) => setSelectedCourse(course)}
          enrolledCourseIds={enrolledCourseIds}
          onEnrollToggle={handleEnrollToggle}
        />

        {/* Step-by-Step Namaz (Salah) Masterclass */}
        <IslamicNamazGuide />

        {/* Daily Duas & Azkar (Hisn-ul-Muslim) */}
        <IslamicDailyDuas />

        {/* Authentic Islamic Books Library */}
        <IslamicBooksLibrary />

        {/* Thematic Tafheem-ul-Quran */}
        <IslamicTafheem />

        {/* Student Progress Dashboard View */}
        <section id="dashboard" className="border-t border-[#E6DCF5]">
          <IslamicStudentDashboard
            enrolledCourseIds={enrolledCourseIds}
            completedLessonIds={completedLessonIds}
            onOpenCourse={(c) => setSelectedCourse(c)}
            onNavigate={handleNavigate}
          />
        </section>

        {/* Transparent Tuition Plans */}
        <IslamicPricing
          onSelectPlan={(plan) => {
            handleNavigate('contact');
          }}
        />

        {/* Contact Form & FAQs */}
        <IslamicContactFAQ />
      </main>

      {/* Floating Circular Prayer Times Widget & 200+ Countries Modal */}
      <IslamicPrayerFloatingWidget
        isOpenExternal={isPrayerModalOpen}
        onCloseExternal={() => setIsPrayerModalOpen(false)}
      />

      {/* Course Detail Syllabus & Lesson Completion Modal */}
      {selectedCourse && (
        <IslamicCourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          isEnrolled={enrolledCourseIds.includes(selectedCourse.id)}
          onEnrollToggle={handleEnrollToggle}
          completedLessonIds={completedLessonIds}
          onToggleLessonCompletion={handleToggleLessonCompletion}
        />
      )}

      {/* Islamic Platform Footer */}
      <IslamicFooter
        onNavigate={handleNavigate}
        onBackToPortfolio={onBackToPortfolio}
      />
    </div>
  );
}
