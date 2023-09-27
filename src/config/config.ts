// {Dayjs}
import dayjs from 'dayjs/esm';
import localeData from 'dayjs/esm/plugin/localeData';
import calendar from 'dayjs/esm/plugin/calendar';
import weekday from 'dayjs/esm/plugin/weekday'
import weekyear from 'dayjs/esm/plugin/weekOfYear'

import { ObservableSet } from '../helpers/observableSet';

import EventBus from '../helpers/eventBus';
import { Queue } from '../helpers/queue';

import { Calendars } from '../types';

export class DateConfig {
  /**
   * sharing dayjs refrence between date picker instances
   */
  public dayjs = dayjs;

  /**
   * Calendar
   */
  private isLoadingCalendar: keyof typeof Calendars | undefined;

  private calendarsQueueToAdd = new Queue<keyof typeof Calendars>();

  private addCalendar = async (value: keyof typeof Calendars) => {
    if (this.isLoadingCalendar && this.isLoadingCalendar != value) {
      this.calendarsQueueToAdd.enqueue(value);
    } else {
      this.loadCalendar(value);
    }
  };

  private async loadCalendar(value: keyof typeof Calendars) {
    if (value === Calendars.Jalali) {
      this.isLoadingCalendar = value;
      const jalaliCalendar = await import('@zoomit/dayjs-jalali-plugin');
      this.dayjs.extend(jalaliCalendar.default);
      this.dayjs().calendar('jalali');
      EventBus.emit('on-calendar-load', value);
      this.isLoadingCalendar = undefined;
      if (!this.calendarsQueueToAdd.isEmpty()) {
        this.loadCalendar(
          this.localesQueueToAdd.dequeue() as keyof typeof Calendars
        );
      }
    }
  }

  public calendars = new ObservableSet<keyof typeof Calendars>(
    this.addCalendar
  );

  /**
   * Locale
   */
  private isLoadingLocale: string | undefined;

  private localesQueueToAdd = new Queue<string>();

  private async loadLocale(value: string) {
    this.isLoadingLocale = value;
    await import(`dayjs/esm/locale/${value}.js`);
    EventBus.emit('on-locale-load', value);
    this.isLoadingLocale = undefined;
    if (!this.localesQueueToAdd.isEmpty()) {
      this.loadLocale(this.localesQueueToAdd.dequeue() as string);
    }
  }

  private addLocale = async (value: string) => {
    if (!this.isLoadingLocale && this.isLoadingLocale !== value) {
      this.loadLocale(value);
    } else {
      this.localesQueueToAdd.enqueue(value);
    }
  };

  public locales = new ObservableSet<string>(this.addLocale);

  constructor() {
    /**
     * localeData and calendar may be loaded conditionally as well
     */
    dayjs.extend(weekday)
    dayjs.extend(weekyear)

    dayjs.extend(localeData);
    dayjs.extend(calendar);
    this.calendars.add(Calendars.Gregory);
    this.locales.add('en');
  }
}

export default new DateConfig();
