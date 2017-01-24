'use strict'

module.exports = (cases) => {
  const caseOpen = cases.find(aCase => aCase.Status === 'Under behandling')
  return caseOpen ? caseOpen.CaseNumber : false
}

