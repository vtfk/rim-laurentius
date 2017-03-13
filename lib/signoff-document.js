const getMetadata = require('tfk-arkiv-metadatagenerator')
const createJobs = require('./p360jobs')
const logger = require('./logger')
const config = require('../config')

module.exports = document => {
  const moduleName = 'signoff-document'
  return new Promise((resolve, reject) => {
    logger([moduleName, document._id])
    if (!document.documentNumbers) {
      logger([moduleName, document._id, 'No documents exists'])
      resolve(document)
    }

    const signOffDocuments = document.documents.filter(d => d.signOff)
    const documents = signOffDocuments.map(doc => {
      doc.generator = 'signoff-document'
      let meta = getMetadata(doc)
      meta.p360 = config.p360
      return meta
    })

    const jobs = createJobs(documents)

    Promise.all(jobs)
      .then(data => {
        console.log(data)
        const documentNumber = data[0].SignOffDocumentResult.DocumentNumber
        logger([moduleName, document._id, `Signed off documentNumber: ${documentNumber}`])
        document.documentNumbers.push(documentNumber)
        resolve(document)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}
