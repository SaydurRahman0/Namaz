import { Link } from 'react-router-dom';
import { Droplet, UserCheck, Volume2, ShieldCheck, ArrowRight } from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Card from '../common/Card';
import Button from '../common/Button';

const STEPS = [
  {
    step: '01',
    title: 'Taharah & Intention',
    titleBn: 'পবিত্রতা ও নিয়ত',
    description:
      'Perform ablution (Wudu) with attention to Sunnah, ensure clean attire and place of prayer, face the Qiblah, and prepare the heart.',
    icon: Droplet,
  },
  {
    step: '02',
    title: 'Step-by-Step Postures',
    titleBn: 'ধাপে ধাপে নামাযের রুকনসমূহ',
    description:
      'Clear posture guides for Takbir, Qiyam (standing), Ruku (bowing), Sujud (prostration), and Qa\'dah (sitting) with proper limb alignment.',
    icon: UserCheck,
  },
  {
    step: '03',
    title: 'Recitation & Meaning',
    titleBn: 'সহীহ তিলাওয়াত ও অর্থ',
    description:
      'Learn correct Arabic pronunciation with Bengali transliteration aids alongside clear English translations for deeper spiritual connection.',
    icon: Volume2,
  },
  {
    step: '04',
    title: 'Sunnah & Khushu',
    titleBn: 'সুন্নাত ও একাগ্রতা (খুশু)',
    description:
      'Develop inner tranquility (Khushu), avoid common mistakes in posture and timing, and conclude with authentic prophetic remembrances.',
    icon: ShieldCheck,
  },
];

export default function LearningSection() {
  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <Container size="lg">
        <SectionHeader
          badge="Learning Experience"
          titleArabic="تَعَلَّمْ كَيْفَ تُصَلِّي"
          title="Learn Salah Step-by-Step"
          subtitle="A structured, welcoming guide designed for beginners and anyone looking to refine their prayer according to the authentic prophetic manner."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.step}
                variant="default"
                padding="lg"
                className="relative overflow-hidden flex flex-col justify-between border-slate-200/80 dark:border-slate-800"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-emerald-600/30 dark:text-emerald-400/25">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
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
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/prayer-guide">
            <Button
              variant="outline"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="group"
            >
              <span>Begin Your Salah Journey</span>
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

