const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Add this line to load environment variables from .env file

const app = express();
const port = 5000;

const frontend = process.env.VITE_FRONTEND_URL; // Initialize frontend with the environment variable

app.use(bodyParser.json());

app.use(
    cors({
        origin: [frontend],
        methods: ["POST", "GET"],
        credentials: true,
        

    })
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", frontend);
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.post("/send-mail", async (req, res) => {
    const { displayName, email, phoneNumber, toemail, url,name } = req.body;
    console.log(email, toemail);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "developerhouseliv@gmail.com",
            pass: "tysqcczvnhiniknh", // Ensure this password is correct
        },
    });
   const mailOptions = {
       from: "developerhouseliv@gmail.com",
       to: toemail,
       subject: `${displayName} Viewed Your Property on Houseliv`,
       html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <h2 style="text-align: center; color: #333;">Property Viewed Notification</h2>
        <p>Dear ${name},</p>
        <p>We are pleased to inform you that your property has been viewed on Houseliv. Below are the details:</p>
        <p><strong>Viewer's Name:</strong> ${displayName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Property Details:</strong> <a href="${url}">${url}</a></p>
        <p>Thank you for using Houseliv.</p>
        <p>Best regards,<br>Houseliv Team</p>
        <hr>
        <p style="font-size: 12px; color: #777;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `,
   };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error("Error sending email", error);
        res.status(500).send("Error sending email");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
