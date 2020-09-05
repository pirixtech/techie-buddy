// *****************************************************************************
// Copyright 2020 Pirix Technologies Inc. or its affiliates.  All Rights Reserved.

// You may not use this file except in compliance with the terms and conditions
// set forth in the accompanying LICENSE.TXT file.

// THESE MATERIALS ARE PROVIDED ON AN "AS IS" BASIS. AMAZON SPECIFICALLY
// DISCLAIMS, WITH RESPECT TO THESE MATERIALS, ALL WARRANTIES, EXPRESS, IMPLIED,
// OR STATUTORY, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
// OR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
// *****************************************************************************
module.exports = {
    en: {
        translation: {
            WELCOME: "Welcome to the Pizza Reference. Would you like to hear about our {{day}} {{period}} special?",
            WELCOME_PERSONALIZED: "Hi <alexa:name type='first' personId='{{personId}}' />! <break /> {{prompt}}",
            WELCOME_BACK: "Welcome back to the Pizza Reference. Would you like to continue with your existing order or start over",
            WELCOME_BACK_REPROMPT : "Sorry, I didn't catch that. Should we continue with your existing order or start a new one",
            REPEAT_ORDER_AND_CUSTOMIZE : "Your order has {{orderText}}. Would you like to customize the pizza or salad? or order as is",
            REPEAT_ORDER_AND_CUSTOMIZE_REPROMPT: "Sorry, I didn't catch that, did you want to customize this order? or order as is",
            REPEAT_ORDER_AND_ADD_SOMETHING : "Your order has {{orderText}}. Would you like to add something or order as is?",
            REPEAT_ORDER_AND_ADD_SOMETHING_REPROMPT: "Sorry, I didn't catch that, did you want to to add something or order as is?",
            WELCOME_REPROMPT : "Sorry, I didn't catch that. Just tell me which part of your body hurts",
            GENERIC_REPROMPT: "Sorry, I didn't catch that, would you like to order a pizza or maybe hear our specials?",
            PROMPT_FOR_ACTION : "Ok. What would you like to do? You can ask to hear some of our special pizzas or just order your own custom pizza",
            HELP_PROMPT: "This skill is an Alexa Conversations reference implementation that simulates pizza ordering dialog flows using Alexa's artificial intelligence technology. You can ask me to order a pizza, order a two topping pizza or hear our specials",
            REPROMPT_FOR_ACTION : "Sorry, I didnt catch that, what would you like to do?",
            CLOSEST_LOCATION: "The closest Pizza Reference shop to you in {{city}} is open until 9pm tonight. I can tell you their specials or you can just ask me to order a pizza",
            DAILY_LUNCH_SPECIAL: "Our {{day}} lunch special comes with a {{size}} {{toppingsList}} pizza with {{cheese}} cheese on {{crust}} crust, a {{salad}} and {{drinks}} for ${{cost}}. Would you like to order?",
            DAILY_DINNER_SPECIAL: "Our {{day}} dinner special comes with a {{size}} {{toppingsList}} pizza with {{cheese}} cheese on {{crust}} crust, a {{salad}}, a side order of {{side}}, {{dessert}} and {{drinks}} for ${{cost}}. Would you like to order?",
            DAILY_SPECIAL_REPROMPT: "Sorry, I didn't catch that. Would you like to order the {{day}} {{period}} special?",
            ORDER_DAILY_SPECIAL : "Ok, adding the {{day}} {{period}} special to your order. Would you like to add side orders, drinks or desserts?",
            ORDER_DAILY_SPECIAL_REPROMPT: "I've got your {{day}} {{period}} added to your order. Would you like to add side orders, drinks or desserts?",
            ADD_TO_ORDER : "Ok, you can ask for a list of sides, drinks and desserts or just ask to add something by name",
            ADD_TO_ORDER_REPROMPT : "Sorry, I didn't catch that, you can ask for a list of sides, drinks and desserts or just ask to add something by name",
            CONFIRM_DAILY_SPECIAL_ORDER : "Great! I've ordered the {{day}} {{period}} special. What would you like to do next?",
            CONFIRM_DAILY_SPECIAL_ORDER_REPROMPT: "Sorry, I didn't catch that. What would you like to do?",
            PLACE_ORDER: "Great! I placed your order for {{orderText}}. What would you like to do next?",
            PLACE_ORDER_REPROMPT: "Your order has been placed, what would you like to to?",
            CUSTOMIZE_PIZZA_OR_SALAD: "Sure, would you like to customize the pizza or the salad?",
            CUSTOMIZE_PIZZA_OR_SALAD_REPROMPT: "Sorry, I didn't catch that, dod you want to customize the pizza or salad?",
            ONLY_CUSTOMIZE_PIZZA_OR_SALAD: "Sorry, I didn't understand, you can ask me to customize the pizza or salad",
            ONLY_CUSTOMIZE_PIZZA_OR_SALAD_REPROMPT: "You can tell me to customize the pizza or salad",
            CURRENT_ORDER : "Your order has {{orderText}}. Did you want to continue with this order or start over",
            CURRENT_ORDER_REPROMPT: "Sorry, I didn't catch that. Should we continue with your existing order or start a new one",
            NO_CURRENT_ORDER : "You dont have any orders in progress, what would you like to do next?",
            NO_CURRENT_ORDER_REPROMPT: "Sorry, I didn't catch that. What would you like to do next?",
            PIZZA_REFERENCE_SPECIALS: "Our special pizzas are the {{specials}}. " +
                "You can ask me for details about one of the specials or to add one to your order",
            PIZZA_REFERENCE_SPECIALS_REPROMPT: "Did you want to hear more about a particular special?",
            REPEAT_PIZZA_REFERENCE_SPECIALS_AND_GET_NAME : "{{error}} Our specials are {{specials}}. Which one do you want to know more about?",
            REPEAT_PIZZA_REFERENCE_SPECIALS_AND_GET_NAME_REPROMPT: "Which special did you want details on?",
            PIZZA_REFERENCE_SPECIAL_DETAILS_PROMPT_TO_ORDER: "The {{name}} comes with {{qty}} {{size}} {{toppings}} pizza on {{crust}} crust with {{cheese}} cheese for ${{cost}}. Would you like to add it to your order?",
            PIZZA_REFERENCE_SPECIAL_DETAILS_PROMPT_TO_ORDER_REPROMPT: "Would you like to order the {{name}} special?",
            PROMPT_TO_CUSTOMIZE_SPECIAL: "Did you want to customize the {{name}} special at all?",
            PROMPT_TO_CUSTOMIZE_SPECIAL_REPROMPT: "Did you want to customize it?",
            GET_SPECIAL_PIZZA_NAME : "Which of our specials did you want to customize?",
            GET_SPECIAL_PIZZA_NAME_REPROMPT: "Which special did you want to customize?",
            PIZZA_ORDER_OPTIONS : "Ok, did you want to hear our pizza specials or order a custom pizza?",
            PIZZA_ORDER_OPTIONS_REPROMPT: "Would you like to hear our pizza specials or order a custom pizza?",
            SIDE_ORDER_OPTIONS : "Ok we have {{sides}}, what can I add to your order?",
            SIDE_ORDER_OPTIONS_REPROMPT : "Which side order would you like?",
            SALAD_ORDER_OPTIONS: "Ok, we have {{salads}}, what can I add to your order?",
            SALAD_ORDER_OPTIONS_REPROMPT: "Which salad would you like?",
            DRINK_ORDER_OPTIONS : "Ok we have {{drinks}}, what can I add to your order?",
            DRINK_ORDER_OPTIONS_REPROMPT: "What drinks would you like?",
            DESSERT_ORDER_OPTIONS : "Ok we have {{desserts}}, what can I add to your order?",
            DESSERT_ORDER_OPTIONS_REPROMPT: "What dessert would you like?",
            UNRECOGONIZED_ITEM : "Sorry, I don't think we have that on our menu. You can ask me to add sides, drinks, salads, desserts or pizzas to your order",
            PERMISSIONS_ERROR : "Please enable Location permissions in the Amazon Alexa app",
            NO_ADDRESS_SET: "Please enable Location permissions in the Amazon Alexa app.",
            FALLBACK: "Sorry, I didn't catch that. Say that again please.",
            FALLBACK_REPROMPT: "Say that again please.",
            ERROR: "Sorry, something went wrong. Please try again later.",
            EXIT: "Goodbye!",
        }
    }
};
