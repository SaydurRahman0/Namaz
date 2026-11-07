import { Quote, BookOpen } from 'lucide-react';
import Container from '../common/Container';
import IslamicLogo from '../common/IslamicLogo';

export default function DailyReminderSection() {
  return (
    <section className="py-14 sm:py-20 bg-emerald-900 text-slate-100 relative overflow-hidden transition-colors">
      {/* Subtle geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
        >
          <defs>
            <pattern
              id="reminder-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 0L40 20L20 40L0 20Z"
                fill="none"
                stroke="white"
                strokeWidth="0.75"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#reminder-pattern)" />
        </svg>
      </div>

      <Container size="md" className="relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          {/* Badge & Emblem */}
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/80 text-emerald-200 border border-emerald-700/80">
              <BookOpen size={12} />
              Daily Quranic Reflection
            </span>
          </div>

          <div className="flex justify-center text-emerald-400/50">
            <Quote size={32} />
          </div>

          {/* Arabic Verse */}
          <p
            className="arabic-text text-2xl sm:text-3xl md:text-4xl text-emerald-100 font-semibold leading-relaxed sm:leading-loose tracking-normal"
            lang="ar"
          >
            إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ
          </p>

          {/* English Translation */}
          <p className="text-base sm:text-lg text-emerald-100/90 font-medium italic leading-relaxed max-w-xl mx-auto">
            &ldquo;Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater.&rdquo;
          </p>

          {/* Bengali Translation */}
          <p className="text-xs sm:text-sm font-bengali text-emerald-200/80 leading-relaxed max-w-lg mx-auto">
            &ldquo;নিশ্চয়ই সালাত অশ্লীল ও মন্দ কাজ থেকে বিরত রাখে, আর আল্লাহর স্মরণই তো সর্বশ্রেষ্ঠ।&rdquo;
          </p>

          {/* Citation Source */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            <IslamicLogo size={16} />
            <span>Surah Al-Ankabut (29:45)</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

