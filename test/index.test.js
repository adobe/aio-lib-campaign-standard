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

const tenant = 'test-company'
const apiKey = 'test-apikey'
const token = 'test-token'

// /////////////////////////////////////////////

const createSwaggerOptions = ({ body } = {}) => {
  return createRequestOptions({ tenant, apiKey, token, body })
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

async function standardTest ({ apiName, args, parameters, options, successReturnValue = {} }) {
  const sdkClient = await createSdkClient()
  const [, apiFunction] = apiName.split('.')
  const fn = sdkClient[apiFunction]

  let mockFn

  // success case
  mockFn = sdkClient.sdk.mockResolved(apiName, successReturnValue)
  await expect(fn.apply(sdkClient, args)).resolves.toEqual(successReturnValue)
  expect(mockFn).toHaveBeenCalledWith(parameters, options)

  // failure case
  const err = new Error('some API error')
  mockFn = sdkClient.sdk.mockRejected(apiName, err)
  await expect(fn.apply(sdkClient, args)).rejects.toEqual(
    wrapGeneralError(apiFunction, err)
  )
  expect(mockFn).toHaveBeenCalledWith(parameters, options)
}

test('getAllProfiles', async () => {
  const args = []
  const parameters = {}
  const options = createSwaggerOptions()

  return standardTest({
    apiName: 'profile.getAllProfiles',
    args,
    parameters,
    options
  })
})

test('createProfile', async () => {
  const profileObject = { firstName: 'Jack', lastName: 'Smith', email: 'foo@bar.com' }
  const args = [profileObject]
  const parameters = {}
  const options = createSwaggerOptions({ body: profileObject })

  return standardTest({
    apiName: 'profile.createProfile',
    args,
    parameters,
    options
  })
})

test('updateProfile', async () => {
  const pkey = '@agsagasgasgasgasg313'
  const profileObject = { firstName: 'Jack', lastName: 'Smith', email: 'foo@bar.com' }
  const args = [pkey, profileObject]
  const parameters = { PROFILE_PKEY: pkey }
  const options = createSwaggerOptions({ body: profileObject })

  return standardTest({
    apiName: 'profile.updateProfile',
    args,
    parameters,
    options
  })
})
