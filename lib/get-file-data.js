'use strict'

const config = require('../config')
const logger = require('./logger')

module.exports = file => {
  return new Promise((resolve, reject) => {
    try {
      const data = require(`../${config.QUEUE_DIRECTORY_PATH}/${file}`)
      logger(['get-file-data', data._id, 'data found'])
      resolve(data)
    } catch (e) {
      reject(Error(e))
    }
  })
}
