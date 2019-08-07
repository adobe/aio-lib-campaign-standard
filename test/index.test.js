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
const { createRequestOptions } = require('../src/helpers')

// /////////////////////////////////////////////

const tenant = 'test-company'
const apiKey = 'test-apikey'
const token = 'test-token'

// /////////////////////////////////////////////

const createSwaggerOptions = (body = {}) => {
  return createRequestOptions(tenant, apiKey, token, body)
}

const createSdkClient = async () => {
  return sdk.init(tenant, apiKey, token)
}

// /////////////////////////////////////////////

test('sdk init test', async () => {
  const sdkClient = await createSdkClient()

  expect(sdkClient.tenant).toBe(tenant)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.token).toBe(token)
})

test('getAllProfiles', async () => {
  const sdkClient = await createSdkClient()
  const apiFunction = 'profile.getAllProfiles'

  let returnValue
  let mockFn
  const parameters = {}
  const options = createSwaggerOptions()

  // success case
  returnValue = {}
  mockFn = sdkClient.sdk.mockResolved(apiFunction, returnValue)
  await expect(sdkClient.getAllProfiles()).resolves.toEqual(returnValue)
  expect(mockFn).toHaveBeenCalledWith(parameters, options)

  // failure case
  returnValue = new Error('some API error')
  mockFn = sdkClient.sdk.mockRejected(apiFunction, returnValue)
  await expect(sdkClient.getAllProfiles()).rejects.toEqual(
    new Error(`Error while calling Adobe Campaign Standard getAllProfiles - ${returnValue}`)
  )
  expect(mockFn).toHaveBeenCalledWith(parameters, options)
})

test('createProfile', async () => {
  const sdkClient = await createSdkClient()
  const apiFunction = 'profile.createProfile'

  let returnValue
  let mockFn
  const profileObject = { firstName: 'Jack', lastName: 'Smith', email: 'foo@bar.com' }
  const parameters = {}
  const options = createSwaggerOptions(profileObject)

  // success case
  returnValue = {}
  mockFn = sdkClient.sdk.mockResolved(apiFunction, returnValue)
  await expect(sdkClient.createProfile(profileObject)).resolves.toEqual(returnValue)
  expect(mockFn).toHaveBeenCalledWith(parameters, options)

  // failure case
  returnValue = new Error('some API error')
  mockFn = sdkClient.sdk.mockRejected(apiFunction, returnValue)
  await expect(sdkClient.createProfile(profileObject)).rejects.toEqual(
    new Error(`Error while calling Adobe Campaign Standard createProfile - ${returnValue}`)
  )
  expect(mockFn).toHaveBeenCalledWith(parameters, options)
})
