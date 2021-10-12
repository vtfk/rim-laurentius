const getMetadata = require('tfk-arkiv-metadatagenerator')
const { logger } = require('@vtfk/logger')
const createJobs = require('./p360jobs')
const config = require('../config')

module.exports = document => {
  const moduleName = 'add-document'
  return new Promise((resolve, reject) => {
    logger('info', [moduleName])
    if (!document.documents) {
      logger('warn', [moduleName, 'No documents exists'])
      return resolve(document)
    }
    if (document.errors && document.errors.length > 0) {
      logger('warn', [moduleName, 'Skipping', `${document.errors.length} errors found`])
      return resolve(document)
    }

    let documents
    let jobs
    let i

    try {
      documents = document.documents.map(doc => {
        doc.caseNumber = document.case.caseNumber
        const meta = getMetadata(doc)
        meta.p360 = config.p360_secure_types && config.p360_secure_types.includes(doc.archive) ? config.p360_secure : config.p360
        return meta
      })
      jobs = createJobs(documents)
      i = 0
    } catch (e) {
      logger('error', [moduleName, 'Failed to map documents metadata', e])
      process.exit(0)
    }

    Promise.all(jobs)
      .then(data => {
        const documentNumber = data[0].CreateDocumentResult.DocumentNumber
        logger('info', [moduleName, `Added documentNumber: ${documentNumber} to caseNumber: ${document.case.caseNumber}`])
        document.documents[i].documentNumber = documentNumber
        i++
        console.log(data)
        resolve(document)
      }).catch(err => {
        logger('error', [moduleName, 'Failed to add documents', err])
        document.errors.push(err)
        resolve(document)
      })
  })
}
