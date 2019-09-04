<!--
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
-->

[![Version](https://img.shields.io/npm/v/@adobe/adobeio-cna-core-campaign-standard.svg)](https://npmjs.org/package/@adobe/adobeio-cna-core-campaign-standard)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/adobeio-cna-core-campaign-standard.svg)](https://npmjs.org/package/@adobe/adobeio-cna-core-campaign-standard)
[![Build Status](https://travis-ci.com/adobe/adobeio-cna-core-campaign-standard.svg?branch=master)](https://travis-ci.com/adobe/adobeio-cna-core-campaign-standard)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/adobeio-cna-core-campaign-standard.svg)](https://greenkeeper.io/)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/adobeio-cna-core-campaign-standard/master.svg?style=flat-square)](https://codecov.io/gh/adobe/adobeio-cna-core-campaign-standard/)

# Adobe I/O CNA Adobe Campaign Standard Core SDK
Javascript Core SDK wrapping [Adobe Campaign Standard APIs](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#introduction).

- [JSDoc (HTML)](https://opensource.adobe.com/adobeio-cna-core-campaign-standard/index.html)
- [JSDoc (Markdown)](./docs/SDK.md)


### Installing

```bash
$ npm install
```

### Usage

async/await (preferred)
```javascript
const sdk = require('@adobe/adobeio-cna-core-campaign-standard');

const main = async () => {
  // initialize sdk
  const acsClient = await sdk.init('<tenant>', 'x-api-key', '<valid auth token>')
  let result

  // call methods
  try {
    // get profiles by custom filters
    result = await acsClient.getAllProfiles({
      filters: [
        'byLinkedin'
      ],
      hasCustomFilter: true
    })
    console.log(result)

    // get a workflow
    result = await acsClient.getWorkflow('myWkfId')
    console.log(result)

  } catch (e) {
    console.error(e)
  }
}

main()
``` 

Promises
```javascript
const sdk = require('@adobe/adobeio-cna-core-campaign-standard');

// initialize sdk
const sdkPromise = sdk.init('<tenant>', 'x-api-key', '<valid auth token>')

sdkPromise
.then(acsClient => {
  return acsClient.getAllProfiles({
    filters: [
      'byLinkedin'
    ],
    hasCustomFilter: true
  })
})
.then(result => console.log(result))
.catch(err => console.error(err))

sdkPromise
.then(acsClient => acsClient.getWorkflow('myWkfId'))
.then(result => console.log(result))
.catch(err => console.error(err))
``` 

### Debug Logs

```bash
DEBUG=adobeio-cna-core-campaign-standard  <your_call_here>
```

Prepend the `DEBUG` environment variable and value to the call that invokes your function, on the command line. This should output a lot of debug data for your SDK calls.

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
