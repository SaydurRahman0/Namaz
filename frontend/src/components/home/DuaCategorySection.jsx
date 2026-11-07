import { Link } from 'react-router-dom';
import { Sparkles, Heart, BookOpen, Layers, Clock, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import DuaCategoryCard from './DuaCategoryCard';

const DUA_CATEGORIES = [
  {
    categoryId: 'beginning',
    title: 'Salah Duas',
    titleBn: 'নামাযের শুরু ও মূল দুআসমূহ',
    description:
      'Essential opening supplications recited in Salah, including Thana (Sana), Ta\'awwudh, and key transitional recitations.',
    count: 'Core Invocations',
    icon: Sparkles,
  },
  {
    categoryId: 'ruku',
    title: 'Ruku & Sajdah',
    titleBn: 'রুকু ও সিজদার তাসবীহ',
    description:
      'Glorification of Allah while bowing in humility (Subhana Rabbiyal Azeem) and prostrating in supreme surrender (Subhana Rabbiyal A\'la).',
    count: 'Tasbeeh & Praises',
    icon: Layers,
  },
  {
    categoryId: 'sitting',
    title: 'Sitting Duas',
    titleBn: 'তাশাহহুদ, দরূদ ও দুআ মাছুরা',
    description:
      'Postures of Qa\'dah including Tashahhud (Attahiyyat), Durood Ibrahim upon the Prophet ﷺ, and authentic concluding prayers.',
    count: 'Qa\'dah Recitations',
    icon: Heart,
  },
  {
    categoryId: 'surahs',
    title: 'Short Surahs',
    titleBn: 'নামাযে পঠিত ছোট সূরাসমূহ',
    description:
      'The essential Surah Al-Fatiha alongside concise, revered chapters like Al-Ikhlas, Al-Falaq, and An-Nas with transliteration.',
    count: 'Essential Surahs',
    icon: BookOpen,
  },
  {
    categoryId: 'after-salah',
    title: 'After Salah Dhikr',
    titleBn: 'নামায পরবর্তী মাসনূন যিকির',
    description:
      'Authentic Sunnah remembrance after the final Salam: Ayat al-Kursi, Tasbeeh Fatimi, and supplications for seeking forgiveness.',
    count: 'Sunnah Remembrances',
    icon: Clock,
  },
];

export default function DuaCategorySection() {
  return (
    <section className="py-14 sm:py-20 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <Container size="lg">
        <SectionHeader
          badge="Dua &amp; Adhkar"
          titleArabic="الأَدْعِيَةُ وَالْأَذْكَارُ"
          title="Authentic Duas &amp; Surahs"
          subtitle="Explore verified supplications recited throughout each posture of prayer and Sunnah adhkar with Arabic text, pronunciation, and meaning."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {DUA_CATEGORIES.map((cat) => (
            <DuaCategoryCard
              key={cat.categoryId}
              categoryId={cat.categoryId}
              title={cat.title}
              titleBn={cat.titleBn}
              description={cat.description}
              count={cat.count}
              icon={cat.icon}
            />
          ))}
        </div>

        {/* Call to action linking to Dua Library */}
        <div className="text-center">
          <Link to="/duas">
            <Button
              variant="primary"
              size="lg"
              icon={BookOpen}
              iconPosition="left"
              className="group"
            >
              <span>Explore Complete Dua Library</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

