import { parseTime } from './date'
import store from '@/store'

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = () => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 打开新页面
export function go(name, params) {
  this.$router.push({ name, params })
}

// 水印
export function waterMark() {
  const text = `${parseTime(new Date(), 'YYYY-MM-DD')} boluozaixian ${store.getters.userName}`
  // var text = '2019-01-01 boluozaixian admin'
  // var text = DateUtil.getDate(new Date()) + ' boluozaixian ' + currentUserName
  var shuiyinDiv = document.createElement('div')
  var style = shuiyinDiv.style
  style.position = 'absolute'
  style.left = 0
  style.top = '-60%'
  style.width = '120%'
  style.height = '200%'
  style.opacity = '0.15'
  style.background = 'url(' + textBecomeImg(text, 22, 'gray') + ')'
  style.zIndex = 9999999991
  style.transform = 'rotate(-30deg)'
  style.pointerEvents = 'none'
  document.getElementById('watermark').appendChild(shuiyinDiv)
}

function textBecomeImg(text, fontsize, fontcolor) {
  var canvas = document.createElement('canvas')
  canvas.height = fontsize
  canvas.padding = 30
  var context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width * 2, canvas.height)
  context.fillStyle = fontcolor
  context.font = fontsize + 'px Arial'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, 0, fontsize / 2)
  canvas.width = 450
  canvas.height = 120
  context.fillStyle = fontcolor
  context.font = fontsize + 'px Arial'
  context.textBaseline = 'middle'
  context.fillText(text, 0, fontsize / 2)
  var dataUrl = canvas.toDataURL('image/png')
  return dataUrl
}

/*
* 树转数组
* @Params tree 树数据源
* @Params key 对应子节点id字符串
* */
export const tree2Array = (tree, childKey) => {
  return tree.reduce((con, item) => {
    const { callee } = arguments
    con.push(item)
    const childs = item[childKey]
    if (childs && childs.length > 0) {
      childs.reduce(callee, con)
    }
    return con
  }, []).forEach(item => {
    item[childKey] = []
  })
}
/*
* 数组转树
* @Params list 数组数据源
* @Params key 对应父节点id字符串
* */
export const array2Tree = (list, parentKey) => {
  return list.filter(parent => {
    parent.children = list.filter(child => {
      return parent.id === child[parentKey]
    })
    return !parent[parentKey]
  })
}

// 获取构造函数类型
export const getType = fn => {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match && match[1]
}
