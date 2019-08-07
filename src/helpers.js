function createRequestOptions (tenant, apiKey, token, body = {}) {
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

module.exports = {
  createRequestOptions
}
