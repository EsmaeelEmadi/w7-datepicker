class NodeQueue<T> {
  value: T;
  next: NodeQueue<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class Queue<T> {
  private head: NodeQueue<T> | null;
  private tail: NodeQueue<T> | null;
  private count: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  enqueue(item: T) {
    const newNode = new NodeQueue<T>(item);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }

    this.count++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const value = this.head?.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (this.head) {
      this.head = this.head.next;
    }

    this.count--;
    return value;
  }

  public isEmpty(): boolean {
    return this.count === 0;
  }

  size(): number {
    return this.count;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }
}
