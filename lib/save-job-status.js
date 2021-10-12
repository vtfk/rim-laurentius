'use strict'

const fs = require('fs')
const { logger } = require('@vtfk/logger')
const config = require('../config')

module.exports = document => {
  return new Promise((resolve, reject) => {
    if (!document.callbackData) {
      return resolve(document)
    }
    if (document.errors && document.errors.length > 0) {
      logger('warn', ['save-new-job', 'Skipping save new job', `${document.errors.length} errors found`])
      return resolve(document)
    }
    const filePath = `${config.STATUS_DIRECTORY_PATH}/${document.callbackData._id}.json`
    fs.writeFile(filePath, JSON.stringify(document.callbackData, null, 2), (error) => {
      if (error) {
        logger('error', ['save-new-job', 'Failed to save to status directory', filePath, error])
        return reject(error)
      } else {
        logger('info', ['save-new-job', `Saved file: ${filePath}`])
        return resolve(document)
      }
    })
  })
}
