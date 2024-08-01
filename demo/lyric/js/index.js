/** 解析歌词字符串 */
function praseLyric(lyric) {
  const lyricArr = lyric.split("\n")
  const lyricList = []
  for (let i = 0; i < lyricArr.length; i++) {
    const reg = /\[(?<minute>\d{2}):(?<second>\d{2})\.(?<millisecond>\d{2})\]/
    const time = reg.exec(lyricArr[i])
    if (time) {
      const minute = time.groups?.minute
      const second = time.groups?.second
      const millisecond = time.groups?.millisecond
      const text = lyricArr[i].replace(reg, "")
      const timestamp = (minute * 60 + second) * 1000 + millisecond * 10
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
  const lyricListEle = document.querySelector(".lyric .lyric-list")
  for (let i = 0; i < lyricList.length; i++) {
    const itemEle = document.createElement("li")
    itemEle.classList.add("item")
    if (i === 0) itemEle.classList.add("active")
    itemEle.textContent = lyricList[i].text
    lyricListEle.appendChild(itemEle)
  }
}

// 获取歌词信息
const lyricList = praseLyric(lyric)

// 循环创建歌词
createLyricList(lyricList)
