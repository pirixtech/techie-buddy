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

/**
 * Get the user id string from the current request. Used for persistent data storage per-user.
 *
 * @param handlerInput {HandlerInput}
 * @return {string}
 */
const getUserId = (handlerInput) => {
  try {
    return handlerInput.requestEnvelope.context.System.user.userId
  } catch (error) {
    console.log('Error occurred while getting user id:', error)
    throw error
  }
}
const getPerson = (handlerInput) => {
  return handlerInput.requestEnvelope.context.System.person
}
const getPersonId = (handlerInput) => {
  const person = getPerson(handlerInput)
  if (person) {
    return person.personId
  }
}

const getDayofWeek = async (handlerInput) => {
  const serviceClientFactory = handlerInput.serviceClientFactory
  const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId

  let userTimeZone
  try {
    const upsServiceClient = serviceClientFactory.getUpsServiceClient()
    userTimeZone = await upsServiceClient.getSystemTimeZone(deviceId)
  } catch (error) {
    if (error.name !== 'ServiceError') {
      return handlerInput.responseBuilder.speak('There was a problem connecting to the service.').getResponse()
    }
    console.log('error', error.message)
  }
  console.log("User's timezone: " + userTimeZone)
  const requestDate = new Date(handlerInput.requestEnvelope.request.timestamp)
  const hour = requestDate.toLocaleString('en-US', { hour: '2-digit', hour12: false, timeZone: userTimeZone })
  console.log("The current hour in the user's timezone: " + hour)
  return {
    day: requestDate.toLocaleString('en-US', { timeZone: userTimeZone, weekday: 'long' }).toLowerCase()
  }
}
/**
 * Helper method to find if a request is for a certain apiName.
 *
 * @param handlerInput the ASK handler input
 * @param apiName the api name
 * @return {boolean} true if this request is an api request for the given api name, false is not, or indeterminable
 */
const isApiRequest = (handlerInput, apiName) => {
  try {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked' &&
      handlerInput.requestEnvelope.request.apiRequest.name === apiName
  } catch (error) {
    console.log('Error occurred while determining if api request:', error)
    return false
  }
}

/**
 * Helper method to get the api request entity from the request envelope.
 *
 * @param handlerInput the ASK handler input
 * @return {Object} the request entity object
 */
const getApiArguments = (handlerInput) => {
  try {
    return handlerInput.requestEnvelope.request.apiRequest.arguments
  } catch (error) {
    console.log('Error occurred while getting api request entity:', error)
    throw error
  }
}
/**
 * Helper method to get the api request entity from the request envelope.
 *
 * @param handlerInput the ASK handler input
 * @return {Object} the resolved entity object
 */
const getApiSlots = (handlerInput) => {
  try {
    return handlerInput.requestEnvelope.request.apiRequest.slots
  } catch (error) {
    console.log('Error occurred while getting api request entity:', error)
    throw error
  }
}

module.exports = {
  getUserId,
  isApiRequest,
  getApiArguments,
  getApiSlots,
  getPersonId,
  getDayofWeek
}
