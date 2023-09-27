import { customElement, property, state } from 'lit/decorators.js';
import { LitElement, html, css } from 'lit';
import { provide } from '@lit-labs/context';

import config from './config/config';
import eventBus from './helpers/eventBus';

import {
  // YearContext,
  // yearContext,
  // MonthContext,
  // monthContext,
  SelectedContext,
  selectedContext,
  CurrentContext,
  currentContext,
  ViewContext,
  viewContext,
  DispatchContext,
  dispatchContext,
  SetDateByPartName,
  helperContext,
  HelperContext,
} from './context/index_new';


// import {
//   WEEKDAYS_JALALI,
//   WEEKDAYS_JALALI_SHORT,
//   WEEKDAYS_JALALI_MIN,
// } from './constants';

import { type Dayjs } from 'dayjs/esm';
import { Calendars, isCalendar } from './types';

@customElement('w7-dp-wrapper')
export class OdWrapper extends LitElement {
  /**
   * CSS
   */
  static override styles = css`
    .input-parts-wrapper {
      display: flex;
      align-items: center;
    }
    :host ::slotted(w7-dp-input) {
      display: flex;
    }
  `;

  /**
   * Setters
   */
  public setDateByPartName: SetDateByPartName = (part, value) => {
    this.date = this.date[part](Number(value)) as Dayjs;

    this.selectedCtx = { ...this.selectedCtx, [part]: value };

    // if (part === Entities.year) {
    //   this.yearCtx = { ...this.yearCtx, selected: this.date.year() };
    // }
  };

  /**
   * Context
   */
  // @ts-expect-error NOTE: I do not know the cause of type warning
  @provide({ context: selectedContext })
  @property({ attribute: false })
  public selectedCtx!: SelectedContext;

  // @ts-expect-error NOTE: I do not know the cause of type warning
  @provide({ context: currentContext })
  @property({ attribute: false })
  public currentCtx!: CurrentContext;

  // @ts-expect-error NOTE: I do not know the cause of type warning
  @provide({ context: viewContext })
  @property({ attribute: false })
  public viewCtx!: ViewContext;

  // @ts-expect-error NOTE: I do not know the cause of type warning
  @provide({ context: helperContext })
  @property({ attribute: false })
  public helperCtx!: HelperContext;

  // // @ts-expect-error NOTE: I do not know the cause of type warning
  // @provide({ context: monthContext })
  // @property({ attribute: false })
  // public monthCtx!: MonthContext;

  // @ts-expect-error NOTE: I do not know the cause of type warning
  @provide({ context: dispatchContext })
  @property({ attribute: false })
  public dispatch: DispatchContext = {
    setDateByPartName: this.setDateByPartName,
  };

  /**
   * States
   */
  @state()
  public date: Dayjs = config.dayjs();

  /**
   * Handlers
   */
  @property({ type: Calendars })
  public calendar: Calendars = Calendars.Gregory;

  @property({ type: String })
  public locale = 'en';

  @property({ type: Number, attribute: true })
  public timestamp: number = new Date().getTime();

  /**
   * Handlers
   */
  private config() {
    this.date =
      this.calendar === Calendars.Gregory
        ? config.dayjs(this.timestamp).locale(this.locale)
        : (config
          .dayjs(this.timestamp)
          .locale(this.locale)
          .calendar('jalali') as unknown as Dayjs);

    const now =
      this.calendar === Calendars.Gregory
        ? config.dayjs().locale(this.locale)
        : (config
          .dayjs()
          .locale(this.locale)
          .calendar('jalali') as unknown as Dayjs);

    const selected = this.date;

    if (typeof selected === 'string' || typeof now === 'string') {
      // return;
      throw new Error('date is not instance of Dayjs');
    }

    // const localeData = selected.localeData();


    // const weekdays = localeData.weekdays();
    // const weekdaysShort = localeData.weekdaysShort();
    // const weekdaysMin = localeData.weekdaysMin();

    // const week: Dayjs[] = []
    // const startOfWeek = selected.startOf('week')
    // week.push(startOfWeek)
    // for (let i = 0; i < 6; i++) {
    //   week.push(startOfWeek.add(i + 1, 'day'))
    // }

    // this.weekdays = { normal: weekdays, short: weekdays, min: weekdaysMin }



    // this.helperCtx = {
    //   weekdays,
    //   weekdaysShort,
    //   weekdaysMin
    // }
    // const firstDayOfWeek = this.date.localeData().firstDayOfWeek();

    this.currentCtx = {
      year: selected.year(),
      month: selected.month(),
      date: selected.date(),
    }

    this.selectedCtx = {
      year: selected.year(),
      month: selected.month(),
      date: selected.date(),
      daysInMonth: selected.daysInMonth()
    }

    // this.yearCtx = {
    //   selected: selected.year(),
    //   view: selected.year(),
    //   now: now.year(),
    // };

    // // NOTE: month starts from ze
    // this.monthCtx = {
    //   selected: selected.month(),
    //   view: selected.month(),
    //   now: now.month(),
    // };

    // console.log({year});

    // const month = this.date.month();
    // const months = data.months();
    // const monthsShort = data.monthsShort();
  }

  // -------------------

  // public data: {
  //   week: {
  //     current: Dayjs[],
  //     selected: Dayjs[],
  //     view: Dayjs[]
  //   },
  //   year: {
  //     current: number
  //     selected: number
  //     view: number
  //   }
  //   month: {
  //     current: number
  //     selected: number
  //     view: number
  //   }
  //   date: {
  //     current: number
  //     selected: number
  //     view: number
  //   }
  //   hour: {
  //     current: number
  //     selected: number
  //     view: number
  //   },
  //   minute: {
  //     current: number
  //     selected: number
  //     view: number
  //   },
  //   second: {
  //     current: number
  //     selected: number
  //     view: number
  //   },
  //   millisecond: {
  //     current: number
  //     selected: number
  //     view: number
  //   }
  // }

  // public weekdays: { normal: string[], short: string[], min: string[] } = { normal: [], short: [], min: [] }

  // public getCurrentWeek() {
  //   const firstDayOfWeek = this.date.localeData().firstDayOfWeek();
  // }

  /**
   * Helpers
   */
  private onCalendarLoad = (value: string) => {
    if (value === this.calendar) {
      console.log(`calendar ${value} loaded`);
      eventBus.off('on-calendar-load', this.onCalendarLoad);
      this.config();
    }
  };

  private helperCalendar() {
    if (!config.calendars.has(this.calendar)) {
      config.calendars.asyncAdd(this.calendar);
      eventBus.on('on-calendar-load', this.onCalendarLoad);
    } else {
      if (config.calendars.has(this.calendar)) {
        this.config();
      }
    }
  }

  private onLocaleLoad = (value: string) => {
    if (value === this.locale) {
      eventBus.off('on-locale-load', this.onLocaleLoad);
    }
    this.config();
  };

  private async helperLocale() {
    if (!config.locales.has(this.locale)) {
      config.locales.asyncAdd(this.locale);
      eventBus.on('on-locale-load', this.onLocaleLoad);
    } else {
      this.config();
    }
  }

  override attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    if (name === 'calendar' && isCalendar(value)) {
      this.calendar = Calendars[value];
      this.helperCalendar();
    } else if (name === 'locale' && value) {
      if (this.locale !== value) {
        this.locale = value;
        this.helperLocale();
      } else {
        this.locale = value;
      }
    } else if (name === 'timestamp' && !isNaN(Number(value))) {
      this.timestamp = Number(value);
      this.config();
    }
  }

  override render() {
    if (!config.calendars.has(this.calendar)) {
      return html`<h1>onHold</h1>`;
    }

    // if (!this.selectedCtx || !this.viewCtx || !this.currentCtx || !this.helperCtx) {
    //   return html`<h1>onHold</h1>`;
    // }

    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "w7-dp-wrapper": OdWrapper
  }
}
