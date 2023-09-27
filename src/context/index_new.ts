import { createContext } from '@lit-labs/context';
import { Entities } from 'src/types';

export interface Block {
  now: number;
  view: number;
  selected: number;
}

export interface SelectedContext {
  year: number,
  month: number,
  date: number
  daysInMonth: number
}

export interface CurrentContext {
  year: number,
  month: number,
  date: number
}

export interface ViewContext {
  year: number,
  month: number,
}

export interface HelperContext {
  weekdays: string[];
  weekdaysShort: string[];
  weekdaysMin: string[];
}

// export type SelectedContext = Selected;
export const selectedContext = createContext<SelectedContext>('SELECTED_CONTEXT');
export const currentContext = createContext<CurrentContext>('CURRENT_CONTEXT');
export const viewContext = createContext<ViewContext>('VIEW_CONTEXT');
export const helperContext = createContext<HelperContext>('HELPER_CONTEXT');

//-- year
// export type YearContext = Block;
// export const yearContext = createContext<YearContext>('YEAR_CONTEXT');



//-- month
// export type MonthContext = Block;
// export const monthContext = createContext<MonthContext>('MONTH_CONTEXT');

// export type Month = Block; // idk

//-- day
// export type DayContext = Block;
// export const dayContext = createContext<DayContext>('DAY_CONTEXT');

//-- date
// export type Date = Block;

//-- dispatch
export type SetDateByPartName = (
  part: keyof typeof Entities,
  value: string | number
) => void;
export interface DispatchContext {
  setDateByPartName: SetDateByPartName;
}
export const dispatchContext = createContext<DispatchContext>('DISPATCH');

// export interface General {
//   readonly: boolean;
// }
//
// export interface Datepicker {
//   show: boolean;
//   date: boolean;
//   month: boolean;
//   year: boolean;
//   quarter: boolean; // TODO: implement it later
// }
