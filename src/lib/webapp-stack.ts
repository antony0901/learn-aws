import * as cdk from '@aws-cdk/core';
import * as s3 from  '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import { BucketEncryption } from '@aws-cdk/aws-s3';

export class WebAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3
    const bucket = new s3.Bucket(this, 'CreateReactAppBucket', {
      encryption: BucketEncryption.KMS,
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    });

    // deployment
    const src = new s3Deployment.BucketDeployment(this, 'DeployCRA', {
      sources: [s3Deployment.Source.asset('../reactapp/build')],
      destinationBucket: bucket
    });

    // Cloudfont
    const cf = new cloudfront.CloudFrontWebDistribution(this, 'CDKCRAStatisDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket
          },
          behaviors: [{isDefaultBehavior: true}]
        }
      ]
    });
  }
}
