const getMetadata = require('tfk-arkiv-metadatagenerator')
const createJobs = require('./p360jobs')
const logger = require('./logger')
const config = require('../config')
const isCaseWritable = require('./is-case-writeable')

module.exports = document => {
  const moduleName = 'get-case'
  return new Promise((resolve, reject) => {
    logger([moduleName, document._id])
    if (document.case.type !== 'elevmappe' && !document.case.caseNumber) {
      logger([moduleName, document._id, 'Casenumber not defined and not elevmappe'])
      return resolve(document)
    }

    const createMeta = {
      generator: 'get-case-title',
      title: document.case.title,
      id: document.contacts.find(contact => contact.caseContact !== false).personalIdNumber
    }

    const meta = getMetadata(createMeta)
    meta.p360 = config.p360

    const jobs = createJobs(meta)
    Promise.all(jobs)
      .then(data => {
        logger([moduleName, document._id, 'Checking if case is writable'])
        const result = data[0].GetCasesResult || false
        if (!!result && result.Cases && Array.isArray(result.Cases.CaseResult) && result.Cases.CaseResult.length !== 0) {
          document.case.caseNumber = isCaseWritable(result.Cases.CaseResult)
          logger([moduleName, document._id, `Case exists with result ${document.case.caseNumber}`])
        } else {
          logger([moduleName, document._id, 'Case does not exist'])
        }
        resolve(document)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
  })
}
