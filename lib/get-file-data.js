'use strict'

const { logger, logConfig } = require('@vtfk/logger')
const config = require('../config')

module.exports = file => {
  return new Promise((resolve, reject) => {
    const filePath = `../${config.QUEUE_DIRECTORY_PATH}/${file}`
    try {
      const data = require(filePath)
      logConfig({
        prefix: data._id
      })
      logger('info', ['get-file-data', 'Data found'])
      data.errors = []
      return resolve(data)
    } catch (err) {
      logger('error', ['get-file-data', file.slice(0, -5), 'Failed to require data from queue directory', filePath, err])
      return reject(Error(err))
    }
  })
}
