import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity/client'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Get contact email from settings
    const settings = await sanityFetch<{ contactEmail?: string }>({
      query: `*[_type == "siteSettings"][0] { contactEmail }`,
    })

    if (!settings?.contactEmail) {
      console.error('Contact email not configured in site settings')
      return NextResponse.json({ error: 'Contact form not configured' }, { status: 500 })
    }

    // Here you would typically send an email using a service like:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES
    // etc.
    
    // For now, we'll just log it (you'll need to integrate an email service)
    console.log('Contact form submission:', {
      to: settings.contactEmail,
      from: email,
      name,
      message,
    })

    // TODO: Integrate with your preferred email service
    // Example with Resend:
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     from: 'Contact Form <onboarding@resend.dev>',
    //     to: settings.contactEmail,
    //     reply_to: email,
    //     subject: `Contact from ${name}`,
    //     text: message,
    //   })
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
