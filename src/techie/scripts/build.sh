# zip up package
cd ../lambda
npm run zip-lambda

# upload to AWS lambda
LAMBDA_NAME='getExerciseRoutine'
echo -e "uploading new lambda $LAMBDA_NAME zip file ..."
aws lambda update-function-code --function-name $LAMBDA_NAME --zip-file fileb://lambda.zip --profile=techie
echo -e "lambda function $LAMBDA_NAME is updated."