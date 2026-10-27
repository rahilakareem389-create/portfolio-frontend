import React, { useState } from 'react';
import { Library, BookOpen, Download, Star, ExternalLink, Check, Eye } from 'lucide-react';
import { ISLAMIC_BOOKS_CATALOG } from '../../data/islamicData';

export default function IslamicBooksLibrary() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <section id="islamic-books" className="py-16 sm:py-24 bg-white/50 backdrop-blur-xs border-t border-[#E6DCF5] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FF] text-[#6D28D9] text-xs font-bold uppercase tracking-wider mb-3">
            <Library className="w-4 h-4 text-[#F2C94C]" />
            <span>Sacred Knowledge Repository</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#241B35] tracking-tight mb-4">
            Authentic Classical & Contemporary Islamic Books
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E80]">
            Access world-renowned authenticated Islamic texts in digital format. Deepen your understanding of Hadith, Seerah, Creed, and moral etiquette.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ISLAMIC_BOOKS_CATALOG.map((book) => (
            <div
              key={book.id}
              className="rounded-3xl bg-[#FAF8FF] border border-[#E6DCF5] hover:border-[#6D28D9]/40 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group p-5"
            >
              {/* Book Cover Aesthetic */}
              <div
                className="w-full h-48 rounded-2xl p-4 flex flex-col justify-between text-white mb-4 relative overflow-hidden shadow-md group-hover:scale-[1.02] transition-transform"
                style={{
                  background: `linear-gradient(135deg, ${book.coverColor}, #241B35)`
                }}
              >
                <div className="flex items-center justify-between text-xs opacity-90">
                  <span className="font-medium text-[#FFF4B8]">{book.category}</span>
                  <div className="flex items-center gap-1 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-[#F2C94C] text-[#F2C94C]" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base leading-snug line-clamp-2">
                    {book.title}
                  </h3>
                  <span className="text-[11px] opacity-80 mt-1 block">By {book.author}</span>
                </div>

                <div className="text-[10px] opacity-75 font-mono">
                  {book.pages} Pages • {book.language.split(' ')[0]}
                </div>
              </div>

              {/* Book Meta */}
              <p className="text-xs text-[#6B5E80] leading-relaxed mb-4 flex-1 line-clamp-3">
                {book.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E6DCF5] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBook(book)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-[#6D28D9] bg-white hover:bg-[#EDE5FF] border border-[#E6DCF5] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <a
                  href={`#reading-${book.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedBook(book);
                  }}
                  className="p-2 rounded-xl text-white bg-[#6D28D9] hover:bg-[#4C1D95] transition-all cursor-pointer"
                  title="Read digital text"
                >
                  <BookOpen className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Book Preview Modal */}
        {selectedBook && (
          <div
            className="fixed inset-0 z-[99995] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedBook(null)}
          >
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#E6DCF5] shadow-2xl relative space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider">{selectedBook.category}</span>
                  <h3 className="font-heading font-extrabold text-2xl text-[#241B35] mt-1">{selectedBook.title}</h3>
                  <p className="text-xs text-[#6B5E80]">Authored by <strong className="text-[#241B35]">{selectedBook.author}</strong></p>
                </div>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF8FF] border border-[#E6DCF5] flex items-center justify-center text-xs font-bold hover:bg-[#EDE5FF]"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8FF] border border-[#E6DCF5] text-xs sm:text-sm text-[#241B35] leading-relaxed">
                {selectedBook.description}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-[#6B5E80]">
                <div className="p-3 rounded-xl bg-white border border-[#E6DCF5]">
                  <strong className="block text-[#241B35]">Language:</strong> {selectedBook.language}
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E6DCF5]">
                  <strong className="block text-[#241B35]">Length:</strong> {selectedBook.pages} Complete Pages
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EDE5FF] text-xs text-[#4C1D95] font-medium">
                📖 Full downloadable PDF study notes & reading chapters are included in all student enrollments.
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#6D28D9] text-white hover:bg-[#4C1D95] transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
