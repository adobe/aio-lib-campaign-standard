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
const { wrapGeneralError, createRequestOptions } = require('./helpers')

function init (tenant, apiKey, token) {
  return new Promise((resolve, reject) => {
    const clientWrapper = new CampaignStandardCoreAPI()

    clientWrapper.init(tenant, apiKey, token)
      .then(initializedSDK => {
        debug('sdk initialized successfully')
        resolve(initializedSDK)
      })
      .catch(err => {
        debug(`sdk init error: ${err}`)
        throw err
      })
  })
}

class CampaignStandardCoreAPI {
  async init (tenant, apiKey, token) {
    // init swagger client
    const spec = require('../spec/campaign_standard_api.json')
    const swagger = new Swagger({
      spec: spec,
      requestInterceptor: req => {
        debug('REQUEST', JSON.stringify(req, null, 2))
        return req
      },
      responseInterceptor: res => {
        debug('RESPONSE', JSON.stringify(res, null, 2))
        if (res.ok) {
          const json = JSON.parse(res.text.toString('utf-8'))
          debug('DATA\n', JSON.stringify(json, null, 2))
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

  __createRequestOptions ({ body } = {}) {
    return createRequestOptions({
      tenant: this.tenant,
      apiKey: this.apiKey,
      token: this.token,
      body
    })
  }

  /**
   * Get all Profiles.
   */
  getAllProfiles () {
    return new Promise((resolve, reject) => {
      this.sdk.apis.profile.getAllProfiles({}, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getAllProfiles', err))
        })
    })
  }

  /**
   * Create a Profile
   */
  createProfile (profileObject) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.profile.createProfile({}, this.__createRequestOptions({ body: profileObject }))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('createProfile', err))
        })
    })
  }

  /**
   * Update a Profile
   */
  updateProfile (profilePKey, profileObject) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.profile.updateProfile({ PROFILE_PKEY: profilePKey }, this.__createRequestOptions({ body: profileObject }))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('updateProfile', err))
        })
    })
  }
}

module.exports = {
  init: init
}
