// *****************************************************************************
// Copyright 2020 Pirix Technologies Inc. or its affiliates.  All Rights Reserved.

// You may not use this file except in compliance with the terms and conditions
// set forth in the accompanying LICENSE.TXT file.

// THESE MATERIALS ARE PROVIDED ON AN "AS IS" BASIS. AMAZON SPECIFICALLY
// DISCLAIMS, WITH RESPECT TO THESE MATERIALS, ALL WARRANTIES, EXPRESS, IMPLIED,
// OR STATUTORY, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
// OR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
// *****************************************************************************

'use strict'

const Alexa = require('ask-sdk')
const utils = require('./utils')
const exerciseClient = require('./exercise-client')
const { v4: uuidv4 } = require('uuid')
const i18next = require('i18next')
const sprintf = require('sprintf-js').sprintf
const _ = require('lodash')
// Localization strings
const resources = require('./resources')
// APL docs
const welcomeApl = require('./launch_request.json')

const alexaSkillId = 'amzn1.ask.skill.c3772f7a-4aa5-407b-8623-6a9dd104f3e8'

const states = {
  PROMPTED_FOR_EXERCISE_OF_THE_DAY: 'PROMPTED_FOR_EXERCISE_OF_THE_DAY',
  PROMPTED_TO_ORDER_DAILY_SPECIAL: 'PROMPTED_TO_ORDER_DAILY_SPECIAL',
  PROMPTED_TO_CUSTOMIZE: 'PROMPTED_TO_CUSTOMIZE',
  PROMPTED_TO_ADD_TO_ORDER: 'PROMPTED_TO_ADD_TO_ORDER',
  PROMPTED_TO_ORDER_SPECIAL: 'PROMPTED_TO_ORDER_SPECIAL',
  PROMPTED_TO_CUSTOMIZE_SPECIAL_PIZZA: 'PROMPTED_TO_CUSTOMIZE_SPECIAL_PIZZA'
}

const LaunchHandler = {
  canHandle (handlerInput) {
    // TODO: use api request handler to verify the input request
    console.log('Can process the launch request')
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    )
  },

  async handle (handlerInput) {
    let speakOutput, reprompt
    const { day } = await utils.getDayofWeek(handlerInput)
    console.log(`Today is ${day}`)
    reprompt = handlerInput.t('WELCOME_REPROMPT')

    // Speaker is not recognized give a generic greeting asking if they would like to hear our specials
    console.log(
      'Give a generic greeting asking if they would like to hear our exercise of the day ... '
    )
    speakOutput = handlerInput.t('WELCOME', {
      day: day
    })

    //      console.log(`Checking if the interface is APL ... `)
    //      if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
    //          console.log(`Render Welcome APL ... `)
    //          handlerInput.responseBuilder.addDirective({
    //              type: 'Alexa.Presentation.APL.RenderDocument',
    //              token: "welcomeToken",
    //              document: welcomeApl
    //          })
    //      }
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(reprompt)
      .getResponse()
  }
}

/**
 * AMAZON.YesIntentHandler.
 *
 * Used in response to
 *  - being prompted to hear the daily exercise of the day
 *
 * @param handlerInput {HandlerInput}
 * @returns {Response}
 */
const YesIntentHandler = {
  canHandle (handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent'
    )
  },

  async handle (handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    const { day } = await utils.getDayofWeek(handlerInput)

    // if we prompted them for specials
    console.log('Getting exercise of the day on ' + day)
    // copying to new object to not mess up downstream storage of object in session
    const spokenExerciseOfTheDay = JSON.parse(
      JSON.stringify(resources.getExerciseOfTheDay(day))
    )
    console.log(
      'Daily exercise of the day: ' + JSON.stringify(spokenExerciseOfTheDay)
    )

    const speakOutput = handlerInput.t('DAILY_EXERCISE_OF_DAY', {
      exercise: spokenExerciseOfTheDay
    })

    const reprompt = handlerInput.t('DAILY_EXERCISE_OF_DAY_REPROMPT', {
      day: day
    })
    sessionAttributes.state = states.GetDailyExerciseOfTheDay

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(reprompt)
      .getResponse()
  }
}

/**
 * AMAZON.NoIntentHandler.
 *
 * Used in response to
 *  - being prompted to hear the daily specials
 *  - ordering a daily special
 *
 * @param handlerInput {HandlerInput}
 * @returns {Response}
 */
const NoIntentHandler = {
  canHandle (handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent'
    )
  },

  handle (handlerInput) {
    return handlerInput.responseBuilder
      .addDirective({
        type: 'Dialog.DelegateRequest',
        target: 'AMAZON.Conversations',
        period: {
          until: 'EXPLICIT_RETURN'
        },
        updatedRequest: {
          type: 'Dialog.InputRequest',
          input: {
            name: 'tb_invoke_getPhyscicalPainDesc'
          }
        }
      })
      .getResponse()
  }
}

// API handler to get and return exercise routine
const GetExerciseApiHandler = {
  canHandle (handlerInput) {
    return utils.isApiRequest(handlerInput, 'getPhysicalExercise')
    // return true
  },
  async handle (handlerInput) {
    const uuid = uuidv4()

    // "Call a service" to get the weather for this location and date.
    const bodyArea =
      handlerInput.requestEnvelope.request.apiRequest.arguments.bodyArea
    const limit = 120 // TODO: parse time limit out of handlerInput
    const exercise = await exerciseClient.getExerciseRoutine(bodyArea, limit)
    console.log(`exercise = ${JSON.stringify(exercise)}`)

    const response = {
      apiResponse: {
        id: uuid,
        name: exercise.name,
        bodyArea: exercise.bodyArea,
        duration: exercise.duration,
        exercise: exercise.routine,
        steps: exercise.steps
      }
    }
    return response
  }
}

const CancelStopHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return (
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' ||
        request.intent.name === 'AMAZON.StopIntent')
    )
  },

  handle (handlerInput) {
    const responseBuilder = handlerInput.responseBuilder
    const speechOutput = 'Okay, talk to you later! '

    return responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(true)
      .getResponse()
  }
}

const EndConversationHandler = {
  canHandle (handlerInput) {
    return utils.isApiRequest(handlerInput, 'getPhysicalExercise')
  },

  /**
   * Get Exercise API
   * Consumes: bodyArea
   * Returns: Valid exercise routine for the specified body part
   *
   * @param handlerInput {HandlerInput}
   * @return {Promise<Response>}
   */
  handle (handlerInput) {
    //        const apiArguments = requestUtils.getApiArguments(handlerInput);
    //        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    //        sessionAttributes.in_progress = {pizza : apiArguments};

    return {
      directives: [
        {
          type: 'Dialog.DelegateRequest',
          target: 'skill',
          period: {
            until: 'EXPLICIT_RETURN'
          },
          updatedRequest: {
            type: 'IntentRequest',
            intent: {
              name: 'AMAZON.StopIntent'
            }
          }
        }
      ],
      apiResponse: {}
    }
  }
}

const SessionEndedRequestHandler = {
  canHandle (handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      'SessionEndedRequest'
    )
  },
  handle (handlerInput) {
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse()
  }
}

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
  canHandle (handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
    )
  },
  handle (handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope)
    const speakOutput = `You just triggered ${intentName}`

    return handlerInput.responseBuilder.speak(speakOutput).getResponse()
  }
}

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
  canHandle () {
    return true
  },
  handle (handlerInput, error) {
    console.error(`Error handled: ${error.message}`)
    console.error('Error stack', JSON.stringify(error.stack))
    console.error('Error', JSON.stringify(error))

    const speakOutput =
      'Sorry, I had trouble doing what you asked. Please try again.'

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  }
}

// *****************************************************************************
// These simple interceptors just log the incoming and outgoing request bodies to assist in debugging.

const LogRequestInterceptor = {
  process (handlerInput) {
    console.log(
      `REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`
    )
    console.log(`handler input object = ${JSON.stringify(handlerInput)}`)
  }
}

const LogResponseInterceptor = {
  process (handlerInput, response) {
    console.log(`RESPONSE = ${JSON.stringify(response)}`)
  }
}

const LocalizationInterceptor = {
  process (handlerInput) {
    i18next.init({
      lng: _.get(handlerInput, 'requestEnvelope.request.locale'),
      overloadTranslationOptionHandler:
        sprintf.overloadTranslationOptionHandler,
      resources: resources,
      returnObjects: true
    })

    handlerInput.t = (key, opts) => {
      const value = i18next.t(key, {
        ...{ interpolation: { escapeValue: false } },
        ...opts
      })
      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)] // return a random element from the array
      } else {
        return value
      }
    }
  }
}

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
// exports.handler = Alexa.SkillBuilders.custom()
//  .withSkillId(alexaSkillId)
//  .addRequestHandlers(
//    LaunchHandler,
//    GetExerciseApiHandler,
//    SessionEndedRequestHandler,
//    IntentReflectorHandler)
//  .addErrorHandlers(ErrorHandler)
//  .addRequestInterceptors(LogRequestInterceptor)
//  .addResponseInterceptors(LogResponseInterceptor)
//  .lambda()

module.exports.handler = Alexa.SkillBuilders.standard()
  .withSkillId(alexaSkillId)
  .addRequestHandlers(
    LaunchHandler,
    YesIntentHandler,
    NoIntentHandler,
    GetExerciseApiHandler,
    CancelStopHandler,
    EndConversationHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(LogRequestInterceptor, LocalizationInterceptor)
  .addResponseInterceptors(LogResponseInterceptor)
  .withAutoCreateTable(true)
  .lambda()
