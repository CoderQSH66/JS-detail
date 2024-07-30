/**
 * 深拷贝函数
 * @param {Object} obj 需要拷贝的对象
 * @returns {Object} 拷贝的对象
 */

const deepCopy = (obj, map = new WeakMap()) => {
  if (obj === null || typeof obj !== "object") return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)

  if (obj instanceof Set) {
    const newSet = new Set()
    obj.forEach((item) => newSet.add(deepCopy(item)))
    return newSet
  }

  if (map.get(obj)) return map.get(obj)
  const newObj = Array.isArray(obj) ? [] : {}
  map.set(obj, newObj)
  for (const key in obj) {
    newObj[key] = deepCopy(obj[key], map)
  }
  return newObj
}
