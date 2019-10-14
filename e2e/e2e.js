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

// load .env values in the e2e folder, if any
require('dotenv').config({ path: path.join(__dirname, '.env') })

let sdkClient = {}
const tenantId = process.env.CAMPAIGN_STANDARD_TENANT_ID
const apiKey = process.env.CAMPAIGN_STANDARD_API_KEY
const accessToken = process.env.CAMPAIGN_STANDARD_ACCESS_TOKEN

test('sdk init test', async () => {
  sdkClient = await sdk.init(tenantId, apiKey, accessToken)

  expect(sdkClient.tenantId).toBe(tenantId)
  expect(sdkClient.apiKey).toBe(apiKey)
  expect(sdkClient.accessToken).toBe(accessToken)
})

test('test getAllProfiles', async () => {
  // check success response
  const res = await sdkClient.getAllProfiles({ limit: 5, page: 0 })
  expect(res.ok).toBeTruthy()
})

test('test getAllServices', async () => {
  // check success response
  const res = await sdkClient.getAllServices({ limit: 5, page: 0 })
  expect(res.ok).toBeTruthy()
})

test('test getAllOrgUnits', async () => {
  // check success response
  const res = await sdkClient.getAllOrgUnits({ limit: 5, page: 0 })
  expect(res.ok).toBeTruthy()
})

test('test getCustomResources', async () => {
  // check success response
  const res = await sdkClient.getCustomResources({ limit: 5, page: 0 })
  expect(res.ok).toBeTruthy()
})
