/**
 * 节流函数
 * @param {*} fn
 * @param {*} delay
 * @returns
 *
 */

function throttle(fn, delay, { immediate = true, trailing = false } = {}) {
  // 1、记录初始时间
  let startTime = 0

  // 7、初始化定时器
  let timer = null

  const _throttle = function (...args) {
    // 2、记录当前事件触发的时间
    let nowTime = +new Date()

    // 5、判断是否立即执行
    if (!immediate && startTime === 0) {
      startTime = nowTime
    }

    // 3、如果当前时间与初始时间的间隔大于等于延迟时间，则执行回调
    if (nowTime - startTime >= delay) {
      fn.apply(this, args)
      // 4、重置初始时间
      startTime = nowTime
      return
    }

    // 6、判断是否开启trailing
    if (trailing && !timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
        startTime = 0
      }, delay - (nowTime - startTime))
    }
  }
  // 8、取消节流函数
  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    startTime = 0
  }

  return _throttle
}
