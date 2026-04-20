/**
 * Pure utilities for time parsing and formatting
 */

export function parseTime(timeStr: string) {
  if (!timeStr) return { h: '', m: '', p: '' };

  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr || '12');
  const p = h >= 12 ? 'PM' : 'AM';

  h = h % 12;
  if (h === 0) h = 12;

  return { h: String(h), m: mStr || '00', p };
}

export function formatTime(h: string, m: string, p: string): string {
  let hour = parseInt(h || '12');

  if (p === 'PM' && hour !== 12) hour += 12;
  if (p === 'AM' && hour === 12) hour = 0;

  return `${String(hour).padStart(2, '0')}:${(m || '00').padStart(2, '0')}`;
}
