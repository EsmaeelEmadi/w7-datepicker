import { DatePicker, MonthPicker } from 'src/context';
import type { DateHelper } from 'src/types';

export const FMT =
  'YYYY-YY-MMMM-MMM-MM-M-DD-D-dddd-ddd-dd-d-HH-H-hh-h-A-a-mm-m-SSS-ss-s-Z';

export const LIST_FMT = FMT.split('-');

export const FMT_JALALI =
  'YYYY-YY-MM-M-DD-D-dddd-ddd-dd-d-HH-H-hh-h-A-a-mm-m-SSS-ss-s-Z';

export const LIST_FMT_JALALI = FMT_JALALI.split('-');

export const WEEKDAYS_JALALI = [
  'شنبه',
  'یک‌شنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنج‌شنبه',
  'جمعه',
];

export const WEEKDAYS_JALALI_SHORT = [
  'شن',
  'یک',
  'دو',
  'سه‌',
  'چه',
  'پن',
  'جم',
];

export const WEEKDAYS_JALALI_MIN = ['ش', 'ی', 'د', 'س‌', 'چ', 'پ', 'ج'];

export const DEFAULT_PARTS: DateHelper = {
  year: 0,
  month: 0,
  // day: 0,
  date: 0,
  daysInMonth: 0
  // hour: 0,
  // hour12: 0,
  // minute: 0,
  // second: 0,
  // millisecond: 0,
  // monthName: '',
  // monthNameShort: '',
  // weekday: '',
  // weekdayShort: '',
  // weekdayMin: '',
  // A: '',
  // a: '',
  // Z: '',
  // numberOfDaysInMonth: 0,
};

// YYYY: '',
// YY: '',
// MMMM: '',
// MMM: '',
// MM: '',
// M: '',
// DD: '',
// D: '',
// dddd: '',
// ddd: '',
// dd: '',
// d: '',
// HH: '',
// H: '',
// hh: '',
// h: '',
// A: '',
// a: '',
// mm: '',
// m: '',
// SSS: '',
// ss: '',
// s: '',
// Z: '',

interface Number {
  type: 'number';
  minLength: number;
  maxLength: number;
  max: number;
}

interface String {
  type: 'string';
}

export const FORMAT_PARTS: Record<string, Number | String> = {
  YY: { type: 'number', minLength: 2, maxLength: 2, max: 9999 },
  YYYY: { type: 'number', minLength: 4, maxLength: 4, max: 9999 },
  M: { type: 'number', minLength: 1, maxLength: 2, max: 12 },
  MM: { type: 'number', minLength: 2, maxLength: 2, max: 12 },
  MMM: { type: 'string' },
  MMMM: { type: 'string' },
  D: { type: 'number', minLength: 1, maxLength: 2, max: 0 },
  DD: { type: 'number', minLength: 2, maxLength: 2, max: 0 },
  d: { type: 'number', minLength: 1, maxLength: 1, max: 7 },
  dd: { type: 'string' },
  ddd: { type: 'string' },
  dddd: { type: 'string' },
  H: { type: 'number', minLength: 1, maxLength: 2, max: 23 },
  HH: { type: 'number', minLength: 2, maxLength: 2, max: 23 },
  h: { type: 'number', minLength: 1, maxLength: 2, max: 12 },
  hh: { type: 'number', minLength: 2, maxLength: 2, max: 12 },
  m: { type: 'number', minLength: 1, maxLength: 2, max: 59 },
  mm: { type: 'number', minLength: 2, maxLength: 2, max: 59 },
  s: { type: 'number', minLength: 1, maxLength: 2, max: 59 },
  ss: { type: 'number', minLength: 2, maxLength: 2, max: 59 },
  SSS: { type: 'number', minLength: 3, maxLength: 3, max: 999 },
  a: { type: 'string' },
  A: { type: 'string' },
  Z: { type: 'string' },
};

export const DEFAULT_MONTH_PICKER_CONTEXT: MonthPicker = {
  view: {
    readonly: false,
    showDatePicker: false,
    selectedPicker: 'date',
    months: [],
    monthsShort: [],
    year: 0,
    month: 0,
  },
  selected: {
    year: 0,
    month: 0,
  },
  current: {
    year: 0,
    month: 0,
  },
};
export const DEFAULT_DATE_PICKER_CONTEXT: DatePicker = {
  view: {
    numberOfDaysInMonth: 0,
    weekdays: [],
    weekdaysShort: [],
    weekdaysMin: [],
    startDay: 0,
    endDay: 0,
    year: 0,
    month: 0,
    date: 0,
  },
  nextMonth: {
    numberOfDaysInMonth: 0,
    year: 0,
    month: 0,
  },
  previousMonth: {
    numberOfDaysInMonth: 0,
    year: 0,
    month: 0,
  },
  selected: {
    year: 0,
    month: 0,
    date: 0,
  },
  current: {
    year: 0,
    month: 0,
    date: 0,
  },
};
