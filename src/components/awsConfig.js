import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  },
});

export const s3 = new AWS.S3();
