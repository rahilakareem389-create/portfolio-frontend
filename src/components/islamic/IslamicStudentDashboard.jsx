import React from 'react';
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  Bookmark,
  Compass,
  ArrowRight,
  User,
  Sparkles
} from 'lucide-react';
import { ISLAMIC_COURSES } from '../../data/islamicData';

export default function IslamicStudentDashboard({
  enrolledCourseIds = [],
  completedLessonIds = [],
  onOpenCourse,
  onNavigate
}) {
  const enrolledCourses = ISLAMIC_COURSES.filter((c) => enrolledCourseIds.includes(c.id));
  const totalCompletedLessons = completedLessonIds.length;

  return (
    <div className="py-12 sm:py-16 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#6D28D9] via-[#4C1D95] to-[#241B35] text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-1.5 relative z-10">
            <span className="text-xs font-bold text-[#FFF4B8] uppercase tracking-wider">
              Student Learning Hub
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
              Assalam-o-Alaikum, Honored Student
            </h2>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
              "The best among you are those who learn the Quran and teach it." (Sahih Bukhari). Continue your sacred studies today.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={() => onNavigate('courses')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#F2C94C] text-[#241B35] hover:bg-[#FFF4B8] transition-all cursor-pointer shadow-xs"
            >
              Browse All Courses
            </button>
          </div>
        </div>

        {/* Quick Stats Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E6DCF5] shadow-xs text-center sm:text-left">
            <span className="text-xs text-[#6B5E80] font-medium block mb-1">Enrolled Courses</span>
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#6D28D9]">
              {enrolledCourses.length}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E6DCF5] shadow-xs text-center sm:text-left">
            <span className="text-xs text-[#6B5E80] font-medium block mb-1">Completed Lessons</span>
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#4C1D95]">
              {totalCompletedLessons}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E6DCF5] shadow-xs text-center sm:text-left">
            <span className="text-xs text-[#6B5E80] font-medium block mb-1">Salah Streak</span>
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F2C94C]">
              5/5 Today
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E6DCF5] shadow-xs text-center sm:text-left">
            <span className="text-xs text-[#6B5E80] font-medium block mb-1">Study Status</span>
            <span className="font-heading font-extrabold text-sm sm:text-base text-emerald-600 block mt-1.5">
              Active Learner
            </span>
          </div>
        </div>

        {/* Enrolled Courses Progress */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DCF5] shadow-xs space-y-6">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E6DCF5]">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-[#241B35]">
                My Active Enrolled Courses
              </h3>
              <p className="text-xs text-[#6B5E80] mt-0.5">
                Click on any course to open syllabus modules and track your recitation exercises.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#6D28D9] bg-[#EDE5FF] px-3 py-1 rounded-full">
              {enrolledCourses.length} Active
            </span>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <BookOpen className="w-12 h-12 text-[#6D28D9]/40 mx-auto" />
              <h4 className="font-heading font-bold text-base text-[#241B35]">You haven't enrolled in any courses yet</h4>
              <p className="text-xs text-[#6B5E80] max-w-sm mx-auto">
                Explore our foundational Quran Reading, Tajweed, Namaz, or Tafheem courses and start learning for free.
              </p>
              <button
                onClick={() => onNavigate('courses')}
                className="mt-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#6D28D9] text-white hover:bg-[#4C1D95] transition-all cursor-pointer"
              >
                Enroll in a Course
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrolledCourses.map((course) => {
                const totalLessons = course.syllabus?.length || 1;
                const completedInThisCourse = course.syllabus?.filter((l) =>
                  completedLessonIds.includes(`${course.id}_${l.id}`)
                ).length || 0;
                const pct = Math.round((completedInThisCourse / totalLessons) * 100);

                return (
                  <div
                    key={course.id}
                    className="p-5 rounded-2xl bg-[#FAF8FF] border border-[#E6DCF5] hover:border-[#6D28D9]/50 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-[#6D28D9] bg-[#EDE5FF] px-2.5 py-0.5 rounded-full">
                          {course.level}
                        </span>
                        <span className="text-xs font-bold text-[#241B35]">{pct}% Done</span>
                      </div>
                      <h4 className="font-heading font-bold text-base text-[#241B35] leading-snug">
                        {course.title}
                      </h4>
                      <p className="font-serif text-xs text-[#6D28D9] mt-0.5" dir="rtl">
                        {course.arabicTitle}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#E6DCF5] mb-1.5">
                        <div
                          className="h-full bg-gradient-to-r from-[#6D28D9] to-[#F2C94C] rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-[#6B5E80]">
                        {completedInThisCourse} of {totalLessons} Modules completed
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenCourse(course)}
                      className="w-full py-2 px-3 rounded-xl text-xs font-bold text-[#6D28D9] bg-white hover:bg-[#EDE5FF] border border-[#E6DCF5] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Resume Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
