<a name="module_@adobe/adobeio-cna-core-campaign-standard"></a>

## @adobe/adobeio-cna-core-campaign-standard
Adobe Campaign Standard Core SDK


* [@adobe/adobeio-cna-core-campaign-standard](#module_@adobe/adobeio-cna-core-campaign-standard)
    * _static_
        * [.init(tenantId, apiKey, accessToken)](#module_@adobe/adobeio-cna-core-campaign-standard.init) ⇒ <code>CampaignStandardCoreAPI</code>
    * _inner_
        * [~CampaignStandardCoreAPI](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)
            * [.tenantId](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+tenantId)
            * [.apiKey](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+apiKey)
            * [.accessToken](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+accessToken)
            * [.init(tenantId, apiKey, accessToken)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+init)
            * [.getAllProfiles([parameters])](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getAllProfiles)
            * [.createProfile(profileObject)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+createProfile)
            * [.updateProfile(profilePKey, profileObject)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+updateProfile)
            * [.getProfile(profilePKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getProfile)
            * [.getAllServices([parameters])](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getAllServices)
            * [.createService(serviceObject)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+createService)
            * [.getService(servicePKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getService)
            * [.getHistoryOfProfile(profilePKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getHistoryOfProfile)
            * [.getMetadataForResource(resource)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getMetadataForResource)
            * [.getCustomResources()](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getCustomResources)
            * [.createGDPRRequest(gdprRequest)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+createGDPRRequest)
            * [.getGDPRRequest()](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getGDPRRequest)
            * [.getGDPRDataFile(privacyRequestDataUrl, requestInternalName)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getGDPRDataFile)
            * [.sendTransactionalEvent(eventId, eventBody)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+sendTransactionalEvent)
            * [.getTransactionalEvent(eventId, eventPKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getTransactionalEvent)
            * [.getWorkflow(workflowId)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getWorkflow)
            * [.triggerSignalActivity(workflowTriggerUrl, [workflowParameters])](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+triggerSignalActivity)
            * [.controlWorkflow(workflowId, command)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+controlWorkflow)
            * [.getAllOrgUnits([parameters])](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getAllOrgUnits)
            * [.getProfileWithOrgUnit(profilePKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getProfileWithOrgUnit)
            * [.updateProfileOrgUnit(profilePKey, orgUnitPKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+updateProfileOrgUnit)
            * [.updateOrgUnit(orgUnitPKey, orgUnitObject)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+updateOrgUnit)
            * [.postDataToUrl(url, body)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+postDataToUrl)
            * [.getDataFromRelativeUrl(relativeUrl)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getDataFromRelativeUrl)

<a name="module_@adobe/adobeio-cna-core-campaign-standard.init"></a>

### @adobe/adobeio-cna-core-campaign-standard.init(tenantId, apiKey, accessToken) ⇒ <code>CampaignStandardCoreAPI</code>
Initializes a CampaignStandardCoreAPI object and returns it.

**Kind**: static method of [<code>@adobe/adobeio-cna-core-campaign-standard</code>](#module_@adobe/adobeio-cna-core-campaign-standard)  

| Param | Type | Description |
| --- | --- | --- |
| tenantId | <code>string</code> | the tenant id (your personal organization in Campaign Standard) |
| apiKey | <code>string</code> | the API key for your Adobe I/O Campaign Standard Integration |
| accessToken | <code>string</code> | the access token for your Adobe I/O Campaign Standard Integration |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI"></a>

### @adobe/adobeio-cna-core-campaign-standard~CampaignStandardCoreAPI
Wrapper for the Adobe Campaign Standard REST API.

**Kind**: inner class of [<code>@adobe/adobeio-cna-core-campaign-standard</code>](#module_@adobe/adobeio-cna-core-campaign-standard)  

* [~CampaignStandardCoreAPI](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)
    * [.tenantId](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+tenantId)
    * [.apiKey](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+apiKey)
    * [.accessToken](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+accessToken)
    * [.init(tenantId, apiKey, accessToken)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+init)
    * [.getAllProfiles([parameters])](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getAllProfiles)
    * [.createProfile(profileObject)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+createProfile)
    * [.updateProfile(profilePKey, profileObject)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+updateProfile)
    * [.getProfile(profilePKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getProfile)
    * [.getAllServices([parameters])](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getAllServices)
    * [.createService(serviceObject)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+createService)
    * [.getService(servicePKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getService)
    * [.getHistoryOfProfile(profilePKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getHistoryOfProfile)
    * [.getMetadataForResource(resource)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getMetadataForResource)
    * [.getCustomResources()](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getCustomResources)
    * [.createGDPRRequest(gdprRequest)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+createGDPRRequest)
    * [.getGDPRRequest()](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getGDPRRequest)
    * [.getGDPRDataFile(privacyRequestDataUrl, requestInternalName)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getGDPRDataFile)
    * [.sendTransactionalEvent(eventId, eventBody)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+sendTransactionalEvent)
    * [.getTransactionalEvent(eventId, eventPKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getTransactionalEvent)
    * [.getWorkflow(workflowId)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getWorkflow)
    * [.triggerSignalActivity(workflowTriggerUrl, [workflowParameters])](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+triggerSignalActivity)
    * [.controlWorkflow(workflowId, command)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+controlWorkflow)
    * [.getAllOrgUnits([parameters])](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getAllOrgUnits)
    * [.getProfileWithOrgUnit(profilePKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getProfileWithOrgUnit)
    * [.updateProfileOrgUnit(profilePKey, orgUnitPKey)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+updateProfileOrgUnit)
    * [.updateOrgUnit(orgUnitPKey, orgUnitObject)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+updateOrgUnit)
    * [.postDataToUrl(url, body)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+postDataToUrl)
    * [.getDataFromRelativeUrl(relativeUrl)](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getDataFromRelativeUrl)

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+tenantId"></a>

#### campaignStandardCoreAPI.tenantId
the tenant id (your personal organization in Campaign Standard)

**Kind**: instance property of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+apiKey"></a>

#### campaignStandardCoreAPI.apiKey
the api key from your Adobe I/O Campaign Standard integration

**Kind**: instance property of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+accessToken"></a>

#### campaignStandardCoreAPI.accessToken
the access token from your Adobe I/O Campaign Standard integration

**Kind**: instance property of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+init"></a>

#### campaignStandardCoreAPI.init(tenantId, apiKey, accessToken)
Initializes the object.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
**Throws**:

- <code>Error</code> when any of the arguments tenantId, apiKey, or accessToken is missing


| Param | Type | Description |
| --- | --- | --- |
| tenantId | <code>string</code> | the tenant id (your personal organization in Campaign Standard) |
| apiKey | <code>string</code> | the API key for your Adobe I/O Campaign Standard Integration |
| accessToken | <code>string</code> | the access token for your Adobe I/O Campaign Standard Integration |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getAllProfiles"></a>

#### campaignStandardCoreAPI.getAllProfiles([parameters])
Get all Profile records

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
**See**: getMetadataForResource  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [parameters] | <code>Object</code> | <code>{}</code> | parameters to pass |
| [parameters.filters] | <code>Array</code> | <code>[]</code> | apply the filters to the results. List of filters for a resource can be retrieved via a getMetadataForResource call |
| [parameters.hasCustomFilter] | <code>Boolean</code> | <code>false</code> | set to true if you have a custom filter. Defaults to false. |
| [parameters.lineCount] | <code>integer</code> | <code>25</code> | limit the number of records to return (default is 25) |
| [parameters.order] | <code>string</code> |  | the field to order your records by (see the fields of a [Profile](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#profile)) |
| [parameters.descendingSort] | <code>boolean</code> | <code>false</code> | set to true to get results in descending order (default is ascending) |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+createProfile"></a>

#### campaignStandardCoreAPI.createProfile(profileObject)
Create a Profile record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profileObject | <code>Object</code> | see [profile properties](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#profile) |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+updateProfile"></a>

#### campaignStandardCoreAPI.updateProfile(profilePKey, profileObject)
Update a Profile record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profilePKey | <code>string</code> | the PKey property of a Profile record |
| profileObject | <code>Object</code> | see [profile properties](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#profile). Only set the properties you want to update. |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getProfile"></a>

#### campaignStandardCoreAPI.getProfile(profilePKey)
Get a Profile record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profilePKey | <code>string</code> | the PKey property of a Profile record |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getAllServices"></a>

#### campaignStandardCoreAPI.getAllServices([parameters])
Get all Service records

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
**See**: getMetadataForResource  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [parameters] | <code>Object</code> | <code>{}</code> | parameters to pass |
| [parameters.filters] | <code>Array</code> | <code>[]</code> | apply the filters to the results. List of filters for a resource can be retrieved via a getMetadataForResource call |
| [parameters.hasCustomFilter] | <code>Boolean</code> | <code>false</code> | set to true if you have a custom filter. Defaults to false. |
| [parameters.lineCount] | <code>integer</code> | <code>25</code> | limit the number of records to return (default is 25) |
| [parameters.order] | <code>string</code> |  | the field to order your records by (see the fields of a [Service](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#service)) |
| [parameters.descendingSort] | <code>descendingSort</code> | <code>false</code> | set to true to get results in descending order (default is ascending) |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+createService"></a>

#### campaignStandardCoreAPI.createService(serviceObject)
Create a Service record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| serviceObject | <code>Object</code> | see [service properties](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#service) |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getService"></a>

#### campaignStandardCoreAPI.getService(servicePKey)
Get a Service record

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| servicePKey | <code>string</code> | the PKey property of a Service record |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getHistoryOfProfile"></a>

#### campaignStandardCoreAPI.getHistoryOfProfile(profilePKey)
Get the marketing history of a Profile

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profilePKey | <code>string</code> | the PKey property of a Profile record |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getMetadataForResource"></a>

#### campaignStandardCoreAPI.getMetadataForResource(resource)
Get the metadata information for a resource.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | one of profile, service, history, orgUnitBase |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getCustomResources"></a>

#### campaignStandardCoreAPI.getCustomResources()
Get all the custom resource collections linked to the Profile table.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+createGDPRRequest"></a>

#### campaignStandardCoreAPI.createGDPRRequest(gdprRequest)
Create a new GDPR request.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| gdprRequest | <code>Object</code> | see [the properties](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#create-a-new-gdpr-request) that are needed. |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getGDPRRequest"></a>

#### campaignStandardCoreAPI.getGDPRRequest()
Get data about the current GDPR request.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getGDPRDataFile"></a>

#### campaignStandardCoreAPI.getGDPRDataFile(privacyRequestDataUrl, requestInternalName)
Get the GDPR data file.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
**See**: getGDPRRequest  

| Param | Type | Description |
| --- | --- | --- |
| privacyRequestDataUrl | <code>string</code> | this is acquired from a getGDPRRequest call |
| requestInternalName | <code>string</code> | the request internal name |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+sendTransactionalEvent"></a>

#### campaignStandardCoreAPI.sendTransactionalEvent(eventId, eventBody)
Send a transactional event.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>string</code> | the type of event you want to send. This depends on the [event definition](https://docs.adobe.com/content/help/en/campaign-standard/using/administrating/configuring-channels/configuring-transactional-messaging.html). |
| eventBody | <code>Object</code> | the event data to send. This depends on the [event definition](https://docs.adobe.com/content/help/en/campaign-standard/using/administrating/configuring-channels/configuring-transactional-messaging.html). |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getTransactionalEvent"></a>

#### campaignStandardCoreAPI.getTransactionalEvent(eventId, eventPKey)
Gets data about a transactional event (status, properties)

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
**See**: sendTransactionalEvent  

| Param | Type | Description |
| --- | --- | --- |
| eventId | <code>string</code> | the type of event you want to send |
| eventPKey | <code>string</code> | the PKey of an event (you get this from a sendTransactionalEvent call) |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getWorkflow"></a>

#### campaignStandardCoreAPI.getWorkflow(workflowId)
Gets the properties of a workflow.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| workflowId | <code>string</code> | the id of the workflow |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+triggerSignalActivity"></a>

#### campaignStandardCoreAPI.triggerSignalActivity(workflowTriggerUrl, [workflowParameters])
Trigger a workflow.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
**See**: getWorkflow  

| Param | Type | Description |
| --- | --- | --- |
| workflowTriggerUrl | <code>string</code> | the trigger url for a workflow. You can get this from a call to getWorkflow |
| [workflowParameters] | <code>Object</code> | workflow parameters object. see the payload in the [docs](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#triggering-a-signal-activity) |
| workflowParameters.source | <code>string</code> | the triggering request source |
| workflowParameters.parameters | <code>Object</code> | the parameters to send to the workflow (paramater name, and parameter value pairs) |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+controlWorkflow"></a>

#### campaignStandardCoreAPI.controlWorkflow(workflowId, command)
Controls execution of a workflow.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| workflowId | <code>string</code> | the id of the workflow |
| command | <code>string</code> | the command to execute for the workflow. one of start, pause, resume, stop |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getAllOrgUnits"></a>

#### campaignStandardCoreAPI.getAllOrgUnits([parameters])
Get all available orgUnits

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  
**See**: getMetadataForResource  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [parameters] | <code>Object</code> | <code>{}</code> | parameters to pass |
| [parameters.filters] | <code>Array</code> | <code>[]</code> | apply the filters to the results. List of filters for a resource can be retrieved via a getMetadataForResource call |
| [parameters.lineCount] | <code>integer</code> | <code>25</code> | limit the number of records to return (default is 25) |
| [parameters.order] | <code>string</code> |  | the field to order your records by (see the fields of a [OrgUnitBase](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#orgunitbase)) |
| [parameters.descendingSort] | <code>descendingSort</code> | <code>false</code> | set to true to get results in descending order (default is ascending) |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getProfileWithOrgUnit"></a>

#### campaignStandardCoreAPI.getProfileWithOrgUnit(profilePKey)
Gets a Profile record (with it's orgUnit property)

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profilePKey | <code>string</code> | the PKey property of a Profile record |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+updateProfileOrgUnit"></a>

#### campaignStandardCoreAPI.updateProfileOrgUnit(profilePKey, orgUnitPKey)
Update the orgUnit of a Profile

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| profilePKey | <code>string</code> | the PKey property of a Profile record |
| orgUnitPKey | <code>string</code> | the PKey property of a OrgUnitBase record |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+updateOrgUnit"></a>

#### campaignStandardCoreAPI.updateOrgUnit(orgUnitPKey, orgUnitObject)
Update the properties of an OrgUnitBase.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| orgUnitPKey | <code>string</code> | the PKey property of a OrgUnitBase record |
| orgUnitObject | <code>Object</code> | see [orgUnitBase properties](https://docs.campaign.adobe.com/doc/standard/en/api/ACS_API.html#orgunitbase). Only set the properties you want to update. |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+postDataToUrl"></a>

#### campaignStandardCoreAPI.postDataToUrl(url, body)
Post to an absolute url.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | the url to POST to |
| body | <code>Object</code> | the POST body |

<a name="module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI+getDataFromRelativeUrl"></a>

#### campaignStandardCoreAPI.getDataFromRelativeUrl(relativeUrl)
Gets data from a relative url. Helper function.

**Kind**: instance method of [<code>CampaignStandardCoreAPI</code>](#module_@adobe/adobeio-cna-core-campaign-standard..CampaignStandardCoreAPI)  

| Param | Type | Description |
| --- | --- | --- |
| relativeUrl | <code>string</code> | the relative url (returned from some ACS API calls) |

