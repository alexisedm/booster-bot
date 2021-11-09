import { SlackConfig } from './../common/domain/index';

const slackConfig: SlackConfig = {
	// If allowedChannelId is not set, the slack bot can be triggered from every channel
	allowedChannelId: process.env.SLACK_ALLOWED_CHANNEL_ID
};

export const appConfig = {
	slack: slackConfig
};
