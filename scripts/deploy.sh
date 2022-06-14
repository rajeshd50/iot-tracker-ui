#!/usr/bin/env bash
BUCKET_NAME='vehicle-tracker-ui'

DISTRIBUTION_ID=$1

echo "-- Build --"
npm run build

echo "-- Sync --"
aws s3 sync build s3://$BUCKET_NAME --profile tracker

echo "-- Invalidate previous --"
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --no-cli-pager --profile tracker

echo "-- Done --"