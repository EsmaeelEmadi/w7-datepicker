class StackNode<T> {
  public value: T;
  public next: StackNode<T> | undefined;

  constructor(value: T) {
    this.value = value;
  }
}

export class Stack<T> {
  private top: StackNode<T> | undefined;
  private length: number = 0;

  public push(item: T): void {
    const newNode = new StackNode(item);
    newNode.next = this.top;
    this.top = newNode;
    this.length++;
  }

  public pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const poppedValue = this.top!.value;
    this.top = this.top!.next;
    this.length--;

    return poppedValue;
  }

  public peek(): T | undefined {
    return this.top?.value;
  }

  public isEmpty(): boolean {
    return this.length === 0;
  }

  public count(): number {
    return this.length;
  }

  public clear(): void {
    this.top = undefined;
    this.length = 0;
  }
}
