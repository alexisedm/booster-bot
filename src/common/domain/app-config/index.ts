export type SlackConfig = {
  allowedChannelId: string;
};

export type AppConfig = {
  slack: SlackConfig;
};
