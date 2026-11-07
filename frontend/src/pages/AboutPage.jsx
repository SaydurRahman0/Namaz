import { Helmet } from 'react-helmet-async';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Islamic Prayer & Dua Guide</title>
        <meta name="description" content="About the Islamic Prayer & Dua Guide website." />
      </Helmet>
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
            About This Project
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
              The Islamic Prayer & Dua Guide is a comprehensive web application designed to help Muslims
              learn and practice their daily prayers. It provides accurate prayer times, step-by-step
              prayer guides, and a library of authentic Duas and Surahs recited during Salah.
            </p>
            <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mt-8 mb-3">
              Features
            </h2>
            <ul className="text-text-secondary-light dark:text-text-secondary-dark space-y-2">
              <li>📍 Accurate prayer times based on your location</li>
              <li>📖 Step-by-step prayer guides for all five daily prayers</li>
              <li>🤲 Authentic Duas with Arabic, Bengali, and English translations</li>
              <li>🕌 Sunnah, Nafl, and Witr prayer guides</li>
              <li>🌙 Dark mode support for comfortable reading</li>
            </ul>
            <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mt-8 mb-3">
              Disclaimer
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
              This application primarily follows the Hanafi school of thought, with notes on other
              Madhhabs where relevant. All religious content is sourced from authentic Hadith
              collections and established Fiqh texts. Bengali pronunciations are provided as a
              learning aid and should not replace learning proper Arabic recitation from a qualified
              teacher.
            </p>
            <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mt-8 mb-3">
              Sources
            </h2>
            <ul className="text-text-secondary-light dark:text-text-secondary-dark space-y-2">
              <li>The Holy Quran</li>
              <li>Sahih al-Bukhari</li>
              <li>Sahih Muslim</li>
              <li>Sunan Abu Dawud</li>
              <li>Jami` at-Tirmidhi</li>
              <li>Sunan an-Nasa'i</li>
              <li>Sunan Ibn Majah</li>
              <li>Nurul Idah (Hanafi Fiqh)</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
