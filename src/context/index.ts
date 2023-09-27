import { createContext } from '@lit-labs/context';
// import { SetYear } from 'src/types';

// export interface Context {
//   selected: DateHelper;
// }

// export const context = createContext<Context>('inputCtx');

export interface MonthPicker {
  view: {
    readonly: boolean;
    showDatePicker: boolean;
    selectedPicker: 'date' | 'month' | 'year';
    months: string[];
    monthsShort: string[];
    year: number;
    month: number;
  };
  current: {
    year: number;
    month: number;
  };
  selected: {
    year: number;
    month: number;
  };
}

export const monthPicker = createContext<MonthPicker>('monthPickerCtx');

export interface DatePicker {
  view: {
    numberOfDaysInMonth: number;
    weekdays: string[];
    weekdaysShort: string[];
    weekdaysMin: string[];
    startDay: number;
    endDay: number;
    year: number;
    month: number;
    date: number;
  };
  nextMonth: {
    numberOfDaysInMonth: number;
    year: number;
    month: number;
  };
  previousMonth: {
    numberOfDaysInMonth: number;
    year: number;
    month: number;
  };
  current: {
    year: number;
    month: number;
    date: number;
  };
  selected: {
    year: number;
    month: number;
    date: number;
  };
}

export const datePicker = createContext<DatePicker>('datePickerCtx');

// export interface Dispatch {
//   set: (part: DatePart, value: string | number) => void;
//   setMonth: (year: number, month: number) => void;
//   setYear: SetYear;
//   setDate: (year: number, month: number, date: number) => void;
//   handleDate: () => void;
//   setByString: (
//     datePart: keyof InputPartName,
//     partName: DatePart,
//     value: string
//   ) => undefined | { index: number; value: string };
// }

// export const dispatch = createContext<Dispatch>('dispatchCtx');
