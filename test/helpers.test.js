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

const { requestInterceptor, responseInterceptor, createRequestOptions } = require('../src/helpers')

test('createRequestOptions', () => {
  const tenantId = 'my-tenant'
  const apiKey = 'my-api-key'
  const accessToken = 'my-token'

  const options = createRequestOptions({
    tenantId,
    apiKey,
    accessToken
  })

  expect(options).toEqual({
    requestBody: {},
    securities: {
      authorized: {
        BearerAuth: { value: accessToken },
        ApiKeyAuth: { value: apiKey }
      }
    },
    serverVariables: {
      ORGANIZATION: tenantId
    }
  })
})

test('requestInterceptor', () => {
  const req = {}
  expect(requestInterceptor(req)).toEqual(req)
})

test('responseInterceptor', () => {
  let res

  res = { ok: true, text: '{}' }
  expect(responseInterceptor(res)).toEqual(res)
  res = { ok: false, text: '{}' }
  expect(responseInterceptor(res)).toEqual(res)
})
