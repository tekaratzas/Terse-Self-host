import { WebhookInputConfig, createJob } from "terse-sdk"
import { z } from "zod"
import { Triggers } from "./terse.generated.js"

const payloadSchema = z.object({ message: z.string().optional() })

// Register your job registry here, then import this file (for its side effects)
// from server.ts so it's loaded before requests arrive.
createJob({
    name: "Example webhook job",
    triggers: [Triggers.webhook.onRequest()],
    onTrigger: async event => {
        const payload = payloadSchema.parse(event.body)
        console.log("Received trigger payload:", payload)
    }
})
