import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { weatherTool } from '../tools/weather-tool';

export const chatagent = new Agent({
  name: "ChatAgent",
  instructions: "You are a helpful assistant.",
  model: openai("gpt-4o"),
  tools: { weatherTool },
  memory: new Memory({
    storage: new LibSQLStore({
    url: process.env.memoryStorageUrl || "file:../mastra.db",
    authToken: process.env.memoryToken
    }),
  })
});