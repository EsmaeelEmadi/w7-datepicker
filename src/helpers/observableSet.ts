export class ObservableSet<T, O = (args: T) => unknown> extends Set<T> {
  private onAdd: O;
  constructor(onAdd: O) {
    super();
    this.onAdd = onAdd;
  }

  public async asyncAdd(value: T) {
    if (typeof this.onAdd === 'function') {
      await this.onAdd(value);
      super.add(value);
    }
    return this;
  }
}
