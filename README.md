# Pwnppeteer - Necrobrowser Lambda implementation

## Pre-requisite

[serverless](https://serverless.com/) is used to simplify the deployment on AWS

[chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda) is Chromium
Binary for AWS Lambda and Google Cloud Functions. This package is versioned
based on the underlying puppeteer minor version.

[aws-sdk](https://www.npmjs.com/package/aws-sdk) is used to upload result on s3
bucket.

## Install

You can install _serverless_ globally or for this project up to you.

```bash
 # Install the serverless cli
npm install -g serverless
```

```bash
# Or, update the serverless cli from a previous version
npm update -g serverless
```

Clone this repo and then install _chrome-aws-lambda_

```bash 
npm install chrome-aws-lambda --save-prod
```

Install also _puppeteer_ version base on the chrome-aws-lambda [version](https://github.com/alixaxel/chrome-aws-lambda#versioning)

```bash
npm install puppeteer-core@3.1.* --save-prod
```

_aws-sdk_ package to play with s3 bucket:

```bash
npm install aws-sdk --save-prod
```

and finally if you want to run it locally for testing you can add
_serverless-offline_ plugin

```bash
npm install serverless-offline --save-dev
```

## Run serverless

Execute locally serverless lambda:

```bash
sls offline
```

Deploy Lambda: 

```bash
sls deploy 
```

