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

const tenantId = 'test-company'
const apiKey = 'test-apikey'
const accessToken = 'test-token'

// /////////////////////////////////////////////

const createSwaggerOptions = ({ body } = {}) => {
  return createRequestOptions({ tenantId, apiKey, accessToken, body })
}

const createSdkClient = async () => {
  return sdk.init(tenantId, apiKey, accessToken)
}

// /////////////////////////////////////////////

test('sdk init test', async () => {
  const sdkClient = await createSdkClient()

  expect(sdkClient.tenantId).toBe(tenantId)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.accessToken).toBe(accessToken)
})

test('sdk init test - no tenantId', async () => {
  return expect(sdk.init(null, apiKey, accessToken)).rejects.toEqual(
    new Error('SDK initialization error(s). Missing arguments: tenantId')
  )
})

test('sdk init test - no apiKey', async () => {
  return expect(sdk.init(tenantId, null, accessToken)).rejects.toEqual(
    new Error('SDK initialization error(s). Missing arguments: apiKey')
  )
})

test('sdk init test - no accessToken', async () => {
  return expect(sdk.init(tenantId, apiKey, null)).rejects.toEqual(
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
  const apiParameters = {}
  const apiOptions = createSwaggerOptions()

  return standardTest({
    fullyQualifiedApiName: 'profile.getAllProfiles',
    apiParameters,
    apiOptions,
    sdkArgs
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
