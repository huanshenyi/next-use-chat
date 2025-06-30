import {
  NodeSDK,
  ATTR_SERVICE_NAME,
  resourceFromAttributes,
} from "@mastra/core/telemetry/otel-vendor";
import { LangfuseExporter } from "langfuse-vercel";
 
export function register() {
  console.log("Registering Langfuse exporter for telemetry", process.env.LANGFUSE_PUBLIC_KEY);
  const exporter = new LangfuseExporter({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      baseUrl: process.env.LANGFUSE_BASEURL,
  });
 
  const sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: "ai",
    }),
    traceExporter: exporter,
  });
 
  sdk.start();
}