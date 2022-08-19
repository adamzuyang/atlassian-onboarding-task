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

## Project Description

For this project, you will create a listener for the command `/compass get component-name {ari}`, which gets the Compass component name for the corresponding Atlassian ARI (ARI stands for "Atlassian Resource Identifier" and is a unique ID for an Atlassian object). Once you complete this project, you should be able to 

## Project Structure

Below summarizes the project's starter code:

- `app.js` contains the primary Bolt app. It imports the Bolt package (`@slack/bolt`) and starts the Bolt app's server. It's where you'll add your app's listeners.
- `.env` is where you'll put your Slack app's authorization token and signing secret. Do not push this to any git repository. Later, when you deploy your code, you will add the environment variables to Heroku directly.
- The `examples` folder contains a couple of other sample app commands and events that you can peruse to your liking. They show off a few platform features that your app may want to use.
