/**
 * 防抖函数的实现
 */

function QSHdebounce(fn, delay, immediate = false) {
  // 1、初始化定时器
  let timer = null
  // 3、初始化控制立即执行
  let invoke = false
  const _debounce = function (...args) {
    return new Promise((reslove, reject) => {
      // 1、每次执行前，清除上一次的定时器
      if (timer) clearTimeout(timer)
      // 3、判断是否立即执行
      if (immediate && !invoke) {
        const res = fn.apply(this, args)
        invoke = true
        reslove(res)
        return
      }
      // 1、通过定时器延时执行回调函数
      timer = setTimeout(() => {
        // 2、显式绑定被监听的对象（iptEle）
        const res = fn.apply(this, args)
        timer = null
        invoke = false
        reslove(res)
      }, delay)
    })
  }

  // 4、取消防抖
  _debounce.cancal = () => {
    if (timer) clearTimeout(timer)
    timer = null
    invoke = false
  }
  return _debounce
}
