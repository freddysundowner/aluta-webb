import { Router } from "express";

const router = Router();

router.post("/contact", async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !email || !message) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: { name: "Aluta Website", email: "hello@alutatechnologies.com" },
      to: [{ email: "hello@alutatechnologies.com", name: "Aluta Team" }],
      replyTo: { email, name: `${firstName} ${lastName}` },
      subject: `New message from ${firstName} ${lastName}`,
      htmlContent: `<p><strong>From:</strong> ${firstName} ${lastName} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!response.ok) {
    res.status(500).json({ error: "Failed to send message" });
    return;
  }

  res.json({ success: true });
});

export default router;
