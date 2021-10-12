'use strict'

const fs = require('fs')
const { logger } = require('@vtfk/logger')
const config = require('../config')
const isJson = file => file.endsWith('.json')

module.exports = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(config.QUEUE_DIRECTORY_PATH, (error, files) => {
      if (error) {
        logger('error', ['get-next-job-from-queue', 'Failed to read queue directory', config.QUEUE_DIRECTORY_PATH, error])
        return reject(error)
      } else {
        const file = files.filter(isJson)[0]
        if (file) {
          logger('info', ['get-next-job-from-queue', 'Job found', file])
          resolve(file)
        } else {
          logger('info', ['get-next-job-from-queue', 'No jobs found'])
          process.exit(0)
        }
      }
    })
  })
}
