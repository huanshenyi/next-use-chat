
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { chatagent } from './agents/weather-agent';
import { LangfuseExporter } from 'langfuse-vercel';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { chatagent },
  storage: new LibSQLStore({
    url: process.env.memoryStorageUrl || ":memory:",
    authToken: process.env.memoryToken
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  telemetry: {
    serviceName: "ai",
    enabled: true,
      export: {
      type: "custom",
      exporter: new LangfuseExporter({
        publicKey: process.env.LANGFUSE_PUBLIC_KEY,
        secretKey: process.env.LANGFUSE_SECRET_KEY,
        baseUrl: process.env.LANGFUSE_BASEURL,
      }),
    },
  },
});
