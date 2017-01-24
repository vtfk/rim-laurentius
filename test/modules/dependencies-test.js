'use strict'

const tap = require('tap')
const pkg = require('../../package.json')
const dependencies = pkg.dependencies || {}

if (Object.keys(dependencies).length > 0) {
  Object.keys(dependencies).forEach((dependency) => {
    const module = require(dependency)
    tap.ok(module, `${dependency} loads ok`)
  })
} else {
  tap.ok(true, 'no dependencies to test')
}
