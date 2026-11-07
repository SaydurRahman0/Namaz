import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import PrayerGuideCard from './PrayerGuideCard';

const PRAYER_GUIDES = [
  {
    id: 'fajr',
    nameEn: 'Fajr',
    nameAr: 'الفجر',
    nameBn: 'ফজর',
    rakats: '2 Rakat Farz',
    sunnah: '2 Rakat Sunnah Mu\'akkadah before Farz',
    timeFrame: 'Dawn to Sunrise',
    description:
      'The dawn prayer performed before sunrise. A tranquil start to the day offering peace and sincere spiritual renewal.',
  },
  {
    id: 'dhuhr',
    nameEn: 'Dhuhr',
    nameAr: 'الظهر',
    nameBn: 'যোহর',
    rakats: '4 Rakat Farz',
    sunnah: '4 Sunnah before & 2 Sunnah after Farz',
    timeFrame: 'Midday to Afternoon',
    description:
      'The midday prayer performed after the sun passes its zenith. A sacred pause for mindfulness amid the day’s worldly pursuits.',
  },
  {
    id: 'asr',
    nameEn: 'Asr',
    nameAr: 'العصر',
    nameBn: 'আসর',
    rakats: '4 Rakat Farz',
    sunnah: '4 Rakat Ghair Mu\'akkadah (Optional)',
    timeFrame: 'Late Afternoon to Sunset',
    description:
      'The afternoon prayer guarding remembrance as the day begins to wane. Emphasized in the Quran as the middle prayer.',
  },
  {
    id: 'maghrib',
    nameEn: 'Maghrib',
    nameAr: 'المغرب',
    nameBn: 'মাগরিব',
    rakats: '3 Rakat Farz',
    sunnah: '2 Rakat Sunnah Mu\'akkadah after Farz',
    timeFrame: 'Sunset to Dusk',
    description:
      'The sunset prayer offered immediately after the sun sets below the horizon. Recited with grateful contemplation.',
  },
  {
    id: 'isha',
    nameEn: 'Isha',
    nameAr: 'العشاء',
    nameBn: 'ইশা',
    rakats: '4 Rakat Farz',
    sunnah: '2 Sunnah after Farz + 3 Witr Wajib',
    timeFrame: 'Night to Midnight',
    description:
      'The final obligatory prayer of the day, concluding daily activities with devotion, followed by Witr prayer before rest.',
  },
];

export default function PrayerGuideSection() {
  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <Container size="lg">
        <SectionHeader
          badge="Obligatory Prayers"
          titleArabic="الصَّلَوَاتُ الْخَمْسُ"
          title="The Five Daily Prayers"
          subtitle="Explore the obligatory Farz rakats, timing windows, and step-by-step guidance for each prescribed daily prayer."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {PRAYER_GUIDES.map((prayer) => (
            <PrayerGuideCard
              key={prayer.id}
              id={prayer.id}
              nameEn={prayer.nameEn}
              nameAr={prayer.nameAr}
              nameBn={prayer.nameBn}
              rakats={prayer.rakats}
              sunnah={prayer.sunnah}
              timeFrame={prayer.timeFrame}
              description={prayer.description}
            />
          ))}
        </div>

        {/* Call to action linking to complete guide */}
        <div className="text-center">
          <Link to="/prayer-guide">
            <Button
              variant="secondary"
              size="lg"
              icon={BookOpen}
              iconPosition="left"
              className="group"
            >
              <span>Explore Complete Salah Learning Guide</span>
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

