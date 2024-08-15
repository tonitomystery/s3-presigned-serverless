<!--
title: 'AWS Pre-Signed URL Generator in NodeJS'
description: 'This template demonstrates how to create a simple HTTP API that generates pre-signed URLs using AWS Lambda and API Gateway with the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework - AWS Pre-Signed URL Generator

This template demonstrates how to create a simple HTTP API using Node.js on AWS Lambda to generate pre-signed URLs for uploading files to an S3 bucket. The API is managed by API Gateway and deployed using the Serverless Framework.

## Features

- **Generate Pre-Signed URLs**: Securely upload files directly to S3 using pre-signed URLs.
- **Serverless Deployment**: Easily deploy and manage the API using the Serverless Framework.
- **AWS Integration**: Leverage AWS Lambda, API Gateway, and S3 services.

## Usage

### Deployment

To deploy the API, run the following command:

```bash
serverless deploy
