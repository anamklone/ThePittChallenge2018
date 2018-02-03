'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var handlers = {
    
    'LaunchRequest': function() {
    this.response.speak("Hello, Welcome to your Fitness Therapy Alexa Skill. Would you like to start your fitness therapy regimen? Please say yes or no.").listen("Sorry, I didn't quite catch that. Could you repeat? Please say yes or no.");
    this.emit(':responseReady');
    },
    
    'fitnessTherapy': function() {
    this.response.speak("Please extend your hand and commence physical therapy exercises while I count down from 20!");   
        
    },
    
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    
    
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    
    
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
