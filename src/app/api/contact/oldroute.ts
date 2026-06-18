import { NextResponse } from "next/server";
import mail from "@sendgrid/mail";


mail.setApiKey(process.env.SENDGRID_API_KEY!);


function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    .header { text-align: center; border-bottom: 2px solid #7c3aed; padding-bottom: 20px; margin-bottom: 20px; }
    .logo { height: 50px; margin-bottom: 10px; }
    .content { padding: 20px 0; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #7c3aed; }
    .value { margin-top: 5px; padding: 10px; background: #f5f5f5; border-radius: 4px; }
    .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0; color: #7c3aed;">New Contact</h2>
    </div>
    
    <div class="content">
      <div class="field">
        <span class="label">Name:</span>
        <div class="value">${escapeHtml(name)}</div>
      </div>
      
      <div class="field">
        <span class="label">Email:</span>
        <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      </div>
      
      <div class="field">
        <span class="label">Message:</span>
        <div class="value">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    
    <div class="footer">
      <p>This email was sent from your portfolio contact form.</p>
    </div>
  </div>
</body>
</html>
    `;

    await mail.send({
      to: process.env.SENDGRID_TO!,
      from: {
        email: process.env.SENDGRID_FROM!,
        name: "Portfolio Contact",
      },
      subject: `New message from ${name} 📧`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: htmlContent,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("SendGrid error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}