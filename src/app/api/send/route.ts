import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { render, pretty } from "@react-email/render";
import validator from "validator";

import { EmailTemplate } from "@/components/common/template/Email";
import { rateLimit } from "@/lib/rate-limit";

function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

const ALLOWED_ORIGINS = [
  "https://jithazra.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  const origin =
    request.headers.get("origin") || request.headers.get("referer") || "";
  const isAllowed = ALLOWED_ORIGINS.some((allowed) =>
    origin.startsWith(allowed),
  );

  if (!isAllowed) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { success: withinLimit, remaining } = rateLimit(ip, {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000,
  });

  if (!withinLimit) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": "3600" },
      },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const { senderName, senderEmail, reasonToContact, senderMsg } = body;

  if (
    !senderName ||
    !senderEmail ||
    !reasonToContact ||
    !senderMsg ||
    typeof senderName !== "string" ||
    typeof senderEmail !== "string" ||
    typeof reasonToContact !== "string" ||
    typeof senderMsg !== "string"
  ) {
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }

  if (senderName.length > 100) {
    return NextResponse.json({ error: "Name is too long" }, { status: 400 });
  }
  if (senderEmail.length > 254) {
    return NextResponse.json({ error: "Email is too long" }, { status: 400 });
  }
  if (reasonToContact.length > 100) {
    return NextResponse.json({ error: "Reason is too long" }, { status: 400 });
  }
  if (senderMsg.length > 2000) {
    return NextResponse.json(
      { error: "Message is too long (max 2000 characters)" },
      { status: 400 },
    );
  }

  const cleanName = sanitize(senderName);
  const cleanEmail = sanitize(senderEmail);
  const cleanReason = sanitize(reasonToContact);
  const cleanMsg = sanitize(senderMsg);

  if (cleanName.length < 2) {
    return NextResponse.json({ error: "Name is too short" }, { status: 400 });
  }
  if (cleanMsg.length < 10) {
    return NextResponse.json(
      { error: "Message is too short" },
      { status: 400 },
    );
  }

  if (!validator.isEmail(cleanEmail)) {
    return NextResponse.json(
      { error: "Email format is not valid" },
      { status: 400 },
    );
  }

  let htmlContent: string;
  try {
    htmlContent = await pretty(
      await render(
        EmailTemplate({
          userName: cleanName,
          contactReason: cleanReason,
          userMessage: cleanMsg,
        }),
      ),
    );
  } catch (err) {
    console.error("Template render failed:", err);
    return NextResponse.json(
      { error: "Failed to render email template" },
      { status: 500 },
    );
  }

  const notificationHtml = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; background: #0a0000; color: #ffffff; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #1a0000; border: 1px solid rgba(220,38,38,0.3); border-radius: 12px; padding: 32px;">

          <h2 style="color: #dc2626; margin-bottom: 24px; font-size: 22px;">
            📬 New Contact Form Submission
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; color: #fca5a5; font-weight: bold; width: 140px;">Name</td>
              <td style="padding: 10px 0; color: #ffffff;">${cleanName}</td>
            </tr>
            <tr style="border-top: 1px solid rgba(220,38,38,0.15);">
              <td style="padding: 10px 0; color: #fca5a5; font-weight: bold;">Email</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${cleanEmail}" style="color: #dc2626;">${cleanEmail}</a>
              </td>
            </tr>
            <tr style="border-top: 1px solid rgba(220,38,38,0.15);">
              <td style="padding: 10px 0; color: #fca5a5; font-weight: bold;">Reason</td>
              <td style="padding: 10px 0; color: #ffffff;">${cleanReason}</td>
            </tr>
          </table>

          <p style="color: #fca5a5; font-weight: bold; margin-bottom: 8px;">💬 Message:</p>
          <pre style="background: rgba(127,29,29,0.3); border: 1px solid rgba(220,38,38,0.2); padding: 16px; border-radius: 8px; color: #fecaca; font-family: monospace; font-size: 14px; white-space: pre-wrap; line-height: 1.6;">${cleanMsg}</pre>

          <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(220,38,38,0.2);">
            <a href="mailto:${cleanEmail}?subject=Re: ${cleanReason}"
              style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Reply to ${cleanName} →
            </a>
          </div>

          <p style="color: #6b7280; font-size: 12px; margin-top: 24px;">
            Received via jithazra.vercel.app contact form
          </p>
        </div>
      </body>
    </html>
  `;

  try {
    // Email 1 — notification to YOU (must succeed)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.email_from,
      replyTo: `${cleanName} <${cleanEmail}>`,
      subject: `📬 ${cleanName} wants to connect — ${cleanReason}`,
      html: notificationHtml,
    });
  } catch (err) {
    console.error("Notification email error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
 
  try {
    // Email 2 — confirmation to SENDER. Awaited so the serverless function
    // doesn't terminate before this send completes. A failure here is
    // logged but does not affect the success response, since email 1
    // (the important one) already went through.
    await transporter.sendMail({
      from: `"Jit Hazra" <${process.env.GMAIL_USER}>`,
      to: cleanEmail,
      subject: "Got your message! I'll get back to you soon 🚀",
      html: htmlContent,
    });
  } catch (err) {
    console.error("Confirmation email error:", err instanceof Error ? err.message : err);
  }
 
  return NextResponse.json(
    { message: "Email sent successfully" },
    {
      status: 200,
      headers: { "X-RateLimit-Remaining": String(remaining) },
    },
  );
}