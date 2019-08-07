const debugNamespace = 'adobeio-cna-core-campaign-standard'
const debug = require('debug')(debugNamespace)

function createRequestOptions ({ tenantId, apiKey, accessToken, body = {} }) {
  return {
    requestBody: body,
    securities: {
      authorized: {
        BearerAuth: { value: accessToken },
        ApiKeyAuth: { value: apiKey }
      }
    },
    serverVariables: {
      ORGANIZATION: tenantId
    }
  }
}

function wrapGeneralError (functionName, error) {
  return new Error(`Error while calling Adobe Campaign Standard ${functionName} - ${error}`)
}

function requestInterceptor (req) {
  debug('REQUEST', JSON.stringify(req, null, 2))
  return req
}

function responseInterceptor (res) {
  debug('RESPONSE', JSON.stringify(res, null, 2))
  if (res.ok) {
    const json = JSON.parse(res.text.toString('utf-8'))
    debug('DATA\n', JSON.stringify(json, null, 2))
  }
  return res
}

module.exports = {
  createRequestOptions,
  wrapGeneralError,
  requestInterceptor,
  responseInterceptor
}
