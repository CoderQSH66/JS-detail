/**
 * @description 节流函数
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
function QSHthrottle(fn, delay, { immediate = true, trailing = false }) {
  // 1、记录初始时间
  let startTime = 0

  // 7、初始化定时器
  let timer = null

  const _throotle = function (...args) {
    // 2、记录当前事件触发的时间
    let nowTime = +new Date()

    // 5、如果未开启立即执行，则让起始时间=当前执行时间
    if (!immediate && startTime === 0) {
      startTime = nowTime
    }

    // 3、如果起始时间与当前触发时间间隔大于等于延迟时间，则执行回调
    if (nowTime - startTime >= delay) {
      // 绑定this执行
      fn.apply(this, args)
      // 4、每次执行回调，将起始时间重置为当前执行时间
      startTime = nowTime
      return
    }

    // 6、判断是否开启执行最后一次
    if (trailing && !timer) {
      // 开启定时器，延迟剩余时间后执行
      timer = setTimeout(() => {
        // 绑定this执行
        fn.apply(this, args)
        startTime = 0
        timer = null
        // 执行结束，重置起始时间为0（重新判断立即执行）
      }, delay - (nowTime - startTime))
    }
  }
  return _throotle
}
