import { Helmet } from 'react-helmet-async';

export default function PrayerGuidePage() {
  return (
    <>
      <Helmet>
        <title>Prayer Guide — Islamic Prayer & Dua Guide</title>
        <meta name="description" content="Step-by-step guide to performing the five daily prayers in Islam." />
      </Helmet>
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          Prayer Guide
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          Step-by-step prayer guides will be built in Phase 04.
        </p>
      </div>
    </>
  );
}
