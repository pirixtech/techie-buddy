var AWS = require('aws-sdk')
var docClient = new AWS.DynamoDB.DocumentClient()

AWS.config.update({
  region: 'us-east-1'
})

/**
* Retrieve exercise routines from DynamoDB
*
* @param bodyArea the body area where to exercise
* @returns {Object} an object with body area and routine, or an empty object
*/
const getExercise = (bodyArea, limit) => {
  console.log(`Querying for ${bodyArea} exercise`)

  if (bodyArea) {
    var params = {
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

    docClient.query(params, function (err, data) {
      if (err) {
        console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
      } else {
        console.log('Query succeeded.')
        data.Items.forEach(function (item) {
          console.log(`item = ${JSON.stringify(item)}`)
        })
      }
    })

    const exercise = `Sit on a mat in a cross-legged position. You can also sit on a chair
                          with your feet flat on the floor. Make sure to keep your spine straight.
                          Place your left palm on the top of your head and inhale. Now, slowly tilt
                          your head to the left with exhalation. Here, you also need to apply gentle
                          pressure with your palm to give a deeper stretch. Hold the position for
                          30 seconds. Now, slowly lift your head up and release your hands. Repeat
                          the same posture on the other side. You can do 4-5 sets.`
    const duration = 2
    return {
      bodyArea: bodyArea,
      duration: duration,
      routine: exercise
    }
  }

  return {}
}

module.exports = {
  getExercise
}
