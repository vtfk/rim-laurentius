const getMetadata = require('tfk-arkiv-metadatagenerator')
const { logger } = require('@vtfk/logger')
const createJobs = require('./p360jobs')
const config = require('../config')
const isCaseWritable = require('./is-case-writeable')

module.exports = document => {
  const moduleName = 'get-case'
  return new Promise((resolve, reject) => {
    logger('info', [moduleName])
    if (document.errors && document.errors.length > 0) {
      logger('warn', [moduleName, 'Skipping', `${document.errors.length} errors found`])
      return resolve(document)
    }
    if (document.case.type !== 'elevmappe' && !document.case.caseNumber) {
      logger('warn', [moduleName, 'Casenumber not defined and not elevmappe'])
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
        logger('info', [moduleName, 'Checking if case is writable'])
        const result = data[0].GetCasesResult || false
        if (!!result && result.Cases && Array.isArray(result.Cases.CaseResult) && result.Cases.CaseResult.length !== 0) {
          document.case.caseNumber = isCaseWritable(result.Cases.CaseResult)
          logger('info', [moduleName, `Case exists with result ${document.case.caseNumber}`])
        } else {
          const isNotat = document.documents.filter(doc => doc.title === 'Lærernotat').length > 0
          logger('warn', [moduleName, 'Case does not exist'])
          if (isNotat) {
            const personalIdNumber = document.contacts[0].personalIdNumber
            logger('error', [moduleName, 'notat', `Please manually check/create elevmappe for ${personalIdNumber}`])
            document.errors.push({
              error: `Please manually check/create elevmappe for ${personalIdNumber}`
            })
          }
        }
        resolve(document)
      }).catch(err => {
        logger('error', [moduleName, 'Failed to get case', err])
        document.errors.push(err)
        resolve(document)
      })
  })
}
