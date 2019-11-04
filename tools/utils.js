import moment from 'moment'
import os from 'os'
import chalk from 'chalk'

/**
 *
 * @desc hot热加载的时候每个entry都需要加载这两个uri
 * [
 *   'eventsource-polyfill', // Necessary for hot reloading with IE
 *   'webpack-hot-middleware/client?reload=true',
 * ]
 * @param {Array, Object} entry
 * @param {Array} hotModuels  上面那个数组
 * @returns
 */
export function mergeModleToEntry(entry, hotModuels) {
  const entryType = Object.prototype.toString.call(entry)
  if (entryType === '[object Array]') {
    return Array.prototype.concat.apply(hotModuels, entry)
  }
  if (entryType === '[object Object]') {
    let result = {}
    Object.keys(entry).map(key => {
      result[key] = Array.prototype.concat.apply(hotModuels, entry[key])
    })
    return result
  }
  return hotModuels
}

export function formatTime(time) {
  return `[${moment(time).format('YYYY-MM-DD HH:mm:ss')}]`
}

export function logInfo() {
  console.log(chalk.green(formatTime(Date.now())), ...arguments)
}
