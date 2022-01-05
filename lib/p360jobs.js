'use strict'

//const p360 = require('p360')
const p360 = require('@vtfk/p360')
const { logger } = require('@vtfk/logger')

const createJobs = async job => {
  try {
    console.log('Starting createJobs')
    const client = p360(job.p360)
    const result = await client[job.clientService][job.clientMethod](job.args)
    result.request = job
    console.log('P360 RPC result:', JSON.stringify(result, null, 2))
    return result
  } catch (error) {
    console.log(error)
    logger('error', ['p360jobs', 'Failed to run job', error])
    throw error.message || error
  }
  /* return new Promise((resolve, reject) => {
    p360(job, (err, data) => {
      if (err) {
        logger('error', ['p360jobs', 'Failed to run job', err])
        return reject(err.message || err)
      } else {
        data.request = job
        return resolve(data)
      }
    })
  }) */
}

module.exports = async jobs => {
  const createdJobs = Array.isArray(jobs) ? jobs.map(createJobs) : [createJobs(jobs)]
  return createdJobs
}
