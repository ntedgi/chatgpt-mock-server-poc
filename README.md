# chatgpt-mock-server-poc

```js

function buildPrompt(spec,request,size) {
  return `
        your task is to be an api with this parameter definition: 
        ${JSON.stringify(spec)}
        that returns response with in json format
        the response format is json with data property
        you need to return json with realistic data for this GET request ${request}
        dont return more than ${size} items dont return code
    `;
}

```

spec example:
```json

[
  {
    "Name": "startDate",
    "Mandatory": "Yes",
    "Data type": "Date. String in the format: YYYY-MM-DD",
    "Description": "",
    "Possible values": ""
  },
  {
    "Name": "endDate",
    "Mandatory": "Yes",
    "Data type": "Date. String in the format: YYYY-MM-DD",
    "Description": "Must be within 3 months of the startDate parameter",
    "Possible values": ""
  },
  {
    "Name": "metrics",
    "Mandatory": "Yes",
    "Data type": "Comma-separated list of strings",
    "Description": "A list of metrics to be included in the response. The default is none",
    "Possible values": "impressions, clicks, completions, installs, spend"
  },
  {
    "Name": "breakdowns",
    "Mandatory": "No",
    "Data type": "Comma-separated list of strings",
    "Description": "A list of breakdowns by which the response data is returned. The default is none",
    "Possible values": "day, campaign, title, application, country, os,  deviceType, creative, adUnit"
  },
  {
    "Name": "format",
    "Mandatory": "No",
    "Data type": "String",
    "Description": "The format of the response. The default is JSON",
    "Possible values": "json | csv"
  },
  {
    "Name": "count",
    "Mandatory": "No",
    "Data type": "Integer",
    "Description": "The number of records to return in the response. The default is 10000 and the maximum is 250000",
    "Possible values": ""
  },
  {
    "Name": "campaignId",
    "Mandatory": "No",
    "Data type": "Comma-separated list of integers",
    "Description": "List of campaign IDs to filter",
    "Possible values": ""
  },
  {
    "Name": "bundleId",
    "Mandatory": "No",
    "Data type": "Comma-separated list of strings",
    "Description": "List of bundle IDs to filter",
    "Possible values": ""
  },
  {
    "Name": "creativeId",
    "Mandatory": "No",
    "Data type": "Comma-separated list of integers",
    "Description": "List of creative IDs to filter",
    "Possible values": ""
  },
  {
    "Name": "country",
    "Mandatory": "No",
    "Data type": "Comma-separated list of strings by ISO 3166-2",
    "Description": "List of countries to filter",
    "Possible values": ""
  },
  {
    "Name": "os",
    "Mandatory": "No",
    "Data type": "String",
    "Description": "Present data for this operating system only",
    "Possible values": "ios | android"
  },
  {
    "Name": "deviceType",
    "Mandatory": "No",
    "Data type": "String",
    "Description": "Present data for this device type only",
    "Possible values": "phone | tablet"
  },
  {
    "Name": "adUnit",
    "Mandatory": "No",
    "Data type": "String",
    "Description": "Present data for chosen ad units only",
    "Possible values": "rewardedVideo | interstitial | offerWall | banner "
  },
  {
    "Name": "order",
    "Mandatory": "No",
    "Data type": "String",
    "Description": "Order the results by breakdown / metric",
    "Possible values": "day | campaign | title | application | creative | country | os | impressions | clicks | completions | installs | spend"
  },
  {
    "Name": "direction",
    "Mandatory": "No",
    "Data type": "String",
    "Description": "Order by direction. Default is asc",
    "Possible values": "asc | desc"
  },
]
```
