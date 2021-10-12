'use strict'

const p360 = require('p360')
const { logger } = require('@vtfk/logger')

const createJobs = job => {
  return new Promise((resolve, reject) => {
    p360(job, (err, data) => {
      if (err) {
        logger('error', ['p360jobs', 'Failed to run job', err])
        return reject(err.message || err)
      } else {
        data.request = job
        return resolve(data)
      }
    })
  })
}

module.exports = jobs => {
  const createdJobs = Array.isArray(jobs) ? jobs.map(createJobs) : [createJobs(jobs)]
  return createdJobs
}
