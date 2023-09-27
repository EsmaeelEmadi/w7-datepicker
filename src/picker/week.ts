import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// import { map } from 'lit/directives/map.js';
// import { classMap } from 'lit/directives/class-map.js';

import { consume } from '@lit-labs/context';
import {
  // monthPicker,
  // MonthPicker,
  // datePicker,
  // DatePicker,
  // Dispatch,
  // dispatch,
  SelectedContext,
  selectedContext,
  CurrentContext,
  currentContext,
  ViewContext,
  viewContext
} from '../context/index_new';

type Day = { year: number; month: number; date: number };

@customElement('w7-dp-week')
export class ODWeek extends LitElement {
  // ╭──────────────────────────────────────────────────────────╮
  // │ 	CONTEXT                                                 │
  // ╰──────────────────────────────────────────────────────────╯
  // @ts-expect-error NOTE: I do not know the cause of type warning
  @consume({ context: selectedContext, subscribe: true })
  @property({ attribute: false })
  public selectedCtx!: SelectedContext;

  // @ts-expect-error NOTE: I do not know the cause of type warning
  @consume({ context: currentContext, subscribe: true })
  @property({ attribute: false })
  public currentCtx!: CurrentContext;

  // @ts-expect-error NOTE: I do not know the cause of type warning
  @consume({ context: viewContext, subscribe: true })
  @property({ attribute: false })
  public viewCtx!: ViewContext;

  // // @ts-expect-error NOTE: I do not know the cause of type warning
  // @consume({ context: dispatch, subscribe: true })
  // @property({ attribute: false })
  // public dispatch!: Dispatch;

  // ╭──────────────────────────────────────────────────────────╮
  // │ PROPERTIES                                               │
  // ╰──────────────────────────────────────────────────────────╯
  // @property({ type: Number, attribute: 'number-of-rolumns' })
  // public nuOfCols = 3;

  // @property({ type: Boolean, attribute: 'is-weekday' })
  // public isWeekday = true;

  @property({ type: String, attribute: 'weekday-length' })
  public weekdayLength: 'long' | 'short' | 'min' = 'short';

  @property({ type: Number, attribute: 'week-start' })
  public weekStart: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;


  week = [0, 1, 2, 3, 4, 5, 6]

  //     ${this.week.map(w => {
  //   console.log(w)
  //   return html`<slot name="week-day"></slot>`
  // })
  //   }

  @state()
  weekdayTemplate: HTMLElement | undefined = undefined

  handleSlotchange(e) {
    const childNodes = e.target.assignedNodes({ flatten: true });
    console.log({ childNodes })
    this.weekdayTemplate = childNodes[0].children[0]
    // this.weekdayTemplate = child.cloneNode(true)

    // const weekDay = childNodes.que
    // // ... do something with childNodes ...
    // this.allText = childNodes.map((node) => {
    //   return node.textContent ? node.textContent : ''
    // }).join('');
  }
  override render() {

    // console.log("------", this.weekdayTemplate)

    return html`
        <div style="display: none !important" name="slot-helper" @slotchange=${this.handleSlotchange}> <slot name="week-day"></slot></div>
        <div name="week">
            ${this.week.map(w =>
      html`
                <div id="${w}">
                  ${this.weekdayTemplate?.cloneNode(true)}
                </div>
              `
    )
      }
        </div>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w7-dp-week': ODWeek;
  }
}
