import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  collaborationType: string;
  isInternship: boolean;
  isMVP: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json();
    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpPort = Number.parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();
    const smtpFrom = process.env.SMTP_FROM?.trim() || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom || Number.isNaN(smtpPort)) {
      return NextResponse.json(
        { error: "Email service is not configured correctly on the server." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Email to self (portfolio owner)
    const ownerMailOptions = {
      from: smtpFrom,
      to: smtpFrom, // Send to yourself
      subject: `New Contact Form Submission from ${body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #6c63ff; margin-bottom: 20px;">📧 New Portfolio Contact</h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Name:</strong> ${sanitizeHtml(body.name)}</p>
            <p><strong>Email:</strong> ${sanitizeHtml(body.email)}</p>
            <p><strong>Collaboration Type:</strong> ${sanitizeHtml(body.collaborationType)}</p>
            <p><strong>Internship Opportunity:</strong> ${body.isInternship ? "Yes" : "No"}</p>
            <p><strong>Idea-to-MVP Support:</strong> ${body.isMVP ? "Yes" : "No"}</p>
          </div>

          <div style="background-color: #f0f0f0; padding: 20px; border-left: 4px solid #6c63ff; border-radius: 4px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; color: #666;">${sanitizeHtml(body.message)}</p>
          </div>

          <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; font-size: 12px; color: #999;">
            <p>📌 Reply to: <a href="mailto:${sanitizeHtml(body.email)}" style="color: #6c63ff;">${sanitizeHtml(body.email)}</a></p>
            <p>Received at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
New Portfolio Contact

Name: ${body.name}
Email: ${body.email}
Collaboration Type: ${body.collaborationType}
Internship Opportunity: ${body.isInternship ? "Yes" : "No"}
Idea-to-MVP Support: ${body.isMVP ? "Yes" : "No"}

Message:
${body.message}

---
Received at: ${new Date().toLocaleString()}
      `,
    };

    // Acknowledgment email to visitor
    const visitorMailOptions = {
      from: smtpFrom,
      to: body.email,
      subject: "Got your message! 🚀 — Hari Krishnaa",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #6c63ff; margin-bottom: 10px;">Hey ${sanitizeHtml(body.name)}! 👋</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Thanks for reaching out! I received your message about <strong>${sanitizeHtml(body.collaborationType)}</strong>.
          </p>

          <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6c63ff;">
            <p style="margin: 0; color: #6c63ff; font-weight: bold;">⏱ What happens next:</p>
            <ul style="margin: 10px 0; padding-left: 20px; color: #666;">
              <li>I'll review your message</li>
              <li>You'll hear back from me within <strong>4 hours</strong></li>
              <li>Let's discuss how we can build something amazing together</li>
            </ul>
          </div>

          <p style="color: #999; font-size: 14px; line-height: 1.6;">
            In the meantime, feel free to connect with me on 
            <a href="https://linkedin.com/in/hari-krishnaa-n-" style="color: #6c63ff; text-decoration: none;">LinkedIn</a> or 
            <a href="https://github.com/krishnaa-0506" style="color: #6c63ff; text-decoration: none;">GitHub</a>.
          </p>

          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            Hari Krishnaa N | Agentic AI Engineer & Vibe Coder<br>
            <a href="https://harikrishnaa.dev" style="color: #6c63ff; text-decoration: none;">harikrishnaa.dev</a>
          </p>
        </div>
      `,
      text: `
Hey ${body.name}! 👋

Thanks for reaching out! I received your message about ${body.collaborationType}.

What happens next:
• I'll review your message
• You'll hear back from me within 4 hours
• Let's discuss how we can build something amazing together

In the meantime, feel free to connect with me on LinkedIn or GitHub.

---
Hari Krishnaa N | Agentic AI Engineer & Vibe Coder
harikrishnaa.dev
      `,
    };

    // Send both emails
    try {
      await transporter.verify();
      await transporter.sendMail(ownerMailOptions);
      await transporter.sendMail(visitorMailOptions);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      const errorMessage = emailError instanceof Error ? emailError.message : "Unknown SMTP error";
      return NextResponse.json(
        { error: `Failed to send email. ${errorMessage}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// Helper function to sanitize HTML
function sanitizeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
