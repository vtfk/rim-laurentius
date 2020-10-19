'use strict'

const fs = require('fs')
const config = require('../config')
const logger = require('./logger')

module.exports = document => {
  return new Promise((resolve, reject) => {
    if (!document.callbackData) {
      return resolve(document)
    }
    if (document.errors && document.errors.length > 0) {
      logger(['save-new-job', document._id, 'info', 'Skipping save new job', `${document.errors.length} errors found`])
      return resolve(document)
    }
    const filePath = `${config.STATUS_DIRECTORY_PATH}/${document.callbackData._id}.json`
    fs.writeFile(filePath, JSON.stringify(document.callbackData, null, 2), (error) => {
      if (error) {
        logger(['save-new-job', document._id, 'error', JSON.stringify(error)])
        return reject(error)
      } else {
        const msg = `saved file: ${filePath}`
        logger(['save-new-job', document._id, msg])
        return resolve(document)
      }
    })
  })
}
