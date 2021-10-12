const getMetadata = require('tfk-arkiv-metadatagenerator')
const { logger } = require('@vtfk/logger')
const createJobs = require('./p360jobs')
const config = require('../config')

module.exports = document => {
  const moduleName = 'add-case'
  return new Promise((resolve, reject) => {
    logger('info', [moduleName])
    if (document.case.caseNumber) {
      logger('info', [moduleName, 'Case exists - no need to create'])
      return resolve(document)
    }
    if (document.errors && document.errors.length > 0) {
      logger('warn', [moduleName, 'Skipping', `${document.errors.length} errors found`])
      return resolve(document)
    }

    const caseContact = document.contacts.find(contact => contact.caseContact !== false)
    const createMeta = {
      generator: document.case.generator,
      title: document.case.title,
      unofficialTitle: document.case.unofficialTitle,
      status: document.case.status,
      paragraph: document.case.paragraph,
      accessGroup: document.case.accessGroup,
      personalIdNumber: caseContact.personalIdNumber,
      fullName: caseContact.fullName,
      caseRole: caseContact.caseContact
    }
    const meta = getMetadata(createMeta)
    meta.p360 = config.p360

    const jobs = createJobs(meta)
    Promise.all(jobs)
      .then(data => {
        document.case.caseNumber = data[0].CreateCaseResult.CaseNumber
        logger('info', [moduleName, `Case created as ${document.case.caseNumber}`])
        resolve(document)
      }).catch(err => {
        logger('error', [moduleName, 'Failed to add case', err])
        document.errors.push(err)
        resolve(document)
      })
  })
}
