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

const sdk = require('../src')
const { wrapGeneralError, createRequestOptions } = require('../src/helpers')

// /////////////////////////////////////////////

const gTenantId = 'test-company'
const gApiKey = 'test-apikey'
const gAccessToken = 'test-token'

// /////////////////////////////////////////////

const createSwaggerOptions = ({ body } = {}) => {
  return createRequestOptions({
    tenantId: gTenantId,
    apiKey: gApiKey,
    accessToken: gAccessToken,
    body })
}

const createSdkClient = async () => {
  return sdk.init(gTenantId, gApiKey, gAccessToken)
}

// /////////////////////////////////////////////

test('sdk init test', async () => {
  const sdkClient = await createSdkClient()

  expect(sdkClient.tenantId).toBe(gTenantId)
  expect(sdkClient.apiKey).toBe(gApiKey)
  expect(sdkClient.accessToken).toBe(gAccessToken)
})

test('sdk init test - no tenantId', async () => {
  return expect(sdk.init(null, gApiKey, gAccessToken)).rejects.toEqual(
    new Error('SDK initialization error(s). Missing arguments: tenantId')
  )
})

test('sdk init test - no apiKey', async () => {
  return expect(sdk.init(gTenantId, null, gAccessToken)).rejects.toEqual(
    new Error('SDK initialization error(s). Missing arguments: apiKey')
  )
})

test('sdk init test - no accessToken', async () => {
  return expect(sdk.init(gTenantId, gApiKey, null)).rejects.toEqual(
    new Error('SDK initialization error(s). Missing arguments: accessToken')
  )
})

async function standardTest ({
  fullyQualifiedApiName, apiParameters, apiOptions,
  sdkFunctionName, sdkArgs,
  successReturnValue = {}
}) {
  const sdkClient = await createSdkClient()
  const [, apiFunction] = fullyQualifiedApiName.split('.')

  // sdk function name is the same as the apiname (without the namespace) by default
  // so if it is not set, we set it
  // this means in the SDK the namespace is flattened, so functions have to have unique names
  if (!sdkFunctionName) {
    sdkFunctionName = apiFunction
  }
  const fn = sdkClient[sdkFunctionName]
  let mockFn

  // success case
  mockFn = sdkClient.sdk.mockResolved(fullyQualifiedApiName, successReturnValue)
  await expect(fn.apply(sdkClient, sdkArgs)).resolves.toEqual(successReturnValue)
  expect(mockFn).toHaveBeenCalledWith(apiParameters, apiOptions)

  // failure case
  const err = new Error('some API error')
  mockFn = sdkClient.sdk.mockRejected(fullyQualifiedApiName, err)
  await expect(fn.apply(sdkClient, sdkArgs)).rejects.toEqual(
    wrapGeneralError(apiFunction, err)
  )
  expect(mockFn).toHaveBeenCalledWith(apiParameters, apiOptions)
}

test('getAllProfiles', async () => {
  const sdkArgs = []
  const apiParameters = { EXT: '', FILTERS: [] } // equiv to default
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'profile.getAllProfiles',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getAllProfiles - with filters', async () => {
  function createSdkArgs ({ descendingSort }) {
    return [
      {
        filters: ['byEmail', 'byText', 'myCustomFilter'],
        hasCustomFilter: true,
        lineCount: 10,
        order: 'email',
        descendingSort
      }
    ]
  }

  function createApiParameters ({ descendingSort }) {
    return {
      FILTERS: 'byEmail/byText/myCustomFilter',
      EXT: 'Ext',
      _lineCount: 10,
      _order: descendingSort ? 'email%20desc' : 'email'
    }
  }

  const apiOptions = createSwaggerOptions()

  // descending sort
  await standardTest({
    fullyQualifiedApiName: 'profile.getAllProfiles',
    apiParameters: createApiParameters({ descendingSort: true }),
    apiOptions,
    sdkArgs: createSdkArgs({ descendingSort: true })
  })

  // ascending sort
  await standardTest({
    fullyQualifiedApiName: 'profile.getAllProfiles',
    apiParameters: createApiParameters({ descendingSort: false }),
    apiOptions,
    sdkArgs: createSdkArgs({ descendingSort: false })
  })
})

test('createProfile', async () => {
  const profileObject = { firstName: 'Jack', lastName: 'Smith', email: 'foo@bar.com' }

  const sdkArgs = [profileObject]
  const apiParameters = {}
  const apiOptions = createSwaggerOptions({ body: profileObject })

  return standardTest({
    fullyQualifiedApiName: 'profile.createProfile',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('updateProfile', async () => {
  const pkey = '@agsagasgasgasgasg313'
  const profileObject = { firstName: 'Jack', lastName: 'Smith', email: 'foo@bar.com' }

  const sdkArgs = [pkey, profileObject]
  const apiParameters = { PROFILE_PKEY: pkey }
  const apiOptions = createSwaggerOptions({ body: profileObject })

  return standardTest({
    fullyQualifiedApiName: 'profile.updateProfile',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getProfile', async () => {
  const pkey = '@agsagasgasgasgasg313'

  const sdkArgs = [pkey]
  const apiParameters = { PROFILE_PKEY: pkey }
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'profile.getProfile',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getAllServices', async () => {
  const sdkArgs = []
  const apiParameters = { EXT: '', FILTERS: [] } // equiv to default
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'service.getAllServices',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('createService', async () => {
  const serviceObject = {
    desc: 'service description',
    label: 'My newsletter',
    messageType: 'email',
    name: 'newsletter1',
    start: '2019-04-06'
  }

  const sdkArgs = [serviceObject]
  const apiParameters = {}
  const apiOptions = createSwaggerOptions({ body: serviceObject })

  return standardTest({
    fullyQualifiedApiName: 'service.createService',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getService', async () => {
  const pkey = '@agsagasgasgasgasg313'

  const sdkArgs = [pkey]
  const apiParameters = { SERVICE_PKEY: pkey }
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'service.getService',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getHistoryOfProfile', async () => {
  const pkey = '@agsagasgasgasgasg313'

  const sdkArgs = [pkey]
  const apiParameters = { PROFILE_PKEY: pkey }
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'history.getHistoryOfProfile',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getMetadataForResource', async () => {
  const resource = 'profile'

  const sdkArgs = [resource]
  const apiParameters = { RESOURCE: resource }
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'metadata.getMetadataForResource',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getMetadataForResource - invalid resource', async () => {
  const resource = 'gibberish'
  const sdkClient = await createSdkClient()

  return expect(sdkClient.getMetadataForResource(resource)).rejects.toEqual(
    new Error('Error while calling Adobe Campaign Standard getMetadataForResource - Error: resource values can only be: profile, service, history, orgunitbase')
  )
})

test('getCustomResources', async () => {
  const sdkArgs = []
  const apiParameters = {}
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'metadata.getCustomResources',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('createGDPRRequest', async () => {
  const gdprRequest = {
    name: 'PT11832',
    namespaceName: 'AMCDS2',
    reconciliationValue: 'customers@adobe.com',
    label: 'Delete customers',
    type: 'delete'
  }

  const sdkArgs = [gdprRequest]
  const apiParameters = {}
  const apiOptions = createSwaggerOptions({ body: gdprRequest })

  return standardTest({
    fullyQualifiedApiName: 'gdpr.createGDPRRequest',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getGDPRRequest', async () => {
  const sdkArgs = []
  const apiParameters = {}
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'gdpr.getGDPRRequest',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getGDPRDataFile', async () => {
  const privateRequestDataUrl = 'https://fake.site'

  const sdkArgs = [privateRequestDataUrl]
  const apiParameters = { PRIVACY_REQUEST_DATA_URL: privateRequestDataUrl }
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'gdpr.getGDPRDataFile',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('sendTransactionalEvent', async () => {
  const eventId = 'foo-bar-321'
  const eventBody =
  {
    email: 'test@example.com',
    scheduled: '2017-12-01 08:00:00.768Z',
    expiration: '2017-12-31 08:00:00.768Z',
    ctx:
    {
      cartAmount: '$ 125',
      lastProduct: 'Leather motorbike jacket',
      firstName: 'Jack'
    }
  }

  const sdkArgs = [eventId, eventBody]
  const apiParameters = { EVENT_ID: eventId, ORGANIZATION: gTenantId }
  const apiOptions = createSwaggerOptions({ body: eventBody })

  return standardTest({
    fullyQualifiedApiName: 'messaging.sendTransactionalEvent',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getTransactionalEvent', async () => {
  const eventId = 'foo-bar-321'
  const eventPKey = '@agsagasgasgasgasg313'

  const sdkArgs = [eventId, eventPKey]
  const apiParameters = { EVENT_ID: eventId, ORGANIZATION: gTenantId, EVENT_PKEY: eventPKey }
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'messaging.getTransactionalEvent',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getWorkflow', async () => {
  const workflowId = 'wfoo-bar-321'

  const sdkArgs = [workflowId]
  const apiParameters = { WORKFLOW_ID: workflowId }
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'workflow.getWorkflow',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('triggerSignalActivity', async () => {
  const workflowTriggerUrl = 'https://fake.site'
  const workflowParameters = {
    'source:': 'API',
    parameters: {
      audience: 'audience',
      email: 'anna.anna@gibberishxyz.com',
      template: '05',
      contentURL: 'http://www.adobe.com',
      test: 'true',
      segmentCode: 'my segment',
      attribute: '2019-04-03 08:17:19.100Z'
    }
  }

  const sdkArgs = [workflowTriggerUrl, workflowParameters]
  const apiParameters = { TRIGGER_URL: workflowTriggerUrl }
  const apiOptions = createSwaggerOptions({ body: workflowParameters })

  return standardTest({
    fullyQualifiedApiName: 'workflow.triggerSignalActivity',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('controlWorkflow', async () => {
  const workflowId = 'wfoo-bar-321'
  const command = 'START'

  const sdkArgs = [workflowId, command]
  const apiParameters = { WORKFLOW_ID: workflowId }
  const apiOptions = createSwaggerOptions({
    body: {
      method: command.toLowerCase()
    }
  })

  return standardTest({
    fullyQualifiedApiName: 'workflow.controlWorkflow',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('controlWorkflow - invalid resource', async () => {
  const workflowId = 'wfoo-bar-321'
  const command = 'gibberish'
  const sdkClient = await createSdkClient()

  return expect(sdkClient.controlWorkflow(workflowId, command)).rejects.toEqual(
    new Error('Error while calling Adobe Campaign Standard controlWorkflow - Error: command values can only be: start, pause, resume, stop')
  )
})

test('getAllOrgUnits', async () => {
  const sdkArgs = []
  const apiParameters = { EXT: '', FILTERS: [] } // equiv to default
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'organization.getAllOrgUnits',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getProfileWithOrgUnit', async () => {
  const pkey = '@agsagasgasgasgasg313'

  const sdkArgs = [pkey]
  const apiParameters = { PROFILE_PKEY: pkey }
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'organization.getProfileWithOrgUnit',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('updateProfileOrgUnit', async () => {
  const profilePKey = 'pfoo-bar-321'
  const orgUnitPKey = 'ogfoo-bar-321'

  const sdkArgs = [profilePKey, orgUnitPKey]
  const apiParameters = { PROFILE_PKEY: profilePKey }
  const apiOptions = createSwaggerOptions({
    body: {
      orgUnit: {
        PKey: orgUnitPKey
      }
    }
  })

  return standardTest({
    fullyQualifiedApiName: 'organization.updateProfileOrgUnit',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('updateOrgUnit', async () => {
  const pkey = '@agsagasgasgasgasg313'
  const orgUnitObject = {
    desc: 'this is the org description',
    label: 'this is the org label'
  }

  const sdkArgs = [pkey, orgUnitObject]
  const apiParameters = { ORGUNIT_PKEY: pkey }
  const apiOptions = createSwaggerOptions({ body: orgUnitObject })

  return standardTest({
    fullyQualifiedApiName: 'organization.updateOrgUnit',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})

test('getDataFromRelativeUrl', async () => {
  const relativeUrl = '/profile/bla/blu/blee'

  const sdkArgs = [relativeUrl]
  const apiParameters = { RELATIVE_URL: relativeUrl }
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'util.getDataFromRelativeUrl',
    apiParameters,
    apiOptions,
    sdkArgs
  })
})
