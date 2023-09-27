import { LitElement, TemplateResult, PropertyValueMap, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { consume } from '@lit-labs/context';

//-- types
import { Entities } from './../types';
import { type SelectedContext, selectedContext } from './../context/index_new';

import { DispatchContext, dispatchContext } from './../context/index_new';

const INPUT_COMPONENTS = ['w7-dp-INPUT-YYYY'];

// type HandleStateChange = (ctx: SelectedContext) => string
// type OnKeyPress = (event: KeyboardEvent, maxLength: number) => string;

export abstract class BaseInputPart extends LitElement {
  // ╭──────────────────────────────────────────────────────────╮
  // │ 	STYLE                                                   │
  // ╰──────────────────────────────────────────────────────────╯
  static override styles = css`
    :host {
      display: flex;
    }
    .input-part {
      width: min-content;
      padding: 0px 4px;
    }
    .disabled {
      background-color: #e0e0e0;
      opacity: 0.6;
      pointer-events: none;
    }
    .readonly {
      pointer-events: none;
    }
    .highlightText {
      font-weight: bold;
    }
    // :host p {
    //   font-size: 5px;
    // }
  `;

  // ╭──────────────────────────────────────────────────────────╮
  // │ 	CONTEXT                                                 │
  // ╰──────────────────────────────────────────────────────────╯
  // @ts-expect-error NOTE: I do not know the cause of type warning
  @consume({ context: dispatchContext, subscribe: true })
  @property({ attribute: false })
  protected dispatch!: DispatchContext;


  // @ts-expect-error NOTE: I do not know the cause of type warning
  @consume({ context: selectedContext, subscribe: true })
  @property({ attribute: false })
  ctx!: SelectedContext;

  // ╭──────────────────────────────────────────────────────────╮
  // │ 	PROPERTIES                                              │
  // ╰──────────────────────────────────────────────────────────╯
  @property({ type: Boolean })
  public disabled = false;

  // ╭──────────────────────────────────────────────────────────╮
  // │    STATES                                                │
  // ╰──────────────────────────────────────────────────────────╯
  @state()
  isTyping = false;

  @state()
  content: TemplateResult = html``;

  @state()
  value = '';

  // ╭──────────────────────────────────────────────────────────╮
  // │ 	VARIABLES                                               │
  // ╰──────────────────────────────────────────────────────────╯
  protected typedValueOnStringPart = '';
  // protected max = 0;
  protected unsetValue: string | undefined = undefined;
  protected element!: HTMLDivElement;
  protected entity!: keyof typeof Entities;
  protected maxLength: number | undefined;
  protected minLength: number | undefined;
  protected maxValue: number | undefined

  // ╭──────────────────────────────────────────────────────────╮
  // │ 	METHODS                                                 │
  // ╰──────────────────────────────────────────────────────────╯

  // ╭──────────────────────────────────────────────────────────╮
  // │ 	HELPERS                                                 │
  // ╰──────────────────────────────────────────────────────────╯
  protected createHelperText(newValue?: string): string {
    // console.log({ newValue });

    const n = `<span class="highlightText">${newValue}</span>`;
    // console.log(n);
    return n;
    // if (newValue) {
    //   if (newValue.includes(this.typedValueOnStringPart)) {
    //     const subtractedValue = newValue.substring(
    //       this.typedValueOnStringPart.length,
    //       newValue.length
    //     );
    //     console.log({typedvalue: this.typedValueOnStringPart, subtractedValue});
    //     return `<span class="highlightText">${this.typedValueOnStringPart}</span>${subtractedValue}`;
    //   } else {
    //     console.log({typedvalue: this.typedValueOnStringPart});
    //     return `<span class="highlightText">${this.typedValueOnStringPart}</span>`;
    //   }
    // } else {
    //   return `<span class="highlightText">${this.typedValueOnStringPart}</span>`;
    // }
  }

  protected handleKeyPress(event: KeyboardEvent): void {
    event.preventDefault();
    // const sliced = this.onKeyPress(event, this.maxLength);
    let sliced = "";
    if (this.maxLength) {
      sliced = this.sliceNumber(event)
    }
    this.dispatch.setDateByPartName(this.entity, sliced);
  }

  protected handleBlur(): void {
    this.blur();

    if (this.isTyping) {
      this.isTyping = false;
      if (this.typedValueOnStringPart) {
        // this.selectedIndexFromSearch = undefined;
        this.typedValueOnStringPart = '';
        this.element.textContent = this.element.textContent as string;
      }
    }
  }

  protected handleClick() {
    this.setRangeFocus();
  }

  private setRangeFocus() {
    setTimeout(() => {
      const span = this.element.querySelector('span');
      if (span) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(this.element);
        sel?.removeAllRanges();
        sel?.addRange(range);
      } else {
        const range = document.createRange();
        range.setStart(this.element, 0);
        range.setEnd(this.element, 1);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }, 0);
  }

  // private handleKeyDown(event: KeyboardEvent) {
  //   // console.log({event}, event.shiftKey);
  //   const {key} = event;
  //   console.log(key);
  //
  //   if (key === 'ArrowUp') {
  //     const value: number = this.ctx.selected[this.partName];
  //     this.isTyping = false;
  //     this.typedValueOnStringPart = '';
  //     event.preventDefault();
  //     this.dis.setDateByPartName(datePart, value + 1);
  //     this.setRangeFocus();
  //   } else if (key === 'ArrowDown') {
  //     const value: number = ctx.selected[datePart];
  //     this.isTyping = false;
  //     this.typedValueOnStringPart = '';
  //     event.preventDefault();
  //     this.dis.setDateByPartName(datePart, value - 1);
  //     this.setRangeFocus();
  //   } else if (key === 'ArrowRight') {
  //     this.focusNextElement();
  //   } else if (key === 'ArrowLeft') {
  //     this.focusPreviousElement();
  //   } else if (
  //     key === 'Backspace' &&
  //     FORMAT_PARTS[this.partName].type === 'string'
  //   ) {
  //     if (this.typedValueOnStringPart.length) {
  //       this.typedValueOnStringPart = this.typedValueOnStringPart.substring(
  //         0,
  //         this.typedValueOnStringPart.length - 1
  //       );
  //
  //       const result = this.dispatch.setByString(
  //         this.partName,
  //         this.datePart,
  //         this.typedValueOnStringPart
  //       );
  //
  //       if (result?.value) {
  //         console.log('handle date');
  //         this.dis.setDateByPartName(datePart, result.index);
  //         // this.dis.handleDate();
  //       } else {
  //         console.log('create helper text');
  //         this.element.innerHTML = this.createHelperText();
  //       }
  //
  //       this.setRangeFocus();
  //       event.preventDefault();
  //     }
  //   } else if (event.shiftKey && key === 'Tab') {
  //     event.preventDefault();
  //     this.focusPreviousElement();
  //   } else if (key === 'Tab') {
  //     event.preventDefault();
  //     this.focusNextElement();
  //   }
  // }

  private focusNextElement() {
    const next = this.nextElementSibling;
    if (next?.tagName && INPUT_COMPONENTS.includes(next.tagName)) {
      this.handleBlur();
      (next as BaseInputPart).setFocus('next');
    } else {
      const _next = next?.nextElementSibling;
      if (_next?.tagName && INPUT_COMPONENTS.includes(_next.tagName)) {
        this.handleBlur();
        (_next as BaseInputPart).setFocus('next');
      }
    }
  }

  private focusPreviousElement() {
    const next = this.previousElementSibling;
    if (next?.tagName && INPUT_COMPONENTS.includes(next.tagName)) {
      this.handleBlur();
      (next as BaseInputPart).setFocus('prev');
    } else {
      const _next = next?.previousElementSibling;
      if (_next?.tagName && INPUT_COMPONENTS.includes(_next.tagName)) {
        this.handleBlur();
        (_next as BaseInputPart).setFocus('prev');
      }
    }
  }

  public setFocus(direction: 'next' | 'prev') {
    if (this.disabled) {
      if (direction === 'next') {
        this.focusNextElement();
      } else {
        this.focusPreviousElement();
      }
    } else {
      this.element.focus();
      setTimeout(() => {
        this.setRangeFocus();
      }, 0);
    }
  }

  // ╭──────────────────────────────────────────────────────────╮
  // │ 	HANDLERS                                                │
  // ╰──────────────────────────────────────────────────────────╯
  // handleStateChange!: HandleStateChange
  // onKeyPress = slicedNumber

  sliceNumber(
    event: KeyboardEvent,
  ): string {
    const { key } = event;
    const targetValue = (event.target as HTMLDivElement).textContent;

    if (isNaN(Number(key))) {
      throw new Error(`input value should be number`);
    }

    const valueAsString = targetValue + key;
    const sliced = valueAsString.slice(valueAsString.length - this.maxLength!);
    return sliced;
  };

  protected onStateChange!: (ctx: SelectedContext) => number

  handleStateChange(ctx: SelectedContext) {
    let newValue = '';
    if (this.element && ctx) {
      if (this.maxLength && this.minLength) {
        newValue = this.onStateChange ? this.onStateChange(ctx) : ctx[this.entity];
        if (this.entity === Entities.date) {
          this.maxValue = ctx['daysInMonth']
        }
        let v = 0;

        if (typeof newValue === 'string') {
          v = Number(newValue)
        } else {
          v = newValue
        }

        let finalValue = ""

        if (this.maxValue && v > this.maxValue) {
          finalValue = '0' + (String(v)).substring(1)
        }
        else {
          finalValue = String(v)
        }


        if (
          finalValue !== this.element.textContent ||
          this.typedValueOnStringPart
        ) {
          this.element.innerHTML = this.createHelperText(finalValue);
        }

      }
    } else {
      this.unsetValue = newValue;
    }
  }


  // ╭──────────────────────────────────────────────────────────╮
  // │ 	LIFE CYCLE                                              │
  // ╰──────────────────────────────────────────────────────────╯
  override firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    this.hasUpdated = true;
    this.element = this.shadowRoot?.querySelector('div') as HTMLDivElement;
    if (this.unsetValue !== undefined) {
      // console.log('create helper text');
      this.element.innerHTML = this.createHelperText(this.unsetValue);
      this.unsetValue = undefined;
    }

    // console.log(this.element);
  }

  // ╭──────────────────────────────────────────────────────────╮
  // │ 	CONSTRUCTOR                                             │
  // ╰──────────────────────────────────────────────────────────╯
  // constructor(entity: keyof typeof Entities, maxLength: number, handleClick: OnKeyPress, handleChange: HandleStateChange) {
  //   super();
  //   this.entity = entity,
  //     this.maxLength = maxLength
  //   this.onKeyPress = handleClick
  //   this.handleStateChange = handleChange
  //   // this.partName = partName;

  // }

  // ?contenteditable=${!this.helper.view.readonly}
  // class="input-part ${this.disabled ? 'disabled' : ''} ${this.helper.view
  //   .readonly
  //   ? 'readonly'
  //   : ''}"
  //
  // @keydown=${this.handleKeyDown}
  override render() {
    if (this.entity) {
      this.handleStateChange(this.ctx);

      return html` <div
      contenteditable
      placeholder=${this.entity}
      @keypress=${this.handleKeyPress}
      @blur=${this.handleBlur}
      @click=${this.handleClick}
    ></div>`;
    } else {
      return null
    }
  }
}
