/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const loggerNamespace = 'aio-lib-campaign-standard'
const logger = require('@adobe/aio-lib-core-logging')(loggerNamespace, { level: process.env.LOG_LEVEL })

/** Reduce an Error to a string */
function reduceError (error = {}) {
  const response = error.response
  if (response) {
    if (response.status && response.statusText && response.body) {
      return `${response.status} - ${response.statusText} (${JSON.stringify(response.body)})`
    }
  }

  return error
}

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

function requestInterceptor (req) {
  logger.debug(`REQUEST:\n ${JSON.stringify(req, null, 2)}`)
  return req
}

function responseInterceptor (res) {
  logger.debug(`RESPONSE:\n ${JSON.stringify(res, null, 2)}`)
  if (res.ok) {
    const text = res.text.toString('utf-8')
    try {
      logger.debug(`DATA\n, ${JSON.stringify(JSON.parse(text), null, 2)}`)
    } catch (e) {
      logger.debug(`DATA\n ${text}`)
    }
  }
  return res
}

module.exports = {
  createRequestOptions,
  requestInterceptor,
  responseInterceptor,
  reduceError
}
