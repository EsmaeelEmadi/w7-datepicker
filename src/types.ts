import { Dayjs } from 'dayjs/esm';
// export type TCalendar = 'gregory' | 'jalali';
export type TLocales = string[];

export enum Calendars {
  Gregory = 'Gregory',
  Jalali = 'Jalali',
}
export enum Entities {
  year = 'year',
  month = 'month',
  date = 'date',
  day = 'day',
  hour = 'hour',
  minute = 'minute',
  second = 'second',
  millisecond = 'millisecond',
}

export enum Parts {
  YYYY,
  YY,
  MMMM,
  MMM,
  MM,
  M,
  DD,
  D,
  dddd,
  ddd,
  dd,
  d,
  HH,
  H,
  hh,
  h,
  mm,
  m,
  SSS,
  ss,
  s,
  Z,
  A,
  a,
}

export enum CalendarModes {
  Normal,
  Dialog,
  Modal,
}

export type SetYear = (year: number) => void;

// type guards
export function isCalendar(v: string | null): v is keyof typeof Calendars {
  console.log(typeof v in Calendars);
  if (v) {
    return v in Calendars;
  } else {
    return false;
  }
}

export function isDayjs(date: number | Dayjs): date is Dayjs {
  return typeof date !== 'number';
}

// export type DatePart =
//   | 'year'
//   | 'month'
//   | 'date'
//   | 'day'
//   | 'hour'
//   | 'minute'
//   | 'second'
//   | 'millisecond';

export interface DateHelper {
  year: number;
  month: number;
  date: number;
  daysInMonth: number;


  // day: number;
  // hour: number;
  // hour12: number;
  // minute: number;
  // second: number;
  // millisecond: number;
  // monthName: string;
  // monthNameShort: string;
  // weekday: string;
  // weekdayShort: string;
  // weekdayMin: string;
  // A: string;
  // a: string;
  // Z: string;
  // numberOfDaysInMonth: number;
}

// export interface InputPartName {
//   YYYY: string;
//   YY: string;
//   MMMM: string;
//   MMM: string;
//   MM: string;
//   M: string;
//   DD: string;
//   D: string;
//   dddd: string;
//   ddd: string;
//   dd: string;
//   d: string;
//   HH: string;
//   H: string;
//   hh: string;
//   h: string;
//   mm: string;
//   m: string;
//   SSS: string;
//   ss: string;
//   s: string;
//   Z: string;
//   A: string;
//   a: string;
// }
