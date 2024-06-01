/**
 * 判断传入数据是否为Object类型
 *
 */
const isObject = (o) => {
  const typeValue = typeof o
  return o != null && typeValue === "object"
}

/**
 * 实现深拷贝（对象、数组）
 */
const _deepCopy = (obj, map = new WeakMap()) => {
  // 对基本类型、null、函数类型进行操作
  if (!isObject(obj)) return obj

  // 对Set集合类型单独操作
  if (obj instanceof Set) {
    const newSet = new Set()
    obj.forEach((item) => {
      newSet.add(_deepCopy(item))
    })
    return newSet
  }
  // 判断本次深拷贝的对象是否存在
  if (map.get(obj)) return map.get(obj)
  // 对数组、对象类型进行操作
  let newObj = Array.isArray(obj) ? [] : {}
  // 不存在则创建添加
  map.set(obj, newObj)
  for (const key in obj) {
    newObj[key] = _deepCopy(obj[key], map)
  }
  // 对key为Symbol类型进行操作
  const symbolKeys = Object.getOwnPropertySymbols(obj)
  if (symbolKeys.length > 0) {
    const newSymbolObj = {}
    for (const item of symbolKeys) {
      newSymbolObj[Symbol(item.description)] = _deepCopy(obj[item])
    }
    newObj = { ...newObj, ...newSymbolObj }
  }
  return newObj
}
