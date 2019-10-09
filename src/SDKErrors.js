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

const { ErrorWrapper, createUpdater } = require('@adobe/aio-lib-core-errors').AioCoreSDKErrorWrapper

const codes = {}
const messages = new Map()

/**
 * Create an Updater for the Error wrapper
 */
const Updater = createUpdater(
  // object that stores the error classes (to be exported)
  codes,
  // Map that stores the error strings (to be exported)
  messages
)

/**
 * Provides a wrapper to easily create classes of a certain name, and values
 */
const E = ErrorWrapper(
  // The class name for your SDK Error. Your Error objects will be these objects
  'CampaignStandardSDKError',
  // The name of your SDK. This will be a property in your Error objects
  'CampaignStandardSDK',
  // the object returned from the CreateUpdater call above
  Updater
  // the base class that your Error class is extending. AioCoreSDKError is the default
  /* AioCoreSDKError, */
)

module.exports = {
  codes,
  messages
}

// Define your error codes with the wrapper
E('ERROR_SDK_INITIALIZATION', 'SDK initialization error(s). Missing arguments: %s')
E('ERROR_GET_ALL_PROFILES', '%s')
E('ERROR_CREATE_PROFILE', '%s')
E('ERROR_UPDATE_PROFILE', '%s')
E('ERROR_GET_PROFILE', '%s')
E('ERROR_GET_ALL_SERVICES', '%s')
E('ERROR_CREATE_SERVICE', '%s')
E('ERROR_GET_SERVICE', '%s')
E('ERROR_GET_HISTORY_OF_PROFILE', '%s')
E('ERROR_INVALID_RESOURCE_TYPE', 'resource values can only be: %s')
E('ERROR_GET_METADATA_FOR_RESOURCE', '%s')
E('ERROR_GET_CUSTOM_RESOURCES', '%s')
E('ERROR_GET_GDPR_REQUEST', '%s')
E('ERROR_CREATE_GDPR_REQUEST', '%s')
E('ERROR_GET_GDPR_DATA_FILE', '%s')
E('ERROR_SEND_TRANSACTIONAL_EVENT', '%s')
E('ERROR_GET_TRANSACTIONAL_EVENT', '%s')
E('ERROR_GET_WORKFLOW', '%s')
E('ERROR_TRIGGER_SIGNAL_ACTIVITY', '%s')
E('ERROR_INVALID_WORKFLOW_CONTROL_COMMAND', 'command values can only be: %s')
E('ERROR_CONTROL_WORKFLOW', '%s')
E('ERROR_GET_ALL_ORG_UNITS', '%s')
E('ERROR_GET_PROFILE_WITH_ORG_UNIT', '%s')
E('ERROR_UPDATE_PROFILE_ORG_UNIT', '%s')
E('ERROR_UPDATE_ORG_UNIT', '%s')
E('ERROR_GET_DATA_FROM_RELATIVE_URL', '%s')
E('ERROR_GET_ALL_CUSTOM_RESOURCES', '%s')
E('ERROR_UPDATE_CUSTOM_RESOURCE', '%s')
E('ERROR_CREATE_CUSTOM_RESOURCE', '%s')
E('ERROR_DELETE_CUSTOM_RESOURCE', '%s')
