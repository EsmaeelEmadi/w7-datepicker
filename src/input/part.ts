import { customElement, property } from 'lit/decorators.js';
// import { consume } from '@lit-labs/context';

import { BaseInputPart } from './BaseInputPart';
import { Entities } from '../types';
import { SelectedContext } from 'src/context/index_new';

@customElement('w7-dp-input-part')
export class InputPart extends BaseInputPart {
  @property({ type: String })
  public name = 'en';

  // override entity: keyof typeof Entities = Entities.year;
  // override maxLength = 4;

  // override onKeyPress = sliceNumber;

  // override handleStateChange(ctx: Block): string {
  //   return String(ctx.selected)
  // }


  override attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    if (name === 'name') {
      if (value === "YYYY") {
        this.entity = Entities.year;
        this.maxLength = 4;
        this.minLength = 4;
      } else if (value === "M") {
        this.entity = Entities.month;
        this.maxLength = 2;
        this.minLength = 1;
        this.maxValue = 12;
        this.onStateChange = (ctx: SelectedContext) => {
          return Number(ctx['month'] + 1)
        }
      } else if (value === "D") {
        this.entity = Entities.date;
        this.maxLength = 2;
        this.minLength = 1;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w7-dp-input-part': InputPart;
  }
}
