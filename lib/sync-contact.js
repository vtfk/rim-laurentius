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
    const contacts = document.contacts.map((contact) => {
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
