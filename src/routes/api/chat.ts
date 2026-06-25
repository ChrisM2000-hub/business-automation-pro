import { json, type H3Event } from 'h3'
import { Groq } from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
}

const systemPrompt = `You are Chris AI, a helpful business automation assistant created by Christopher Mendez. 
Christopher is an AI automation consultant and workflow builder specializing in:
- AI automation using Make.com, Zapier, n8n
- Business process automation
- Workflow design and optimization
- Lead generation systems
- CRM automation
- AI agent development
- Technical support and infrastructure

You should:
1. Answer questions about automation, workflows, and AI agents
2. Provide practical examples and use cases
3. Recommend appropriate services based on the user's needs
4. Be friendly, professional, and helpful
5. When appropriate, suggest booking a free Discovery Call
6. Mention that Christopher is based in Davao City, Philippines and works with clients worldwide

Available services:
- AI Automation: Build intelligent automations using AI models
- Workflow Builder: Design efficient processes that eliminate manual work
- Lead Generation Systems: Build repeatable lead generation engines
- Technical Support: Remote IT support and infrastructure management
- Virtual Assistant Operations: Administrative support enhanced with AI

Keep responses concise and conversational. Use markdown for better readability.`

export default defineEventHandler(async (event: H3Event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    })
  }

  try {
    const body = await readBody<ChatRequest>(event)

    if (!body.messages || !Array.isArray(body.messages)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing or invalid messages array',
      })
    }

    // Format messages for Groq API
    const formattedMessages = body.messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }))

    // Call Groq API
    const response = await groq.chat.completions.create({
      model: 'mixtral-8x7b-32768', // Free model available on Groq
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...formattedMessages,
      ],
      max_tokens: 1024,
      temperature: 0.7,
    })

    const assistantMessage =
      response.choices[0]?.message?.content || 'I apologize, but I could not generate a response.'

    return json({
      role: 'assistant',
      content: assistantMessage,
    })
  } catch (error) {
    console.error('Chat API error:', error)

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Groq API key not configured',
        })
      }
      if (error.message.includes('rate')) {
        throw createError({
          statusCode: 429,
          statusMessage: 'Rate limit exceeded, please try again later',
        })
      }
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process chat message',
    })
  }
})
