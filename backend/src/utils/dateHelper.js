/**
 * Helper to normalize and validate dates for AlAdhan API.
 * AlAdhan expects DD-MM-YYYY format for /timings/{date}.
 */

function isValidDateString(str) {
  if (!str || typeof str !== 'string') return false;
  // Match YYYY-MM-DD or DD-MM-YYYY
  const isoPattern = /^\d{4}-\d{2}-\d{2}$/;
  const dmyPattern = /^\d{2}-\d{2}-\d{4}$/;
  return isoPattern.test(str) || dmyPattern.test(str);
}

function normalizeToDmy(dateInput) {
  if (!dateInput) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // If already in DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateInput)) {
    return dateInput;
  }

  // If in YYYY-MM-DD (ISO format)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [year, month, day] = dateInput.split('-');
    return `${day}-${month}-${year}`;
  }

  throw new Error('Invalid date format. Expected YYYY-MM-DD or DD-MM-YYYY.');
}

function dmyToIso(dmyStr) {
  if (!dmyStr) return '';
  const [day, month, year] = dmyStr.split('-');
  return `${year}-${month}-${day}`;
}

function getNextDayDmy(dmyStr) {
  const [day, month, year] = dmyStr.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  d.setUTCDate(d.getUTCDate() + 1);
  const nextDay = String(d.getUTCDate()).padStart(2, '0');
  const nextMonth = String(d.getUTCMonth() + 1).padStart(2, '0');
  const nextYear = d.getUTCFullYear();
  return `${nextDay}-${nextMonth}-${nextYear}`;
}

module.exports = {
  isValidDateString,
  normalizeToDmy,
  dmyToIso,
  getNextDayDmy,
};

