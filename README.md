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

[![Version](https://img.shields.io/npm/v/@adobe/aio-lib-campaign-standard.svg)](https://npmjs.org/package/@adobe/aio-lib-campaign-standard)
[![Downloads/week](https://img.shields.io/npm/dw/@adobe/aio-lib-campaign-standard.svg)](https://npmjs.org/package/@adobe/aio-lib-campaign-standard)
[![Build Status](https://travis-ci.com/adobe/aio-lib-campaign-standard.svg?branch=master)](https://travis-ci.com/adobe/aio-lib-campaign-standard)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/aio-lib-campaign-standard.svg)](https://greenkeeper.io/)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/adobe/aio-lib-campaign-standard/master.svg?style=flat-square)](https://codecov.io/gh/adobe/aio-lib-campaign-standard/)

# Adobe I/O Adobe Campaign Standard SDK
Javascript SDK wrapping the [Adobe Campaign Standard APIs](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#introduction).

### Installing

```bash
$ npm install
```

### Usage
1) Initialize the SDK

```javascript
const sdk = require('@adobe/aio-lib-campaign-standard')

async function sdkTest() {
  //initialize sdk
  const campaignStandardClient = await sdk.init('<tenant>', 'x-api-key', '<valid auth token>')
}
```

Init method returns an instance of the Class [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)

2) Call methods using the initialized SDK

```javascript
const sdk = require('@adobe/aio-lib-campaign-standard')

async function sdkTest() {
  //initialize sdk
  const campaignStandardClient = await sdk.init('<tenant>', 'x-api-key', '<valid auth token>')

  // call methods
  try {
    // get profiles by custom filters
    result = await campaignStandardClient.getAllProfiles({
      filters: [
        'byCRMId'
      ],
      hasCustomFilter: true
    })
    console.log(result)

    // get a workflow
    result = await campaignStandardClient.getWorkflow('myWkfId')
    console.log(result)

  } catch (e) {
    console.error(e)
  }
}
```
All methods available under the SDK are documented [<code>here</code>](#CampaignStandardCoreAPI)

## Classes

<dl>
<dt><a href="#CampaignStandardCoreAPI">CampaignStandardCoreAPI</a></dt>
<dd><p>This class provides methods to call Adobe Campaign Standard APIs.
Before calling any method initialize the instance by calling the <code>init</code> method on it
with valid values for tenantId, apiKey and accessToken</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#init">init(tenantId, apiKey, accessToken)</a> ⇒ <code><a href="#CampaignStandardCoreAPI">Promise.&lt;CampaignStandardCoreAPI&gt;</a></code></dt>
<dd><p>Returns a Promise that resolves with a new CampaignStandardCoreAPI object.</p>
</dd>
</dl>

<a name="CampaignStandardCoreAPI"></a>

## CampaignStandardCoreAPI
This class provides methods to call Adobe Campaign Standard APIs.
Before calling any method initialize the instance by calling the `init` method on it
with valid values for tenantId, apiKey and accessToken

**Kind**: global class  

* [CampaignStandardCoreAPI](#CampaignStandardCoreAPI)
    * [.tenantId](#CampaignStandardCoreAPI+tenantId)
    * [.apiKey](#CampaignStandardCoreAPI+apiKey)
    * [.accessToken](#CampaignStandardCoreAPI+accessToken)
    * [.init(tenantId, apiKey, accessToken)](#CampaignStandardCoreAPI+init) ⇒ [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)
    * [.getAllProfiles([parameters])](#CampaignStandardCoreAPI+getAllProfiles)
    * [.createProfile(profileObject)](#CampaignStandardCoreAPI+createProfile)
    * [.updateProfile(profilePKey, profileObject)](#CampaignStandardCoreAPI+updateProfile)
    * [.getProfile(profilePKey)](#CampaignStandardCoreAPI+getProfile)
    * [.getAllServices([parameters])](#CampaignStandardCoreAPI+getAllServices)
    * [.createService(serviceObject)](#CampaignStandardCoreAPI+createService)
    * [.getService(servicePKey)](#CampaignStandardCoreAPI+getService)
    * [.getHistoryOfProfile(profilePKey)](#CampaignStandardCoreAPI+getHistoryOfProfile)
    * [.getMetadataForResource(resource)](#CampaignStandardCoreAPI+getMetadataForResource)
    * [.getCustomResources()](#CampaignStandardCoreAPI+getCustomResources)
    * [.createGDPRRequest(gdprRequest)](#CampaignStandardCoreAPI+createGDPRRequest)
    * [.getGDPRRequest()](#CampaignStandardCoreAPI+getGDPRRequest)
    * [.getGDPRDataFile(privacyRequestDataUrl, requestInternalName)](#CampaignStandardCoreAPI+getGDPRDataFile)
    * [.sendTransactionalEvent(eventId, eventBody)](#CampaignStandardCoreAPI+sendTransactionalEvent)
    * [.getTransactionalEvent(eventId, eventPKey)](#CampaignStandardCoreAPI+getTransactionalEvent)
    * [.getWorkflow(workflowId)](#CampaignStandardCoreAPI+getWorkflow)
    * [.triggerSignalActivity(workflowTriggerUrl, [workflowParameters])](#CampaignStandardCoreAPI+triggerSignalActivity)
    * [.controlWorkflow(workflowId, command)](#CampaignStandardCoreAPI+controlWorkflow)
    * [.getAllOrgUnits([parameters])](#CampaignStandardCoreAPI+getAllOrgUnits)
    * [.getProfileWithOrgUnit(profilePKey)](#CampaignStandardCoreAPI+getProfileWithOrgUnit)
    * [.updateProfileOrgUnit(profilePKey, orgUnitPKey)](#CampaignStandardCoreAPI+updateProfileOrgUnit)
    * [.updateOrgUnit(orgUnitPKey, orgUnitObject)](#CampaignStandardCoreAPI+updateOrgUnit)
    * [.postDataToUrl(url, body)](#CampaignStandardCoreAPI+postDataToUrl)
    * [.getDataFromRelativeUrl(relativeUrl)](#CampaignStandardCoreAPI+getDataFromRelativeUrl)
    * [.getAllCustomResources(customResource, [parameters])](#CampaignStandardCoreAPI+getAllCustomResources)
    * [.updateCustomResource(customResource, customResourcePKey, customResourceObject)](#CampaignStandardCoreAPI+updateCustomResource)
    * [.createCustomResource(customResource, customResourceObject)](#CampaignStandardCoreAPI+createCustomResource)
    * [.deleteCustomResource(customResource, customResourcePKey, customResourceObject)](#CampaignStandardCoreAPI+deleteCustomResource)

<a name="CampaignStandardCoreAPI+tenantId"></a>

### campaignStandardCoreAPI.tenantId
the tenant id (your personal organization in Campaign Standard)

**Kind**: instance property of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
<a name="CampaignStandardCoreAPI+apiKey"></a>

### campaignStandardCoreAPI.apiKey
the api key from your Adobe I/O Campaign Standard integration

**Kind**: instance property of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
<a name="CampaignStandardCoreAPI+accessToken"></a>

### campaignStandardCoreAPI.accessToken
the access token from your Adobe I/O Campaign Standard integration

**Kind**: instance property of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
<a name="CampaignStandardCoreAPI+init"></a>

### campaignStandardCoreAPI.init(tenantId, apiKey, accessToken) ⇒ [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)
Initializes this object.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| tenantId | <code>string</code> | the tenant id (your personal organization in Campaign Standard) |
| apiKey | <code>string</code> | the API key for your Adobe I/O Campaign Standard Integration |
| accessToken | <code>string</code> | the access token for your Adobe I/O Campaign Standard Integration |

<a name="CampaignStandardCoreAPI+getAllProfiles"></a>

### campaignStandardCoreAPI.getAllProfiles([parameters])
Get all Profile records

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
**See**: getMetadataForResource  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [parameters] | <code>Object</code> | <code>{}</code> | parameters to pass |
| [parameters.filters] | <code>Array</code> | <code>[]</code> | apply the filters to the results. List of filters for a resource can be retrieved via a getMetadataForResource call |
| [parameters.hasCustomFilter] | <code>Boolean</code> | <code>false</code> | set to true if you have a custom filter. Defaults to false. |
| [parameters.lineCount] | <code>integer</code> | <code>25</code> | limit the number of records to return (default is 25) |
| [parameters.order] | <code>string</code> |  | the field to order your records by (see the fields of a [Profile](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#profile)) |
| [parameters.descendingSort] | <code>boolean</code> | <code>false</code> | set to true to get results in descending order (default is ascending) |

<a name="CampaignStandardCoreAPI+createProfile"></a>

### campaignStandardCoreAPI.createProfile(profileObject)
Create a Profile record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profileObject | <code>Object</code> | see [profile properties](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#profile) |

<a name="CampaignStandardCoreAPI+updateProfile"></a>

### campaignStandardCoreAPI.updateProfile(profilePKey, profileObject)
Update a Profile record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profilePKey | <code>string</code> | the PKey property of a Profile record |
| profileObject | <code>Object</code> | see [profile properties](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#profile). Only set the properties you want to update. |

<a name="CampaignStandardCoreAPI+getProfile"></a>

### campaignStandardCoreAPI.getProfile(profilePKey)
Get a Profile record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profilePKey | <code>string</code> | the PKey property of a Profile record |

<a name="CampaignStandardCoreAPI+getAllServices"></a>

### campaignStandardCoreAPI.getAllServices([parameters])
Get all Service records

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
**See**: getMetadataForResource  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [parameters] | <code>Object</code> | <code>{}</code> | parameters to pass |
| [parameters.filters] | <code>Array</code> | <code>[]</code> | apply the filters to the results. List of filters for a resource can be retrieved via a getMetadataForResource call |
| [parameters.hasCustomFilter] | <code>Boolean</code> | <code>false</code> | set to true if you have a custom filter. Defaults to false. |
| [parameters.lineCount] | <code>integer</code> | <code>25</code> | limit the number of records to return (default is 25) |
| [parameters.order] | <code>string</code> |  | the field to order your records by (see the fields of a [Service](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#service)) |
| [parameters.descendingSort] | <code>descendingSort</code> | <code>false</code> | set to true to get results in descending order (default is ascending) |

<a name="CampaignStandardCoreAPI+createService"></a>

### campaignStandardCoreAPI.createService(serviceObject)
Create a Service record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| serviceObject | <code>Object</code> | see [service properties](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#service) |

<a name="CampaignStandardCoreAPI+getService"></a>

### campaignStandardCoreAPI.getService(servicePKey)
Get a Service record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| servicePKey | <code>string</code> | the PKey property of a Service record |

<a name="CampaignStandardCoreAPI+getHistoryOfProfile"></a>

### campaignStandardCoreAPI.getHistoryOfProfile(profilePKey)
Get the marketing history of a Profile

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profilePKey | <code>string</code> | the PKey property of a Profile record |

<a name="CampaignStandardCoreAPI+getMetadataForResource"></a>

### campaignStandardCoreAPI.getMetadataForResource(resource)
Get the metadata information for a resource.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | one of profile, service, history |

<a name="CampaignStandardCoreAPI+getCustomResources"></a>

### campaignStandardCoreAPI.getCustomResources()
Get all the custom resource collections linked to the Profile table.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
<a name="CampaignStandardCoreAPI+createGDPRRequest"></a>

### campaignStandardCoreAPI.createGDPRRequest(gdprRequest)
Create a new GDPR request.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| gdprRequest | <code>Object</code> | see [the properties](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#create-a-new-gdpr-request) that are needed. |

<a name="CampaignStandardCoreAPI+getGDPRRequest"></a>

### campaignStandardCoreAPI.getGDPRRequest()
Get data about the current GDPR request.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
<a name="CampaignStandardCoreAPI+getGDPRDataFile"></a>

### campaignStandardCoreAPI.getGDPRDataFile(privacyRequestDataUrl, requestInternalName)
Get the GDPR data file.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
**See**: getGDPRRequest  

| Param | Type | Description |
| --- | --- | --- |
| privacyRequestDataUrl | <code>string</code> | this is acquired from a getGDPRRequest call |
| requestInternalName | <code>string</code> | the request internal name |

<a name="CampaignStandardCoreAPI+sendTransactionalEvent"></a>

### campaignStandardCoreAPI.sendTransactionalEvent(eventId, eventBody)
Send a transactional event.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>string</code> | the type of event you want to send. This depends on the [event definition](https://docs.adobe.com/content/help/en/campaign-standard/using/administrating/configuring-channels/configuring-transactional-messaging.html). |
| eventBody | <code>Object</code> | the event data to send. This depends on the [event definition](https://docs.adobe.com/content/help/en/campaign-standard/using/administrating/configuring-channels/configuring-transactional-messaging.html). |

<a name="CampaignStandardCoreAPI+getTransactionalEvent"></a>

### campaignStandardCoreAPI.getTransactionalEvent(eventId, eventPKey)
Gets data about a transactional event (status, properties)

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
**See**: sendTransactionalEvent  

| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>string</code> | the type of event you want to send |
| eventPKey | <code>string</code> | the PKey of an event (you get this from a sendTransactionalEvent call) |

<a name="CampaignStandardCoreAPI+getWorkflow"></a>

### campaignStandardCoreAPI.getWorkflow(workflowId)
Gets the properties of a workflow.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| workflowId | <code>string</code> | the id of the workflow |

<a name="CampaignStandardCoreAPI+triggerSignalActivity"></a>

### campaignStandardCoreAPI.triggerSignalActivity(workflowTriggerUrl, [workflowParameters])
Trigger a workflow.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
**See**: getWorkflow  

| Param | Type | Description |
| --- | --- | --- |
| workflowTriggerUrl | <code>string</code> | the trigger url for a workflow. You can get this from a call to getWorkflow |
| [workflowParameters] | <code>Object</code> | workflow parameters object. see the payload in the [docs](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#triggering-a-signal-activity) |
| workflowParameters.source | <code>string</code> | the triggering request source |
| workflowParameters.parameters | <code>Object</code> | the parameters to send to the workflow (paramater name, and parameter value pairs) |

<a name="CampaignStandardCoreAPI+controlWorkflow"></a>

### campaignStandardCoreAPI.controlWorkflow(workflowId, command)
Controls execution of a workflow.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| workflowId | <code>string</code> | the id of the workflow |
| command | <code>string</code> | the command to execute for the workflow. one of start, pause, resume, stop |

<a name="CampaignStandardCoreAPI+getAllOrgUnits"></a>

### campaignStandardCoreAPI.getAllOrgUnits([parameters])
Get all available orgUnits

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
**See**: getMetadataForResource  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [parameters] | <code>Object</code> | <code>{}</code> | parameters to pass |
| [parameters.filters] | <code>Array</code> | <code>[]</code> | apply the filters to the results. List of filters for a resource can be retrieved via a getMetadataForResource call |
| [parameters.lineCount] | <code>integer</code> | <code>25</code> | limit the number of records to return (default is 25) |
| [parameters.order] | <code>string</code> |  | the field to order your records by (see the fields of a [OrgUnitBase](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#orgunitbase)) |
| [parameters.descendingSort] | <code>descendingSort</code> | <code>false</code> | set to true to get results in descending order (default is ascending) |

<a name="CampaignStandardCoreAPI+getProfileWithOrgUnit"></a>

### campaignStandardCoreAPI.getProfileWithOrgUnit(profilePKey)
Gets a Profile record (with it's orgUnit property)

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profilePKey | <code>string</code> | the PKey property of a Profile record |

<a name="CampaignStandardCoreAPI+updateProfileOrgUnit"></a>

### campaignStandardCoreAPI.updateProfileOrgUnit(profilePKey, orgUnitPKey)
Update the orgUnit of a Profile

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profilePKey | <code>string</code> | the PKey property of a Profile record |
| orgUnitPKey | <code>string</code> | the PKey property of a OrgUnitBase record |

<a name="CampaignStandardCoreAPI+updateOrgUnit"></a>

### campaignStandardCoreAPI.updateOrgUnit(orgUnitPKey, orgUnitObject)
Update the properties of an OrgUnitBase.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| orgUnitPKey | <code>string</code> | the PKey property of a OrgUnitBase record |
| orgUnitObject | <code>Object</code> | see [orgUnitBase properties](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#orgunitbase). Only set the properties you want to update. |

<a name="CampaignStandardCoreAPI+postDataToUrl"></a>

### campaignStandardCoreAPI.postDataToUrl(url, body)
Post to an absolute url.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | the url to POST to |
| body | <code>Object</code> | the POST body |

<a name="CampaignStandardCoreAPI+getDataFromRelativeUrl"></a>

### campaignStandardCoreAPI.getDataFromRelativeUrl(relativeUrl)
Gets data from a relative url. Helper function.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| relativeUrl | <code>string</code> | the relative url (returned from some ACS API calls) |

<a name="CampaignStandardCoreAPI+getAllCustomResources"></a>

### campaignStandardCoreAPI.getAllCustomResources(customResource, [parameters])
Get all Custom Resource records

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  
**See**: getMetadataForResource  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| customResource | <code>string</code> |  | the custom resource to get records from |
| [parameters] | <code>Object</code> | <code>{}</code> | parameters to pass |
| [parameters.filters] | <code>Array</code> | <code>[]</code> | apply the filters to the results. List of filters for a resource can be retrieved via a getMetadataForResource call |
| [parameters.hasCustomFilter] | <code>Boolean</code> | <code>false</code> | set to true if you have a custom filter. Defaults to false. |
| [parameters.lineCount] | <code>integer</code> | <code>25</code> | limit the number of records to return (default is 25) |
| [parameters.order] | <code>string</code> |  | the field to order your records by (see the fields of a [Profile](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#profile)) |
| [parameters.descendingSort] | <code>boolean</code> | <code>false</code> | set to true to get results in descending order (default is ascending) |

<a name="CampaignStandardCoreAPI+updateCustomResource"></a>

### campaignStandardCoreAPI.updateCustomResource(customResource, customResourcePKey, customResourceObject)
Update a Custom Resource record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| customResource | <code>string</code> | the custom resource |
| customResourcePKey | <code>string</code> | the PKey property of a Custom Resource record |
| customResourceObject | <code>Object</code> | A Custom Resource object. Only set the properties you want to update. |

<a name="CampaignStandardCoreAPI+createCustomResource"></a>

### campaignStandardCoreAPI.createCustomResource(customResource, customResourceObject)
Create a Custom Resource record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| customResource | <code>string</code> | the custom resource |
| customResourceObject | <code>Object</code> | a Custom Resource object |

<a name="CampaignStandardCoreAPI+deleteCustomResource"></a>

### campaignStandardCoreAPI.deleteCustomResource(customResource, customResourcePKey, customResourceObject)
Delete a Custom Resource record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| customResource | <code>string</code> | the custom resource |
| customResourcePKey | <code>string</code> | the PKey property of a Custom Resource record |
| customResourceObject | <code>Object</code> | a Custom Resource object |

<a name="init"></a>

## init(tenantId, apiKey, accessToken) ⇒ [<code>Promise.&lt;CampaignStandardCoreAPI&gt;</code>](#CampaignStandardCoreAPI)
Returns a Promise that resolves with a new CampaignStandardCoreAPI object.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tenantId | <code>string</code> | the tenant id (your personal organization in Campaign Standard) |
| apiKey | <code>string</code> | the API key for your Adobe I/O Campaign Standard Integration |
| accessToken | <code>string</code> | the access token for your Adobe I/O Campaign Standard Integration |

### Debug Logs

```bash
LOG_LEVEL=debug <your_call_here>
```

Prepend the `LOG_LEVEL` environment variable and `debug` value to the call that invokes your function, on the command line. This should output a lot of debug data for your SDK calls.

### Contributing

Contributions are welcome! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

### Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
