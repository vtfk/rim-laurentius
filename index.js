'use strict'

const { logger } = require('@vtfk/logger')
const getNextJobFromQueue = require('./lib/get-next-job-from-queue')
const getFileData = require('./lib/get-file-data')
// const getContact = require('./lib/get-contact')
const syncContact = require('./lib/sync-contact')
const getCase = require('./lib/get-case')
const addCase = require('./lib/add-case')
const addDocument = require('./lib/add-document')
const signOffDocument = require('./lib/signoff-document')
const saveJobDone = require('./lib/save-job-done')
const saveJobStatus = require('./lib/save-job-status')
const deleteJobFromQueue = require('./lib/delete-job-from-queue')
const saveJobError = require('./lib/save-job-error')

getNextJobFromQueue()
  .then(getFileData)
//  .then(getContact)
  .then(syncContact)
  .then(getCase)
  .then(addCase)
  .then(addDocument)
  .then(signOffDocument)
  .then(saveJobStatus)
  .then(saveJobDone)
  .then(saveJobError)
  .then(deleteJobFromQueue)
  .then(data => {
    logger('info', ['index', 'finished'])
    process.exitCode = 0
  }).catch(err => {
    logger('error', ['index', 'error', err])
    process.exitCode = 1
  })
