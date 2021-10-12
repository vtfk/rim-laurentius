const getMetadata = require('tfk-arkiv-metadatagenerator')
const { logger } = require('@vtfk/logger')
const createJobs = require('./p360jobs')
const config = require('../config')

module.exports = document => {
  const moduleName = 'sync-contacts'
  return new Promise((resolve, reject) => {
    logger('info', [moduleName])
    if (!document.contacts) {
      logger('warn', [moduleName, 'No contacts found'])
      return resolve(document)
    }

    const contactsFilter = document.contacts.filter(c => !c.secret)
    if (contactsFilter.length === 0) {
      logger('info', [moduleName, 'Skipping - secret contact found'])
      return resolve(document)
    }

    const contacts = contactsFilter.map(contact => {
      if (!contact.generator) contact.generator = 'add-private-person'
      const meta = getMetadata(contact)
      meta.p360 = config.p360
      return meta
    })

    const jobs = createJobs(contacts)

    Promise.all(jobs)
      .then(data => {
        logger('info', [moduleName, 'Synced contact'])
        resolve(document)
      }).catch(err => {
        logger('error', [moduleName, 'Failed to sync contacts', err])
        document.errors.push(err)
        resolve(document)
      })
  })
}
