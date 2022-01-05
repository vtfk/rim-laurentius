'use strict'

module.exports = {
  QUEUE_DIRECTORY_PATH: process.env.QUEUE_DIRECTORY_PATH || 'test/data/queue',
  STATUS_DIRECTORY_PATH: process.env.STATUS_DIRECTORY_PATH || 'test/data/status',
  ERRORS_DIRECTORY_PATH: process.env.ERRORS_DIRECTORY_PATH || 'test/data/errors',
  DONE_DIRECTORY_PATH: process.env.DONE_DIRECTORY_PATH || 'test/data/done',
    user: process.env.TFK_LAURENTIUS_P360WS_USER || 'domain/user', // username
    password: process.env.TFK_LAURENTIUS_P360WS_PASSWORD || 'password', // passord
    baseUrl: process.env.TFK_LAURENTIUS_P360WS_BASEURL || 'http://tfk-fh-siweb01t.login.top.no:8088/SI.WS.Core/SIF/',
    options: {
      ignoredNamespaces: true
    }
  },
  p360_secure_types: process.env.TFK_LAURENTIUS_P360WS_SECURE_TYPES ? process.env.TFK_LAURENTIUS_P360WS_SECURE_TYPES.split(',') : ['Personsensitivt dokument'],
  p360_secure: {
    user: process.env.TFK_LAURENTIUS_P360WS_SECURE_USER || 'domain/user', // username
    password: process.env.TFK_LAURENTIUS_P360WS_SECURE_PASSWORD || 'password', // passord
    baseUrl: process.env.TFK_LAURENTIUS_P360WS_SECURE_BASEURL || 'http://tfk-fh-siweb01t.login.top.no:8088/SI.WS.Core/SIF/',
    options: {
      ignoredNamespaces: true
    }
  }
}
