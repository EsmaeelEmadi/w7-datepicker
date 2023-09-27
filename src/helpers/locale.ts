import { TLocales } from '../types';
import dayjs from 'dayjs/esm';
// import dayjs, {Dayjs} from 'dayjs/esm';
import localeData from 'dayjs/esm/plugin/localeData';
// import dayjs from './day';

export class Locale {
  // dayjs = dayjs;
  // day: Dayjs = this.dayjs();

  internalLocales: TLocales = [];

  public set locales(locales: TLocales) {
    this.load(locales);
  }

  public get locales(): TLocales {
    return this.internalLocales;
  }

  // public internalLocale = 'en';

  constructor() {
    dayjs.extend(localeData);
  }

  // public set locale(v: string) {
  //   console.log(`set locale to ${v}`);
  //   this.internalLocale = v;
  //   dayjs.dayjs.locale(v);
  //   setTimeout(() => {
  //     console.log('localeeeee', dayjs.dayjs.locale());
  //   }, 1000);
  // }

  // public get locale(): string {
  //   return this.internalLocale;
  // }

  // private importedLocales: TLocales = [];

  async load(locales: TLocales) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        for (const locale of locales) {
          if (this.internalLocales.indexOf(locale) < 0) {
            console.log(`importing ${locale}`);
            await import(`dayjs/esm/locale/${locale}.js`);
            this.internalLocales.push(locale);
            // await import(`dayjs/ems/locale/${locale}`);
          } else {
            console.log(`${locale} is already imported`);
          }
        }
      } catch (error) {
        reject(error);
      } finally {
        resolve();
      }
    });
  }
}
