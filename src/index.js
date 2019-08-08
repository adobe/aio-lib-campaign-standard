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
const { requestInterceptor, responseInterceptor, wrapGeneralError, createRequestOptions } = require('./helpers')

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
        reject(err)
      })
  })
}

class CampaignStandardCoreAPI {
  async init (tenantId, apiKey, accessToken) {
    // init swagger client
    const spec = require('../spec/campaign_standard_api.json')
    const swagger = new Swagger({
      spec: spec,
      requestInterceptor,
      responseInterceptor,
      usePromise: true
    })
    this.sdk = (await swagger)

    const initErrors = []
    if (!tenantId) {
      initErrors.push('tenantId')
    }
    if (!apiKey) {
      initErrors.push('apiKey')
    }
    if (!accessToken) {
      initErrors.push('accessToken')
    }

    if (initErrors.length) {
      throw new Error(`SDK initialization error(s). Missing arguments: ${initErrors.join(', ')}`)
    }
    this.tenantId = tenantId
    this.apiKey = apiKey
    this.accessToken = accessToken
    return this
  }

  __createRequestOptions ({ body } = {}) {
    return createRequestOptions({
      tenantId: this.tenantId,
      apiKey: this.apiKey,
      accessToken: this.accessToken,
      body
    })
  }

  /**
   * Get all Profile records
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
   * Create a Profile record
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
   * Update a Profile record
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

  /**
   * Get a Profile record
   */
  getProfile (profilePKey) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.profile.getProfile({ PROFILE_PKEY: profilePKey }, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getProfile', err))
        })
    })
  }

  /**
   * Create a Service record
   */
  createService (serviceObject) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.service.createService({}, this.__createRequestOptions({ body: serviceObject }))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('createService', err))
        })
    })
  }

  /**
   * Get a Service record
   */
  getService (servicePKey) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.service.getService({ SERVICE_PKEY: servicePKey }, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getService', err))
        })
    })
  }
}

module.exports = {
  init: init
}
