const getMetadata = require('tfk-arkiv-metadatagenerator')
const createJobs = require('./p360jobs')
const logger = require('./logger')
const config = require('../config')

module.exports = (document) => {
  const moduleName = 'sync-contacts'
  return new Promise((resolve, reject) => {
    logger([moduleName, document._id])
    if (!document.contacts) {
      logger([moduleName, document._id, 'No contacts found'])
      return resolve(document)
    }
    let contactsFilter = document.contacts.filter(c => c.secret !== true)
    if (contactsFilter.length === 0) {
      logger([moduleName, document._id, 'Skipping - secret contact found'])
      return resolve(document)
    }
    const contacts = document.contactsFilter.map(contact => {
      let meta = getMetadata(contact)
      meta.p360 = config.p360
      return meta
    })
    const jobs = createJobs(contacts)
    Promise.all(jobs)
      .then((data) => {
        logger([moduleName, document._id, JSON.stringify(data)])
        resolve(document)
      }).catch((err) => {
        return reject(err)
      })
  })
}
