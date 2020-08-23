#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WebAppStack } from '../lib/webapp-stack';
import { EcrStack } from '../lib/ecr-stack';

const app = new cdk.App();
const profile = {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
};
new WebAppStack(app, 'WebAppStack', profile);
new EcrStack(app, 'EcrStack', profile);