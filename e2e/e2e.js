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

const sdk = require('../src/index')
const path = require('path')
const crypto = require('crypto')
const { codes } = require('../src/SDKErrors')

// load .env values in the e2e folder, if any
require('dotenv').config({ path: path.join(__dirname, '.env') })

let sdkClient = {}
const tenantId = process.env.CAMPAIGN_STANDARD_TENANT_ID
const apiKey = process.env.CAMPAIGN_STANDARD_API_KEY
const accessToken = process.env.CAMPAIGN_STANDARD_ACCESS_TOKEN

beforeAll(async () => {
  sdkClient = await sdk.init(tenantId, apiKey, accessToken)
})

test('sdk init test', async () => {
  expect(sdkClient.tenantId).toBe(tenantId)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.accessToken).toBe(accessToken)
})

test('test bad access token', async () => {
  const _sdkClient = await sdk.init(tenantId, apiKey, 'bad_access_token')
  const promise = _sdkClient.getAllProfiles()

  // just match the error message
  return expect(promise).rejects.toThrow('401')
})

test('test bad api key', async () => {
  const _sdkClient = await sdk.init(tenantId, 'bad_api_key', accessToken)
  const promise = _sdkClient.getAllProfiles()

  // just match the error message
  return expect(promise).rejects.toThrow('403')
})

test('test bad tenant id', async () => {
  const _sdkClient = await sdk.init('bad_tenant_id', apiKey, accessToken)
  const promise = _sdkClient.getAllProfiles()

  // just catch the general expected error. on cold start, it throws "Bad Request",
  // on subsequent warm starts, it throws a HTTP 500 error, so it is not consistent
  return expect(promise).rejects.toEqual(expect.any(codes.ERROR_GET_ALL_PROFILES))
})

test('test getAllProfiles API', async () => {
  // check success response
  const res = await sdkClient.getAllProfiles({ limit: 5, page: 0 })
  expect(res.ok).toBeTruthy()
})

test('test getAllServices API', async () => {
  // check success response
  const res = await sdkClient.getAllServices({ limit: 5, page: 0 })
  expect(res.ok).toBeTruthy()
})

test('test getAllOrgUnits API', async () => {
  // check success response
  const res = await sdkClient.getAllOrgUnits({ limit: 5, page: 0 })
  expect(res.ok).toBeTruthy()
})

test('test getMetadataForResource API', async () => {
  let res

  // check success responses
  res = await sdkClient.getMetadataForResource('profile')
  expect(res.ok).toBeTruthy()
  res = await sdkClient.getMetadataForResource('service')
  expect(res.ok).toBeTruthy()
  res = await sdkClient.getMetadataForResource('history')
  expect(res.ok).toBeTruthy()
})

test('test getCustomResources API', async () => {
  // check success response
  const res = await sdkClient.getCustomResources({ limit: 5, page: 0 })
  expect(res.ok).toBeTruthy()
})

test('test getAllCustomResources API', async () => {
  // create random string for custom resource (should 404 Not Found)
  const customResource = crypto.randomBytes(16).toString('hex')

  const promise = sdkClient.getAllCustomResources({ customResource })

  // just match the error message
  return expect(promise).rejects.toThrow('404')
})

test('test createCustomResource API', async () => {
  // create random string for custom resource (should 404 Not Found)
  const customResource = crypto.randomBytes(16).toString('hex')
  const customResourceObject = {}

  const promise = sdkClient.createCustomResource(customResource, customResourceObject)

  // just match the error message
  return expect(promise).rejects.toThrow('404')
})

test('test updateCustomResource API', async () => {
  // create random string for custom resource (should error on invalid pkey)
  const customResource = crypto.randomBytes(16).toString('hex')
  const customResourceObject = {}
  const customResourcePKey = '@gibberish' // not a valid PKey

  const promise = sdkClient.updateCustomResource(customResource, customResourceObject, customResourcePKey)

  // just match the error message
  return expect(promise).rejects.toThrow(`'${customResourcePKey}' is not a valid constant`)
})

test('test deleteCustomResource API', async () => {
  // create random string for custom resource (should 404 Not Found)
  const customResource = crypto.randomBytes(16).toString('hex')
  const customResourcePKey = '@gibberish' // not a valid PKey

  const promise = sdkClient.deleteCustomResource(customResource, customResourcePKey)

  // just match the error message
  return expect(promise).rejects.toThrow('404')
})

test('test createProfile, updateProfile, getProfile API', async () => {
  // create random string for name
  const randomString = crypto.randomBytes(4).toString('hex')
  const firstName = `ACSSDK_Test_First_${randomString}`
  const lastName = `ACSSDK_Test_Last_${randomString}`

  let res = await sdkClient.createProfile({
    email: `${firstName}@notanemail.net`,
    firstName: firstName,
    lastName: lastName
  })

  expect(res.status).toEqual(201)

  res = await sdkClient.updateProfile(res.body.PKey, {
    firstName: `UPDATED_${firstName}`
  })
  expect(res.status).toEqual(200)

  res = await sdkClient.getProfile(res.body.PKey)
  expect(res.status).toEqual(200)
})
