/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent')
      ||  (request.type === 'IntentRequest'
        && request.intent.name === 'GetBoringFactIntent');
  },
  handle(handlerInput) {

    const request = handlerInput.requestEnvelope.request;
    if (request.intent.name === 'GetNewFactIntent') {
      const factArr = data;
      const factIndex = Math.floor(Math.random() * factArr.length);
      const randomFact = factArr[factIndex];
      const speechOutput = GET_FACT_MESSAGE + randomFact;
      return handlerInput.responseBuilder
        .speak(speechOutput)
        .withSimpleCard(SKILL_NAME, randomFact)
        .getResponse();
    } else if (request.intent.name === 'GetBoringFactIntent') {
      const boringAnswer = 'Blah blah blah, yada yada yada.'
      return handlerInput.responseBuilder
      .speak(boringAnswer)
      .withSimpleCard(SKILL_NAME, boringAnswer)
      .getResponse();
    }
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Energy Tips';
const GET_FACT_MESSAGE = 'Here\'s your energy tip: ';
const HELP_MESSAGE = 'You can say tell me an energy fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  'Unplugging underutilized appliances in your home can lead to big savings in your electricity usage.',
  'Chargers for phones still use electricity even when the phone is unplugged.',
  'Your home entertainment electronics pull a great deal of electricity if they remain plugged in. Plug TVs, stereos, and DVD players into a power strip and shut them off using the power strip\’s On/Off button.',
  'If you have an ENERGY STAR qualified computer, enable its shut-down features.',
  'The sleep mode reduces electricity usage by up to 70 percent during inactive periods.',
  'Shut off your computer if you\’re going to be away more than 2 hours.',
  'In the winter, try setting your thermostat to 68 degrees when you\'re at home and lowering the temperature at night or when you\'re away.',
  'In the summer, set the thermostat to a minimum 78 degrees; circulate cool air using box fans and ceiling fans.',
  'Open shades in the winter to let sunlight in. Close them in the summer to keep your home cooler.',
  'Set your water heater to 120 degrees.',
  'Incandescent bulbs are inefficient, so turn them off when you don’t need them. Replace them with CFL or LED bulbs.',
  'Caulk, weather-strip, and insulate your windows and doors wherever you find air leaks.',
  'Swapping five incandescent bulbs with ENERGY STAR® compact fluorescents can save you about $60 a year.',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
