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

  /**
   * Get the marketing history of a Profile
   */
  getHistoryOfProfile (profilePKey) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.history.getHistoryOfProfile({ PROFILE_PKEY: profilePKey }, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getHistoryOfProfile', err))
        })
    })
  }

  getMetadataForResource (resource) {
    return new Promise((resolve, reject) => {
      const acceptedResources = ['profile', 'service', 'history', 'orgunitbase']
      if (!acceptedResources.includes(resource.toLowerCase())) {
        reject(wrapGeneralError('getMetadataForResource',
          new Error(`resource values can only be: ${acceptedResources.join(', ')}`)))
      }

      this.sdk.apis.metadata.getMetadataForResource({ RESOURCE: resource }, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getMetadataForResource', err))
        })
    })
  }

  getCustomResources () {
    return new Promise((resolve, reject) => {
      this.sdk.apis.metadata.getCustomResources({}, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getCustomResources', err))
        })
    })
  }

  createGDPRRequest (gdprRequest) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.gdpr.createGDPRRequest({}, this.__createRequestOptions({ body: gdprRequest }))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('createGDPRRequest', err))
        })
    })
  }

  getGDPRRequest () {
    return new Promise((resolve, reject) => {
      this.sdk.apis.gdpr.getGDPRRequest({}, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getGDPRRequest', err))
        })
    })
  }

  getGDPRDataFile (privateRequestDataUrl) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.gdpr.getGDPRDataFile({ PRIVACY_REQUEST_DATA_URL: privateRequestDataUrl }, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getGDPRDataFile', err))
        })
    })
  }

  sendTransactionalEvent (eventId, eventBody) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.messaging.sendTransactionalEvent(
        {
          ORGANIZATION: this.tenantId,
          EVENT_ID: eventId
        }, this.__createRequestOptions({ body: eventBody }))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('sendTransactionalEvent', err))
        })
    })
  }

  getTransactionalEvent (eventId, eventPKey) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.messaging.getTransactionalEvent(
        {
          ORGANIZATION: this.tenantId,
          EVENT_ID: eventId,
          EVENT_PKEY: eventPKey
        }, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getTransactionalEvent', err))
        })
    })
  }

  getWorkflow (workflowId) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.workflow.getWorkflow({ WORKFLOW_ID: workflowId }, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getWorkflow', err))
        })
    })
  }

  triggerSignalActivity (workflowTriggerUrl, workflowParameters) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.workflow.triggerSignalActivity({ TRIGGER_URL: workflowTriggerUrl },
        this.__createRequestOptions({ body: workflowParameters }
        ))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('triggerSignalActivity', err))
        })
    })
  }

  controlWorkflow (workflowId, command) {
    return new Promise((resolve, reject) => {
      const acceptedCommands = ['start', 'pause', 'resume', 'stop']
      if (!acceptedCommands.includes(command.toLowerCase())) {
        reject(wrapGeneralError('controlWorkflow',
          new Error(`command values can only be: ${acceptedCommands.join(', ')}`)))
      }

      this.sdk.apis.workflow.controlWorkflow({ WORKFLOW_ID: workflowId },
        this.__createRequestOptions({
          body: {
            method: command.toLowerCase()
          }
        }))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('controlWorkflow', err))
        })
    })
  }

  getAllOrgUnits (profilePKey) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.organization.getAllOrgUnits({}, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getAllOrgUnits', err))
        })
    })
  }

  getProfileWithOrgUnit (profilePKey) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.organization.getProfileWithOrgUnit({ PROFILE_PKEY: profilePKey }, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getProfileWithOrgUnit', err))
        })
    })
  }

  updateProfileOrgUnit (profilePKey, orgUnitPKey) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.organization.updateProfileOrgUnit({ PROFILE_PKEY: profilePKey },
        this.__createRequestOptions({
          body: {
            orgUnit: {
              PKey: orgUnitPKey
            }
          }
        }))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('updateProfileOrgUnit', err))
        })
    })
  }

  updateOrgUnit (orgUnitPKey, orgUnitObject) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.organization.updateOrgUnit({ ORGUNIT_PKEY: orgUnitPKey },
        this.__createRequestOptions({ body: orgUnitObject }))
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('updateOrgUnit', err))
        })
    })
  }

  getDataFromRelativeUrl (relativeUrl) {
    return new Promise((resolve, reject) => {
      this.sdk.apis.util.getDataFromRelativeUrl({ RELATIVE_URL: relativeUrl }, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getDataFromRelativeUrl', err))
        })
    })
  }
}

module.exports = {
  init: init
}
