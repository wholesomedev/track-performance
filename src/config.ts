import { join } from 'path';

const sshPrivateKeyPath = join(process.cwd(), 'secrets/sshPrivateKey');

export const config = {
  sshPrivateKeyPath,
  shouldPush: process.env.NODE_ENV === 'production',
  shouldInstallGit: process.env.NODE_ENV !== 'local',
  webpagetest: {
    apiKey: process.env.WPT_API_KEY,
  },
  github: {
    token: process.env.GITHUB_TOKEN,
  },
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
  },
};

export type GlobalConfig = typeof config;
