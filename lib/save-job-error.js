'use strict'

const fs = require('fs')
const config = require('../config')
const logger = require('./logger')

module.exports = document => {
  return new Promise((resolve, reject) => {
    const filePath = `${config.ERRORS_DIRECTORY_PATH}/${document._id}.json`
    if (!document.errors || document.errors.length <= 0) {
      return resolve(document)
    }
    fs.writeFile(filePath, JSON.stringify(document, null, 2), (error) => {
      if (error) {
        logger(['save-error', document._id, 'error', JSON.stringify(error)])
        return reject(error)
      } else {
        const msg = `saved file: ${filePath}`
        logger(['save-error', document._id, msg])
        return resolve(document)
      }
    })
  })
}
