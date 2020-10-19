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
    if (document.errors && document.errors.length > 0) {
      logger([moduleName, document._id, 'info', 'Skipping', `${document.errors.length} errors found`])
      return resolve(document)
    }

    let documents
    let jobs
    let i

    try {
      documents = document.documents.map(doc => {
        doc.caseNumber = document.case.caseNumber
        const meta = getMetadata(doc)
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
        console.log(data)
        resolve(document)
      }).catch(err => {
        console.log(err)
        document.errors.push(err)
        resolve(document)
      })
  })
}
