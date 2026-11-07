export const PRAYER_NAMES = {
  fajr: { en: 'Fajr', bn: 'ফজর', ar: 'الفجر' },
  sunrise: { en: 'Sunrise', bn: 'সূর্যোদয়', ar: 'الشروق' },
  dhuhr: { en: 'Dhuhr', bn: 'যোহর', ar: 'الظهر' },
  asr: { en: 'Asr', bn: 'আসর', ar: 'العصر' },
  maghrib: { en: 'Maghrib', bn: 'মাগরিব', ar: 'المغرب' },
  isha: { en: 'Isha', bn: 'ইশা', ar: 'العشاء' },
};

export const CALCULATION_METHODS = [
  { id: 1, name: 'University of Islamic Sciences, Karachi', shortName: 'Karachi' },
  { id: 2, name: 'Islamic Society of North America (ISNA)', shortName: 'ISNA' },
  { id: 3, name: 'Muslim World League', shortName: 'MWL' },
  { id: 4, name: 'Umm Al-Qura University, Makkah', shortName: 'Umm Al-Qura' },
  { id: 5, name: 'Egyptian General Authority of Survey', shortName: 'Egypt' },
  { id: 7, name: 'Institute of Geophysics, University of Tehran', shortName: 'Tehran' },
  { id: 8, name: 'Gulf Region', shortName: 'Gulf' },
  { id: 9, name: 'Kuwait', shortName: 'Kuwait' },
  { id: 10, name: 'Qatar', shortName: 'Qatar' },
  { id: 11, name: 'Majlis Ugama Islam Singapura', shortName: 'Singapore' },
  { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey', shortName: 'Turkey (Diyanet)' },
  { id: 14, name: 'Spiritual Administration of Muslims of Russia', shortName: 'Russia' },
  { id: 15, name: 'Moonsighting Committee Worldwide', shortName: 'Moonsighting' },
];

export const ASR_METHODS = [
  { id: 0, name: 'Shafi\'i, Maliki, Hanbali', shortName: 'Standard (Shafi\'i)' },
  { id: 1, name: 'Hanafi', shortName: 'Hanafi' },
];

export const DEFAULT_LOCATION = {
  latitude: 23.8103,
  longitude: 90.4125,
  city: 'Dhaka',
  country: 'Bangladesh',
  timezone: 'Asia/Dhaka',
};

export const DEFAULT_METHOD = 1;
export const DEFAULT_SCHOOL = 1;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const DUA_CATEGORIES = [
  { id: 'all', name: 'All', nameBn: 'সকল' },
  { id: 'beginning', name: 'Beginning of Salah', nameBn: 'নামাযের শুরু' },
  { id: 'qiyam', name: 'Qiyam (Standing)', nameBn: 'কিয়াম (দাঁড়ানো)' },
  { id: 'ruku', name: 'Ruku (Bowing)', nameBn: 'রুকু' },
  { id: 'sajdah', name: 'Sajdah (Prostration)', nameBn: 'সিজদা' },
  { id: 'sitting', name: 'Sitting Position', nameBn: 'বসা অবস্থা' },
  { id: 'after-salah', name: 'After Salah', nameBn: 'নামাযের পর' },
];

export const NAV_LINKS = [
  { path: '/', label: 'Home', labelBn: 'হোম' },
  { path: '/prayer-times', label: 'Prayer Times', labelBn: 'নামাযের সময়' },
  { path: '/prayer-guide', label: 'Prayer Guide', labelBn: 'নামায শিক্ষা' },
  { path: '/duas', label: 'Dua & Surah', labelBn: 'দুআ ও সূরা' },
  { path: '/about', label: 'About', labelBn: 'সম্পর্কে' },
];
