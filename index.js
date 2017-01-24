'use strict'

const getNextJobFromQueue = require('./lib/get-next-job-from-queue')
const getFileData = require('./lib/get-file-data')
const syncContact = require('./lib/sync-contact')
const getCase = require('./lib/get-case')
const addCase = require('./lib/add-case')
const addDocument = require('./lib/add-document')
const saveJobDone = require('./lib/save-job-done')
const saveJobStatus = require('./lib/save-job-status')
// const deleteJobFromQueue = require('./lib/delete-job-from-queue')
const logger = require('./lib/logger')

getNextJobFromQueue()
  .then(getFileData)
  .then(syncContact)
  .then(getCase)
  .then(addCase)
  .then(addDocument)
  .then(saveJobStatus)
  .then(saveJobDone)
//  .then(deleteJobFromQueue)
  .then((data) => {
    console.log(data)
    logger('finished')
  })
  .catch((err) => {
    logger(['error', err])
  })
