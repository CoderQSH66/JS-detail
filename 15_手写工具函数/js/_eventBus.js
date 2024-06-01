/**
 * 事件总线
 */

class EventBus {
  constructor() {
    this.eventMap = new Map()
  }
  // 监听事件
  on(eventName, fn) {
    let eventList = this.eventMap.get(eventName)
    if (!eventList) {
      eventList = []
      this.eventMap.set(eventName, eventList)
    }
    if (!eventList.includes(fn)) eventList.push(fn)
  }

  // 触发事件
  emit(eventName, ...args) {
    if (!this.eventMap.get(eventName)) return
    for (const fn of this.eventMap.get(eventName)) {
      fn(...args)
    }
  }
  // 删除所有事件
  remove(eventName) {
    if (!this.eventMap.get(eventName)) return
    this.eventMap.delete(eventName)
  }

  // 删除单个事件
  off(eventName, fn) {
    const fnList = this.eventMap.get(eventName)
    if (!fnList) return
    const index = fnList.indexOf(fn)
    fnList.splice(index, 1)
  }
}
