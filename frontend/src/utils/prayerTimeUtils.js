/**
 * Comprehensive prayer time calculations, timezone handling, and countdown utilities.
 */

export const PRAYER_KEYS = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

export const OBLIGATORY_PRAYER_KEYS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

export const PRAYER_DETAILS = {
  fajr: {
    key: 'fajr',
    nameEn: 'Fajr',
    nameAr: 'الفجر',
    nameBn: 'ফজর',
    rakats: '2 Rakat Farz',
    isObligatory: true,
  },
  sunrise: {
    key: 'sunrise',
    nameEn: 'Sunrise',
    nameAr: 'الشروق',
    nameBn: 'সূর্যোদয়',
    rakats: 'Islamic Sunrise',
    isObligatory: false,
  },
  dhuhr: {
    key: 'dhuhr',
    nameEn: 'Dhuhr',
    nameAr: 'الظهر',
    nameBn: 'যোহর',
    rakats: '4 Rakat Farz',
    isObligatory: true,
  },
  asr: {
    key: 'asr',
    nameEn: 'Asr',
    nameAr: 'العصر',
    nameBn: 'আসর',
    rakats: '4 Rakat Farz',
    isObligatory: true,
  },
  maghrib: {
    key: 'maghrib',
    nameEn: 'Maghrib',
    nameAr: 'المغرب',
    nameBn: 'মাগরিব',
    rakats: '3 Rakat Farz',
    isObligatory: true,
  },
  isha: {
    key: 'isha',
    nameEn: 'Isha',
    nameAr: 'العشاء',
    nameBn: 'ইশা',
    rakats: '4 Rakat Farz',
    isObligatory: true,
  },
};

/**
 * Converts 24h format "17:16" to 12h format "5:16 PM"
 */
export function formatTime12h(time24) {
  if (!time24 || typeof time24 !== 'string') return '--:--';
  const clean = time24.split(' ')[0].trim();
  const [hoursStr, minutesStr] = clean.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (isNaN(hours) || isNaN(minutes)) return clean;

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const displayMinutes = String(minutes).padStart(2, '0');

  return `${displayHours}:${displayMinutes} ${period}`;
}

/**
 * Gets the current date/time in the specified IANA timezone.
 */
export function getNowInTimezone(timezone) {
  if (!timezone) return new Date();
  try {
    const str = new Date().toLocaleString('en-US', { timeZone: timezone });
    return new Date(str);
  } catch {
    return new Date();
  }
}

/**
 * Creates a Date object for a specific prayer on a specific day in the given timezone.
 */
function createPrayerDate(timeStr, baseDate) {
  if (!timeStr) return null;
  const [hoursStr, minutesStr] = timeStr.split(':');
  const d = new Date(baseDate.getTime());
  d.setHours(parseInt(hoursStr, 10), parseInt(minutesStr, 10), 0, 0);
  return d;
}

/**
 * Calculates current active prayer, next upcoming prayer, time remaining, and progress.
 */
export function calculateNextPrayer(timings, timezone, tomorrowFajr = null) {
  if (!timings || !timings.fajr) {
    return null;
  }

  const now = getNowInTimezone(timezone);

  // Build Date objects for each prayer today
  const prayerTimesToday = [
    { key: 'fajr', date: createPrayerDate(timings.fajr, now), isObligatory: true },
    { key: 'sunrise', date: createPrayerDate(timings.sunrise, now), isObligatory: false },
    { key: 'dhuhr', date: createPrayerDate(timings.dhuhr, now), isObligatory: true },
    { key: 'asr', date: createPrayerDate(timings.asr, now), isObligatory: true },
    { key: 'maghrib', date: createPrayerDate(timings.maghrib, now), isObligatory: true },
    { key: 'isha', date: createPrayerDate(timings.isha, now), isObligatory: true },
  ];

  const nowMs = now.getTime();

  let currentItem = null;
  let nextItem = null;
  let prevDate = null;
  let nextDate = null;

  // Case 1: Before Fajr today (00:00 to Fajr)
  if (nowMs < prayerTimesToday[0].date.getTime()) {
    currentItem = { key: 'isha', nameEn: 'Night', isObligatory: true };
    nextItem = PRAYER_DETAILS.fajr;
    nextDate = prayerTimesToday[0].date;
    // Previous prayer was yesterday's Isha (~24h prior)
    prevDate = new Date(prayerTimesToday[5].date.getTime() - 24 * 60 * 60 * 1000);
  }
  // Case 2: Between prayers during the day
  else {
    for (let i = 0; i < prayerTimesToday.length - 1; i++) {
      const current = prayerTimesToday[i];
      const next = prayerTimesToday[i + 1];

      if (nowMs >= current.date.getTime() && nowMs < next.date.getTime()) {
        currentItem = PRAYER_DETAILS[current.key];
        nextItem = PRAYER_DETAILS[next.key];
        prevDate = current.date;
        nextDate = next.date;
        break;
      }
    }
  }

  // Case 3: After Isha tonight (Isha to Midnight/next Fajr)
  if (!nextItem && nowMs >= prayerTimesToday[5].date.getTime()) {
    currentItem = PRAYER_DETAILS.isha;
    nextItem = PRAYER_DETAILS.fajr;
    prevDate = prayerTimesToday[5].date;

    // Tomorrow's Fajr
    if (tomorrowFajr) {
      const tomorrowBase = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      nextDate = createPrayerDate(tomorrowFajr, tomorrowBase);
    } else {
      // Add 24h to today's Fajr
      nextDate = new Date(prayerTimesToday[0].date.getTime() + 24 * 60 * 60 * 1000);
    }
  }

  if (!nextDate) {
    return null;
  }

  // Calculate remaining time
  const diffMs = Math.max(0, nextDate.getTime() - nowMs);
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedCountdown = `${String(hours).padStart(2, '0')}h ${String(
    minutes
  ).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;

  // Calculate interval progress percentage (0 - 100)
  let progress = 0;
  if (prevDate && nextDate) {
    const totalDuration = nextDate.getTime() - prevDate.getTime();
    const elapsed = nowMs - prevDate.getTime();
    if (totalDuration > 0) {
      progress = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));
    }
  }

  return {
    currentPrayer: currentItem,
    nextPrayer: nextItem,
    nextPrayerTime: timings[nextItem.key] || '',
    nextPrayerDate: nextDate,
    timeRemaining: {
      hours,
      minutes,
      seconds,
      totalSeconds,
      formatted: formattedCountdown,
    },
    progress,
    isPassed: totalSeconds === 0,
  };
}

