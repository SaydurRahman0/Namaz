import { Helmet } from 'react-helmet-async';

export default function DuaLibraryPage() {
  return (
    <>
      <Helmet>
        <title>Dua & Surah Library — Islamic Prayer & Dua Guide</title>
        <meta name="description" content="Browse authentic Duas and Surahs for Salah with Arabic text, Bengali pronunciation, and English translation." />
      </Helmet>
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          Dua & Surah Library
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          Dua library with categories will be built in Phase 05.
        </p>
      </div>
    </>
  );
}
