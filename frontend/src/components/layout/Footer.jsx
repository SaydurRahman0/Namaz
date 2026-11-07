import { Link } from 'react-router-dom';
import Container from '../common/Container';
import IslamicLogo from '../common/IslamicLogo';
import { NAV_LINKS } from '../../utils/constants';

const PRAYER_GUIDE_LINKS = [
  { path: '/prayer-guide/fajr', label: 'Fajr Guide', rakat: '2 Rakat Farz' },
  { path: '/prayer-guide/dhuhr', label: 'Dhuhr Guide', rakat: '4 Rakat Farz' },
  { path: '/prayer-guide/asr', label: 'Asr Guide', rakat: '4 Rakat Farz' },
  { path: '/prayer-guide/maghrib', label: 'Maghrib Guide', rakat: '3 Rakat Farz' },
  { path: '/prayer-guide/isha', label: 'Isha Guide', rakat: '4 Rakat Farz' },
];

const DUA_COLLECTIONS = [
  { path: '/duas?category=beginning', label: 'Salah Duas (Sana, Tashahhud)' },
  { path: '/duas?category=ruku', label: 'Ruku & Sajdah Tasbeeh' },
  { path: '/duas?category=sitting', label: 'Durood Ibrahim & Dua Masura' },
  { path: '/duas?category=surahs', label: 'Short Surahs (Fatiha, Ikhlas)' },
  { path: '/duas?category=after-salah', label: 'After Salah Dhikr & Ayat al-Kursi' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800 transition-colors duration-200 mt-auto">
      <Container size="lg" className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand & Purpose */}
          <div className="space-y-4 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg"
              aria-label="Namaz Guide - Back to homepage"
            >
              <div className="p-1 rounded-lg bg-emerald-950/60 border border-emerald-800/80">
                <IslamicLogo size={26} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-100 tracking-tight group-hover:text-emerald-400 transition-colors">
                  Namaz Guide
                </span>
                <span className="text-[11px] text-slate-400 tracking-wide">
                  Islamic Daily Companion
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              A serene, educational web application designed to help Muslims around the
              world learn Salah step-by-step, stay punctual with daily prayers, and recite
              authentic Duas with accurate Arabic, transliteration, and meaning.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-slate-500 font-bengali">
                      ({link.labelBn})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Prayer Guides */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              Five Daily Prayers
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PRAYER_GUIDE_LINKS.map((prayer) => (
                <li key={prayer.path}>
                  <Link
                    to={prayer.path}
                    className="text-slate-400 hover:text-white transition-colors duration-150 flex items-center justify-between text-xs sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                  >
                    <span>{prayer.label}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {prayer.rakat}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dua Library */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              Dua &amp; Dhikr Library
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {DUA_COLLECTIONS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-white transition-colors duration-150 block truncate focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scholarly Disclaimer Banner */}
        <div className="mt-10 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <span className="font-semibold text-emerald-400">Scholarly Notice: </span>
          This website is an educational resource. Please consult qualified Islamic scholars
          for religious rulings and differences of opinion. Content reflects standard Sunnah
          tradition with Hanafi prayer structure details.
        </div>

        {/* Bottom Bar: Copyright & Quranic Dua */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Namaz Guide. All educational content prepared with care.</p>
          <div className="flex items-center gap-3">
            <span
              className="arabic-text text-sm sm:text-base text-emerald-400/90"
              lang="ar"
              title="Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing."
            >
              رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
