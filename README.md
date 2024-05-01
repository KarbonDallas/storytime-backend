# Storytime Backend

This is the backend service that coordinates the websocket connections between the client and the AI services.

## Tools Used

1. [Livepeer](#livepeer) Text-to-Image
1. [OpenAI](#openai) ChatGPT

## Requirements

1. Node.js 21 or later, v21.7.1 used for development — older versions may work, but are untested
1. WebSockets need to [use SSL](#for-production-deployments) (wss://) to operate safely in production. The author recommends using [letsencrypt.org]()

## Installation

### Local Development

1. Clone this repository to a local directory of your choice
1. Navigate to the root of the project directory in the terminal emulator of your choice
1. Make a copy of `.env.example` -> `.env.local` and update it with the [required API keys](#api-integrations)
1. Run the `npm install` command to install the required application dependencies
1. Run the `npm run dev` command to set up watchers for Typescript source and the compiled server

### For Production Deployments

1. Generate your SSL certificate using [LetsEncrypt](https://letsencrypt.org) \*
1. Rename `fullchain.pem` to `server.crt`
1. Rename `privkey.pem` to `server.key`
1. Place both of these files into the root of this project under `/certs/`
1. You may consider using a reverse proxy such as nginx, haproxy, etc.
1. You may also consider a strategy for keeping the app running, such as [pm2](https://www.npmjs.com/package/pm2)

_\* Skip this step if you already have a certificate, or a preferred method of generation_

## API Integrations

This application integrates several innovative third-party APIs to achieve the final result. You will need to ensure that you have made the necessary modifications to the `.env` file as mentioned previously. More information below:

### Livepeer

[Livepeer](https://livepeer.org) provides us with a Stable Diffusion [text-to-image API](https://na-36-ai-video.mintlify.app/ai/api-reference/text-to-image) API built on their distributed protocol.

For this integration, we use the following environment variables:

1. `LIVEPEER_TEXT_TO_IMAGE_ENDPOINT`
1. `LIVEPEER_BEARER_TOKEN` \*
1. `LIVEPEER_SD_MODEL`
1. `LIVEPEER_SD_GUIDANCE`
1. `LIVEPEER_SD_NEGATIVE_PROMPT`
1. `LIVEPEER_SD_IMAGE_SIZE`
1. `LIVEPEER_SD_IMAGE_COUNT`

_\* Currently not required in beta, but you should hop in the [Livepeer Discord](https://discord.gg/livepeer) for support_

### OpenAI

We use OpenAI for their [moderation](https://platform.openai.com/docs/guides/moderation) and [chat completion](https://platform.openai.com/docs/guides/text-generation/chat-completions-api?lang=node.js) APIs. You will need an [OpenAI API Key](https://platform.openai.com/api-keys) and available credits on your account.

For this integration, we use the following environment variables:

1. `OPENAI_API_KEY`
1. `OPENAI_TOP_P` \*
1. `OPENAI_TEMPERATURE` \*
1. `OPENAI_FREQUENCY_PENALTY` \*
1. `OPENAI_PRESENCE_PENALTY` \*
1. `OPENAI_MAX_TOKENS` \*
1. `OPENAI_MODEL` \*

_\* Sensible default provided in `.env.example`_

## TODO

-   [ ] Currently, the backend API lacks authentication
-   [ ] Database replication via Fireproof
