'use strict'

const fs = require('fs')
const { logger } = require('@vtfk/logger')
const config = require('../config')

module.exports = document => {
  return new Promise((resolve, reject) => {
    const filePath = `${config.DONE_DIRECTORY_PATH}/${document._id}.json`
    if (document.errors && document.errors.length > 0) {
      logger('warn', ['save-job-done', 'Skipping save to done', `${document.errors.length} errors found`])
      return resolve(document)
    }
    fs.writeFile(filePath, JSON.stringify(document, null, 2), (error) => {
      if (error) {
        logger('error', ['save-job-done', 'Failed to save to done directory', filePath, error])
        return reject(error)
      } else {
        logger('info', ['save-job-done', `Saved file: ${filePath}`])
        return resolve(document)
      }
    })
  })
}
