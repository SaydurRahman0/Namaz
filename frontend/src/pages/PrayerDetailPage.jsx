import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function PrayerDetailPage() {
  const { prayerId } = useParams();

  return (
    <>
      <Helmet>
        <title>{`${prayerId} Prayer Guide — Islamic Prayer & Dua Guide`}</title>
      </Helmet>
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          {prayerId} Prayer — Detailed Guide
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          Detailed prayer guide will be built in Phase 04.
        </p>
      </div>
    </>
  );
}
