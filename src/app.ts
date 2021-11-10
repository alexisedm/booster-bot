const { App, AwsLambdaReceiver } = require('@slack/bolt');
import { WebClient } from '@slack/web-api';
import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { createEventAdapter } from '@slack/events-api';
require('dotenv').config();

const axios = require('axios');
const {
  incorrectVINMessage,
  incorrectMakeMessage,
} = require('./config/messages');
const {
  validateVIN,
  getVehicleByVIN,
  getModelsForMake,
} = require('./services/vehicle');
const { getParameterFromMessage } = require('./common/slack-utils');

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackToken = process.env.SLACK_TOKEN;
const port = process.env.PORT || 3000;
const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackToken);

// Create an express application
//const app = express();

// Initialize your custom receiver
const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Initializes your app with your bot token and the AWS Lambda ready receiver
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
  // The `processBeforeResponse` option is required for all FaaS environments.
  // It allows Bolt methods (e.g. `app.message`) to handle a Slack request
  // before the Bolt framework responds to the request (e.g. `ack()`). This is
  // important because FaaS immediately terminate handlers after the response.
  processBeforeResponse: true,
});
// Plug the adapter in as a middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Initialize a server for the express app - you can skip this and the rest if you prefer to use app.listen()
const server = createServer(app);
server.listen(port, () => {
  // Log a message when the server is ready
  console.log(`Listening for events on ${port}`);
});

/* Add functionality here */

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

slackEvents.on('app_mention', (event) => {
  console.log(`Got message from user ${event.user}: ${event.text}`);
  (async () => {
    try {
      await slackClient.chat.postMessage({
        channel: event.channel,
        text: `Hello <@${event.user}>! :tada:`,
      });
    } catch (error) {
      console.log(error.data);
    }
  })();
});

slackEvents.on('error', console.error);

app.message(/hello/i, async ({ message, say }) =>
  say(`Hello <@${message.user}> :hand:`)
);

app.message(/bye/i, async ({ message, say }) =>
  say(`Bye, <@${message.user}> :wave:`)
);

app.message(/vin/i, async ({ message, say }) => {
  const vin = getParameterFromMessage(message);
  if (validateVIN(vin)) {
    const vehicle = await getVehicleByVIN(vin);
    await say(vehicle);
  } else {
    await say(incorrectVINMessage);
  }
});

app.message(/make/i, async ({ message, say }) => {
  const make = getParameterFromMessage(message);
  if (make) {
    const models = await getModelsForMake(make);
    await say(models);
  } else {
    await say(incorrectMakeMessage);
  }
});

module.exports.handler = async (event, context, callback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};
