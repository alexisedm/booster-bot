# Booster-bot

_This repository contains a [Node](https://nodejs.org) app to implement a slack bot that validates and returns a vehicle for given parameters._

## Index

* [Instructions](#instructions)
* [Technologies](#technologies)
* [Architecture](#architecture)
* [Usage](#usage)
* [Deployment](#deployment)

## Instructions

To use this slack bot, enter to my personal workspace called AlexSoft, (have to send you an invitation. Once joining into worskpace, then you can interact with the bot sending messages in the software-engineering or general channel:

Say hello

```
Hello @BoosterBot
```

Get a vehicle

```
@BoosterBot VIN 1G8DC18H4CF114023
```

Get all the models

```
@BoosterBot Make honda 
```

Quit bot

```
Bye @BoosterBot
```

## Technologies

[![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://www.javascript.com)
[![Typescript](https://img.shields.io/badge/TypeScript-FFFFFF?logo=typescript&logoColor=blue)](https://www.typescriptlang.org)
[![Node](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org)
[![Eslint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=white)](https://eslint.org)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)](https://www.docker.com)
[![Github](https://img.shields.io/badge/github-%23121011.svg?logo=github&logoColor=white)](https://github.com)
[![Slack](https://img.shields.io/badge/Slack-4A154B?logo=slack&logoColor=white)](https://slack.com)
[![AWS](https://img.shields.io/badge/Amazon_AWS-%23FF9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com)

## Architecture

The slack bot was build in [Node](https://nodejs.org) and deployed in a [AWS EC2](https://aws.amazon.com/ec2), containerized with [Docker](https://www.docker.com), connects with the [Vehicle API](https://vpic.nhtsa.dot.gov/api/Home) to request the vehicles information. it works with [slack](https://slack.com) when the user mentions the bot or interacts with it.

## Usage

**First, you must have installed [Node](https://nodejs.org/es/) version `14`.**

Then, install the dependencies using:

```bash
npm install
```

Finally, use this command to run the app:

```bash
npm start
```

## Deployment
