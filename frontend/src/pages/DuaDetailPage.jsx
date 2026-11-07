import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function DuaDetailPage() {
  const { duaId } = useParams();

  return (
    <>
      <Helmet>
        <title>Dua Details — Islamic Prayer & Dua Guide</title>
      </Helmet>
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          Dua: {duaId}
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          Dua detail pages will be built in Phase 06.
        </p>
      </div>
    </>
  );
}
