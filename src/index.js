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
/**
 * Adobe Campaign Standard Core SDK
 * @module @adobe/adobeio-cna-core-campaign-standard
 */

'use strict'

const Swagger = require('swagger-client')
const debugNamespace = 'adobeio-cna-core-campaign-standard'
const debug = require('debug')(debugNamespace)
const { requestInterceptor, responseInterceptor, wrapGeneralError, createRequestOptions } = require('./helpers')

/**
 * Initializes a CampaignStandardCoreAPI object and returns it.
 *
 * @param {string} tenantId the tenant id (your personal organization in Campaign Standard)
 * @param {string} apiKey the API key for your Adobe I/O Campaign Standard Integration
 * @param {string} accessToken the access token for your Adobe I/O Campaign Standard Integration
 * @returns {CampaignStandardCoreAPI}
 */
module.exports.init = function (tenantId, apiKey, accessToken) {
  return new Promise((resolve, reject) => {
    const clientWrapper = new CampaignStandardCoreAPI()

    clientWrapper.init(tenantId, apiKey, accessToken)
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

/**
 * Wrapper for the Adobe Campaign Standard REST API.
 *
 */
class CampaignStandardCoreAPI {
  /**
   * Initializes the object.
   *
   * @param {string} tenantId the tenant id (your personal organization in Campaign Standard)
   * @param {string} apiKey the API key for your Adobe I/O Campaign Standard Integration
   * @param {string} accessToken the access token for your Adobe I/O Campaign Standard Integration
   * @throws {Error} when any of the arguments tenantId, apiKey, or accessToken is missing
   * @async
   */

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
    /** the tenant id (your personal organization in Campaign Standard) */
    this.tenantId = tenantId
    /** the api key from your Adobe I/O Campaign Standard integration */
    this.apiKey = apiKey
    /** the access token from your Adobe I/O Campaign Standard integration */
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
   *
   * @param {Object} profileObject see {@link https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#profile|profile properties}
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
   *
   * @param {string} profilePKey the PKey property of a Profile record
   * @param {Object} profileObject see {@link https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#profile|profile properties}. Only set the properties you want to update.
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
   *
   * @param {string} profilePKey the PKey property of a Profile record
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
   * Get all Service records
   */
  getAllServices () {
    return new Promise((resolve, reject) => {
      this.sdk.apis.service.getAllServices({}, this.__createRequestOptions())
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(wrapGeneralError('getAllServices', err))
        })
    })
  }

  /**
   * Create a Service record
   *
   * @param {Object} serviceObject see {@link https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#service|service properties}
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
   *
   * @param {string} servicePKey the PKey property of a Service record
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
   *
   * @param {string} profilePKey the PKey property of a Profile record
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

  /**
   * Get the metadata information for a resource.
   *
   * @param {string} resource one of profile, service, history, orgUnitBase
   */
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

  /**
   * Get all the custom resource collections linked to the Profile table.
   */
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

  /**
   * Create a new GDPR request.
   *
   * @param {Object} gdprRequest see {@link https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#create-a-new-gdpr-request|the properties} that are needed.
   */
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

  /**
   * Get data about the current GDPR request.
   */
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

  /**
   * Get the GDPR data file.
   *
   * @param {string} privateRequestDataUrl this is acquired from a getGDPRRequest call
   * @see getGDPRRequest
   */
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

  /**
   * Send a transactional event.
   *
   * @param {string} eventId the type of event you want to send. This depends on the {@link https://docs.adobe.com/content/help/en/campaign-standard/using/administrating/configuring-channels/configuring-transactional-messaging.html|event definition}.
   * @param {Object} eventBody the event data to send. This depends on the {@link https://docs.adobe.com/content/help/en/campaign-standard/using/administrating/configuring-channels/configuring-transactional-messaging.html|event definition}.
   */
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

  /**
   * Gets data about a transactional event (status, properties)
   *
   * @param {string} eventId the type of event you want to send
   * @param {string} eventPKey the PKey of an event (you get this from a sendTransactionalEvent call)
   * @see sendTransactionalEvent
   */
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

  /**
   * Gets the properties of a workflow.
   *
   * @param {string} workflowId the id of the workflow
   */
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

  /**
   * Trigger a workflow.
   *
   * @param {string} workflowTriggerUrl the trigger url for a workflow. You can get this from a call to getWorkflow
   * @param {Object} workflowParameters the parameters to send to the workflow. see the payload in the {@link https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#sending-a-transactional-event|docs}
   * @see getWorkflow
   */
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

  /**
   * Controls execution of a workflow.
   *
   * @param {string} workflowId the id of the workflow
   * @param {string} command the command to execute for the workflow. one of start, pause, resume, stop
   */
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

  /**
   * Gets all available orgUnits
   *
   */
  getAllOrgUnits () {
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

  /**
   * Gets a Profile record (with it's orgUnit property)
   *
   * @param {string} profilePKey the PKey property of a Profile record
   */
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

  /**
   * Update the orgUnit of a Profile
   *
   * @param {string} profilePKey the PKey property of a Profile record
   * @param {string} orgUnitPKey the PKey property of a OrgUnitBase record
   */
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

  /**
   * Update the properties of an OrgUnitBase.
   *
   * @param {string} orgUnitPKey the PKey property of a OrgUnitBase record
   * @param {Object} orgUnitObject see {@link https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#orgunitbase|orgUnitBase properties}. Only set the properties you want to update.
   */
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

  /**
   * Gets data from a relative url. Helper function.
   *
   * @param {string} relativeUrl the relative url (returned from some ACS API calls)
   */
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
