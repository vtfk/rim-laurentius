'use strict'

const fs = require('fs')
const { logger } = require('@vtfk/logger')
const config = require('../config')

module.exports = document => {
  return new Promise((resolve, reject) => {
    const filePath = `${config.ERRORS_DIRECTORY_PATH}/${document._id}.json`
    if (!document.errors || document.errors.length <= 0) {
      return resolve(document)
    }
    fs.writeFile(filePath, JSON.stringify(document, null, 2), (error) => {
      if (error) {
        logger('error', ['save-job-error', 'Failed to save to error directory', filePath, error])
        return reject(error)
      } else {
        logger('info', ['save-job-error', `Saved file: ${filePath}`])
        return resolve(document)
      }
    })
  })
}
