/**
 * Pure utilities for time parsing and formatting
 */

export function parseTime(timeStr: string) {
  if (!timeStr) return { h: '', m: '', p: '' };

  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr || '12');

  // Clamp hour to valid range [0, 23] just in case corrupted data
  h = Math.max(0, Math.min(23, h));

  const p = h >= 12 ? 'PM' : 'AM';

  let displayH = h % 12;
  if (displayH === 0) displayH = 12;

  // Clamp minute string length and value
  const m = Math.max(0, Math.min(59, parseInt(mStr || '00')));

  return {
    h: String(displayH),
    m: String(m).padStart(2, '0'),
    p,
  };
}

export function formatTime(h: string, m: string, p: string): string {
  // Clamp input values to valid 12-hour format ranges
  let hour = Math.max(1, Math.min(12, parseInt(h || '12')));
  const minute = Math.max(0, Math.min(59, parseInt(m || '00')));

  if (p === 'PM' && hour !== 12) hour += 12;
  if (p === 'AM' && hour === 12) hour = 0;

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}
