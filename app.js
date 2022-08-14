// Require the Bolt package (github.com/slackapi/bolt)
// This is what allows your app to communicate with Slack
const { App } = require("@slack/bolt");
// Axios will be used to send requests to the Compass API
const axios = require('axios').default;
// dotenv will allow you to access environment variables defined locally in .env
require('dotenv').config();

// This block initiates the app with your bot token and
// app signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// This block starts up your app and will now listen to requests at port 3000
// Note that we wrap this block in an async function to prevent a top-level await
(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
