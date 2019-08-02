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

'use strict'

const Swagger = require('swagger-client')
const debugNamespace = 'adobeio-cna-core-campaign-standard'
const debug = require('debug')(debugNamespace)

function init (tenant, apiKey, token) {
  return new Promise((resolve, reject) => {
    const clientWrapper = new CampaignStandardCoreAPI()

    clientWrapper.init(tenant, apiKey, token)
      .then(initializedSDK => {
        console.log('sdk initialized successfully')
        resolve(initializedSDK)
      })
      .catch(err => {
        console.log('sdk init error ' + err)
      })
  })
}

class CampaignStandardCoreAPI {
  async init (tenant, apiKey, token) {
    // init swagger client
    const spec = require('../spec/campaign_standard_api.json')
    const swagger = new Swagger({
      spec: spec,
      securities: {
        authorized: {
          BearerAuth: { value: token },
          ApiKeyAuth: { value: apiKey }
        }
      },
      serverVariables: {
        ORGANIZATION: tenant
      },
      requestInterceptor: req => {
        debug('REQUEST', JSON.stringify(req, null, 2))
        return req
      },
      responseInterceptor: res => {
        if (debug.enabled('adobeio-cna-core-campaign-standard')) {
          debug('RESPONSE', JSON.stringify(res, null, 2))
          if (!res.ok) {
            const str = res.text.toString('utf-8')
            const json = JSON.parse(str)
            debug('DATA\n', JSON.stringify(json, null, 2))
          }
        }
        return res
      },
      usePromise: true
    })
    this.sdk = (await swagger)
    this.tenant = tenant
    this.apiKey = apiKey
    this.token = token
    return this
  }
}

module.exports = {
  init: init
}
