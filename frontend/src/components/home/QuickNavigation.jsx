import { Link } from 'react-router-dom';
import { Compass, BookOpen, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Card from '../common/Card';

const QUICK_LINKS = [
  {
    path: '/prayer-times',
    title: 'Prayer Timetable',
    titleBn: 'নামাযের সময়সূচী',
    description: 'Check daily schedule, next prayer indicators, and calculation methods.',
    icon: Compass,
    badge: 'Daily Times',
  },
  {
    path: '/prayer-guide',
    title: 'Prayer Guide',
    titleBn: 'নামায শিক্ষা',
    description: 'Learn the Farz rakats, steps, postures, and rules for all five daily prayers.',
    icon: BookOpen,
    badge: 'Salah Guide',
  },
  {
    path: '/duas',
    title: 'Dua & Surah Library',
    titleBn: 'দুআ ও সূরা ভাণ্ডার',
    description: 'Discover authentic supplications with Arabic, Bengali transliteration, and meaning.',
    icon: Sparkles,
    badge: 'Verified Adhkar',
  },
  {
    path: '/about',
    title: 'About & Methodology',
    titleBn: 'আমাদের সম্পর্কে',
    description: 'Learn about our educational mission, Islamic sources, and fiqh methodology.',
    icon: HelpCircle,
    badge: 'About Us',
  },
];

export default function QuickNavigation() {
  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-slate-900 transition-colors">
      <Container size="lg">
        <SectionHeader
          badge="Quick Access"
          titleArabic="الْوُصُولُ السَّرِيعُ"
          title="Explore Namaz Guide"
          subtitle="Navigate directly to our core educational resources, daily prayer schedules, and authentic supplication library."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl"
              >
                <Card
                  variant="interactive"
                  padding="lg"
                  className="h-full flex flex-col justify-between border-slate-200/80 dark:border-slate-800 group-hover:border-emerald-300 dark:group-hover:border-emerald-700/60"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-bengali text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.titleBn}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                    <span>Open Resource</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

