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

const tenant = 'test-company'
const apiKey = 'test-apikey'
const token = 'test-token'

const createSwaggerOptions = (body = {}, query = {}) => {
  return {
    requestBody: body,
    securities: {
      authorized: {
        BearerAuth: { value: token },
        ApiKeyAuth: { value: apiKey }
      }
    },
    serverVariables: {
      ORGANIZATION: tenant
    }
  }
}

test('sdk init test', async () => {
  const sdkClient = await sdk.init(tenant, apiKey, token)

  expect(sdkClient.tenant).toBe(tenant)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.token).toBe(token)
})

test('getAllProfiles', async () => {
  const sdkClient = await sdk.init(tenant, apiKey, token)

  let returnValue
  let mockFn
  const parameters = {}
  const options = createSwaggerOptions()

  // success case
  returnValue = {}
  mockFn = sdkClient.sdk.mockResolved('profile.getAllProfiles', returnValue)
  await expect(sdkClient.getAllProfiles()).resolves.toEqual(returnValue)
  expect(mockFn).toHaveBeenCalledWith(parameters, options)

  // failure case
  returnValue = new Error('some API error')
  mockFn = sdkClient.sdk.mockRejected('profile.getAllProfiles', returnValue)
  await expect(sdkClient.getAllProfiles()).rejects.toEqual(
    new Error(`Error while calling Adobe Campaign Standard getAllProfiles - ${returnValue}`)
  )
  expect(mockFn).toHaveBeenCalledWith(parameters, options)
})
