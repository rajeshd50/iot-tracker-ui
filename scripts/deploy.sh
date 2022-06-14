#!/usr/bin/env bash

if [ ! -f .env.production ]
then
  echo "file not present"
  exit
fi

export $(cat .env.production | xargs)

if [ -z "$BUCKET_NAME" ]
then
  echo "BUCKET_NAME not present"
  exit
fi

if [ -z "$DISTRIBUTION_ID" ]
then
  echo "DISTRIBUTION_ID not present"
  exit
fi

echo "-- Build --"
npm run build

echo "-- Sync --"
aws s3 sync build s3://$BUCKET_NAME --profile tracker

echo "-- Invalidate previous --"
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --no-cli-pager --profile tracker

echo "-- Done --"