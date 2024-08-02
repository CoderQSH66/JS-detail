/** DOM元素节点 */
const dom = {
  audio: document.querySelector(".audio"),
  lyricUlEle: document.querySelector(".lyric .lyric-list")
}

/** 解析歌词字符串 */
function praseLyric(lyric) {
  const lyricArr = lyric.split("\n")
  const lyricList = []
  for (let i = 0; i < lyricArr.length; i++) {
    const reg = /\[(?<minute>\d{2}):(?<second>\d{2})\.(?<millisecond>\d{2})\]/
    const time = reg.exec(lyricArr[i])
    if (time) {
      const minute = Number(time.groups?.minute)
      const second = Number(time.groups?.second)
      const millisecond = Number(time.groups?.millisecond)
      const timestamp = (minute * 60 + second) * 1000 + millisecond * 10
      const text = lyricArr[i].replace(reg, "")
      const lyricInfo = {
        timestamp,
        text
      }
      lyricList.push(lyricInfo)
    }
  }
  return lyricList
}

/** 循环创建歌词li */
function createLyricList(lyricList) {
  // 文档片段，创建一个li添加到文档片段中，最后一起添加到dom中
  const flag = document.createDocumentFragment()
  // 返回的li元素列表
  const itemEleList = []
  for (let i = 0; i < lyricList.length; i++) {
    const itemEle = document.createElement("li")
    itemEle.classList.add("item")
    if (i === 0) itemEle.classList.add("active")
    itemEle.textContent = lyricList[i].text
    // 添加到文档片段中
    flag.appendChild(itemEle)
    // 添加到列表中返回
    itemEleList.push(itemEle)
  }
  dom.lyricUlEle.appendChild(flag)
  return itemEleList
}

/** 根据当前时间返回歌词索引 */
function findLyricIndex(currentTime, lyricList) {
  for (let i = 0; i < lyricList.length; i++) {
    const lyricTime = lyricList[i].timestamp
    if (currentTime <= lyricTime) {
      return (i = 0 ? 0 : i - 1)
    }
  }
  return lyricList.length - 1
}

// 获取歌词信息
const lyricList = praseLyric(lyric2)
console.log(lyricList)

// 循环创建歌词
const itemEleList = createLyricList(lyricList)

// 监听audio的播放
let nowIndex = 0
let distanceIndex = 0
let firstScroll = false
const ulEleHeight = dom.lyricUlEle.clientHeight
const liEleHeight = dom.lyricUlEle.children[0].clientHeight
dom.audio.addEventListener("timeupdate", function () {
  const currentTime = this.currentTime * 1000
  const activeEle = document.querySelector(".lyric .lyric-list .active")
  const index = findLyricIndex(currentTime, lyricList)
  if (nowIndex !== index) {
    nowIndex = index
    itemEleList[index]?.classList.add("active")
    activeEle?.classList.remove("active")
    // 如果没有滚动到中间，则不移动（锁住）
    if (!(liEleHeight * index > ulEleHeight / 2)) {
      firstScroll = false
    }
    // 如果滚动到中间，则开始移动（解锁）
    if (liEleHeight * index > ulEleHeight / 2 && !firstScroll) {
      distanceIndex = index - 1
      firstScroll = true
    }
    firstScroll &&
      (dom.lyricUlEle.style.transform = `translateY(${
        -(index - distanceIndex) * liEleHeight
      }px)`)
  }
})
