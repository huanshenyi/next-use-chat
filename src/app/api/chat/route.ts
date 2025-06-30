import { CoreMessage } from "@mastra/core";
import { mastra } from "@/mastra";

export async function POST(request: Request) {
  // Get data structured by experimental_prepareRequestBody
  const { message, threadId, resourceId }: { message: CoreMessage | null; threadId: string; resourceId: string } = await request.json();

  console.log("Received message:", message, threadId, resourceId);
 
  // Handle cases where message might be null (e.g., initial load or error)
  if (!message || !message.content || typeof message.content !== 'string') {
    return new Response("Missing message content or content is not a string", { status: 400 });
  }

 
  // Process with memory using the single message content
  const agent = mastra.getAgent("chatagent")
  const stream = await agent.stream(message.content, {
    threadId,
    resourceId,
        memoryOptions: {
      lastMessages: 10,
      semanticRecall: {
        topK: 3,
        messageRange: 2,
      },
      threads: {
        generateTitle: true
      },
      workingMemory: {
        enabled: true,
      },
    }
    // Pass other message properties if needed, e.g., role
    // messageOptions: { role: message.role }
  });
 
  // Return the streaming response
  return stream.toDataStreamResponse();
}