import { NextResponse } from "next/server";
import mail from "@sendgrid/mail";

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
    // Initialize SendGrid only when a request is made
    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {
      console.error("SENDGRID_API_KEY is missing");
      return NextResponse.json(
        { error: "Server email configuration is missing." },
        { status: 500 }
      );
    }

    mail.setApiKey(apiKey);

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
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.header {
  text-align: center;
  border-bottom: 2px solid #7c3aed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.content {
  padding: 20px 0;
}
.field {
  margin-bottom: 15px;
}
.label {
  font-weight: bold;
  color: #7c3aed;
}
.value {
  margin-top: 5px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}
.footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  font-size: 12px;
  color: #999;
}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h2 style="margin:0;color:#7c3aed;">
      New Contact Message
    </h2>
  </div>

  <div class="content">
    <div class="field">
      <div class="label">Name</div>
      <div class="value">${escapeHtml(name)}</div>
    </div>

    <div class="field">
      <div class="label">Email</div>
      <div class="value">
        <a href="mailto:${escapeHtml(email)}">
          ${escapeHtml(email)}
        </a>
      </div>
    </div>

    <div class="field">
      <div class="label">Message</div>
      <div class="value">
        ${escapeHtml(message).replace(/\n/g, "<br>")}
      </div>
    </div>
  </div>

  <div class="footer">
    This email was sent from your portfolio contact form.
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

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("SendGrid Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message.",
      },
      { status: 500 }
    );
  }
}