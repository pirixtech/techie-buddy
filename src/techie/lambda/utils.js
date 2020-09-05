const Alexa = require('ask-sdk')

/**
 * Helper method to find if a request is for a certain apiName.
 */
const isApiRequest = (handlerInput, apiName) => {
  try {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked' &&
            handlerInput.requestEnvelope.request.apiRequest.name === apiName
  } catch (e) {
    console.log('Error occurred: ', e)
    return false
  }
}

module.exports = {
  isApiRequest: isApiRequest
}
