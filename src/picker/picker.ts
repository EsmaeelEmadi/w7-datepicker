import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// import { consume } from '@lit-labs/context';
import { CalendarModes } from '../types';

@customElement('w7-dp-picker')
export class ODPicker extends LitElement {
    // ╭──────────────────────────────────────────────────────────╮
    // │ 	CONTEXT                                                 │
    // ╰──────────────────────────────────────────────────────────╯
    // // @ts-expect-error NOTsE: I do not know the cause of type warning
    // @consume({ context: monthPicker, subscribe: true })
    // @property({ attribute: false })
    // public helper!: MonthPicker;

    // PROPERTIES
    @property({ type: Number, attribute: true }) // TODO: why it only accepts type number
    public mode: CalendarModes = CalendarModes.Normal;

    // private handleClick(event: MouseEvent) {
    //     console.log('clicked')
    //     event.preventDefault();
    //     event.stopPropagation();
    // }



    override render() {
        if (this.mode === CalendarModes.Normal) {
            return html`<slot></slot>`
        } else {
            return null
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'w7-dp-picker': ODPicker;
    }
}


    //      else {
    //         return html`
    //   <dialog @mousedown=${this.handleClick} ?open=${this.helper.view.showDatePicker}>
    //     <slot></slot>
    //   </dialog>
    // `;
    //     }