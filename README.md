# Compass/Slack Onboarding Project \_\_\_\ ゜o゜)ノ\_\_\_

Compass is a new Atlassian service that simplifies DevOps organization. Individuals are grouped into teams and each team is responsible for some number of components. Components are either the team's services, libraries, or applications.

Slack apps are capable of listening to events, messages, and commands and are capable of posting material within a Slack workspace.

For Slack app development, we will use Bolt. [Bolt](https://slack.dev/bolt) is the framework that lets you build JavaScript-based Slack apps.

Think of Slack apps as browser extensions that, instead of communicating with a browser, communicate with Slack's servers which then updates Slack workspaces for you. This project will give you a simple introduction into creating Bolt apps and deploying them to a live server that can listen to requests from a workspace and respond with information from Compass.

Note that Slack apps are hosted on an external server and do not run locally on a user's computer.

If you'd like to read more about Bolt, you can go to the [Getting Started guide](https://api.slack.com/start/building/bolt) or the [Bolt documentation](https://slack.dev/bolt). Most of this project was compiled from the Getting Started guide, so performing this onboarding task alone will give you a decent introduction to Bolt and creating Slack apps.

## Technical Prerequisites

This project will be written in JavaScript, so knowledge of the language will be essential for completing this onboarding project. Note that, unlike Python, JavaScript natively supports features like promises, async/await, let/const, etc. 

You can learn the basics of JavaScript [here](https://www.youtube.com/watch?v=W6NZfCO5SIk). It is also recommended that you familiarize yourself with promises and async/await [here](https://www.youtube.com/watch?v=PoRJizFvM7s), as those are important aspects of sending and receiving API requests.

For promises, please try to use async/await when possible and not callback functions. Please avoid the use of top-level awaits, as that's a surefire way to shoot yourself in the foot.

You should also be somewhat familiar with writing web servers using Node.js. If you need to install node, please visit [here](https://nodejs.org/en/download/). You do not need to know popular web development frameworks like React, Express, etc.

## Project Description

For this project, you will create a listener for the command `/compass {ari}`, which gets the Compass component name for the corresponding Atlassian ARI (ARI stands for "Atlassian Resource Identifier" and is a unique ID for an Atlassian object). Once you complete this project, you should be able to enter `/compass {ari}` into a Slack channel with a component ARI from compass and get the component's name.

## Setup: Compass

As mentioned earlier, Compass is Atlassian's new DevOps service currently in beta stage of development. To create a new Compass site, go to https://www.atlassian.com/software/compass and select the "Get it free" button to the right of the Compass banner. Use your Berkeley email and call your site {YOUR FIRST NAME}-compass-test.

You will then be asked to create a component. For consistency, let's also call this {YOUR FIRST NAME}-Compass-Test and make it a service. This is all you'll need to set up to continue with this project, but you are encouraged to explore the rest of Compass in your free time.

## Setup: Slack

In order to set up this project, you must first create a Slack development workspace and application.

To create a Slack workspace, it is recommended that you have the desktop version of Slack installed:

1. Underneath your workspace icons, click the "+" icon to add a workspace.
2. Select "Create a new workspace".
3. Enter your Berkeley email and verification code.
4. Please name your Slack workspace "{YOUR FIRST NAME}-Compass-Test". You can skip adding teammates.

To create a Slack app, go to https://api.slack.com/apps.

1. Click "Create New App"
2. Select "From scratch"
3. Name your app "{YOUR FIRST NAME}-Compass-Test" and select the workspace you just created.

### Requesting Scopes

[Scopes](https://api.slack.com/scopes) give your app permission to do things (for example, post messages) in your development workspace. You can select the scopes to add to your app by navigating over to the OAuth & Permissions sidebar for your Slack app.

Under Bot Token Scopes, add the following five scopes:
- calls:read
- calls:write
- channels:read
- chat:write
- chat:write.public

### Installing Your App

Install your own app by selecting the "Install App" button at the top of the OAuth & Permissions page. Work through all the prompts until your app is installed into your Slack workspace.

## Project Structure

Now it's time to start writing some code! The starter code for this project can be found at https://github.com/adamzuyang/atlassian-onboarding-task. Go ahead and clone this repository using Git.

Below summarizes the project's starter code:

- `app.js` contains the primary Bolt app. It imports the Bolt package (`@slack/bolt`) and starts the Bolt app's server. It's where you'll add your app's listeners.
- `.env` is where you'll put your Slack app's authorization token and signing secret as well as your Compass authorization token. Do not push this to any git repository. Later, when you deploy your code, you will add the environment variables to Heroku directly.
- The `examples` folder contains a couple of other sample app commands and events that you can peruse to your liking. They show off a few platform features that your app may want to use.

It doesn't matter too much how you decide to organize your code, since this is a fairly small onboarding project. However, it's good to keep in mind development best practices, such as not pushing the contents of your `.env` file, not hard-coding access tokens, and not using top-level awaits.

### How Does a Slack App Work?

Your Slack app will not run directly on the Slack client or workspace. Instead, Slack apps are hosted on external servers (for example, using a cloud provider like AWS or Heroku). When an action takes place within the Slack workspace (for example, a user opens a channel or sends a message), events are sent to Slack which are then forwarded to your application. Within your application, you can define listeners that react to these events and alter the workspace.

## Adding Your App Credentials

Before we get started, we first have to authorize your application to access Slack and Atlassian. Note that when we initialize an app imported from Bolt, we give it a bot token and a signing secret.

To provide your app with these tokens, first go to the OAuth & Permissions sidebar and copy the "Bot User OAuth Token" and paste it directly after `SLACK_BOT_TOKEN=` (without quotes) in the `.env` file. Next, go to the "Basic Information" sidebar and copy the signing secret to `SLACK_SIGNING_SECRET`.

To retrieve your Compass token, go to {your site name}.atlassian.net/compass and select your profile in the upper-right-hand corner. Select "Account Settings". There, go to the "Security" sidebar and click "Create and manage API tokens". Create a new API token and copy it to `COMPASS_TOKEN`. For `COMPASS_USERNAME`, enter the email that you used to register Compass.

To see whether the Slack tokens are configured correctly, first install all modules using `npm install` and run the app using `npm start`. If you see something like "Bolt app is running" in the terminal, you're clear to proceed!

## Testing the Waters: Echo Command

To start things off, let's create a simple echo command. Copy the following code to `app.js`:

```javascript
app.command('/echo', async ({ ack, payload, context }) => {
  // Acknowledge the command request
  ack();

  try {
    const result = await app.client.chat.postMessage({
      token: context.botToken,
      // Channel to send message to
      channel: payload.channel_id,
      // Message content (organized in blocks)
      // Note that this section is given in Markdown
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: payload.text
          }
        }
      ],
      // Text in the notification
      text: 'Message from Test App'
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});
```

What does this code do? It listens for the slash command `/echo` within one of your Slack workspace's channels and regurgitates everything after the first space after `/echo`.

However, if you try starting the server on port 3000 using `npm start` and run the slash command within a Slack channel, you'll see that nothing happens. In order to connect your server, you'll have to expose your local endpoint to the web.

## Exposing Your Local Endpoint: ngrok

Ngrok is a command-line tool that exposes your local ports as endpoints that can be accessed on the web (for free!). To install ngrok, visit [here](https://ngrok.com/download). (I recommend using brew/chocolatey to install ngrok if you are on Mac/Windows respectively.)

To verify if ngrok is installed, try running `ngrok -v` on the command line. If you see something like `ngrok version 3.0.6`, then you're good to go.

If you do not see a version number and you are using a **Windows** computer, you may have to add ngrok to your `PATH` environment variable. To do so, hit your Windows key and search for "Environment Variables". Select "Edit the system environment variables".

1. Select "Environment Variables...".
2. Under user variables, select "Path" and click "Edit...".
3. Add the path to your ngrok executable to the bottom of the list. If you used Chocolatey to install ngrok, your executable is probably at `C:\Users\{your username}\AppData\Local\Temp\chocolatey\ngrok\{ngrok version number}`.
4. Select "OK".
5. Select "OK".
6. Select "Apply" (if applicable) or "OK" otherwise.

Now, start up your Bolt app using `npm start`. Within another terminal window, expose your localhost by running `ngrok http 3000` to expose port 3000. You should get a screen that looks something like this:

```
Join us in the ngrok community @ https://ngrok.com/slack

Session Status                online
Account                       Barnett Yang (Plan: Free)
Version                       3.0.6
Region                        United States (us)
Latency                       88ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://e0a6-71-202-14-192.ngrok.io -> http://localhost:3000
Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Here, my localhost is exposed at domain https://1f90-71-202-14-192.ngrok.io.

[Optional] Finally, to get rid of annoying error messages from ngrok, you'll have to provide ngrok with a user token. Go to https://ngrok.com/ and click "Sign up" (you can use any sign up method you want). Select "Your Authtoken" under "Getting Started" and run the command under "Command Line".

## Making Slack Aware of Your Echo Command

Unfortunately, even though your ngrok domain is now public, Slack still doesn't know that your slash command `/echo` exists or which endpoint to hit. To complete the command, go to your Slack app and select "Slash Commands" on the sidebar.

Select "Create New Command".

1. For the command, enter `/echo`
2. For the request URL, enter `{your ngrok domain}/slack/events` (e.g., https://1f90-71-202-14-192.ngrok.io/slack/events).
3. Enter anything for the description.
4. Select "Save".
5. Reinstall your app to your workspace.

At this point, if you go to any channel within your workspace and enter `/echo`, you should be able to echo the text after the slash command. Try entering `/echo helloworld` and see if you get "helloworld" as output.

## Slack Commands That Interact with Compass

Now let's create a new Slack command that makes use of the Compass API. As a reminder, your goal is to create a command of the form `/compass {ARI}` that will get the name of the component with the corresponding ARI.

To find a component's ARI for testing, go back to https://{your atlassian site name}.atlassian.net/compass/components and select a component. Next to "Apply scorecard", select the meatball icon and click "copy component ID" to get its ARI.

### Compass API: GraphQL

Currently, there is very little public documentation available for Compass' REST API. To make use of Compass, we will be using Compass' GraphQL API instead.

GraphQL is a query langauge for APIs that, instead of using multiple endpoints, is based off a single endpoint through which you can submit "queries" or "mutations". A strong understanding of GraphQL is not important for this onboarding project, but you are still encouraged to read more about GraphQL [here](https://graphql.org/learn/). As a bare minimum, you should understand how to use basic GraphQL queries. Play around with the Atlassian's GraphQL explorer [here](https://api.atlassian.com/graphql) to see how you can construct a query that will get a component's name given its ARI.

### Compass API: Axios

For this project, we will be using [Axios](https://axios-http.com/docs/intro) to send HTTP requests to Compass' GraphQL API. GraphQL queries can be sent either as GET or POST requests. Since Compass is in beta, you will have to include an `'X-ExperimentalApi': 'compass-beta'` header as part of your request.

You will also have to authenticate your request using basic basic auth. To do so, you will have to provide an auth parameter to Axios consisting of two key-value pairs: one with key "username" and one with key "password". The username corresponds to `COMPASS_USERNAME` in your `.env` file and your password corresponds to `COMPASS_TOKEN` in your `.env` file. Ultimately, your Axios query should look something like this:

```javascript
let result = await axios({
    url: "https://api.atlassian.com/graphql",
    method: "POST",
    headers: {
        'X-ExperimentalApi': 'compass-beta'
    },
    auth: {
        username: getCompassUsername(),
        password: getCompassToken()
    },
    data: {
        query: `
            query MyQuery {
                // Place your query here
            }
        `
    }
});
```

### Creating a Slack Slash Command that Uses the Compass API

Finally, use your experience gained writing the `/echo` slash command to create your `/compass` slash command. Remember to complete the following steps:

1. Create the command listener within `app.js` using `app.command`.
2. Expose your local endpoint using `ngrok http 3000`.
3. Start up your app using `npm start`.
4. Create the slash command within the Slack App by modifying the "Slash Commands" sidebar. (Be careful here, your ngrok domain might have changed.)

To test your work, start up your app using `npm start` and enter `/compass {ARI}` in any channel within your workspace (e.g., `/compass ari:cloud:compass:2103eeed-75f8-4dc7-ab7d-94cac8de5281:component/0f67fdbc-3f54-49b0-843f-cba4842b95b3/cb33c7da-65b4-4410-a095-a136d40d017a`). If everything works, you should get your Compass component's name as a reply.
