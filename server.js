const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "edosilvamuller@gmail.com",       // your Gmail
    clientId: "894824602950-58l4rgv9b40lisme75sjrnpul2a3f88t.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken: "1//04ZbhrDJX9qR8CgYIARAAGAQSNwF-L9Ir0WjQ8frjDzlidva6_IXHBJm50iiTnki6h4yhD6wESarneLYIoFnFKjrrmU4huGAkdlw",
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: "edosilvamuller@gmail.com",
      to,
      subject,
      text,
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});

