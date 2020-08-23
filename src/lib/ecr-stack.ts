import * as cdk from '@aws-cdk/core';
import * as ecr from '@aws-cdk/aws-ecr';

export class EcrStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        
        // ECR
        const ecrs = new ecr.Repository(this, 'MicroservicesECR', {
            repositoryName: 'service1',
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });
    }
}