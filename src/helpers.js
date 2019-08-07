function createRequestOptions ({ tenant, apiKey, token, body = {} }) {
  return {
    requestBody: body,
    securities: {
      authorized: {
        BearerAuth: { value: token },
        ApiKeyAuth: { value: apiKey }
      }
    },
    serverVariables: {
      ORGANIZATION: tenant
    }
  }
}

function wrapGeneralError (functionName, error) {
  return new Error(`Error while calling Adobe Campaign Standard ${functionName} - ${error}`)
}

module.exports = {
  createRequestOptions,
  wrapGeneralError
}
