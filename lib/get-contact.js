const getMetadata = require('tfk-arkiv-metadatagenerator')
const isHemmelig = require('tfk-is-hemmelig-adresse')
const unwrapContact = require('tfk-360-unwrap-contact')
const createJobs = require('./p360jobs')
const logger = require('./logger')
const config = require('../config')

module.exports = document => {
  const moduleName = 'get-contacts'
  return new Promise((resolve, reject) => {
    logger([moduleName, document._id])
    if (!document.contacts) {
      logger([moduleName, document._id, 'No contacts found'])
      return resolve(document)
    }
    const contacts = document.contacts.map(contact => {
      contact.generator = 'get-private-persons-id'
      const meta = getMetadata(contact)
      meta.p360 = config.p360
      return meta
    })
    const jobs = createJobs(contacts)
    let i = 0
    Promise.all(jobs)
      .then(data => {
        const contactData = unwrapContact(data[0])
        const secret = contactData ? isHemmelig(contactData) : false
        document.contacts[i++].secret = secret
        logger([moduleName, document._id, `contact is set to secret: ${secret}`])
        resolve(document)
      }).catch(err => reject(err))
  })
}
