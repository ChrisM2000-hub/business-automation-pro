import { json, type H3Event } from 'h3'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SubscribeData {
  email: string
}

export default defineEventHandler(async (event: H3Event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    })
  }

  try {
    const body = await readBody<SubscribeData>(event)

    if (!body.email || !isValidEmail(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email address',
      })
    }

    // Send confirmation email
    const result = await resend.emails.send({
      from: 'noreply@' + new URL(process.env.SITE_URL || 'https://example.com').hostname,
      to: body.email,
      subject: 'Welcome to our updates!',
      html: `
        <h2>Thanks for subscribing!</h2>
        <p>You'll now receive updates about automation tips, case studies, and new services.</p>
        <p>- Christopher Mendez</p>
      `,
    })

    if (result.error) {
      console.error('Resend error:', result.error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to subscribe',
      })
    }

    // TODO: Save to MongoDB for newsletter list
    // const db = await getMongoDb()
    // await db.collection('subscribers').updateOne(
    //   { email: body.email },
    //   { $set: { email: body.email, subscribedAt: new Date() } },
    //   { upsert: true }
    // )

    return json({
      success: true,
      message: 'Successfully subscribed!',
    })
  } catch (error) {
    console.error('Subscribe API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
