'use strict'

const envs = process.env

module.exports = {
  QUEUE_DIRECTORY_PATH: envs.QUEUE_DIRECTORY_PATH || 'test/data/queue',
  STATUS_DIRECTORY_PATH: envs.STATUS_DIRECTORY_PATH || 'test/data/status',
  ERRORS_DIRECTORY_PATH: envs.ERRORS_DIRECTORY_PATH || 'test/data/errors',
  DONE_DIRECTORY_PATH: envs.DONE_DIRECTORY_PATH || 'test/data/done',
  p360: {
    user: process.env.TFK_LAURENTIUS_P360WS_USER || 'domain/user', // username
    password: process.env.TFK_LAURENTIUS_P360WS_PASSWORD || 'password', // passord
    baseUrl: process.env.TFK_LAURENTIUS_P360WS_BASEURL || 'http://tfk-fh-siweb01t.login.top.no:8088/SI.WS.Core/SIF/',
    options: {
      ignoredNamespaces: true
    }
  }
}
