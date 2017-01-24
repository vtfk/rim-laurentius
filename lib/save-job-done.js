'use strict'

const fs = require('fs')
const config = require('../config')
const logger = require('./logger')

module.exports = (document) => {
  return new Promise((resolve, reject) => {
    const filePath = `${config.DONE_DIRECTORY_PATH}/${document._id}.json`
    fs.writeFile(filePath, JSON.stringify(document, null, 2), (error) => {
      if (error) {
        logger(['save-job-done', document._id, 'error', JSON.stringify(error)])
        reject(error)
      } else {
        const msg = `saved file: ${filePath}`
        logger(['save-job-done', document._id, msg])
        resolve(document)
      }
    })
  })
}
