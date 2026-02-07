import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, name, status } = await request.json()

    if (status === 'approved') {
      await resend.emails.send({
        from: 'CaseFin <noreply@casefin.com>',
        to: email,
        subject: 'Your CaseFin Access Has Been Approved',
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 24px;">Welcome to CaseFin</h1>
            <p style="color: #444; font-size: 16px; line-height: 1.6;">
              Hi ${name},
            </p>
            <p style="color: #444; font-size: 16px; line-height: 1.6;">
              Your request for early access to CaseFin has been approved. We're excited to have you as part of our pilot program.
            </p>
            <p style="color: #444; font-size: 16px; line-height: 1.6;">
              We'll be in touch shortly with next steps and login credentials.
            </p>
            <p style="color: #444; font-size: 16px; line-height: 1.6; margin-top: 32px;">
              Best,<br/>
              The CaseFin Team
            </p>
          </div>
        `
      })
    } else if (status === 'rejected') {
      await resend.emails.send({
        from: 'CaseFin <noreply@casefin.com>',
        to: email,
        subject: 'Your CaseFin Access Request',
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 24px;">Thank You for Your Interest</h1>
            <p style="color: #444; font-size: 16px; line-height: 1.6;">
              Hi ${name},
            </p>
            <p style="color: #444; font-size: 16px; line-height: 1.6;">
              Thank you for your interest in CaseFin. After reviewing your request, we're unable to offer access at this time.
            </p>
            <p style="color: #444; font-size: 16px; line-height: 1.6;">
              We're onboarding firms in stages and may reach out in the future as we expand.
            </p>
            <p style="color: #444; font-size: 16px; line-height: 1.6; margin-top: 32px;">
              Best,<br/>
              The CaseFin Team
            </p>
          </div>
        `
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}