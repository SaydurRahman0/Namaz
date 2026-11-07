import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';
import Container from '../common/Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800 mt-auto">
      <Container size="lg" className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl" role="img" aria-label="Mosque">
                🕌
              </span>
              <span className="text-lg font-bold text-emerald-400">
                Namaz Guide
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              A modern, reliable Islamic prayer companion to help Muslims learn
              Salah step-by-step and recite authentic Duas and Surahs with
              meaning and transliteration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors duration-150 inline-flex items-center gap-2"
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

          {/* Authentic Reference & Disclaimer */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              Content & Fiqh Disclaimer
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              This educational guide primarily reflects the Hanafi school of
              thought. All Duas are cited from verified Hadith and Quranic
              sources. Bengali pronunciation is provided solely as a learning aid.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Namaz Guide. Dedicated to the Muslim Ummah.</p>
          <p className="arabic-text text-sm text-emerald-400/80">
            رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
          </p>
        </div>
      </Container>
    </footer>
  );
}
