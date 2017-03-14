const getMetadata = require('tfk-arkiv-metadatagenerator')
const createJobs = require('./p360jobs')
const logger = require('./logger')
const config = require('../config')

module.exports = document => {
  const moduleName = 'signoff-document'
  return new Promise((resolve, reject) => {
    logger([moduleName, document._id])
    if (!document.documents) {
      logger([moduleName, document._id, 'No documents exists'])
      return resolve(document)
    }

    const signOffDocuments = document.documents.filter(d => !!d.signOff)
    if (signOffDocuments.length === 0) {
      logger([moduleName, document._id, 'No documents to sign off'])
      return resolve(document)
    }
    const documents = signOffDocuments.map(doc => {
      doc.generator = 'signoff-document'
      let meta = getMetadata(doc)
      meta.p360 = config.p360
      return meta
    })

    const jobs = createJobs(documents)

    Promise.all(jobs)
      .then(data => {
        const documentNumber = data[0].SignOffDocumentResult.DocumentNumber
        logger([moduleName, document._id, `Signed off documentNumber: ${documentNumber}`])
        resolve(document)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
  })
}
