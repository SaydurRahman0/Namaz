import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../pages/HomePage'));
const PrayerTimesPage = lazy(() => import('../pages/PrayerTimesPage'));
const PrayerGuidePage = lazy(() => import('../pages/PrayerGuidePage'));
const PrayerDetailPage = lazy(() => import('../pages/PrayerDetailPage'));
const DuaLibraryPage = lazy(() => import('../pages/DuaLibraryPage'));
const DuaDetailPage = lazy(() => import('../pages/DuaDetailPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prayer-times" element={<PrayerTimesPage />} />
        <Route path="/prayer-guide" element={<PrayerGuidePage />} />
        <Route path="/prayer-guide/:prayerId" element={<PrayerDetailPage />} />
        <Route path="/duas" element={<DuaLibraryPage />} />
        <Route path="/duas/:duaId" element={<DuaDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
