/**
 *  防抖函数
 */

function debounce(fn, delay, immediate = false) {
  // 1、初始化定时器
  let timer

  // 4、记录是否立即执行
  let invoke = false

  const _debounce = function (...args) {
    // 5、判断是否开启立即执行
    if (immediate && !invoke) {
      fn.apply(this, arguments)
      invoke = true
      return
    }

    // 3、每次执行前，清除上一次的定时器
    // if (timer) clearTimeout(timer)
    clearTimeout(timer)

    // 2、延迟执行函数
    timer = setTimeout(() => {
      fn.apply(this, args)

      // 6、每次自动执行结束，再开启立即执行
      invoke = false
    }, delay)
  }

  // 7、取消防抖函数
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    invoke = false
  }
  return _debounce
}
