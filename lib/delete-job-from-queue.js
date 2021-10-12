'use strict'

const fs = require('fs')
const { logger } = require('@vtfk/logger')
const config = require('../config')

module.exports = document => {
  return new Promise((resolve, reject) => {
    const filePath = `${config.QUEUE_DIRECTORY_PATH}/${document._id}.json`
    fs.unlink(filePath, (error) => {
      if (error) {
        logger('error', ['delete-job-from-queue', 'Failed to delete from queue directory', filePath, error])
        return reject(error)
      } else {
        logger('info', ['delete-job-from-queue', `Job deleted from queue: ${filePath}`])
        return resolve(document)
      }
    })
  })
}
