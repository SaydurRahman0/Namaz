import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Compass,
  BookOpen,
  Heart,
  Server,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import { systemAPI } from '../services/api';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import SectionHeader from '../components/common/SectionHeader';

export default function HomePage() {
  const [healthStatus, setHealthStatus] = useState({
    loading: true,
    connected: false,
    data: null,
    error: null,
  });

  const checkBackendHealth = async () => {
    setHealthStatus((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await systemAPI.checkHealth();
      setHealthStatus({
        loading: false,
        connected: true,
        data: response,
        error: null,
      });
    } catch (err) {
      setHealthStatus({
        loading: false,
        connected: false,
        data: null,
        error: err.message || 'Could not connect to backend server',
      });
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  return (
    <>
      <Helmet>
        <title>Islamic Prayer & Dua Guide — Daily Salah Companion</title>
        <meta
          name="description"
          content="Accurate prayer times, step-by-step Salah learning guide, and authentic Duas with Arabic text, Bengali pronunciation, and English translation."
        />
      </Helmet>

      {/* Minimal Placeholder Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 dark:border-slate-800">
        <div className="absolute inset-0 bg-radial from-emerald-50/60 via-transparent to-transparent dark:from-emerald-950/20 pointer-events-none" />

        <Container size="lg" className="relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Islamic Greeting & Bismillah */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                Phase 01 — Foundation Shell
              </span>
              <p
                className="arabic-text text-2xl sm:text-3xl text-emerald-800 dark:text-emerald-300 font-semibold tracking-normal"
                lang="ar"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium italic">
                &ldquo;In the name of Allah, the Most Gracious, the Most Merciful&rdquo;
              </p>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              Islamic Prayer &amp; Dua Guide
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Your comprehensive daily Islamic companion for accurate prayer times,
              step-by-step Salah guides, and verified Duas with Arabic script, Bengali
              pronunciation, and English translation.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/prayer-times">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Compass}
                  iconPosition="left"
                >
                  Prayer Times
                </Button>
              </Link>
              <Link to="/prayer-guide">
                <Button
                  variant="outline"
                  size="lg"
                  icon={BookOpen}
                  iconPosition="left"
                >
                  Explore Guide
                </Button>
              </Link>
              <Link to="/duas">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={Heart}
                  iconPosition="left"
                >
                  Dua Library
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Backend Connectivity Status Verification */}
      <section className="py-12 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800">
        <Container size="md">
          <Card
            variant="elevated"
            padding="md"
            className="border-emerald-200 dark:border-emerald-900/50"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    healthStatus.loading
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                      : healthStatus.connected
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      : 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400'
                  }`}
                >
                  {healthStatus.loading ? (
                    <RefreshCw className="animate-spin" size={22} />
                  ) : healthStatus.connected ? (
                    <CheckCircle2 size={22} />
                  ) : (
                    <AlertCircle size={22} />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      API Server Connectivity
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        healthStatus.loading
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : healthStatus.connected
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}
                    >
                      {healthStatus.loading
                        ? 'Verifying...'
                        : healthStatus.connected
                        ? 'Connected (200 OK)'
                        : 'Offline / Disconnected'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {healthStatus.loading
                      ? 'Checking connection to GET /api/health...'
                      : healthStatus.connected
                      ? `${healthStatus.data?.message || 'Server is healthy'} — ${
                          healthStatus.data?.timestamp || 'ready'
                        }`
                      : healthStatus.error}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                icon={RefreshCw}
                isLoading={healthStatus.loading}
                onClick={checkBackendHealth}
                className="shrink-0"
              >
                Re-check API
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      {/* Design System & Typography Verification Showcase */}
      <section className="py-16">
        <Container size="lg">
          <SectionHeader
            title="Design System &amp; Typography Foundation"
            subtitle="Testing colors, typography rules (English, Bengali, Arabic), and reusable atomic components for accessibility and dark mode."
            badge="Phase 01 Tokens"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Arabic Typography Card */}
            <Card variant="interactive" padding="md" className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400">
                Arabic Typography (Noto Naskh Arabic)
              </span>
              <p
                className="arabic-text text-2xl text-slate-900 dark:text-slate-100 font-semibold"
                lang="ar"
              >
                اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                RTL direction, 2.2 line height, diacritics rendering, and smooth font
                smoothing enabled.
              </p>
            </Card>

            {/* Bengali Typography Card */}
            <Card variant="interactive" padding="md" className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400">
                Bengali Typography (Hind Siliguri)
              </span>
              <p className="font-bengali text-lg text-slate-900 dark:text-slate-100 font-semibold leading-relaxed">
                আল্লাহ ছাড়া কোনো সত্য ইলাহ নেই, তিনি চিরঞ্জীব ও সর্বসত্তার ধারক।
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Clear vowel signs, distinct conjunct glyphs, and natural Bangla
                reading rhythm.
              </p>
            </Card>

            {/* English & UI Typography Card */}
            <Card variant="interactive" padding="md" className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400">
                English Typography (Inter)
              </span>
              <p className="font-sans text-base text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                &ldquo;Allah! There is no deity except Him, the Ever-Living, the Sustainer
                of all existence.&rdquo;
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Geometric clarity, excellent x-height, and optimal contrast on light and
                dark surfaces.
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
