const getMetadata = require('tfk-arkiv-metadatagenerator')
const createJobs = require('./p360jobs')
const logger = require('./logger')
const config = require('../config')

module.exports = document => {
  const moduleName = 'add-document'
  return new Promise((resolve, reject) => {
    logger([moduleName, document._id])
    if (!document.documents) {
      logger([moduleName, document._id, 'No documents exists'])
      return resolve(document)
    }

    let documents
    let jobs
    let i

    try {
      documents = document.documents.map(doc => {
        doc.caseNumber = document.case.caseNumber
        let meta = getMetadata(doc)
        meta.p360 = config.p360
        return meta
      })
      jobs = createJobs(documents)
      i = 0
    } catch (e) {
      console.error(e)
      process.exit(0)
    }

    Promise.all(jobs)
      .then(data => {
        const documentNumber = data[0].CreateDocumentResult.DocumentNumber
        logger([moduleName, document._id, `Added documentNumber: ${documentNumber} to caseNumber: ${document.case.caseNumber}`])
        document.documents[i].documentNumber = documentNumber
        i++
        resolve(document)
      }).catch(err => {
        console.log(err)
        return reject(err)
      })
  })
}
