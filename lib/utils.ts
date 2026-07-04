import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes safely, resolving conflicts.
// Used throughout every component via cn(...).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date helpers
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const monthsFull = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysFull = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Parse a "YYYY-MM-DD" string as a local date, avoiding UTC offset shifting the day
function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year!, month! - 1, day!);
}

// Format a date string as "Sat, 14 Nov 2026"
export function formatDateShort(dateString: string): string {
  const date = parseLocalDate(dateString);
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Format a date string as "Saturday, 14 November 2026"
export function formatDateLong(dateString: string): string {
  const date = parseLocalDate(dateString);
  return `${daysFull[date.getDay()]}, ${date.getDate()} ${monthsFull[date.getMonth()]} ${date.getFullYear()}`;
}
