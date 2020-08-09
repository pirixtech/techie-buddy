#!/usr/bin/env bash

set -eox pipefail

# convert yaml into DynamoDB compatible JSON format
# TODO: fix yaml to json conversion
# yq -r routines.yaml

aws dynamodb batch-write-item --request-items file://../resources/routines.json