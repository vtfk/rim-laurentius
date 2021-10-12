const getMetadata = require('tfk-arkiv-metadatagenerator')
const { logger } = require('@vtfk/logger')
const createJobs = require('./p360jobs')
const config = require('../config')

module.exports = document => {
  const moduleName = 'signoff-document'
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

    const signOffDocuments = document.documents.filter(d => !!d.signOff)
    if (signOffDocuments.length === 0) {
      logger('info', [moduleName, 'No documents to sign off'])
      return resolve(document)
    }
    const documents = signOffDocuments.map(doc => {
      doc.generator = 'signoff-document'
      const meta = getMetadata(doc)
      meta.p360 = config.p360
      return meta
    })

    const jobs = createJobs(documents)

    Promise.all(jobs)
      .then(data => {
        const documentNumber = data[0].SignOffDocumentResult.DocumentNumber
        logger('info', [moduleName, `Signed off documentNumber: ${documentNumber}`])
        resolve(document)
      }).catch(err => {
        logger('error', [moduleName, 'Failed to sign off documents', err])
        document.errors.push(err)
        resolve(document)
      })
  })
}
