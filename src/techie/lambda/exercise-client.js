var AWS = require('aws-sdk')
const random = require('random')
var docClient = new AWS.DynamoDB.DocumentClient()

AWS.config.update({
  region: 'us-east-1'
})

const getRoutineParams = (bodyArea, limit) => {
    return {
      TableName: 'techie-buddy',
      IndexName: 'body_area-duration-index',
      KeyConditionExpression: '#body = :bodyAreaValue AND #duration <= :durationLimitValue',
      ExpressionAttributeNames: {
        '#body': 'body_area',
        '#duration': 'duration'
      },
      ExpressionAttributeValues: {
        ':bodyAreaValue': bodyArea,
        ':durationLimitValue': limit
      }
    }
}

/**
* Retrieve exercise routines from DynamoDB
*
* @param bodyArea the body area where to exercise
* @returns {Object} an object with body area and routine, or an empty object
*/
const getExerciseRoutine = async (bodyArea, limit) => {
  console.log(`Querying for ${bodyArea} exercise`)
  if (bodyArea) {
    const params = getRoutineParams(bodyArea, limit)

    try {
        const data = await docClient.query(params).promise()

        // randomly choose one exercise to return
        const exerciseItem = data.Items[random.int(0, data.Count - 1)]

        console.log(`Success! data returned = ${JSON.stringify(exerciseItem)}`)

        return {
          name: exerciseItem.name,
          bodyArea: exerciseItem.body_area,
          duration: exerciseItem.duration,
          routine: exerciseItem.exercise.map(exerciseStep => exerciseStep.routine),
          steps: exerciseItem.exercise.length
        }
    } catch (err) {
        console.log("Failure", err.message)
        // there is no data here, you can return undefined or similar
    }
  }

}

module.exports = {
  getExerciseRoutine
}
