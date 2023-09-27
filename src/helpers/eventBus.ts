type EventCallback = (...args: any[]) => void;

class EventBus {
  private listeners: Record<string, EventCallback[]> = {};

  on(eventName: string, callback: EventCallback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  off(eventName: string, callback: EventCallback) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      this.listeners[eventName] = eventListeners.filter(
        (listener) => listener !== callback
      );
    }
  }

  emit(eventName: string, ...args: any[]) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(...args));
    }
  }
}

export default new EventBus();
