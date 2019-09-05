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
  debug('REQUEST', req)
  return req
}

function responseInterceptor (res) {
  debug('RESPONSE', res)
  if (res.ok) {
    const text = res.text.toString('utf-8')
    try {
      debug('DATA\n', JSON.stringify(JSON.parse(text), null, 2))
    } catch (e) {
      debug('DATA\n', text)
    }
  }
  return res
}

module.exports = {
  createRequestOptions,
  wrapGeneralError,
  requestInterceptor,
  responseInterceptor
}
