const getMetadata = require('tfk-arkiv-metadatagenerator')
const createJobs = require('./p360jobs')
const logger = require('./logger')
const config = require('../config')

module.exports = document => {
  const moduleName = 'sync-contacts'
  return new Promise((resolve, reject) => {
    logger([moduleName, document._id])
    if (!document.contacts) {
      logger([moduleName, document._id, 'No contacts found'])
      return resolve(document)
    }

    const contactsFilter = document.contacts.filter(c => !c.secret)
    if (contactsFilter.length === 0) {
      logger([moduleName, document._id, 'Skipping - secret contact found'])
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
        logger([moduleName, document._id, 'Synced contact'])
        resolve(document)
      }).catch(err => {
        document.errors.push(err)
        resolve(document)
      })
  })
}
