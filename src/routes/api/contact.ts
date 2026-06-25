import { json, type H3Event } from 'h3'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export default defineEventHandler(async (event: H3Event) => {
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed',
    })
  }

  try {
    const body = await readBody<ContactFormData>(event)

    // Validate input
    if (!body.name || !body.email || !body.subject || !body.message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: name, email, subject, message',
      })
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email address',
      })
    }

    const siteUrl = new URL(process.env.SITE_URL || 'https://example.com')
    const fromDomain = siteUrl.hostname

    // Send email via Resend
    const result = await resend.emails.send({
      from: `noreply@${fromDomain}`,
      to: process.env.CONTACT_EMAIL || 'contact@example.com',
      subject: `New Contact: ${escapeHtml(body.subject)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>
        <hr />
        <h3>Message:</h3>
        <p>${escapeHtml(body.message).replace(/\n/g, '<br>')}</p>
        <hr />
        <p><em>Reply directly to this email to respond to the sender.</em></p>
      `,
      replyTo: body.email,
    })

    if (result.error) {
      console.error('Resend email error:', result.error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send email',
      })
    }

    console.log('Contact form email sent:', result.data?.id)

    // TODO: Save to MongoDB for lead tracking
    // Uncomment when MongoDB is set up
    /*
    const client = new MongoClient(process.env.MONGODB_URI)
    try {
      const db = client.db('business-automation')
      await db.collection('contacts').insertOne({
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
        createdAt: new Date(),
        ipAddress: getClientIP(event),
      })
    } finally {
      await client.close()
    }
    */

    return json({
      success: true,
      message: 'Your message has been sent successfully!',
    })
  } catch (error) {
    console.error('Contact API error:', error)
    if (error instanceof Error && error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
