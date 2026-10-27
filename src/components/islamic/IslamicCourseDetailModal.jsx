import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Play,
  FileText,
  Clock,
  Bookmark,
  Share2,
  Check,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';

/**
 * Islamic Course Details & Student Lesson Viewer Modal
 * Features:
 * - Full syllabus inspection with lesson duration & resource type
 * - Real completion tracking (checkbox per lesson)
 * - Completion progress bar & percentage calculation
 * - Real enrollment status
 */
export default function IslamicCourseDetailModal({
  course,
  onClose,
  isEnrolled,
  onEnrollToggle,
  completedLessonIds = [],
  onToggleLessonCompletion
}) {
  const [activeLesson, setActiveLesson] = useState(course?.syllabus?.[0] || null);

  if (!course) return null;

  const totalLessons = course.syllabus?.length || 0;
  const completedCount = course.syllabus?.filter((l) => completedLessonIds.includes(`${course.id}_${l.id}`)).length || 0;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[99995] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-[0_25px_60px_rgba(36,27,53,0.35)] border border-[#E6DCF5] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-[#FAF8FF] border-b border-[#E6DCF5] flex items-center justify-between gap-4">
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EDE5FF] text-[#6D28D9]">
                {course.level}
              </span>
              <span className="text-xs text-[#6B5E80]">• {course.duration}</span>
            </div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#241B35] leading-tight">
              {course.title}
            </h2>
            <p className="font-serif text-sm text-[#6D28D9] mt-0.5" dir="rtl">
              {course.arabicTitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E6DCF5] hover:bg-[#EDE5FF] text-[#241B35] hover:text-[#6D28D9] flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Enrollment & Student Progress Banner */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#EDE5FF] via-[#FAF8FF] to-[#FFF4B8]/40 border-b border-[#E6DCF5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:flex-1">
            <div className="flex items-center justify-between text-xs font-bold text-[#241B35] mb-1.5">
              <span>Your Student Progress</span>
              <span>{completedCount} of {totalLessons} Lessons ({progressPct}%)</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden border border-[#E6DCF5]">
              <div
                className="h-full bg-gradient-to-r from-[#6D28D9] to-[#F2C94C] transition-all duration-500 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onEnrollToggle(course.id)}
              className={`w-full sm:w-auto px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                isEnrolled
                  ? 'bg-white text-[#6D28D9] border border-[#6D28D9]'
                  : 'bg-[#6D28D9] text-white hover:bg-[#4C1D95]'
              }`}
            >
              {isEnrolled ? (
                <>
                  <Check className="w-4 h-4 text-[#6D28D9]" />
                  <span>Enrolled (Active)</span>
                </>
              ) : (
                <span>Enroll in Course</span>
              )}
            </button>
          </div>
        </div>

        {/* Modal Main Body (2 Columns on Desktop: Lessons List + Active Lesson Preview) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#E6DCF5]">
          
          {/* Left Column: Syllabus Lessons List (3 cols) */}
          <div className="md:col-span-3 p-4 sm:p-6 space-y-2.5 max-h-[50vh] md:max-h-none overflow-y-auto">
            <div className="text-xs font-bold uppercase tracking-wider text-[#6B5E80] mb-2 flex items-center justify-between">
              <span>Course Syllabus Modules</span>
              <span>{course.syllabus?.length || 0} Modules</span>
            </div>

            {course.syllabus?.map((lesson, idx) => {
              const lessonKey = `${course.id}_${lesson.id}`;
              const isCompleted = completedLessonIds.includes(lessonKey);
              const isSelected = activeLesson?.id === lesson.id;

              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-[#EDE5FF]/80 border-[#6D28D9] shadow-xs'
                      : 'bg-[#FAF8FF] hover:bg-white border-[#E6DCF5]'
                  }`}
                >
                  {/* Completion Checkbox */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLessonCompletion(lessonKey);
                    }}
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                      isCompleted
                        ? 'bg-[#6D28D9] border-[#6D28D9] text-white'
                        : 'bg-white border-[#6B5E80]/40 hover:border-[#6D28D9]'
                    }`}
                    title={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
                  >
                    {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#6D28D9]">Module {idx + 1}</span>
                      <span className="text-[10px] text-[#6B5E80] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>
                    <h4 className={`text-xs sm:text-sm font-semibold mt-0.5 leading-snug ${
                      isCompleted ? 'line-through text-[#6B5E80]' : 'text-[#241B35]'
                    }`}>
                      {lesson.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Module Preview (2 cols) */}
          <div className="md:col-span-2 p-5 sm:p-6 bg-[#FAF8FF] flex flex-col justify-between">
            {activeLesson ? (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4B8] text-[#241B35] text-[11px] font-bold border border-[#F2C94C]/40">
                  <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
                  <span>Interactive Learning Workspace</span>
                </div>

                <h3 className="font-heading font-extrabold text-lg text-[#241B35]">
                  {activeLesson.title}
                </h3>

                <div className="p-4 rounded-2xl bg-white border border-[#E6DCF5] space-y-3">
                  <div className="text-xs font-semibold text-[#6D28D9] flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Lesson Resources & Materials:</span>
                  </div>
                  <ul className="text-xs text-[#6B5E80] space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>HD Video & Audio Pronunciation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>Downloadable PDF Practice Sheets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>Self-Check Recitation Rubric</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#EDE5FF] text-xs text-[#4C1D95] font-medium leading-relaxed">
                  💡 Tip: Listen to the master reciter twice before attempting recitation. Mark the checkbox once completed to track your progress!
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-[#6B5E80] my-auto">
                Select a module from the syllabus to view materials.
              </div>
            )}

            <div className="pt-4 mt-6 border-t border-[#E6DCF5]">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-[#241B35] bg-white hover:bg-[#EDE5FF] border border-[#E6DCF5] transition-all cursor-pointer"
              >
                Close Curriculum
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
