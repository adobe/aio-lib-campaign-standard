# Adobe I/O - Campaign Standard E2E Tests

## Requirements

To run the e2e test you'll need these env variables set:
  1. `CAMPAIGN_STANDARD_TENANT_ID`
  2. `CAMPAIGN_STANDARD_API_KEY`
  3. `CAMPAIGN_STANDARD_ACCESS_TOKEN`

## Run

`npm run e2e`

## Test overview

The tests connect to an actual Adobe Campaign Standard instance, and cover expected API responses (200 success, 401, etc) only and do not test actual returned values.

The tests cover:

1. Malformed tenant id, api key or access token
1. `read` APIs
2. Custom Resource APIs